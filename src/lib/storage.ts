const K_BIRTHDATE = 'sl_birthdate_yyyymmdd';
const K_AGREEMENT = 'sl_agreement_v1';
const K_VIRAL_UNLOCKED_DATE = 'sl_viral_unlocked_date';
const K_USER_NAME = 'sl_user_name';
const K_FIRST_VISIT = 'sl_first_visit_date';

const KEY = {
  userSeed: 'soul_lab:user_seed',
  unlockedToday: 'soul_lab:unlocked_today',
  publicKey: 'soul_lab:public_key',
};

export function getLocal<T>(k: string): T | null {
  try {
    const raw = localStorage.getItem(k);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setLocal(k: string, v: unknown) {
  localStorage.setItem(k, JSON.stringify(v));
}

function randomSeed(): string {
  // 128-bit-ish random, url-safe
  const a = Math.random().toString(36).slice(2);
  const b = Math.random().toString(36).slice(2);
  const t = Date.now().toString(36);
  return `sl_${t}_${a}${b}`.slice(0, 48);
}

export function getUserSeed(): string | null {
  return getLocal<string>(KEY.userSeed);
}

export function setUserSeed(seed: string) {
  setLocal(KEY.userSeed, seed);
}

export function getOrCreateUserSeed(): string {
  const existing = getUserSeed();
  if (existing && existing.length > 0) return existing;
  const created = randomSeed();
  setUserSeed(created);
  return created;
}

export function getUnlockedDate(): string | null {
  return getLocal<string>(KEY.unlockedToday);
}

export function setUnlockedDate(date: string) {
  setLocal(KEY.unlockedToday, date);
}

/**
 * Optional: a stable identifier derived from Toss login.
 * In MVP we don't have a stable user id from Toss scopes,
 * so we default to userSeed (device-local).
 */
export function getPublicKey(): string | null {
  return getLocal<string>(KEY.publicKey);
}

export function setPublicKey(k: string) {
  setLocal(KEY.publicKey, k);
}

export function getEffectiveUserKey(): string {
  return (getPublicKey() && getPublicKey()!.length > 0) ? getPublicKey()! : getOrCreateUserSeed();
}

export function getBirthDate() {
  return localStorage.getItem(K_BIRTHDATE);
}

export function setBirthDate(v: string) {
  localStorage.setItem(K_BIRTHDATE, v);
}

export function getAgreement() {
  const raw = localStorage.getItem(K_AGREEMENT);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { terms: boolean; thirdParty: boolean; marketing: boolean; at: number };
  } catch {
    return null;
  }
}

export function setAgreement(v: { terms: boolean; thirdParty: boolean; marketing: boolean }) {
  localStorage.setItem(K_AGREEMENT, JSON.stringify({ ...v, at: Date.now() }));
}

export function hasRequiredAgreement() {
  const a = getAgreement();
  // 심사/리스크 방어: 개인 분석은 약관(terms)만 필수.
  return !!(a && a.terms);
}
export function getViralUnlockedDate() {
  return localStorage.getItem(K_VIRAL_UNLOCKED_DATE);
}

export function setViralUnlockedDate(dateKey: string) {
  localStorage.setItem(K_VIRAL_UNLOCKED_DATE, dateKey);
}

export function hasThirdPartyConsent() {
  const a = getAgreement();
  return !!(a && a.thirdParty);
}

export function hasBirthDate() {
  const bd = getBirthDate();
  return !!(bd && /^\d{8}$/.test(bd));
}

export function getUserName(): string | null {
  return localStorage.getItem(K_USER_NAME);
}

export function setUserName(name: string) {
  localStorage.setItem(K_USER_NAME, name);
}

// Admin session
const K_ADMIN_TOKEN = 'soul_admin_token';

export function getAdminToken(): string | null {
  return localStorage.getItem(K_ADMIN_TOKEN);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(K_ADMIN_TOKEN, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(K_ADMIN_TOKEN);
}

// First visit tracking for ad delay
export function getFirstVisitDate(): string | null {
  return localStorage.getItem(K_FIRST_VISIT);
}

export function setFirstVisitDate(dateKey: string): void {
  // Only set if not already set (preserve original first visit)
  if (!localStorage.getItem(K_FIRST_VISIT)) {
    localStorage.setItem(K_FIRST_VISIT, dateKey);
  }
}

/**
 * Calculate days since first visit.
 * Returns 1 on first day, 2 on second day, etc.
 * Returns 0 if first visit date not set.
 */
export function getDaysSinceFirstVisit(): number {
  const firstVisit = getFirstVisitDate();
  if (!firstVisit || !/^\d{8}$/.test(firstVisit)) return 0;

  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10).replace(/-/g, '');

  const firstYear = parseInt(firstVisit.slice(0, 4));
  const firstMonth = parseInt(firstVisit.slice(4, 6)) - 1;
  const firstDay = parseInt(firstVisit.slice(6, 8));
  const firstDate = new Date(firstYear, firstMonth, firstDay);

  const todayYear = parseInt(todayKey.slice(0, 4));
  const todayMonth = parseInt(todayKey.slice(4, 6)) - 1;
  const todayDay = parseInt(todayKey.slice(6, 8));
  const todayDate = new Date(todayYear, todayMonth, todayDay);

  const diffTime = todayDate.getTime() - firstDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1; // 1-indexed (first day = 1)
}
