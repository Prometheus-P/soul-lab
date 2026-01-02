/**
 * API Client with Session Token Authentication
 *
 * Securely communicates with the backend API using server-issued session tokens.
 * The secret never leaves the server - tokens are signed server-side.
 *
 * Authentication flow:
 * 1. Client requests session token with userKey
 * 2. Server signs token with SIGNING_SECRET and returns it
 * 3. Client includes token in X-Session-Token header for protected endpoints
 * 4. Token auto-refreshes before expiry
 */

import { getUserSeed } from './storage';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

// Token refresh buffer (refresh 1 minute before expiry)
const TOKEN_REFRESH_BUFFER_MS = 60 * 1000;

interface SessionTokenResponse {
  ok: boolean;
  token: string;
  expiresAt: number;
  ttlMs: number;
}

interface TokenState {
  token: string;
  expiresAt: number;
  userKey: string;
}

let tokenState: TokenState | null = null;
let tokenRefreshPromise: Promise<void> | null = null;

/**
 * Check if current token is valid and not expiring soon
 */
function isTokenValid(): boolean {
  if (!tokenState) return false;
  const now = Date.now();
  return tokenState.expiresAt - now > TOKEN_REFRESH_BUFFER_MS;
}

/**
 * Fetch a new session token from the server
 */
async function fetchSessionToken(userKey: string): Promise<TokenState> {
  const response = await fetch(`${API_BASE}/api/auth/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userKey }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Failed to get session token: ${response.status}`);
  }

  const data: SessionTokenResponse = await response.json();

  if (!data.ok || !data.token) {
    throw new Error('Invalid session token response');
  }

  return {
    token: data.token,
    expiresAt: data.expiresAt,
    userKey,
  };
}

/**
 * Ensure we have a valid session token
 * Returns the token or null if unable to authenticate
 */
async function ensureToken(): Promise<string | null> {
  const userKey = getUserSeed();
  if (!userKey) {
    console.warn('[API] No user seed available for authentication');
    return null;
  }

  // If we have a valid token for this user, use it
  if (tokenState && tokenState.userKey === userKey && isTokenValid()) {
    return tokenState.token;
  }

  // If a refresh is already in progress, wait for it
  if (tokenRefreshPromise) {
    await tokenRefreshPromise;
    return tokenState?.token || null;
  }

  // Refresh the token
  tokenRefreshPromise = (async () => {
    try {
      tokenState = await fetchSessionToken(userKey);
    } catch (err) {
      console.error('[API] Failed to refresh session token:', err);
      tokenState = null;
    } finally {
      tokenRefreshPromise = null;
    }
  })();

  await tokenRefreshPromise;
  return tokenState?.token || null;
}

/**
 * Clear the current session (on logout or user change)
 */
export function clearSession(): void {
  tokenState = null;
}

/**
 * Request options with authentication headers
 */
interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
  includeUserKey?: boolean;
}

/**
 * Make an authenticated API request
 *
 * @param endpoint - API endpoint path (e.g., '/api/credits/balance')
 * @param options - Fetch options plus auth options
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requireAuth = true, includeUserKey = false, ...fetchOptions } = options;

  const headers = new Headers(fetchOptions.headers);

  // Set default content type for POST/PUT requests with body
  if (fetchOptions.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add authentication token for protected endpoints
  if (requireAuth) {
    const token = await ensureToken();
    if (token) {
      headers.set('X-Session-Token', token);
    } else {
      // In development, fall back to X-User-Key header
      const userKey = getUserSeed();
      if (userKey) {
        headers.set('X-User-Key', userKey);
      }
    }
  }

  // Optionally include userKey in the request for non-body requests
  if (includeUserKey && !fetchOptions.body) {
    const userKey = getUserSeed();
    if (userKey) {
      headers.set('X-User-Key', userKey);
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));

    // Handle token expiry - clear and retry once
    if (response.status === 401 && error.error === 'token_expired') {
      clearSession();
      return apiRequest<T>(endpoint, options);
    }

    throw new ApiError(response.status, error.error || 'unknown', error.message);
  }

  return response.json();
}

/**
 * API Error class for structured error handling
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ============================================================
// Convenience Methods
// ============================================================

/**
 * GET request with optional query parameters
 */
