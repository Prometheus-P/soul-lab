# Role-Based Engineering Principles

11개 전문가 역할의 관점에서 소프트웨어 프로젝트를 검토하고 개선하기 위한 원칙을 제공한다.

---

## 1. Architect Principles

**Architecture Decision Records (ADR):**
모든 중요한 아키텍처 결정은 문서화되어야 한다.

```markdown
# ADR-001: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[결정이 필요한 배경과 제약 조건]

## Decision
[선택한 결정과 이유]

## Consequences
[결정으로 인한 긍정적/부정적 영향]
```

**Technical Debt Management:**
| 지표 | 목표 | 설명 |
|------|------|------|
| TDR (Technical Debt Ratio) | ≤ 5% | 기술 부채 / 전체 개발 비용 |
| 스프린트 할당 | 20% | 기술 부채 해소에 할당하는 용량 |
| 부채 분류 | 4분면 | Deliberate/Inadvertent × Prudent/Reckless |

**Scalability Design:**
| 전략 | 적용 시점 |
|------|----------|
| Vertical Scaling | 초기 단계, 단순한 확장 필요 시 |
| Horizontal Scaling | 트래픽 예측 불가, 고가용성 필요 시 |
| Database Sharding | 단일 DB 한계 도달 시 |

**Security by Design (OWASP 9원칙):**
1. Attack Surface 최소화
2. Secure Defaults 설정
3. Least Privilege 원칙
4. Defense in Depth
5. Fail Securely
6. Don't Trust Services
7. Separation of Duties
8. Avoid Security by Obscurity
9. Keep Security Simple

**Architect Checklist:**
- [ ] ADR 템플릿 존재 및 활용
- [ ] NFR(비기능 요구사항) 문서화
- [ ] 확장성 전략 정의
- [ ] 보안 아키텍처 리뷰 완료
- [ ] Bounded Context 정의 (DDD)

---

## 2. Senior Developer Principles

**Code Review Best Practices:**
| 항목 | 권장 값 |
|------|---------|
| PR 크기 | ≤ 400줄 |
| 리뷰 속도 | 300-500 lines/hour |
| 리뷰 항목 | 로직, 보안, 성능, 가독성, 테스트 |

**Boy Scout Rule:**
> "Always leave the code better than you found it."

- 작은 개선을 지속적으로 적용
- 단, 현재 PR 범위를 벗어나는 리팩토링은 별도 이슈로 분리

**RIIFD Debugging Framework:**
```
1. Reproduce  → 문제를 일관되게 재현
2. Isolate    → 원인 범위를 좁혀 격리
3. Identify   → 근본 원인(Root Cause) 파악
4. Fix        → 수정 적용 및 검증
5. Document   → 해결 과정과 교훈 기록
```

**Estimation (Cone of Uncertainty):**
| 프로젝트 단계 | 추정 오차 범위 |
|-------------|--------------|
| 초기 아이디어 | 4x ~ 0.25x |
| 요구사항 정의 | 2x ~ 0.5x |
| 설계 완료 | 1.25x ~ 0.8x |

**Developer Checklist:**
- [ ] PR 크기 400줄 이하 유지
- [ ] 의미 있는 커밋 메시지 (Conventional Commits)
- [ ] 테스트 커버리지 확인
- [ ] 기술 부채 발생 시 TODO/FIXME 태그 추가

---

## 3. Senior PM Principles

**Scope Management (Triple Constraint):**
```
        Scope
         /\
        /  \
       /    \
      /______\
   Time      Cost
```
- 하나를 변경하면 다른 요소에 영향
- 변경 요청은 Impact Analysis 후 승인

**Risk Management Matrix:**
| 영향\확률 | Low | Medium | High |
|----------|-----|--------|------|
| High | 모니터링 | 완화 계획 | 즉시 대응 |
| Medium | 수용 | 모니터링 | 완화 계획 |
| Low | 수용 | 수용 | 모니터링 |

**RACI Matrix:**
| 역할 | 설명 |
|------|------|
| **R**esponsible | 실제 수행자 |
| **A**ccountable | 최종 책임자 (한 명만) |
| **C**onsulted | 자문 제공자 (양방향 소통) |
| **I**nformed | 결과 통보 대상 (단방향 소통) |

**PM Checklist:**
- [ ] 프로젝트 헌장(Charter) 작성
- [ ] WBS(Work Breakdown Structure) 정의
- [ ] 리스크 레지스터 유지
- [ ] 주간 상태 보고 수행
- [ ] RACI 매트릭스 정의

