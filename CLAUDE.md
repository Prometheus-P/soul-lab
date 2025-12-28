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
pnpm build:web         # TypeScript + Vite build
pnpm build:server      # Compile server TypeScript
pnpm lint              # ESLint
pnpm format            # Prettier
```

## Architecture

### Frontend (`src/`)
- **Pages**: Landing → Agreement → Loading → Result → Detail → Chemistry
- **Flow**: User agrees to terms → enters birthdate → sees fortune → unlocks detailed content via ads or viral sharing
- **Toss Integration** (`src/lib/toss.ts`): Wraps `@apps-in-toss/web-framework` for login, contactsViral, rewarded ads, sharing
- **Fortune Engine** (`src/utils/engine.ts`): Deterministic hash-based (FNV-1a) fortune generation from userKey + birthdate + date
- **Storage** (`src/lib/storage.ts`): localStorage for user state (seed, agreements, unlock status)

### Backend (`server/`)
- **Fastify API** at port 8787 with file-based persistence in `server/data/`
- **Invite System**: Create/join/reissue invites with 24h TTL for paired chemistry unlocks
- **Rate Limiting**: Fixed-window limits per IP and user key (configurable via env)
- **Reward Tracking**: Server-side record of rewarded ad completions (1 per user per day)

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

| 섹션 | 핵심 원칙 |
|------|----------|
| 1. TDD | 테스트 먼저 → Red/Green/Refactor 사이클 |
| 2. 외부 설정 | 수동 설정 필요 시 GitHub Issue 등록 필수 |
| 3. 디자인 시스템 | Clean Architecture, DI, Event-Driven |
| 4. 커밋 메시지 | Conventional Commits, AI 언급 금지 |
| 5. 코드 스타일 | gofmt, golangci-lint, 단일 책임 원칙 |
| 6. 응답 원칙 | CTO 관점, 객관적, 근거 필수 |
| 7. PR 체크리스트 | 7개 항목 체크 후 머지 |

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
- 코드 라인 명시 (예: `file.go:123`)
- 테스트 결과 포함
- 벤치마크 데이터

### 금지 표현
- ❌ "아마도...", "~일 것 같습니다"
- ❌ "보통은...", "일반적으로..."
- ❌ 출처 없는 주장

## Business Thinking

| 항목 | 내용 |
|------|------|
| 소비자 중심 사고 | 리서치/피드백은 최종 사용자 관점 |
| 비즈니스 임팩트 | 수익/비용/시장 영향 고려 |
| 가치 전달 | 기술 ≠ 비즈니스 구분 |
| 시장 현실 | 이상 < 실용 |

B2C/B2B/B2G 전 영역 적용.
