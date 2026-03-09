# Korean Moment — ACE 기반 구현 계획

## ACE 스킬 분석

### ACE란?
**Autonomous Coding Engine** — 백그라운드 코딩 데몬. 요구사항 문서를 읽고, 태스크로 분해한 뒤, Claude Code headless 모드로 각 태스크를 자율 실행한다.

### 핵심 메커니즘
1. `requirements.md` 파일을 입력으로 받음
2. Planning 에이전트가 요구사항을 3-15개 태스크로 분해
3. 각 태스크는 4단계 파이프라인을 거침: **Plan → Review #1 → Execute → Review #2**
4. 태스크 복잡도(simple/moderate/complex)에 따라 단계 생략 가능
5. 태스크 간 10초 쿨다운, 실패 시 전략(stop/continue/retry) 적용
6. 모든 세션 상태는 `.ace/pm/`에, 생성 코드는 workdir에 직접 기록

### 디렉토리 구조
```
koreanmoment/                    ← source dir (= workdir)
├── requirements.md              ← ACE 입력 파일
├── .ace/
│   └── pm/                      ← 세션 상태
│       ├── config.json
│       ├── status.json
│       ├── plan.md              ← ACE가 생성한 태스크 계획
│       ├── progress.md
│       ├── dashboard.html       ← 브라우저에서 진행상황 확인
│       ├── queue.jsonl
│       ├── ace.log
│       ├── project-memory.md    ← 태스크 간 컨텍스트 공유
│       └── tasks/{id}-{name}/
│           ├── task.json
│           ├── plan.md
│           ├── review-1.md
│           ├── execution.log
│           └── review-2.md
├── src/                         ← ACE가 여기에 코드 작성
├── public/                      ← 기존 에셋 (WebP, MP3)
└── ...
```

---

## 현재 프로젝트 상태

### 완료된 작업 (Phase 1-2)
- **Phase 1**: Next.js 프로젝트 초기화 완료
  - `package.json`, `tsconfig.json`, `next.config.ts`, `wrangler.jsonc`, `open-next.config.ts`
  - `src/app/layout.tsx` — Noto Serif / Noto Serif KR Google Fonts
  - `src/app/globals.css` — 전체 CSS (994줄, 갤러리+상세 페이지 스타일 모두 포함)
  - `.gitignore`, `node_modules/` 설치 완료
- **Phase 2**: 에셋 변환 완료
  - `public/poems/001-013/images/` — 95개 WebP 이미지
  - `public/poems/001-013/audio/` — 13개 MP3 파일

### 미완료 작업 (Phase 3-8)
- **Phase 3**: `src/data/poems.ts` (13편 시 메타데이터), `src/lib/poems.ts` (유틸리티)
- **Phase 4**: 홈 페이지 (FeaturedPoem, FilterBar, GalleryWall, GalleryFrame, Footer, page.tsx)
- **Phase 4-B**: About 페이지
- **Phase 5**: 시 상세 페이지 (7개 Room 컴포넌트, useAudioPlayer 훅)
- **Phase 6**: 인터랙션 & 애니메이션 (useIntersectionObserver, 스크롤 디졸브, 필터)
- **Phase 7**: SEO & 메타데이터
- **Phase 8**: 빌드 & 배포

---

## ACE 실행 계획

### 1. Requirements 파일 작성

`koreanmoment/requirements.md`에 남은 Phase 3-8의 요구사항을 작성한다. 핵심 원칙:

- **기존 파일 보존**: layout.tsx, globals.css는 이미 완성됨. 수정하지 않도록 명시
- **소스 데이터 경로**: `/Users/zag/work/projects/toys/video-koreanmoment/data/poems/` 참조
- **CSS 클래스명 일치**: globals.css에 이미 정의된 클래스명을 그대로 사용
- **13편 시 데이터 전부 포함**: 매핑표와 시 텍스트를 requirements에 인라인

### 2. 출력 폴더 설정

```bash
node /Users/zag/work/projects/codesalon/skills/.claude/skills/ace/ace.mjs start \
  --req /Users/zag/work/projects/toys/koreanmoment/requirements.md \
  --on-error continue
```

