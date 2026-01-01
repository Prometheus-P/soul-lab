import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@toss/tds-mobile';
import Header from '../components/Header';
import { drawThreeCardSpread, drawDailyCard, DrawnCard, TarotReading } from '../lib/tarot';
import { getEffectiveUserKey } from '../lib/storage';
import { applyEmpathyOverlay } from '../lib/report';

type ViewMode = 'selection' | 'daily' | 'spread';

export default function TarotPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('selection');
  const [dailyCard, setDailyCard] = useState<DrawnCard | null>(null);
  const [spreadReading, setSpreadReading] = useState<TarotReading | null>(null);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);

  const userKey = getEffectiveUserKey();

  useEffect(() => {
    if (viewMode === 'daily') {
      setDailyCard(drawDailyCard(userKey));
    } else if (viewMode === 'spread') {
      setSpreadReading(drawThreeCardSpread(userKey));
      setRevealedCards([]);
    }
  }, [viewMode, userKey]);

  const handleRevealCard = (index: number) => {
    if (!revealedCards.includes(index)) {
      setRevealedCards([...revealedCards, index]);
    }
  };

  // Apply empathy overlay to spread reading when all cards are revealed
  // Must be called unconditionally (before any conditional returns) to follow React hooks rules
  const empathyResult = useMemo(() => {
    if (!spreadReading || revealedCards.length < 3) return null;

    return applyEmpathyOverlay(spreadReading.summary, {
      cards: spreadReading.cards.map((c) => c.card.name),
      baseReading: spreadReading.summary,
    });
  }, [spreadReading, revealedCards.length]);

  if (viewMode === 'selection') {
    return (
      <div className="container">
        <Header title="🔮 타로 리딩" />
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔮</div>
            <h1 className="glow-text" style={{ fontSize: 24, marginBottom: 8 }}>
              타로 리딩
            </h1>
            <p className="small" style={{ color: 'rgba(255,255,255,0.7)' }}>
              카드가 당신의 운명을 비춥니다
            </p>
          </div>

          <div className="card" style={{
            marginBottom: 16,
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }} onClick={() => setViewMode('daily')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 36 }}>🃏</div>
              <div>
                <div className="h2">오늘의 한 장</div>
                <div className="small" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  오늘 하루를 이끌어줄 카드 한 장
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{
            marginBottom: 24,
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }} onClick={() => setViewMode('spread')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 36 }}>🌟</div>
              <div>
                <div className="h2">3카드 스프레드</div>
                <div className="small" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  과거 · 현재 · 미래를 비추는 세 장의 카드
                </div>
              </div>
            </div>
          </div>

          <Button
            size="large"
            color="dark"
            variant="weak"
            display="full"
            onClick={() => navigate('/result')}
          >
            운세로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (viewMode === 'daily' && dailyCard) {
    return (
      <div className="container">
        <Header title="🃏 오늘의 카드" />
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className="small" style={{ color: 'rgba(147, 112, 219, 0.8)' }}>
              {dailyCard.positionLabel}
            </div>
          </div>

          <TarotCardDisplay card={dailyCard} revealed={true} />

          <div style={{ marginTop: 24 }}>
            <Button
              size="large"
              color="primary"
              variant="fill"
              display="full"
              onClick={() => setViewMode('spread')}
              style={{ marginBottom: 12 }}
            >
              3카드 스프레드 보기
            </Button>
            <Button
              size="large"
              color="dark"
              variant="weak"
              display="full"
              onClick={() => setViewMode('selection')}
            >
              돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'spread' && spreadReading) {
    const allRevealed = revealedCards.length === 3;

    return (
      <div className="container">
        <Header title="🌟 3카드 스프레드" />
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h2 className="glow-text" style={{ fontSize: 20, marginBottom: 8 }}>
              3카드 스프레드
            </h2>
            <p className="small" style={{ color: 'rgba(255,255,255,0.6)' }}>
              카드를 터치하여 운명을 공개하세요
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            {spreadReading.cards.map((drawnCard, idx) => (
              <div
                key={idx}
                onClick={() => handleRevealCard(idx)}
                style={{ flex: 1, maxWidth: 120 }}
              >
                <TarotCardMini
                  card={drawnCard}
                  revealed={revealedCards.includes(idx)}
                />
              </div>
            ))}
          </div>

          {allRevealed && (
            <div className="card" style={{
              background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)',
              border: '1px solid rgba(147, 112, 219, 0.3)',
            }}>
              <div className="h2" style={{ marginBottom: 12, textAlign: 'center' }}>
                ✨ 리딩 해석
              </div>
              <div className="p" style={{ marginBottom: 16, whiteSpace: 'pre-wrap' }}>
                {empathyResult?.text || spreadReading.summary}
              </div>

              {spreadReading.cards.map((drawnCard, idx) => (
                <div key={idx} style={{ marginTop: 16 }}>
                  <div className="small" style={{ color: 'rgba(147, 112, 219, 0.8)', marginBottom: 4 }}>
                    {drawnCard.positionLabel}
                  </div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    {drawnCard.card.emoji} {drawnCard.card.name}
                    {drawnCard.isReversed && <span style={{ color: 'rgba(240, 68, 82, 0.8)' }}> (역방향)</span>}
                  </div>
                  <p className="small" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {drawnCard.isReversed ? drawnCard.card.reversed.advice : drawnCard.card.upright.advice}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <Button
              size="large"
              color="dark"
              variant="weak"
              display="full"
              onClick={() => setViewMode('selection')}
            >
              돌아가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function TarotCardDisplay({ card, revealed }: { card: DrawnCard; revealed: boolean }) {
  const meaning = card.isReversed ? card.card.reversed : card.card.upright;

  return (
    <div className="card" style={{
      background: 'linear-gradient(180deg, rgba(26, 15, 46, 0.9) 0%, rgba(75, 0, 130, 0.3) 100%)',
      border: '1px solid rgba(147, 112, 219, 0.4)',
      boxShadow: '0 0 30px rgba(147, 112, 219, 0.3)',
      textAlign: 'center',
      padding: 24,
    }}>
      <div style={{
        fontSize: 64,
        marginBottom: 16,
        transform: card.isReversed ? 'rotate(180deg)' : 'none',
      }}>
        {card.card.emoji}
      </div>

      <div className="h2" style={{ marginBottom: 4 }}>
        {card.card.name}
      </div>
      <div className="small" style={{ color: 'rgba(147, 112, 219, 0.8)', marginBottom: 16 }}>
        {card.card.nameEn}
        {card.isReversed && <span style={{ color: 'rgba(240, 68, 82, 0.8)' }}> (역방향)</span>}
      </div>

      <div style={{
        display: 'inline-block',
        padding: '6px 16px',
        background: 'linear-gradient(135deg, rgba(147, 112, 219, 0.3) 0%, rgba(255, 215, 0, 0.2) 100%)',
        borderRadius: 20,
        marginBottom: 16,
      }}>
        <span className="glow-text" style={{ fontSize: 14 }}>
          {meaning.keyword}
        </span>
      </div>

      <p className="p" style={{ marginBottom: 16 }}>
        {meaning.meaning}
      </p>

      <div style={{
        background: 'rgba(147, 112, 219, 0.1)',
        borderRadius: 12,
        padding: 16,
      }}>
        <div className="small" style={{ color: 'rgba(255, 215, 0, 0.8)', marginBottom: 4 }}>
          💫 오늘의 조언
        </div>
        <p className="p">
          {meaning.advice}
        </p>
      </div>
    </div>
  );
}

function TarotCardMini({ card, revealed }: { card: DrawnCard; revealed: boolean }) {
  const meaning = card.isReversed ? card.card.reversed : card.card.upright;

  return (
    <div style={{
      aspectRatio: '2/3',
      perspective: '1000px',
      cursor: revealed ? 'default' : 'pointer',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
        transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* 카드 뒷면 (수정구슬) */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'linear-gradient(180deg, rgba(75, 0, 130, 0.6) 0%, rgba(26, 15, 46, 0.9) 100%)',
          border: '2px solid rgba(147, 112, 219, 0.5)',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(147, 112, 219, 0.3)',
        }}>
          <div style={{
            fontSize: 32,
            animation: 'pulse 2s ease-in-out infinite',
          }}>🔮</div>
        </div>

        {/* 카드 앞면 (공개된 카드) */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(180deg, rgba(26, 15, 46, 0.9) 0%, rgba(75, 0, 130, 0.3) 100%)',
          border: '2px solid rgba(255, 215, 0, 0.4)',
          borderRadius: 12,
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
          boxSizing: 'border-box',
        }}>
          <div className="small" style={{ color: 'rgba(147, 112, 219, 0.8)', marginBottom: 4, fontSize: 10 }}>
            {card.positionLabel}
          </div>
          <div style={{
            fontSize: 28,
            marginBottom: 4,
            transform: card.isReversed ? 'rotate(180deg)' : 'none',
          }}>
            {card.card.emoji}
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, textAlign: 'center' }}>
            {card.card.name}
          </div>
          <div style={{
            fontSize: 9,
            color: 'rgba(255, 215, 0, 0.8)',
            marginTop: 4,
          }}>
            {meaning.keyword}
          </div>
        </div>
      </div>
    </div>
  );
}
