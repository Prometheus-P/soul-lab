import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getProducts,
  getBalance,
  consumeCredits,
  checkCredits,
  purchaseCredits,
  CREDIT_ACTIONS,
  type CreditProduct,
} from './iap';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.confirm for dev mode purchase
const mockConfirm = vi.fn();
global.confirm = mockConfirm;

describe('IAP Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getProducts', () => {
    it('returns product list on success', async () => {
      const mockProducts = [
        { sku: 'credit_10', name: 'Starter', credits: 10, price: 1000 },
        { sku: 'credit_50', name: 'Standard', credits: 50, price: 4500 },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ products: mockProducts }),
      });

      const products = await getProducts();

      expect(products).toHaveLength(2);
      expect(products[0].sku).toBe('credit_10');
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/credits/products'));
    });

    it('returns empty array on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const products = await getProducts();

      expect(products).toEqual([]);
    });
  });

  describe('getBalance', () => {
    it('returns balance for user', async () => {
      const mockBalance = {
        credits: 25,
        totalPurchased: 50,
        totalUsed: 25,
        lastUpdated: '2025-01-01T00:00:00Z',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ balance: mockBalance }),
      });

      const balance = await getBalance('user123');

      expect(balance?.credits).toBe(25);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/credits/balance?userKey=user123'),
        expect.objectContaining({
          headers: expect.objectContaining({ 'X-User-Key': 'user123' }),
        })
      );
    });

    it('returns null on error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const balance = await getBalance('user123');

      expect(balance).toBeNull();
    });
  });

  describe('checkCredits', () => {
    it('returns hasEnough=true when sufficient credits', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            hasEnough: true,
            cost: 1,
            currentBalance: 10,
            shortfall: 0,
          }),
      });

      const result = await checkCredits('user123', CREDIT_ACTIONS.AI_CHAT);

      expect(result.hasEnough).toBe(true);
      expect(result.cost).toBe(1);
      expect(result.currentBalance).toBe(10);
    });

    it('returns hasEnough=false when insufficient credits', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            hasEnough: false,
            cost: 1,
            currentBalance: 0,
            shortfall: 1,
          }),
      });

      const result = await checkCredits('user123', CREDIT_ACTIONS.AI_CHAT);

      expect(result.hasEnough).toBe(false);
      expect(result.shortfall).toBe(1);
    });

    it('returns hasEnough=false on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await checkCredits('user123', CREDIT_ACTIONS.AI_CHAT);

      expect(result.hasEnough).toBe(false);
    });
  });

  describe('consumeCredits', () => {
    it('returns success with remaining credits', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            remainingCredits: 9,
          }),
      });

      const result = await consumeCredits('user123', CREDIT_ACTIONS.AI_CHAT, 'AI chat message');

      expect(result.success).toBe(true);
      expect(result.remainingCredits).toBe(9);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/credits/use'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('ai_chat'),
        })
      );
    });

    it('returns error on insufficient credits', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'insufficient_credits' }),
      });

      const result = await consumeCredits('user123', CREDIT_ACTIONS.AI_CHAT);

      expect(result.success).toBe(false);
      expect(result.error).toBe('insufficient_credits');
    });

    it('returns network_error on failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await consumeCredits('user123', CREDIT_ACTIONS.AI_CHAT);

      expect(result.success).toBe(false);
      expect(result.error).toBe('network_error');
    });
  });

  describe('purchaseCredits (dev mode)', () => {
    const mockProduct: CreditProduct = {
      sku: 'credit_10',
      name: 'Starter Pack',
      nameKorean: '스타터 팩',
      credits: 10,
      price: 1000,
      totalCredits: 10,
      priceFormatted: '1,000원',
    };

    it('completes purchase when user confirms', async () => {
      // Mock purchase start
      mockFetch.mockResolvedValueOnce({ ok: true });
      // Mock purchase complete
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            newBalance: 10,
            purchase: { credits: 10 },
          }),
      });
      // User confirms
      mockConfirm.mockReturnValue(true);

      const result = await purchaseCredits('user123', mockProduct);

      expect(result.success).toBe(true);
      expect(result.credits).toBe(10);
      expect(mockConfirm).toHaveBeenCalled();
    });

    it('fails when user cancels', async () => {
      // Mock purchase start
      mockFetch.mockResolvedValueOnce({ ok: true });
      // User cancels
      mockConfirm.mockReturnValue(false);

      const result = await purchaseCredits('user123', mockProduct);

      expect(result.success).toBe(false);
      expect(result.error).toBe('user_cancelled');
    });

    it('fails when purchase start fails', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      const result = await purchaseCredits('user123', mockProduct);

      expect(result.success).toBe(false);
      expect(result.error).toBe('purchase_start_failed');
    });
  });
});

describe('Integration: Credit Purchase → AI Chat Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('full flow: check credits → purchase → use for AI chat', async () => {
    const userKey = 'test-user';

    // Step 1: Check credits - insufficient
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          hasEnough: false,
          cost: 1,
          currentBalance: 0,
          shortfall: 1,
        }),
    });

    const checkResult1 = await checkCredits(userKey, CREDIT_ACTIONS.AI_CHAT);
    expect(checkResult1.hasEnough).toBe(false);

    // Step 2: Purchase credits
    const mockProduct: CreditProduct = {
      sku: 'credit_10',
      name: 'Starter Pack',
      nameKorean: '스타터 팩',
      credits: 10,
      price: 1000,
      totalCredits: 10,
      priceFormatted: '1,000원',
    };

    // Purchase start
    mockFetch.mockResolvedValueOnce({ ok: true });
    // Purchase complete
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          newBalance: 10,
          purchase: { credits: 10 },
        }),
    });
    mockConfirm.mockReturnValue(true);

    const purchaseResult = await purchaseCredits(userKey, mockProduct);
    expect(purchaseResult.success).toBe(true);
    expect(purchaseResult.credits).toBe(10);

    // Step 3: Check credits again - now sufficient
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          hasEnough: true,
          cost: 1,
          currentBalance: 10,
          shortfall: 0,
        }),
    });

    const checkResult2 = await checkCredits(userKey, CREDIT_ACTIONS.AI_CHAT);
    expect(checkResult2.hasEnough).toBe(true);

    // Step 4: Use credits for AI chat
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          remainingCredits: 9,
        }),
    });

    const useResult = await consumeCredits(userKey, CREDIT_ACTIONS.AI_CHAT, 'AI 상담 메시지');
    expect(useResult.success).toBe(true);
    expect(useResult.remainingCredits).toBe(9);
  });

  it('prevents AI chat when credits exhausted', async () => {
    const userKey = 'test-user';

    // Check - has exactly 1 credit
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          hasEnough: true,
          cost: 1,
          currentBalance: 1,
          shortfall: 0,
        }),
    });

    const check1 = await checkCredits(userKey, CREDIT_ACTIONS.AI_CHAT);
    expect(check1.hasEnough).toBe(true);

    // Use the credit
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          remainingCredits: 0,
        }),
    });

    const use1 = await consumeCredits(userKey, CREDIT_ACTIONS.AI_CHAT);
    expect(use1.success).toBe(true);

    // Check again - no credits left
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          hasEnough: false,
          cost: 1,
          currentBalance: 0,
          shortfall: 1,
        }),
    });

    const check2 = await checkCredits(userKey, CREDIT_ACTIONS.AI_CHAT);
    expect(check2.hasEnough).toBe(false);
    expect(check2.shortfall).toBe(1);
  });
});