- **`--output` 미지정** → 기본값: requirements.md의 부모 디렉토리 = `/Users/zag/work/projects/toys/koreanmoment/`
- 이렇게 하면 ACE가 기존 프로젝트 구조 위에 직접 코드를 작성
- `.ace/` 디렉토리만 추가 생성됨 (`.gitignore`에 추가 필요)

### 3. Error Strategy: `continue`

- 태스크들이 어느 정도 독립적 (About 페이지 ↔ 상세 페이지)
- 한 태스크 실패해도 나머지 진행 가능
- 실패한 태스크의 의존 태스크만 skip

### 4. 모니터링

```bash
# 상태 확인
node /path/to/ace.mjs status /Users/zag/work/projects/toys/koreanmoment

# 대시보드 (브라우저)
open /Users/zag/work/projects/toys/koreanmoment/.ace/pm/dashboard.html

# 로그 실시간
node /path/to/ace.mjs logs /Users/zag/work/projects/toys/koreanmoment --follow

# 중단
node /path/to/ace.mjs stop /Users/zag/work/projects/toys/koreanmoment
```

---

## Requirements.md 설계

ACE의 Planning 에이전트가 태스크를 잘 분해하도록, requirements.md에 다음을 포함:

### 포함할 내용
1. **프로젝트 컨텍스트** — 이미 완성된 파일 목록, 사용 중인 CSS 클래스명
2. **13편 시 전체 데이터** — 매핑표, 시 텍스트(영문/한국어), 씬 정보, silence 정보
3. **컴포넌트 명세** — 각 컴포넌트의 props, 렌더링 로직, CSS 클래스 매핑
4. **페이지 조합 방법** — page.tsx에서 컴포넌트를 어떻게 조합하는지
5. **exhibitionType 분기** — full/quiet/coming-soon별 Room 표시 규칙
6. **인터랙션 구현** — IntersectionObserver, 스크롤 디졸브, 필터링 로직
7. **제약조건** — Tailwind 사용 금지, 기존 CSS 수정 금지, SSG only

### 예상 태스크 분해 (Planning 에이전트가 최종 결정)

| # | 태스크 | 복잡도 | 파일 |
|---|--------|--------|------|
| 001 | 데이터 레이어 (poems.ts + lib/poems.ts) | complex | src/data/poems.ts, src/lib/poems.ts |
| 002 | 홈 페이지 컴포넌트 | complex | FeaturedPoem, FilterBar, GalleryWall, GalleryFrame, Footer |
| 003 | 홈 페이지 조합 | moderate | src/app/page.tsx |
| 004 | About 페이지 | moderate | src/app/about/page.tsx |
| 005 | 상세 페이지 Room 1-3 | complex | ThresholdRoom, PoemTextRoom, VoiceRoom |
| 006 | 상세 페이지 Room 4-7 | complex | SceneryRoom, SilenceRoom, VideoRoom, ShopRoom, MorePoems |
| 007 | useAudioPlayer 훅 | simple | src/hooks/useAudioPlayer.ts |
| 008 | 상세 페이지 조합 | moderate | src/app/poems/[slug]/page.tsx + generateStaticParams |
| 009 | 인터랙션 훅 | moderate | useIntersectionObserver, 스크롤 디졸브, 필터 |
| 010 | SEO & 메타데이터 | simple | 각 페이지 metadata export |

---

## 실행 후 확인사항

1. `.ace/pm/status.json`의 `daemon_status`가 `completed`인지 확인
2. `npm run build` 성공 여부
3. `npm run dev`로 브라우저 확인:
   - `/` — Featured 시 + 갤러리 Wall + 필터
   - `/poems/prologue-yun-dongju` — full 전시 (7개 Room)
   - `/poems/azaleas-kim-sowol` — quiet 전시 (Room 1,2,3,5,7)
   - `/about` — 프로젝트 소개
4. 실패한 태스크가 있으면 로그 확인 후 수동 수정 또는 `resume`

---

## 주의사항

- `.ace/`를 `.gitignore`에 추가할 것
- ACE 데몬은 백그라운드 프로세스 — 터미널을 닫아도 계속 실행됨
- 각 태스크는 Claude Code headless로 실행되므로, 파일 시스템에 직접 write
- `globals.css`에 이미 모든 CSS가 정의되어 있으므로, 컴포넌트는 해당 className만 사용하면 됨
