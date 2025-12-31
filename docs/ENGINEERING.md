# Advanced Frontend Engineering

프론트엔드 번들링, 최적화, 성능에 관한 심화 가이드.

---

## 1. Module System & Build Optimization

**ESM vs CJS 핵심 차이:**

| 특성 | ESM | CJS |
|------|-----|-----|
| 로딩 | 비동기, 정적 분석 가능 | 동기, 런타임 해석 |
| Tree Shaking | ✅ 지원 | ❌ 불가 |
| 브라우저 | 네이티브 지원 | 번들러 필요 |
| 문법 | `import`/`export` | `require`/`module.exports` |
| 순환 의존성 | Live Bindings (참조) | 값 복사 |

**package.json 올바른 설정:**
```json
{
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils.mjs",
      "require": "./dist/utils.cjs"
    }
  },
  "sideEffects": false
}
```

**빌드 도구 선택 기준:**

| 도구 | 적합한 경우 | Dev Server | Prod Build |
|------|------------|------------|------------|
| **Vite** | 신규 SPA/SSR, 빠른 HMR 필요 | Native ESM | Rollup |
| **Webpack** | 레거시, 복잡한 설정, Module Federation | Bundle-based | Webpack |
| **Turbopack** | Next.js 14+, 대규모 모노레포 | Incremental | 개발 중 |
| **Rollup** | 라이브러리 제작 | N/A | Rollup |
| **esbuild** | 빠른 번들링, 도구 내부 엔진 | 빠름 | 빠름 (최적화 부족) |

**개발 환경 vs 프로덕션 빌드 전략:**
```
Development:
├── Vite/Turbopack → Native ESM, 번들링 없이 즉시 제공
├── HMR → 변경된 모듈만 교체 (O(1))
└── Pre-bundling → node_modules만 esbuild로 사전 번들링

Production:
├── Rollup/Webpack → 전체 번들링 + 최적화
├── Tree Shaking → 사용하지 않는 코드 제거
├── Scope Hoisting → 모듈 병합으로 런타임 오버헤드 제거
└── Code Splitting → 라우트별 청크 분리
```

---

## 2. Tree Shaking Optimization

**Tree Shaking이란:**
사용되지 않는 코드(Dead Code)를 번들에서 제거하는 최적화 기법. ESM의 정적 분석 가능성에 의존한다.

**sideEffects 플래그:**
```json
// package.json
{
  "sideEffects": false
}

// 특정 파일만 사이드 이펙트가 있는 경우
{
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfills.ts",
    "./src/global-setup.ts"
  ]
}
```

**Pure 주석 (/*#__PURE__*/):**
```typescript
// 번들러에게 "이 함수 호출은 부작용이 없다"고 알림
// 반환값이 사용되지 않으면 함수 호출 자체를 제거해도 안전

// ❌ 번들러가 사이드 이펙트 여부를 확신할 수 없음
const Component = styled.div`color: red;`;

// ✅ 사이드 이펙트 없음을 명시
const Component = /*#__PURE__*/ styled.div`color: red;`;
```

**배럴 파일(index.ts) 안티패턴:**
```typescript
// ❌ BAD: 전체 모듈 로드 유발
// utils/index.ts
export * from './string';
export * from './date';
export * from './number';
export * from './array';

// 사용처 - formatDate만 필요해도 모든 유틸이 번들에 포함됨
import { formatDate } from '@/utils';

// ✅ GOOD: 직접 import (명시적 경로)
import { formatDate } from '@/utils/date';

// ✅ GOOD: 명시적 re-export (Tree Shaking 친화적)
// utils/index.ts
export { formatDate, parseDate } from './date';
export { capitalize, truncate } from './string';
// export *를 피하고 필요한 것만 명시적으로 export
```

**Tree Shaking 검증:**
```bash
# 번들 분석 - 어떤 모듈이 포함되었는지 시각화
npm run build
npx source-map-explorer dist/*.js

# Webpack 번들 분석
npx webpack-bundle-analyzer stats.json

# Vite 번들 분석
npx vite-bundle-visualizer

# 특정 패키지가 트리 쉐이킹되는지 확인
# bundlephobia.com에서 "Exports Analysis" 확인
```

---

## 3. Code Splitting Strategies

**왜 Code Splitting이 필요한가:**
- 전체 앱을 하나의 파일로 번들링 → 초기 로딩 지연
- 사용자가 방문하지 않을 페이지 코드까지 다운로드
- 코드 변경 시 전체 번들 캐시 무효화

**Route-based Splitting (Next.js):**
```typescript
// Next.js App Router - 자동 적용
// app/dashboard/page.tsx → 별도 청크로 자동 분리

// Pages Router - dynamic import 사용
import dynamic from 'next/dynamic';

const DashboardChart = dynamic(
  () => import('@/components/DashboardChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false  // 클라이언트 전용 컴포넌트
  }
);

// 조건부 로딩
const AdminPanel = dynamic(
  () => import('@/components/AdminPanel'),
  { ssr: false }
);

function Dashboard({ isAdmin }) {
  return (
    <>
      <DashboardChart />
      {isAdmin && <AdminPanel />}
    </>
  );
}
```