export async function apiGet<T = unknown>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
  options?: RequestOptions
): Promise<T> {
  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url = `${endpoint}?${queryString}`;
    }
  }
  return apiRequest<T>(url, { method: 'GET', ...options });
}

/**
 * POST request with JSON body
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
}

// ============================================================
// Credits API
// ============================================================

export interface CreditBalance {
  credits: number;
  totalPurchased: number;
  totalUsed: number;
}

export interface CreditTransaction {
  id: string;
  type: 'purchase' | 'use' | 'refund' | 'bonus';
  amount: number;
  balance: number;
  description: string;
  timestamp: string;
}

export async function getBalance(userKey: string): Promise<CreditBalance> {
  return apiGet<CreditBalance>('/api/credits/balance', { userKey });
}

export async function consumeCredits(userKey: string, amount: number, description: string): Promise<{
  success: boolean;
  transaction?: CreditTransaction;
  error?: string;
}> {
  return apiPost('/api/credits/use', { userKey, amount, description });
}

export async function checkCredits(userKey: string, amount: number): Promise<{
  hasEnough: boolean;
  currentBalance: number;
}> {
  return apiPost('/api/credits/check', { userKey, amount });
}

export async function getTransactionHistory(userKey: string, limit = 50): Promise<CreditTransaction[]> {
  return apiGet<CreditTransaction[]>('/api/credits/transactions', { userKey, limit });
}

// ============================================================
// Streak API
// ============================================================

export interface StreakReward {
  type: 'milestone' | 'daily_bonus';
  credits: number;
  name: string;
}

export interface ClaimStreakResult {
  success: boolean;
  rewards: StreakReward[];
  totalCredits: number;
  alreadyClaimed: boolean;
}

export async function claimStreakReward(
  userKey: string,
  dateKey: string,
  streak: number
): Promise<ClaimStreakResult> {
  return apiPost('/api/credits/streak/claim', { userKey, dateKey, streak });
}

export async function getStreakStats(userKey: string): Promise<{
  totalCreditsEarned: number;
  milestonesReached: number[];
  lastRewardDate: string | null;
}> {
  return apiGet('/api/credits/streak/stats', { userKey });
}

// ============================================================
// Referral API
// ============================================================

export interface ClaimReferralResult {
  success: boolean;
  credits?: number;
  alreadyClaimed?: boolean;
  error?: string;
}

export async function claimReferralReward(
  inviterKey: string,
  inviteeKey: string,
  dateKey: string,
  claimerKey: string
): Promise<ClaimReferralResult> {
  return apiPost('/api/credits/referral/claim', {
    inviterKey,
    inviteeKey,
    dateKey,
    claimerKey,
  });
}

export async function getReferralStats(userKey: string): Promise<{
  totalInvited: number;
  totalCreditsEarned: number;
}> {
  return apiGet('/api/credits/referral/stats', { userKey });
}

// ============================================================
// Reward (Ad) API - No auth required
// ============================================================

export async function earnReward(
  userKey: string,
  dateKey: string,
  scope?: string
): Promise<{ ok: boolean; already: boolean }> {
  return apiPost(
    '/api/rewards/earn',
    { userKey, dateKey, scope },
    { requireAuth: false }
  );
}

export async function checkReward(
  userKey: string,
  dateKey: string
): Promise<{ earned: boolean; earnedAt?: number }> {
  return apiGet(
    '/api/rewards/check',
    { userKey, dateKey },
    { requireAuth: false }
  );
}

// ============================================================
// Invite API - No auth required
// ============================================================

export async function createInvite(inviterKey: string): Promise<{
  inviteId: string;
  expiresAt: number;
}> {
  return apiPost(
    '/api/invites',
    { inviterKey },
    { requireAuth: false }
  );
}

export async function getInvite(inviteId: string): Promise<{
  inviteId: string;
  status: 'pending' | 'paired' | 'expired';
  expiresAt: number;
}> {
  return apiGet(
    `/api/invites/${inviteId}`,
    undefined,
    { requireAuth: false }
  );
}

export async function joinInvite(
  inviteId: string,
  userKey: string
): Promise<{
  inviteId: string;
  status: string;
  role: 'inviter' | 'invitee';
  partnerKey: string | null;
  expiresAt: number;
}> {
  return apiPost(
    `/api/invites/${inviteId}/join`,
    { userKey },
    { requireAuth: false }
  );
}
