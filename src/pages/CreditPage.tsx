import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@toss/tds-mobile';
import Header from '../components/Header';
import { getEffectiveUserKey } from '../lib/storage';
import {
  getProducts,
  getBalance,
  purchaseCredits,
  restorePendingPurchases,
  CreditProduct,
  CreditBalance,
} from '../lib/iap';
import { track } from '../lib/analytics';
import { toast } from '../components/Toast';

type ViewMode = 'main' | 'purchasing';

export default function CreditPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [products, setProducts] = useState<CreditProduct[]>([]);
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CreditProduct | null>(null);

  const userKey = getEffectiveUserKey();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [productsData, balanceData] = await Promise.all([
        getProducts(),
        getBalance(userKey),
      ]);
      setProducts(productsData);
      setBalance(balanceData);
    } catch (e) {
      console.error('Failed to load credit data:', e);
    } finally {
      setLoading(false);
    }
  }, [userKey]);

  useEffect(() => {
    track('credit_page_view');
    loadData();
  }, [loadData]);

  const handlePurchase = async (product: CreditProduct) => {
    if (purchasing) return;

    setSelectedProduct(product);
    setPurchasing(true);
    setViewMode('purchasing');

    track('credit_purchase_start', { sku: product.sku, price: product.price });

    try {
      const result = await purchaseCredits(userKey, product);

      if (result.success) {
        track('credit_purchase_success', {
          sku: product.sku,
          orderId: result.orderId,
          credits: result.credits,
        });
        await loadData();
        toast(`${product.totalCredits} 크레딧이 충전되었습니다!`, 'success');
      } else {
        track('credit_purchase_failed', { sku: product.sku, error: result.error });
        if (result.error !== 'user_cancelled') {
          toast('결제에 실패했습니다. 다시 시도해주세요.', 'error');
        }
      }
    } catch (e) {
      console.error('Purchase error:', e);
      toast('결제 중 오류가 발생했습니다.', 'error');
    } finally {
      setPurchasing(false);
      setSelectedProduct(null);
      setViewMode('main');
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      const restored = await restorePendingPurchases(userKey);
      if (restored > 0) {
        await loadData();
        toast(`${restored}건의 미완료 구매가 복원되었습니다.`, 'success');
      } else {
        toast('복원할 구매 내역이 없습니다.', 'info');
      }
    } catch (e) {
      console.error('Restore error:', e);
      toast('복원 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !balance) {
    return (
      <div className="container">
        <Header title="💎 크레딧 충전" />
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16, animation: 'pulse 2s ease-in-out infinite' }}>
            💫
          </div>
          <p className="small" style={{ color: 'rgba(255,255,255,0.7)' }}>
            크레딧 정보를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === 'purchasing' && selectedProduct) {
    return (
      <div className="container">
        <Header title="💎 결제 진행 중" />
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 24, animation: 'pulse 1.5s ease-in-out infinite' }}>
            ✨
          </div>
          <h2 className="glow-text" style={{ fontSize: 20, marginBottom: 12 }}>
            {selectedProduct.nameKorean}
          </h2>
          <p className="p" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
            {selectedProduct.totalCredits} 크레딧
          </p>
          <p className="small" style={{ color: 'rgba(147, 112, 219, 0.8)' }}>
            결제 화면이 열립니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header title="💎 크레딧 충전" subtitle="AI 상담에 필요한 크레딧을 충전하세요" />

      {/* 현재 잔액 */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.3) 0%, rgba(255, 215, 0, 0.15) 100%)',
        border: '2px solid rgba(255, 215, 0, 0.4)',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        <div className="small" style={{ color: 'rgba(255, 215, 0, 0.8)', marginBottom: 4 }}>
          보유 크레딧
        </div>
        <div className="glow-text" style={{ fontSize: 36, fontWeight: 700 }}>
          {balance?.credits ?? 0} <span style={{ fontSize: 18 }}>크레딧</span>
        </div>
        {balance && balance.totalPurchased > 0 && (
          <div className="small" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            총 구매: {balance.totalPurchased} | 총 사용: {balance.totalUsed}
          </div>
        )}
      </div>

      {/* 크레딧 사용처 안내 */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="h2" style={{ marginBottom: 12 }}>🔮 크레딧 사용처</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <CreditUsageItem icon="💬" name="AI 상담 1회" cost={1} />
          <CreditUsageItem icon="🌟" name="일일 운세 AI 해석" cost={1} />
          <CreditUsageItem icon="🃏" name="타로 AI 해석" cost={2} />
          <CreditUsageItem icon="💕" name="궁합 AI 분석" cost={3} />
          <CreditUsageItem icon="📜" name="상세 리포트" cost={5} />
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="h2" style={{ marginBottom: 12, paddingLeft: 4 }}>
        💎 크레딧 패키지
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {products.map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            onPurchase={() => handlePurchase(product)}
            disabled={purchasing}
          />
        ))}
      </div>

      {/* 복원 버튼 */}
      <Button
        size="medium"
        color="dark"
        variant="weak"
        display="full"
        onClick={handleRestore}
        disabled={loading}
        style={{ marginBottom: 12 }}
      >
        미완료 구매 복원
      </Button>

      {/* AI 상담 이동 */}
      <Button
        size="large"
        color="primary"
        variant="fill"
        display="full"
        onClick={() => navigate('/consult')}
        style={{ marginBottom: 12 }}
      >
        ✨ AI 상담 시작하기
      </Button>

      <Button
        size="large"
        color="dark"
        variant="weak"
        display="full"
        onClick={() => navigate('/result')}
      >
        운세로 돌아가기
      </Button>

      <div className="footer">
        * 크레딧은 환불되지 않습니다. 신중하게 구매해주세요.
      </div>
    </div>
  );
}