**Component-level Splitting (React):**
```typescript
import { lazy, Suspense } from 'react';

// 무거운 컴포넌트 지연 로딩
const HeavyEditor = lazy(() => import('./HeavyEditor'));
const DataVisualizer = lazy(() => import('./DataVisualizer'));

function App() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <HeavyEditor />
    </Suspense>
  );
}

// 라우트와 결합
const routes = [
  {
    path: '/editor',
    element: (
      <Suspense fallback={<PageLoader />}>
        <HeavyEditor />
      </Suspense>
    ),
  },
];
```

**Vendor Chunking (수동 청크 분리):**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React 관련 → 별도 청크 (자주 변경 안됨)
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI 라이브러리 → 별도 청크
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip'
          ],
          // 차트 라이브러리 → 별도 청크
          'chart-vendor': ['recharts', 'd3'],
        },
      },
    },
  },
});

// 함수형 manualChunks (더 세밀한 제어)
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('react')) return 'react-vendor';
    if (id.includes('@radix-ui')) return 'ui-vendor';
    return 'vendor';  // 나머지 의존성
  }
}
```

**Prefetching 전략:**
```typescript
// Next.js Link - 자동 prefetch
<Link href="/dashboard" prefetch={true}>Dashboard</Link>

// React Router - 수동 prefetch
const prefetchDashboard = () => {
  import('./pages/Dashboard');
};

<button onMouseEnter={prefetchDashboard}>
  Go to Dashboard
</button>
```

---

## 4. Advanced INP Optimization

**INP (Interaction to Next Paint)란:**
사용자 인터랙션(클릭, 키보드 입력)부터 다음 화면 업데이트까지의 지연 시간.

| 점수 | 평가 | 목표 |
|------|------|------|
| < 200ms | Good ✅ | 달성 목표 |
| 200-500ms | Needs Improvement ⚠️ | 개선 필요 |
| > 500ms | Poor ❌ | 긴급 수정 |

**Main Thread Yielding (핵심 기법):**
```typescript
// ❌ BAD: 200ms 동안 UI 블로킹
async function handleClick() {
  await heavyComputation();  // 200ms 블로킹
  updateUI();  // 사용자는 200ms 후에야 반응을 봄
}

// ✅ GOOD: 즉시 피드백 후 처리
async function handleClick() {
  showLoadingIndicator();  // 즉시 피드백

  // 메인 스레드 양보 (브라우저가 렌더링할 기회 제공)
  await scheduler.yield?.() ?? new Promise(r => setTimeout(r, 0));

  await heavyComputation();
  hideLoadingIndicator();
}

// 유틸리티 함수
const yieldToMain = () =>
  scheduler.yield?.() ?? new Promise(resolve => setTimeout(resolve, 0));
```

**Long Task 분할:**
```typescript
// ❌ BAD: 단일 Long Task (200ms)
function handleSubmit() {
  validateForm();      // 50ms
  transformData();     // 80ms
  sendToServer();      // 70ms
  // 총 200ms 블로킹
}

// ✅ GOOD: 각 단계 사이에 yield
async function handleSubmit() {
  showSpinner();

  const isValid = await validateForm();
  await yieldToMain();  // 브라우저 렌더링 기회

  if (!isValid) {
    hideSpinner();
    return;
  }

  const data = transformData();
  await yieldToMain();

  await sendToServer(data);
  hideSpinner();
}
```

**requestIdleCallback으로 백그라운드 처리:**
```typescript
// 우선순위 낮은 작업을 유휴 시간에 처리
function processInChunks<T>(
  items: T[],
  processItem: (item: T) => void,
  onComplete?: () => void
) {
  let index = 0;

  function processChunk(deadline: IdleDeadline) {
    // 남은 유휴 시간이 있고, 처리할 항목이 있는 동안
    while (index < items.length && deadline.timeRemaining() > 1) {
      processItem(items[index++]);
    }

    if (index < items.length) {
      requestIdleCallback(processChunk);
    } else {
      onComplete?.();
    }
  }

  requestIdleCallback(processChunk);
}

// 사용 예
processInChunks(
  largeDataset,
  item => updateAnalytics(item),
  () => console.log('Analytics complete')
);
```

**이벤트 핸들러 최적화:**
```typescript
// ❌ BAD: 동기적 무거운 연산
<input onChange={(e) => {
  const results = expensiveSearch(e.target.value);  // 블로킹
  setResults(results);
}} />

// ✅ GOOD: Debounce + 비동기 처리
const debouncedSearch = useMemo(
  () => debounce(async (query: string) => {
    const results = await searchAPI(query);
    setResults(results);
  }, 300),
  []
);

