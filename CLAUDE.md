# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Soul Lab (소울 랩) is a Toss WebView mini-app for fortune/compatibility analysis with viral sharing mechanics. Built with React + Vite for frontend and Fastify for backend API.

## Commands

```bash
# Development
pnpm install           # Install dependencies
pnpm dev               # Run with granite (Toss Sandbox) - use intoss://soul-lab in sandbox app
pnpm dev:web           # Local browser only (limited Toss features)
pnpm dev:server        # API server at localhost:8787

# Build & Quality
pnpm build             # Full granite build
pnpm build:web         # TypeScript + Vite build (generates stats.html bundle analysis)
pnpm build:server      # Compile server TypeScript
pnpm lint              # ESLint
pnpm format            # Prettier

# Testing
pnpm test              # Watch mode
pnpm test:run          # Single run (frontend only)
pnpm test:server       # Backend tests only
pnpm test:all          # All tests (frontend + backend)
npx vitest run src/lib/seed.test.ts  # Single test file
```

## Architecture

### Frontend (`src/`)

- **Pages**: Landing → Agreement → Loading → Result → Detail → Chemistry → Tarot → Credits → Consult
- **Flow**: User agrees to terms → enters birthdate → sees fortune → unlocks detailed content via ads or viral sharing
- **Route-based Code Splitting**: React.lazy() + Suspense for all pages (9 lazy-loaded chunks)
- **Toss Integration** (`src/lib/toss.ts`): Wraps `@apps-in-toss/web-framework` for login, contactsViral, rewarded ads, sharing
- **Fortune Engine** (`src/utils/engine.ts`): Deterministic hash-based (FNV-1a) fortune generation from userKey + birthdate + date
- **Storage** (`src/lib/storage.ts`): localStorage for user state (seed, agreements, unlock status)

### Backend (`server/`)

- **Fastify API** at port 8787 with file-based persistence in `server/data/`
- **Invite System**: Create/join/reissue invites with 24h TTL for paired chemistry unlocks
- **Rate Limiting**: Fixed-window limits per IP and user key (configurable via env)
- **Reward Tracking**: Server-side record of rewarded ad completions (1 per user per day)
- **Credit System** (`server/src/credits/store.ts`): 복채 잔액, 구매, 트랜잭션 관리
  - IAP Flow: `/api/credits/purchase/start` → `/api/credits/purchase/complete`
  - 보상: 레퍼럴(초대자 +5, 피초대자 +3), 스트릭(7d:+3, 14d:+5, 21d:+10, 30d:+20)
- **Tarot Engine** (`server/src/tarot/engine.ts`): AI 기반 타로 해석

### Credit & IAP (`src/lib/iap.ts`)

- `purchaseCredits`: 인앱결제로 복채 구매
- `claimReferralReward`: 레퍼럴 보상 청구
- `claimStreakReward`: 스트릭 보상 청구 (마일스톤 + 3일 간격 데일리 보너스)

### Tarot (`src/lib/tarot.ts`)

- 78장 타로 카드 시스템 (Major 22 + Minor 56 Arcana)
- `drawThreeCardSpread`: 과거-현재-미래 3장 스프레드
- `drawDailyCard`: 오늘의 카드 1장

### Build Optimization

- **Vite 6** with esbuild minification
- **Gzip/Brotli compression** via vite-plugin-compression
- **Bundle analysis**: `pnpm build:web` generates `stats.html`
- Initial JS: ~231KB (gzip: 76KB, brotli: 63KB)

### Key Integration Points

- `granite.config.ts`: Toss mini-app configuration (permissions: contacts, clipboard, photos)
- Environment variables in `.env`: `VITE_CONTACTS_MODULE_ID`, `VITE_REWARDED_AD_GROUP_ID`, `VITE_OG_IMAGE_URL`, `VITE_API_BASE`

### Unlock Mechanics

1. **Ad Unlock**: Watch rewarded ad → server records in `/api/rewards/earn` → unlocks detail page for today
2. **Viral Unlock**: Create invite → partner joins via deep link → both users see chemistry + unlock detail

## Deep Links

- Result page: `intoss://soul-lab/result`
- Chemistry page: `intoss://soul-lab/chemistry?partner=<userKey>`

## Testing Notes

- contactsViral requires mini-app approval (returns Internal Server Error if unapproved)
- Sandbox app may show blank contactsViral UI - test on real device via console QR
- For mobile testing, deploy API server externally (localhost won't work from device)

---

## Development Principles

| 섹션             | 핵심 원칙                                |
| ---------------- | ---------------------------------------- |
| 1. TDD           | 테스트 먼저 → Red/Green/Refactor 사이클  |
| 2. 외부 설정     | 수동 설정 필요 시 GitHub Issue 등록 필수 |
| 3. 디자인 시스템 | Clean Architecture, DI, Event-Driven     |
| 4. 커밋 메시지   | Conventional Commits, AI 언급 금지       |
| 5. 코드 스타일   | ESLint, Prettier, 단일 책임 원칙         |
| 6. 응답 원칙     | CTO 관점, 객관적, 근거 필수              |
| 7. PR 체크리스트 | 7개 항목 체크 후 머지                    |

## Response Guidelines

### CTO 관점

- 결정 중심 (옵션 나열 X)
- 트레이드오프/리스크/ROI 명시
- P0/P1/P2 우선순위
- 간결함

### 객관성

- 감정 배제
- 사실 기반
- 정량적 표현

### 근거 확보

- 공식 문서 참조
- 코드 라인 명시 (예: `file.ts:123`)
- 테스트 결과 포함
- 벤치마크 데이터

### 금지 표현

- ❌ "아마도...", "~일 것 같습니다"
- ❌ "보통은...", "일반적으로..."
- ❌ 출처 없는 주장

## Business Thinking

| 항목             | 내용                             |
| ---------------- | -------------------------------- |
| 소비자 중심 사고 | 리서치/피드백은 최종 사용자 관점 |
| 비즈니스 임팩트  | 수익/비용/시장 영향 고려         |
| 가치 전달        | 기술 ≠ 비즈니스 구분             |
| 시장 현실        | 이상 < 실용                      |

B2C/B2B/B2G 전 영역 적용.

---

## Reference Docs

심화 가이드는 `docs/` 폴더 참조:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - 전체 시스템 아키텍처, 성숙도 평가, 개선 로드맵
- [`docs/ENGINEERING.md`](docs/ENGINEERING.md) - 프론트엔드 번들링, 최적화, 성능
- [`docs/ROLES.md`](docs/ROLES.md) - 11개 전문가 역할별 체크리스트