---

## 4. Senior BA Principles

**Requirements Elicitation Techniques:**
| 기법 | 적합한 상황 |
|------|-----------|
| 인터뷰 | 심층 이해 필요 시 |
| 워크샵 | 다수 이해관계자 합의 필요 시 |
| 관찰 | 현행 프로세스 이해 시 |
| 프로토타이핑 | 시각화 필요 시 |
| 설문조사 | 대규모 정량 데이터 필요 시 |

**User Story (INVEST 원칙):**
| 원칙 | 설명 |
|------|------|
| **I**ndependent | 다른 스토리와 독립적 |
| **N**egotiable | 협상 가능 (계약이 아님) |
| **V**aluable | 사용자에게 가치 제공 |
| **E**stimable | 추정 가능한 크기 |
| **S**mall | 한 스프린트 내 완료 가능 |
| **T**estable | 인수 조건으로 테스트 가능 |

**형식:** `As a [role], I want [feature], so that [benefit].`

**Gap Analysis:**
```
As-Is → To-Be → Gap 식별 → Action Plan
```

**BA Checklist:**
- [ ] 요구사항 추적 매트릭스(RTM) 유지
- [ ] 모든 User Story에 인수 조건 포함
- [ ] 비기능 요구사항 명시
- [ ] 이해관계자 승인 획득
- [ ] BRD/FRD/SRS 문서화

---

## 5. Senior QA Principles

**Test Pyramid:**
```
        /\
       /  \     E2E Tests (10%)
      /----\
     /      \   Integration Tests (20%)
    /--------\
   /          \ Unit Tests (70%)
  /------------\
```

**Risk-Based Testing:**
```
우선순위 = 비즈니스 영향도 × 실패 확률
```
- High Risk → 철저한 테스트
- Low Risk → Smoke Test 수준

**Test Automation ROI:**
```
ROI = (수동 테스트 비용 × 실행 횟수 - 자동화 비용) / 자동화 비용
```
- 3회 이상 실행 예상 시 자동화 고려
- 자주 변경되는 UI는 자동화 ROI 낮음

**Quality Metrics:**
| 지표 | 공식 | 목표 |
|------|------|------|
| Defect Density | 결함 수 / KLOC | 낮을수록 좋음 |
| Escape Rate | 프로덕션 결함 / 전체 결함 | < 10% |
| Test Coverage | 테스트된 코드 / 전체 코드 | > 80% |

**Bug Report Template:**
```markdown
**Title:** [간결한 문제 설명]
**Environment:** [OS, Browser, Version]
**Steps to Reproduce:**
1. ...
2. ...
**Expected:** [기대 결과]
**Actual:** [실제 결과]
**Severity:** [Critical/Major/Minor/Trivial]
**Attachments:** [스크린샷, 로그]
```

**QA Checklist:**
- [ ] 테스트 전략 문서 작성
- [ ] 테스트 케이스 리뷰 완료
- [ ] 자동화 테스트 CI/CD 통합
- [ ] 회귀 테스트 스위트 유지
- [ ] Shift-Left Testing 적용

---

## 6. UI Expert Principles

**Visual Hierarchy:**
- F-Pattern / Z-Pattern 레이아웃 활용
- 8pt Grid System 적용
- 타이포그래피 스케일: 1.25 또는 1.333 비율

**Design Token System:**
```typescript
// tokens.ts
export const tokens = {
  colors: {
    primary: { 50: '#f0f9ff', 500: '#0ea5e9', 900: '#0c4a6e' },
    // ...
  },
  spacing: { 1: '4px', 2: '8px', 4: '16px', 8: '32px' },
  typography: { xs: '12px', sm: '14px', base: '16px', lg: '18px' },
};
```

**WCAG 2.2 접근성:**
| 원칙 | 핵심 요구사항 |
|------|-------------|
| Perceivable | 명암비 4.5:1 이상, alt 텍스트 |
| Operable | 키보드 네비게이션, 충분한 시간 |
| Understandable | 일관된 네비게이션, 오류 방지 |
| Robust | 보조 기술 호환성 |

**Responsive Breakpoints (Mobile First):**
```css
/* Base: Mobile (< 640px) */
@media (min-width: 640px) { /* sm: Tablet */ }
@media (min-width: 1024px) { /* lg: Desktop */ }
@media (min-width: 1280px) { /* xl: Large Desktop */ }
```

**Atomic Design:**
```
Atoms → Molecules → Organisms → Templates → Pages
```

