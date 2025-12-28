# Soul Lab (소울 랩)

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./package.json)

> **⚠️ PROPRIETARY SOFTWARE** - 이 프로젝트는 비공개 비즈니스 프로젝트입니다. 무단 복제, 배포, 사용을 금합니다.

Toss WebView 기반 운세/궁합 분석 미니앱

---

## 빠른 시작
```bash
pnpm install
# 로컬 브라우저 확인(기본 UI만): 
pnpm dev:web

# Toss Sandbox에서 확인(권장): 
pnpm dev
# 샌드박스 앱에서 intoss://soul-lab 입력
```

> `pnpm dev`는 `granite dev`를 실행합니다. 환경/버전에 따라 `granite` 바이너리가 없으면 `pnpm install`을 다시 실행하세요.

## 1) 콘솔에서 반드시 채울 값 (.env)
- `VITE_CONTACTS_MODULE_ID`: contactsViral 공유 리워드 모듈 ID
- `VITE_REWARDED_AD_GROUP_ID`: 보상형 광고 그룹 ID
- `VITE_OG_IMAGE_URL`: 공유 OG 이미지

`.env.example` 참고.

## 2) 딥링크
- 결과 페이지: `intoss://soul-lab/result`
- 궁합 페이지: `intoss://soul-lab/chemistry?partner=<userKey>`

## 3) 중요한 현실
- contactsViral은 **미니앱 승인**이 필요합니다(미승인 시 Internal Server Error).
- 샌드박스 앱에서는 contactsViral이 빈 화면처럼 보일 수 있어요. 콘솔 QR로 실기기 테스트 권장.
- 보상형 광고도 테스트 ID/그룹 ID를 콘솔에서 받아야 합니다.

## 4) 폴더 구조
- `src/pages/*` : Landing / Loading / Result / Detail / Chemistry
- `src/lib/*` : seed/리포트 생성/토스 브릿지 래퍼
- `src/components/*` : 잠금(블러) / 배지 스텝 / 광고 버튼 등



## 5) 인질형 바이럴(양쪽 동시 잠금해제) API 실행
```bash
pnpm dev:server
# http://localhost:8787/health
```

그리고 `.env`에 API 베이스를 넣어야 합니다:
```bash
VITE_API_BASE=http://localhost:8787
```

> Toss Sandbox/실기기에서 테스트할 때는 `localhost`가 기기 자신을 가리킬 수 있습니다.  
> 이 경우 API 서버를 외부에서 접근 가능한 도메인(예: Cloudflare/Fly.io 등)에 올리고 `VITE_API_BASE`를 그 주소로 바꾸세요.



## v0.3 (심사 안정/어뷰징 방어)
- Invite TTL: **24시간**
- paired 이후 outsider 접근: **403 used로 차단**
- 초대 재발급: inviter만 가능 (`POST /api/invites/:id/reissue`)
- contactsViral 링크 자동 삽입 불가 대응:
  - `share()` 우선 → 실패하면 **클립보드 복사** fallback



## v0.4 (심사 방어: 로그/레이트리밋/보상형 1일1회 서버기록)
- 서버 이벤트 로그(JSONL): `server/data/events.jsonl`
- 초대 생성 레이트리밋(기본): IP 40회/시간, 유저키 20회/시간
- 보상형 광고 Earn 서버기록: `POST /api/rewards/earn` (유저키+dateKey 기준 1일 1회)
- 광고 실패 시 자동 해제(Fallback) **삭제**: 이제는 정상 보상 이벤트 + 서버 기록이 있어야 해제



## v0.5 (PRD 1.0 Alchemy 반영)
- Deterministic Fortune Engine: `src/utils/engine.ts`
- Static Templates(50): `src/data/fortuneTemplates.ts`
- Agreement Soft-Gate: `/agreement` (필수 약관/제3자 제공 + 생년월일 입력)
- Viral Unlock: 궁합 paired 성공 시 `viralUnlockedDate=todayKey()` 저장 → 오늘 잠금 해제

## v0.7 (심사 리스크 방어 강화)
- Agreement: 약관(필수) / 제3자 제공(선택) / 마케팅(선택) + 생년월일 입력
- 개인 분석은 약관만으로 가능, 친구 초대는 제3자 동의 후 활성화
- contactsViral UX: 링크 먼저 복사 → 연락처 UI → 붙여넣기(안전 패턴)
- 문서: `docs/TOSS_VIRAL_NOTES.md`

## v0.8 (루프 최적화)
- Loading(3초 의식) 동안 보상형 광고 Preload
- contactsViral 콜백/클린업 오류 수정(재귀 제거)
- 초대 링크 → Chemistry 대기 화면으로 정확히 이동(sig 포함)
- Chemistry(초대 대기)에서 초대 링크 재복사/공유 버튼 추가
- 상태 카드(잠김/해제)로 “다음 행동”을 강제

## v1.0 (패키징: 템플릿 확장 + 퍼널 로그)
- FortuneTemplates 50 → 200 확장(클라 내장, 서버 0)
- 퍼널 이벤트 로깅(로컬) + `/debug` 페이지
- DetailPage: 오늘 언락(광고/궁합) 없으면 잠금 유지
- 핵심 이벤트 목록: docs/FUNNEL_EVENTS.md
