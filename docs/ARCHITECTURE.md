# Soul Lab 아키텍처 문서

> 최종 업데이트: 2026-01-02
> 아키텍처 성숙도: **7.6/10 (B+)** - 프로덕션 준비 단계

---

## 1. 시스템 개요

### 1.1 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│   │   Toss App   │    │   Mobile     │    │   Desktop    │              │
│   │   WebView    │    │   Browser    │    │   Browser    │              │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘              │
│          │                   │                   │                       │
│          └───────────────────┼───────────────────┘                       │
│                              ▼                                           │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                     REACT SPA (Vite 6)                          │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│   │  │ Landing │ │Agreement│ │ Result  │ │ Detail  │ │Chemistry│   │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐               │   │
│   │  │  Tarot  │ │ Credits │ │ Consult │ │  Admin  │               │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘               │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
└──────────────────────────────┼───────────────────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    FASTIFY SERVER (Port 8787)                    │   │
│   │                                                                  │   │
│   │  ┌────────────────────────────────────────────────────────────┐ │   │
│   │  │                      MIDDLEWARE                             │ │   │
│   │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │ │   │
│   │  │  │   CORS   │ │  Helmet  │ │Rate Limit│ │   Auth   │      │ │   │
│   │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │ │   │
│   │  └────────────────────────────────────────────────────────────┘ │   │
│   │                                                                  │   │
│   │  ┌────────────────────────────────────────────────────────────┐ │   │
│   │  │                        ROUTES                               │ │   │
│   │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │ │   │
│   │  │  │  Auth  │ │Credits │ │Fortune │ │ Invite │ │ Admin  │  │ │   │
│   │  │  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │ │   │
│   │  └────────────────────────────────────────────────────────────┘ │   │
│   │                                                                  │   │
│   │  ┌────────────────────────────────────────────────────────────┐ │   │
│   │  │                       SERVICES                              │ │   │
│   │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │ │   │
│   │  │  │  Tarot   │ │Astrology │ │    AI    │ │  Credit  │      │ │   │
│   │  │  │  Engine  │ │Calculator│ │ Provider │ │  Store   │      │ │   │
│   │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │ │   │
│   │  └────────────────────────────────────────────────────────────┘ │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
└──────────────────────────────┼───────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│   │      Redis       │    │   File Storage   │    │   External APIs  │  │
│   │                  │    │                  │    │                  │  │
│   │  - Invites (TTL) │    │  - Balances.json │    │  - OpenAI        │  │
│   │  - Rewards       │    │  - Transactions  │    │  - Anthropic     │  │
│   │  - Rate Limits   │    │  - Purchases     │    │  - Toss Payments │  │
│   │  - Sessions      │    │  - Referrals     │    │                  │  │
│   └──────────────────┘    └──────────────────┘    └──────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 기술 스택

| 레이어           | 기술               | 버전               |
| ---------------- | ------------------ | ------------------ |
| **Frontend**     | React + TypeScript | 19.1 + 5.8         |
| **Build**        | Vite               | 6.3                |
| **Backend**      | Fastify            | 5.6                |
| **Runtime**      | Node.js            | 20 LTS             |
| **Cache**        | Redis              | 7.x                |
| **AI**           | OpenAI / Anthropic | GPT-4o, Claude 3.5 |
| **Hosting (FE)** | Cloudflare Pages   | -                  |
| **Hosting (BE)** | Railway            | -                  |
| **CI/CD**        | GitHub Actions     | -                  |

---

## 2. 프론트엔드 아키텍처

### 2.1 디렉토리 구조

