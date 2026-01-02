# Soul Lab 런칭 체크리스트

## 투자자 데모 준비 (D-Day)

### 1. 배포 환경 구축

#### Backend (Railway)

```bash
# 1. Railway CLI 설치 (이미 설치되어 있다면 스킵)
npm install -g @railway/cli

# 2. Railway 로그인
railway login

# 3. 프로젝트 생성 및 배포
cd server
railway init
railway up

# 4. 환경변수 설정 (Railway Dashboard에서)
# - OPENAI_API_KEY 또는 ANTHROPIC_API_KEY
# - ADMIN_PASSWORD
# - NODE_ENV=production
# - DATA_DIR=/app/data

# 5. Volume 연결 (Railway Dashboard)
# - Add Volume -> Mount: /app/data -> Size: 1GB
```

#### Frontend (Vercel)

```bash
# 1. Vercel CLI
npm i -g vercel

# 2. 배포
vercel --prod

# 3. 환경변수 (Vercel Dashboard)
# - VITE_API_BASE=https://your-railway-url.railway.app
```

---

### 2. 데모 데이터 준비

```bash
# 로컬에서 테스트 데이터 생성
npx tsx server/scripts/seed-demo-data.ts

# 생성되는 데이터:
# - 150명 사용자
# - 79건 구매 (약 120만원 매출)
# - DAU 성장 추세 (30일)
# - 66건 초대 (바이럴)
# - 80명 스트릭 (리텐션)
```

**Railway 서버에 데이터 업로드:**

```bash
# Railway shell 접속
railway shell

# 또는 scp로 업로드
scp -r server/data/* user@server:/app/data/
```

---

### 3. 환경변수 체크리스트

| 변수                | 위치    | 필수 | 설명                   |
| ------------------- | ------- | ---- | ---------------------- |
| `OPENAI_API_KEY`    | Railway | O    | GPT API 키             |
| `ANTHROPIC_API_KEY` | Railway | -    | Claude API 키 (택1)    |
| `ADMIN_PASSWORD`    | Railway | O    | 관리자 비밀번호 (8자+) |
| `NODE_ENV`          | Railway | O    | `production`           |
| `DATA_DIR`          | Railway | O    | `/app/data`            |
| `VITE_API_BASE`     | Vercel  | O    | Railway 서버 URL       |

---

### 4. 시연 시나리오

#### 시나리오 A: 사용자 플로우 (5분)

1. **랜딩** → "오늘의 운세 보기" 클릭
2. **약관 동의** → 생년월일 입력
3. **로딩** → 운세 분석 애니메이션
4. **결과** → 오늘의 기운 점수 + 한줄 운세
5. **잠금 해제** → "기운 모으기" 체험
6. **상세 보기** → 6가지 카테고리 운세

#### 시나리오 B: 바이럴 메커닉 (3분)

1. **초대 링크 생성** → 복사
2. **다른 기기에서 접속** → 케미스트리 매칭
3. **둘 다 상세 운세 잠금 해제** 확인

#### 시나리오 C: 수익화 (2분)

1. **복채 페이지** → 상품 확인
2. **AI 상담** → 복채 사용
3. **(선택) 결제 흐름** 시연

#### 시나리오 D: Admin 대시보드 (3분)

1. `/admin` 접속 → 비밀번호 입력
2. **KPI 확인** → DAU, 매출, 사용자 수
3. **차트** → 성장 추세 설명
4. **거래 내역** → 실시간 데이터

---

### 5. 데모 전 최종 점검

- [ ] Railway 서버 정상 작동 (`/health` 체크)
- [ ] Vercel 배포 정상
- [ ] API 연동 확인 (운세 생성 테스트)
- [ ] Admin 대시보드 로그인 가능
- [ ] 데모 데이터 로드됨
- [ ] 모바일 화면 확인 (반응형)
- [ ] AI 상담 동작 확인 (OpenAI/Claude)

---

### 6. 백업 플랜

**인터넷 끊길 경우:**

- 로컬 개발 서버 사용 (`pnpm dev`)
- 녹화된 데모 영상 준비

**API 오류 시:**

- AI 응답 mock 데이터 준비
- 에러 메시지 사용자 친화적 확인

---

## 배포 명령어 요약

```bash
# Frontend (Vercel)
vercel --prod

# Backend (Railway)
cd server && railway up

# 데모 데이터 생성
npx tsx server/scripts/seed-demo-data.ts

# 로컬 테스트
pnpm dev:server  # 백엔드 (localhost:8787)
pnpm dev:web     # 프론트엔드 (localhost:5173)
```

---

## 중요 URL

| 서비스              | URL                                          |
| ------------------- | -------------------------------------------- |
| Production Frontend | `https://soul-lab.vercel.app` (예상)         |
| Production API      | `https://soul-lab-server.railway.app` (예상) |
| Admin Dashboard     | `/admin`                                     |
| Health Check        | `/health`                                    |

---

## 연락처

문제 발생 시 확인:

- Railway Status: https://status.railway.app
- Vercel Status: https://vercel.com/status
- OpenAI Status: https://status.openai.com