<input onChange={(e) => debouncedSearch(e.target.value)} />
```

---

## 5. Memory Management

**Chrome DevTools Memory 탭 활용:**
```
1. DevTools → Memory → Take Heap Snapshot
2. 의심되는 작업 수행 (예: 페이지 반복 이동)
3. Take Heap Snapshot 다시
4. Comparison 뷰로 증가한 객체 확인
5. "Detached" 검색으로 분리된 DOM 노드 찾기

주요 지표:
- Retained Size: 객체가 GC되면 해제될 총 메모리
- Shallow Size: 객체 자체가 차지하는 메모리
- Detached DOM tree: GC되지 않는 DOM 노드들
```

**WeakMap/WeakRef 활용:**
```typescript
// ❌ BAD: 강한 참조 → DOM 제거 후에도 메모리 유지
const elementCache = new Map<string, HTMLElement>();

function cacheElement(id: string, element: HTMLElement) {
  elementCache.set(id, element);
  // element가 DOM에서 제거되어도 Map이 참조하므로 GC 불가
}

// ✅ GOOD: 약한 참조 → DOM 제거 시 자동 GC
const elementCache = new WeakMap<HTMLElement, CachedData>();

function cacheElement(element: HTMLElement, data: CachedData) {
  elementCache.set(element, data);
  // element가 DOM에서 제거되면 WeakMap 엔트리도 자동 제거
}

// WeakRef - 대용량 객체 캐싱
class HeavyObjectCache {
  private ref: WeakRef<HeavyObject> | null = null;

  get(): HeavyObject | null {
    return this.ref?.deref() ?? null;  // GC되었으면 null
  }

  set(obj: HeavyObject) {
    this.ref = new WeakRef(obj);
  }
}
```

**대규모 리스트 가상화:**
```typescript
// ❌ BAD: 10,000개 항목 전체 렌더링 → 메모리 폭발
{items.map(item => <ListItem key={item.id} {...item} />)}

// ✅ GOOD: 가상화 - 보이는 항목만 렌더링
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,  // 각 항목 예상 높이
    overscan: 5,  // 화면 밖 추가 렌더링 항목 수
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <ListItem {...items[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**컴포넌트 외부 상태 주의:**
```typescript
// ❌ BAD: 컴포넌트 외부에서 DOM 참조 유지
const globalCache = new Map<string, HTMLElement>();

function Component({ id }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      globalCache.set(id, ref.current);  // 누수!
    }
    // cleanup 없음 → 컴포넌트 언마운트 후에도 DOM 참조 유지
  }, [id]);
}

// ✅ GOOD: cleanup에서 참조 제거
useEffect(() => {
  if (ref.current) {
    globalCache.set(id, ref.current);
  }
  return () => {
    globalCache.delete(id);  // 언마운트 시 참조 제거
  };
}, [id]);
```

---

## 6. Dead Code Elimination

**Knip - 프로젝트 레벨 미사용 코드 검출:**
```json
// knip.json
{
  "entry": [
    "src/index.ts",
    "src/app/**/*.tsx",
    "src/pages/**/*.tsx"
  ],
  "project": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "ignore": [
    "**/*.test.ts",
    "**/*.spec.ts",
    "**/__mocks__/**"
  ],
  "ignoreDependencies": [
    "@types/*",
    "eslint-*"
  ]
}
```

**Knip 실행:**
```bash
# 미사용 exports, 파일, 의존성 검출
npx knip

# 출력 예시:
# Unused files (2)
# src/utils/deprecated.ts
# src/components/OldButton.tsx
#
# Unused exports (5)
# formatLegacyDate  src/utils/date.ts
# UserContext       src/contexts/UserContext.tsx
#
# Unused dependencies (3)
# lodash
# moment
# classnames

# 자동 수정 (주의해서 사용, 먼저 dry-run)
npx knip --fix --dry-run
npx knip --fix
```

**depcheck - 미사용 의존성 검출:**
```bash
npx depcheck

# 출력 예시:
# Unused dependencies
# * lodash
# * moment
#
# Missing dependencies
# * @types/node
#
# Unused devDependencies
# * @testing-library/jest-dom
```

**Bundle Analyzer 도구:**
```bash
# Vite
npx vite-bundle-visualizer

# Webpack
npx webpack-bundle-analyzer stats.json

# Next.js (package.json에 추가)
# "analyze": "ANALYZE=true next build"
ANALYZE=true npm run build
```

**규칙:**
```
✅ DO:
- 미사용 코드는 발견 즉시 삭제
- Git 히스토리가 백업 역할 (필요시 복원 가능)
- 분기별 Knip 실행으로 코드베이스 건강 유지
- CI에 Knip 검사 추가

❌ DON'T:
- 미사용 코드 주석 처리 (// TODO: remove later)
- "나중에 쓸 수도 있으니까" 남겨두기
- 큰 리팩토링 없이 계속 미루기
```

**CI 통합:**
```yaml
# .github/workflows/ci.yml
- name: Check for unused code
  run: npx knip --no-exit-code

# 엄격 모드 (미사용 코드 있으면 실패)
- name: Check for unused code (strict)
  run: npx knip
```