**UI Checklist:**
- [ ] 색상 명암비 검증 (WCAG AA 이상)
- [ ] 키보드 네비게이션 테스트
- [ ] 반응형 디자인 검증 (3개 이상 뷰포트)
- [ ] 모든 상태 디자인 (default, hover, active, disabled, error, loading, empty)

---

## 7. UX Expert Principles

**User-Centered Design (UCD) Process:**
```
Research → Design → Evaluate → Iterate
   ↑_____________________________|
```

**Nielsen's 10 Usability Heuristics:**
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize and recover from errors
10. Help and documentation

**Information Architecture:**
| 기법 | 목적 |
|------|------|
| Card Sorting | 콘텐츠 분류 검증 |
| Tree Testing | 네비게이션 구조 검증 |
| 3-Click Rule | 3번 클릭 내 목표 도달 |

**User Journey Mapping:**
```
[인지] → [고려] → [결정] → [구매] → [사용] → [추천]
   ↓        ↓        ↓        ↓        ↓        ↓
  감정 / 행동 / 접점 / Pain Point / Opportunity
```

**A/B Testing 원칙:**
- 한 번에 하나의 변수만 테스트
- 통계적 유의성 확보 (p < 0.05)
- 최소 샘플 크기 계산 후 실행

**UX Checklist:**
- [ ] 사용자 페르소나 정의
- [ ] 핵심 User Flow 문서화
- [ ] 사용성 테스트 수행 (5명 이상)
- [ ] 접근성 심사 통과
- [ ] Journey Map 작성

---

## 8. Senior Designer Principles

**Design System Governance:**
- Contribution 가이드라인 수립
- 버전 관리 및 Changelog 유지
- 정기적 Audit (분기별)

**Design-Dev Handoff:**
| 도구 | 용도 |
|------|------|
| Figma Dev Mode | 스펙 추출, 코드 스니펫 |
| Storybook | 컴포넌트 문서화, 시각적 테스트 |
| Design Token | 디자인-코드 동기화 |

**Handoff 필수 포함 사항:**
- 모든 상태 디자인 (default, hover, active, disabled, error)
- 반응형 뷰 제공
- 애니메이션 스펙 (duration, easing)
- 에셋 내보내기 (@1x, @2x, @3x 또는 SVG)

**Design Critique Framework:**
```
1. 맥락 설명 (목표, 제약)
2. 구체적 피드백 요청
3. 건설적 비판 (문제 + 제안)
4. 결정 사항 문서화
```

**Designer Checklist:**
- [ ] 디자인 시스템 문서 최신화
- [ ] 컴포넌트 네이밍 규칙 준수
- [ ] 다크모드/라이트모드 지원
- [ ] 디자인 QA 수행
- [ ] 브랜드 가이드라인 준수

---

## 9. Senior Backend Principles

**API Style 선택 기준:**
| 스타일 | 적합한 경우 |
|--------|-----------|
| REST | 표준 CRUD, 캐싱 중요, 브라우저 직접 호출 |
| GraphQL | 복잡한 관계, 클라이언트 유연성, Over-fetching 방지 |
| gRPC | 마이크로서비스 간 통신, 고성능, 스트리밍 |

**REST API Best Practices:**
```
✅ DO:
- 명사형 리소스 URL (/users, /orders)
- HTTP 메서드 활용 (GET, POST, PUT, DELETE)
- 적절한 상태 코드 (200, 201, 400, 404, 500)
- API 버저닝 (/v1/users)

❌ DON'T:
- 동사형 URL (/getUsers, /createOrder)
- 모든 응답에 200 OK
- 버저닝 없는 Breaking Change
```

**Database Design:**
| 원칙 | 설명 |
|------|------|
| 정규화 | 3NF까지 적용 후 필요시 비정규화 |
| 인덱싱 | WHERE, JOIN, ORDER BY 컬럼 |
| N+1 방지 | JOIN 또는 Eager Loading 사용 |

**Caching Strategy:**
| 패턴 | 사용 시점 |
|------|----------|
| Cache-Aside | 읽기 많은 워크로드 |
| Write-Through | 데이터 일관성 중요 |
| Write-Behind | 쓰기 성능 중요 |

**Resilience Patterns:**
```
┌──────────────────────────────────────────┐
│ Circuit Breaker: 연속 실패 시 요청 차단   │
│ Retry: 일시적 실패 시 재시도 (지수 백오프) │
│ Fallback: 실패 시 대안 응답 제공          │
│ Bulkhead: 장애 격리 (리소스 분리)         │
│ Timeout: 무한 대기 방지                  │
└──────────────────────────────────────────┘
```