```
src/
├── pages/              # 13개 라우트 페이지 (lazy-loaded)
│   ├── LandingPage.tsx
│   ├── AgreementPage.tsx
│   ├── LoadingPage.tsx
│   ├── ResultPage.tsx
│   ├── DetailPage.tsx
│   ├── ChemistryPage.tsx
│   ├── TarotPage.tsx
│   ├── CreditsPage.tsx
│   ├── ConsultPage.tsx
│   ├── AdminPage.tsx
│   ├── LeaderboardPage.tsx
│   ├── NotFoundPage.tsx
│   └── DebugPage.tsx
│
├── components/         # 23개 재사용 컴포넌트
│   ├── form/          # 폼 컴포넌트 (5개)
│   │   ├── FormInput.tsx
│   │   ├── FormTextarea.tsx
│   │   ├── FormSelect.tsx
│   │   ├── FormSegmentedControl.tsx
│   │   └── FormCheckbox.tsx
│   ├── Header.tsx
│   ├── Toast.tsx
│   ├── ErrorBoundary.tsx
│   ├── BirthDatePicker.tsx
│   ├── AdRewardButton.tsx
│   └── ...
│
├── lib/               # 46개 유틸리티 & API 클라이언트
│   ├── storage.ts     # localStorage 래퍼
│   ├── api.ts         # API 클라이언트 (세션 토큰)
│   ├── iap.ts         # 인앱결제 로직
│   ├── toss.ts        # Toss SDK 래퍼
│   ├── analytics.ts   # 이벤트 트래킹
│   └── ...
│
├── utils/             # 핵심 계산 엔진
│   ├── engine.ts      # 운세 엔진 (FNV-1a 해시)
│   ├── refineOutput.ts # 텍스트 후처리
│   └── seed.ts        # 시드 생성
│
├── hooks/             # 커스텀 훅
│   ├── useUnlockLogic.ts  # 언락 상태 관리
│   └── useFocusTrap.ts    # 접근성 포커스 트랩
│
├── data/              # 정적 데이터 (YAML → TS)
│   ├── fortuneTemplates.ts
│   ├── tarotCards.ts
│   └── empathyParts.ts
│
└── mocks/             # Toss SDK 목업 (브라우저용)
```

### 2.2 상태 관리 패턴

```
┌─────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐    ┌──────────────────┐               │
│  │   localStorage   │    │   React State    │               │
│  │                  │    │                  │               │
│  │  - user_seed     │    │  - UI state      │               │
│  │  - birthdate     │    │  - form inputs   │               │
│  │  - unlockedToday │    │  - loading flags │               │
│  │  - agreements    │    │  - modal states  │               │
│  │  - attribution   │    │                  │               │
│  └────────┬─────────┘    └────────┬─────────┘               │
│           │                       │                          │
│           └───────────┬───────────┘                          │
│                       ▼                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              useUnlockLogic() Hook                    │   │
│  │                                                       │   │
│  │  Returns:                                             │   │
│  │  - UnlockState: { isLocked, adUnlocked, ... }        │   │
│  │  - UnlockActions: { unlock, onShare, ... }           │   │
│  │  - ReportData: { fortune, empathy, ... }             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              ToastContext (Global)                    │   │
│  │                                                       │   │
│  │  - toast(message, type)                               │   │
│  │  - useToast() hook                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 코드 스플리팅 전략

| 청크              | 내용                  | 크기 (gzip) |
| ----------------- | --------------------- | ----------- |
| `vendor-react`    | React, Router         | ~50KB       |
| `vendor-lunar`    | korean-lunar-calendar | ~4KB        |
| `fortune-data`    | 운세 템플릿           | ~80KB       |
| `tarot-data`      | 타로 카드 데이터      | ~9KB        |
| `empathy-data`    | 공감 파트             | ~9KB        |
| `core-utils`      | 시드, 분석, 귀속      | ~2KB        |
| `reward-utils`    | 보상, 스트릭          | ~2KB        |
| 페이지 청크 (9개) | Lazy-loaded pages     | 각 2-15KB   |

**총 번들 크기**: ~231KB → **76KB gzip** (67% 압축률)

---

## 3. 백엔드 아키텍처

### 3.1 API 설계

```
/api
├── /auth
│   ├── POST /session          # 세션 토큰 발급
│   └── POST /verify           # 서명 검증
│
├── /credits
│   ├── GET  /balance          # 잔액 조회
│   ├── POST /use              # 복채 사용
│   ├── POST /purchase/start   # IAP 시작
│   ├── POST /purchase/complete # IAP 완료
│   ├── GET  /transactions     # 거래 내역
│   ├── POST /referral/claim   # 레퍼럴 보상
│   └── POST /streak/claim     # 스트릭 보상
│
├── /fortune
│   ├── GET  /daily            # 오늘의 운세
│   ├── POST /tarot/draw       # 타로 카드 뽑기
│   └── POST /tarot/interpret  # AI 타로 해석
│
├── /invites
│   ├── POST /                 # 초대 생성
│   ├── GET  /:id              # 초대 조회
│   └── POST /:id/join         # 초대 수락
│
├── /rewards
│   ├── GET  /check            # 보상 확인
│   └── POST /earn             # 보상 획득
│
└── /admin
    ├── GET  /stats            # 통계
    └── GET  /users            # 사용자 목록