function CreditUsageItem({ icon, name, cost }: { icon: string; name: string; cost: number }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid rgba(147, 112, 219, 0.15)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span className="small">{name}</span>
      </div>
      <span className="small" style={{ color: 'rgba(255, 215, 0, 0.8)' }}>
        {cost} 크레딧
      </span>
    </div>
  );
}

function ProductCard({
  product,
  onPurchase,
  disabled,
}: {
  product: CreditProduct;
  onPurchase: () => void;
  disabled: boolean;
}) {
  const hasBonus = product.bonus && product.bonus > 0;
  const isPopular = product.sku === 'credit_150';
  const isBest = product.sku === 'credit_500';

  return (
    <div
      className="card"
      style={{
        position: 'relative',
        border: isPopular
          ? '2px solid rgba(255, 215, 0, 0.5)'
          : isBest
          ? '2px solid rgba(147, 112, 219, 0.5)'
          : '1px solid rgba(147, 112, 219, 0.2)',
        background: isPopular
          ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(147, 112, 219, 0.15) 100%)'
          : isBest
          ? 'linear-gradient(135deg, rgba(147, 112, 219, 0.2) 0%, rgba(75, 0, 130, 0.3) 100%)'
          : undefined,
        padding: 16,
      }}
    >
      {/* 인기/추천 뱃지 */}
      {(isPopular || isBest) && (
        <div style={{
          position: 'absolute',
          top: -10,
          right: 12,
          background: isPopular
            ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
            : 'linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)',
          color: isPopular ? '#1a0f2e' : '#fff',
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: 12,
        }}>
          {isPopular ? '🔥 인기' : '✨ 최고'}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="h2" style={{ marginBottom: 4 }}>
            {product.nameKorean}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="glow-text" style={{ fontSize: 24, fontWeight: 700 }}>
              {product.credits}
            </span>
            {hasBonus && (
              <span style={{
                color: 'rgba(240, 68, 82, 0.9)',
                fontSize: 14,
                fontWeight: 600,
              }}>
                +{product.bonus} 보너스
              </span>
            )}
          </div>
          <div className="small" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
            = 총 {product.totalCredits} 크레딧
          </div>
        </div>

        <Button
          size="medium"
          color={isPopular ? 'primary' : isBest ? 'primary' : 'dark'}
          variant={isPopular || isBest ? 'fill' : 'weak'}
          onClick={onPurchase}
          disabled={disabled}
        >
          {product.priceFormatted}
        </Button>
      </div>
    </div>
  );
}