**Backend Checklist:**
- [ ] API 문서화 (OpenAPI/Swagger)
- [ ] 인덱스 최적화 검토
- [ ] N+1 쿼리 검출 및 수정
- [ ] 서킷 브레이커 적용
- [ ] 헬스 체크 엔드포인트 제공 (/health)

---

## 10. Security Expert Principles

**OWASP Top 10 2025:**
1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Data Integrity Failures
9. Logging & Monitoring Failures
10. SSRF (Server-Side Request Forgery)

**Authentication 방식 선택:**
| 방식 | 사용 시점 |
|------|----------|
| OAuth 2.0 + OIDC | 외부 IdP 연동 (Google, GitHub) |
| JWT | 무상태 인증, API 서버 |
| Session | 서버 사이드 상태 관리 |
| PKCE | 모바일/SPA OAuth 보안 강화 |

**JWT Security Best Practices:**
```
✅ DO:
- 짧은 만료 시간 (15분 권장)
- Refresh Token Rotation
- RS256 (비대칭키) 사용
- HttpOnly, Secure 쿠키 저장

❌ DON'T:
- 민감 정보 페이로드에 포함
- localStorage 저장
- HS256 (대칭키) 프로덕션 사용
- 긴 만료 시간 (> 1시간)
```

**Input Validation & Output Encoding:**
```
Input → Validation → Sanitization → Parameterized Query → Output Encoding
```
- 화이트리스트 기반 검증
- 서버 사이드 필수 검증
- SQL Injection: Parameterized Query 사용
- XSS: Output Encoding, CSP 헤더

**Security Testing:**
| 유형 | 도구 예시 | 시점 |
|------|----------|------|
| SAST | SonarQube, Semgrep | 개발 중 |
| DAST | OWASP ZAP, Burp Suite | 배포 전 |
| SCA | Snyk, Dependabot | CI/CD |

**Encryption:**
| 용도 | 권장 알고리즘 |
|------|-------------|
| 전송 중 (TLS) | TLS 1.3 |
| 저장 시 | AES-256 |
| 비밀번호 | bcrypt 또는 Argon2 (salt 포함) |

**Security Checklist:**
- [ ] OWASP Top 10 취약점 점검
- [ ] 보안 헤더 설정 (CSP, HSTS, X-Frame-Options)
- [ ] 의존성 취약점 스캔 (npm audit, Snyk)
- [ ] 민감 데이터 암호화 확인
- [ ] 로깅/모니터링 설정

---

## 11. Entrepreneur/Business Principles

**ROI Analysis:**
```
ROI = (이익 - 비용) / 비용 × 100%

기술 투자 평가 시 고려 사항:
- 개발 비용 vs 절감 비용/수익 증가
- Time to Value (가치 실현 시점)
- 기회비용 포함
```

**MVP (Minimum Viable Product):**
```
Build → Measure → Learn → (Repeat)
```
- 핵심 가치 제안만 포함
- 2-4주 내 출시 가능 범위
- 학습을 위한 최소 기능

**Product-Market Fit (PMF) 측정:**
> Sean Ellis Test: "이 제품을 사용할 수 없다면 얼마나 실망하시겠습니까?"
> 40% 이상이 "매우 실망"이면 PMF 달성

**Time-to-Market vs Quality:**
| 상황 | 전략 |
|------|------|
| 시장 선점 중요 | 빠른 출시, 기술 부채 감수 |
| 경쟁 치열 | 차별화 기능 집중 |
| 규제 산업 | 품질/보안 우선 |

**Technical Debt Cost:**
- 미국 기업 연간 $1.52T 기술 부채 비용 (2022)
- 개발 시간의 33%가 기술 부채 해결에 소요
- 조기 해결이 비용 효율적

**Cost Optimization:**
| 영역 | 전략 |
|------|------|
| 클라우드 | Reserved/Spot Instance, 자동 스케일링 |
| 인프라 | 서버리스, 컨테이너 |
| 개발 | 오픈소스 활용, 자동화 |

**Sustainable Pace:**
- 주 40시간 초과 시 생산성 급감
- 번아웃 방지 = 장기 생산성 유지
- 정기적 휴식, 온콜 로테이션

**Business Checklist:**
- [ ] 비즈니스 가치 기준 우선순위 설정
- [ ] MVP 범위 명확히 정의
- [ ] 기술 부채 비용 추적
- [ ] 팀 지속 가능성 모니터링
- [ ] ROI 분석 수행