```

### 3.2 인증 시스템

```
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  1. JWT Session Token                 │   │
│  │                                                       │   │
│  │   Client ──POST /auth/session──> Server               │   │
│  │          <──{ token, expiresAt }──                    │   │
│  │                                                       │   │
│  │   Client ──X-Session-Token: xxx──> Protected API     │   │
│  │                                                       │   │
│  │   Token Refresh: 만료 60초 전 자동 갱신               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  2. HMAC Signature                    │   │
│  │                                                       │   │
│  │   Headers:                                            │   │
│  │   - X-User-Key: user123                               │   │
│  │   - X-Timestamp: 1704153600                           │   │
│  │   - X-Signature: HMAC-SHA256(userKey|timestamp)       │   │
│  │                                                       │   │
│  │   Validation:                                         │   │
│  │   - Timestamp within 5 minutes                        │   │
│  │   - Signature matches                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 복채 시스템

**상품 구성**:

| 상품       | 복채 | 가격     | 보너스 |
| ---------- | ---- | -------- | ------ |
| credit_10  | 10   | 1,000원  | -      |
| credit_50  | 55   | 4,500원  | +5     |
| credit_150 | 170  | 12,000원 | +20    |
| credit_500 | 600  | 35,000원 | +100   |

**복채 비용**:

| 기능        | 비용 |
| ----------- | ---- |
| 오늘의 운세 | 1    |
| AI 채팅     | 1    |
| 타로 해석   | 2    |
| 궁합 분석   | 3    |
| 상세 리포트 | 5    |

**데이터 저장**:

```
server/data/
├── credit_balances.json      # 잔액
├── credit_transactions.json  # 거래 내역 (최근 10K)
├── credit_purchases.json     # 구매 기록
├── credit_referrals.json     # 레퍼럴 기록
└── credit_streak_rewards.json # 스트릭 보상
```

### 3.4 AI 통합

**모델 티어**:

| 티어     | 모델        | 용도      | 비용     |
| -------- | ----------- | --------- | -------- |
| mini     | GPT-4o-mini | 기본 운세 | $0.15/1M |
| standard | Claude 3.5  | AI 상담   | $3/1M    |
| premium  | GPT-4o      | 심층 해석 | $5/1M    |

**페르소나**: Luna (신비로운 점술사, 20년 경력)

---

## 4. 데이터 흐름

### 4.1 사용자 여정

```
Landing → Agreement → Loading → Result → Detail
   │          │                    │        │
   │          ▼                    ▼        ▼
   │     birthdate 저장      운세 생성   콘텐츠 잠금
   │                              │        │
   │                              ▼        ▼
   │                         [광고 시청] or [친구 초대]
   │                              │        │
   │                              ▼        ▼
   │                         언락 → 상세 콘텐츠
   │                              │
   ├──────────────────────────────┤
   ▼                              ▼
Chemistry (궁합)              Tarot (타로)
   │                              │
   ▼                              ▼
Credits (복채) ←────────── Consult (AI 상담)
```

### 4.2 운세 생성 흐름

```
Input: userKey + birthDate + targetDate
            │
            ▼
     ┌──────────────┐
     │   FNV-1a     │ ← 결정론적 해시
     │    Hash      │
     └──────┬───────┘
            │
            ▼
     ┌──────────────┐
     │   Seed       │ ← 0-999 범위
     │  Generation  │
     └──────┬───────┘
            │
            ▼
     ┌──────────────┐
     │   Template   │ ← 운세 템플릿 선택
     │   Selection  │
     └──────┬───────┘
            │
            ▼
     ┌──────────────┐
     │   Empathy    │ ← 공감 파트 오버레이
     │   Overlay    │
     └──────┬───────┘
            │
            ▼
     ┌──────────────┐
     │ refineOutput │ ← 텍스트 후처리
     │    (v8)      │
     └──────┬───────┘
            │
            ▼
       Final Output
```

---

## 5. 인프라

### 5.1 배포 구조

```
┌─────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GitHub Repository (x-ordo/soul-lab)                        │
│         │                                                    │
│         ├──── push to main ────┐                            │
│         │                      │                            │
│         ▼                      ▼                            │
│  ┌─────────────────┐   ┌─────────────────┐                 │
│  │ GitHub Actions  │   │ GitHub Actions  │                 │
│  │ (deploy.yml)    │   │ (deploy-server) │                 │
│  └────────┬────────┘   └────────┬────────┘                 │
│           │                     │                           │
│           ▼                     ▼                           │
│  ┌─────────────────┐   ┌─────────────────┐                 │
│  │ Cloudflare      │   │    Railway      │                 │
│  │ Pages           │   │                 │                 │
│  │                 │   │  - Nixpacks     │                 │
│  │ - Static SPA    │   │  - Health check │                 │
│  │ - Edge CDN      │   │  - Auto restart │                 │
│  │ - Brotli/Gzip   │   │  - Volume mount │                 │
│  └─────────────────┘   └─────────────────┘                 │
│           │                     │                           │
│           ▼                     ▼                           │
│  soul-lab.pages.dev    soul-lab-server.railway.app         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 CI/CD 파이프라인

```yaml
# .github/workflows/ci.yml
Jobs: install → lint ─┬─ test
  ├─ a11y (WCAG 2.2)
  ├─ security audit
  └─ build
```

**품질 게이트**:

- ESLint (react-hooks, react-refresh)
- Vitest (frontend + backend)
- vitest-axe (접근성)
- pnpm audit (보안)
- TypeScript strict mode

---

## 6. 보안

### 6.1 인증/인가

| 메커니즘      | 용도                | 보호 수준 |
| ------------- | ------------------- | --------- |
| JWT 세션 토큰 | 프론트엔드 API 호출 | ★★★☆☆     |
| HMAC 서명     | 서버-서버 통신      | ★★★★☆     |
| Rate Limiting | DoS 방지            | ★★★★☆     |

### 6.2 Rate Limiting

| 엔드포인트 | IP 제한 | 사용자 제한 |
| ---------- | ------- | ----------- |
| /invites   | 40/시간 | 20/시간     |
| /rewards   | 60/10분 | 20/10분     |

### 6.3 데이터 보호

- **암호화 옵션**: AES-256 (DATA_ENCRYPTION_KEY)
- **Atomic Write**: 부분 저장 방지
- **스키마 버전**: 마이그레이션 지원
- **PII 최소화**: birthdate만 저장

---

## 7. 성숙도 평가

### 7.1 점수표

| 영역          | 점수       | 등급   | 상태          |
| ------------- | ---------- | ------ | ------------- |
| 코드 스플리팅 | 9/10       | A      | 우수          |
| 상태 관리     | 7/10       | B+     | 분산됨        |
| API 설계      | 8/10       | A-     | 표준화됨      |
| 인증          | 8/10       | A-     | 이중 인증     |
| 테스팅        | 6/10       | B-     | 커버리지 부족 |
| 접근성        | 9/10       | A      | WCAG AA       |
| 문서화        | 9/10       | A      | 상세함        |
| CI/CD         | 7/10       | B+     | 백엔드 수동   |
| 모니터링      | 2/10       | D      | 미구축        |
| **전체**      | **7.6/10** | **B+** | -             |

### 7.2 개선 로드맵

**즉시 (P0)**:

1. 백엔드 자동 배포
2. 분산 락 구현
3. IAP 검증 강화

**1-2주 (P1)**:

1. lib/ 도메인 분리
2. 테스트 커버리지 임계값
3. Pre-commit hooks

**2-4주 (P2)**:

1. 모니터링 시스템
2. Staging 환경
3. 운영 문서

---

## 부록

### A. 환경 변수

**Frontend** (.env):

```
VITE_API_BASE=https://soul-lab-server.railway.app
VITE_REWARDED_AD_GROUP_ID=xxx
VITE_CONTACTS_MODULE_ID=xxx
```

**Backend** (Railway):

```
NODE_ENV=production
PORT=8787
REDIS_URL=redis://...
JWT_SECRET=xxx
SIGNING_SECRET=xxx
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

### B. 관련 문서

- [CLAUDE.md](../CLAUDE.md) - 프로젝트 개요
- [ENGINEERING.md](./ENGINEERING.md) - 엔지니어링 가이드
- [BUNDLING.md](./BUNDLING.md) - 번들링 아키텍처
- [AUDIT.md](./AUDIT.md) - 테스트 & 감사
