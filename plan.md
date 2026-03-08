# Korean Moment — Next.js + Cloudflare Workers 배포 계획

## 프로젝트 개요

`video-koreanmoment/docs`의 정적 HTML 갤러리(gallery-entrance.html, gallery-sample.html)를
Next.js 기반 웹앱으로 재구축하여 Cloudflare Workers & Pages에 배포한다.

- **gallery-entrance.html** → `/` (홈: Featured 시 + 갤러리 Wall)
- **gallery-sample.html** → `/poems/[slug]` (개별 시 상세 페이지)
- `/about` — 프로젝트 소개 페이지
- 총 13편의 시, 추후 확장 가능한 구조

> **이 웹사이트는 갤러리다.** 블로그가 아니다. 큐레이션 사이트가 아니다.
> 미술관처럼 조명, 동선, 여백, 침묵이 작품 앞에서 머무는 시간을 만든다.
> 해석하지 않는다. 사실을 놓고, 사용자가 스스로 연결하게 한다.
> — 상세 전략: `video-koreanmoment/docs/web-strategy.md`
> — 전환 설계: `video-koreanmoment/docs/web-transitions.md`
> — 핸드오프: `video-koreanmoment/docs/website-handoff.md`

### 핵심 참조 파일 경로

| 용도 | 경로 |
|---|---|
| 소스 데이터 | `/Users/zag/work/projects/toys/video-koreanmoment/data/poems/` |
| 갤러리 디자인 원본 | `/Users/zag/work/projects/toys/video-koreanmoment/docs/gallery-entrance.html` |
| 상세 페이지 디자인 원본 | `/Users/zag/work/projects/toys/video-koreanmoment/docs/gallery-sample.html` |
| 전략 문서 | `/Users/zag/work/projects/toys/video-koreanmoment/docs/web-strategy.md` |
| 전환 설계서 | `/Users/zag/work/projects/toys/video-koreanmoment/docs/web-transitions.md` |
| 핸드오프 문서 | `/Users/zag/work/projects/toys/video-koreanmoment/docs/website-handoff.md` |
| 시 목록 (JSONL) | `/Users/zag/work/projects/toys/video-koreanmoment/data/poems.jsonl` |
| 프로젝트 루트 | `/Users/zag/work/projects/toys/koreanmoment/` |
| 작업 상태 추적 | `wbs.md` (프로젝트 루트) |

---

## 1. 기술 스택 & 배포 방식

### Cloudflare 배포 (2026년 변경사항)

Cloudflare는 2025년 4월부터 **Pages를 Workers로 통합**했다. 기존 `@cloudflare/next-on-pages`는 deprecated되었고, 새로운 권장 방식은 **`@opennextjs/cloudflare`** 어댑터를 사용하는 것이다.

```
핵심 패키지:
- next (v15 or v16)
- @opennextjs/cloudflare
- wrangler (v3.99+)
```

### 설정 파일

**wrangler.jsonc**:
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "koreanmoment",
  "compatibility_date": "2025-05-05",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

**open-next.config.ts**:
```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
export default defineCloudflareConfig();
```

**next.config.ts**:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Cloudflare에서 런타임 이미지 최적화 비활성화 (미리 WebP 변환)
  },
};

export default nextConfig;
```

**package.json scripts**:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "convert-assets": "./scripts/convert-assets.sh"
  }
}
```

**배포 커맨드**:
```bash
npm run build         # next build
npm run deploy        # opennextjs-cloudflare build && deploy
```

---

## 2. 프로젝트 디렉토리 구조

```
koreanmoment/
├── public/
│   └── poems/
│       ├── 001/
│       │   ├── images/
│       │   │   ├── 001-scene-1-v2.webp    # 변환된 webp
│       │   │   ├── 001-scene-2-v2.webp
│       │   │   ├── 001-scene-3-v2.webp
│       │   │   └── 001-scene-4-v2.webp
│       │   ├── audio/
│       │   │   └── mixed.mp3              # 변환된 mp3
│       │   └── thumbnail.webp             # 변환된 webp
│       ├── 002/ ... 013/
│       └── (같은 구조)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # 루트 레이아웃 (Google Fonts, 메타데이터)
│   │   ├── page.tsx                       # 홈 (gallery-entrance)
│   │   ├── about/
│   │   │   └── page.tsx                   # About 페이지
│   │   ├── poems/
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # 시 상세 (gallery-sample)
│   │   └── globals.css                    # 글로벌 스타일
│   │
│   ├── components/
│   │   ├── FeaturedPoem.tsx               # 입구 Featured 섹션
│   │   ├── GalleryWall.tsx                # 매이슨리 갤러리 Wall
│   │   ├── GalleryFrame.tsx               # 개별 시 카드
│   │   ├── FilterBar.tsx                  # 필터 바 (시인/테마)
│   │   ├── PoemRoom.tsx                   # 상세: 전체 룸 컨테이너
│   │   ├── ThresholdRoom.tsx              # 상세: Room 1 - 히어로
│   │   ├── PoemTextRoom.tsx               # 상세: Room 2 - 영문 시
│   │   ├── VoiceRoom.tsx                  # 상세: Room 3 - 한국어 + 오디오
│   │   ├── SceneryRoom.tsx                # 상세: Room 4 - 씬 이미지
│   │   ├── SilenceRoom.tsx                # 상세: Room 5 - 시인 정보
│   │   ├── VideoRoom.tsx                  # 상세: Room 6 - 유튜브 영상
│   │   ├── ShopRoom.tsx                   # 상세: Room 7 - 상점
│   │   ├── MorePoems.tsx                  # 상세: 다른 시 추천
│   │   └── Footer.tsx                     # 공용 푸터 (About·YouTube·Newsletter 링크)
│   │                                      # YouTube: https://www.youtube.com/@koreanmoment-kr
│   │                                      # Newsletter: 클릭 시 alert("We are preparing something thoughtful for you. Our newsletter will be available shortly.")
│   │
│   ├── data/
│   │   └── poems.ts                       # 13편 시 메타데이터 (정적 JSON)
│   │
│   ├── lib/
│   │   └── poems.ts                       # 시 데이터 로딩 유틸리티
│   │
│   └── hooks/
│       ├── useIntersectionObserver.ts     # 스크롤 fade-in
│       └── useAudioPlayer.ts             # 오디오 재생 훅
│
├── scripts/
│   ├── convert-assets.sh                  # 에셋 변환 스크립트 (png→webp, wav→mp3)
│   └── add-poem.sh                        # 새 시 추가 스크립트
│
├── next.config.ts
├── wrangler.jsonc
├── open-next.config.ts
├── tsconfig.json
├── package.json
├── .gitignore
├── plan.md
└── wbs.md                                 # 작업 상태 추적 (체크리스트)
```

---

## 3. 데이터 모델

### 시 메타데이터 (src/data/poems.ts)

각 시의 정보를 정적으로 정의한다. `video-koreanmoment/data/poems/*/meta.json`에서 추출.

```ts
export type ExhibitionType = "full" | "quiet" | "coming-soon";
// full: 영상까지 완성 — Room 1-7 전체
// quiet: 번역까지 완성 — Room 1,2,3,5만 (텍스트+사실만으로도 강력)
// coming-soon: 원문만 — Room 1,3만

export interface Poem {
  id: string;                    // "001"
  slug: string;                  // "prologue-yun-dongju" (URL용, SEO 친화적)
  titleEn: string;               // "Prologue"
  titleKo: string;               // "서시"
  authorEn: string;              // "Yun Dong-ju"
  authorKo: string;              // "윤동주"
  authorSlug: string;            // "yun-dongju" (필터용)
  exhibitionType: ExhibitionType; // "full" | "quiet" | "coming-soon"
  mood: string[];                // ["resistance"] (필터용)
  frameSize: string;             // "frame-large" (갤러리 레이아웃)
  moodColor: string;             // "mood-night" (배경 그라데이션)
  excerpt: string;               // "Until the day I die..."
  thumbnailScene: number;        // 1 (썸네일로 쓸 씬 번호)
  galleryImageFile: string;      // "001-scene-1-v2.webp" (갤러리 카드에 쓸 이미지)
  scenes: PoemScene[];           // 씬 이미지 목록
  poem: PoemText;                // 영문/한국어 시 텍스트
  silence?: SilenceInfo;         // 시인 사망 정보 (Room 5)
  youtubeId?: string;            // YouTube 영상 ID
}

export interface PoemScene {
  imageFile: string;             // "001-scene-1-v2.webp"
  alt: string;
  cssClass: string;              // "scene-1"
}

export interface PoemText {
  stanzasEn: string[][];         // [["line1", "line2"], ["line3"]]
  stanzasKo: string[][];
}

export interface SilenceInfo {
  writtenDate: string;
  deathInfo: string[];
  age: string;
}
```

### 데이터 수집 방법

- `meta.json` → titleEn, titleKo, authorEn, authorKo, thumbnailScene, youtubeId
- `poem.md` → stanzasKo (한국어 원문)
- `translation.md` → stanzasEn (영문 번역, Translator's Note 제외)
- `guide.md` → silence 정보 (시인 생몰년, 작품 배경)
- `video-script.json` → scenes 정보 (어떤 이미지를 어떤 순서로)
- `gallery-entrance.html` → frameSize, moodColor, authorSlug, mood, excerpt (아래 매핑표 참조)

### 13편 시 갤러리 매핑 (gallery-entrance.html 기준)

| id | slug | titleEn | titleKo | authorSlug | exhibition | frameSize | moodColor | mood | galleryImageFile |
|----|------|---------|---------|------------|------------|-----------|-----------|------|-----------------|
| 001 | prologue-yun-dongju | Prologue | 서시 | yun-dongju | full | frame-large | mood-night | resistance | 001-scene-1-v2 |
| 002 | azaleas-kim-sowol | Azaleas | 진달래꽃 | kim-sowol | quiet | frame-medium | mood-red | longing | 002-scene-2-v1 |
| 003 | nostalgia-jeong-jiyong | Nostalgia | 향수 | jeong-jiyong | quiet | frame-tall | mood-earth | longing nature | 003-scene-1-v2 |
| 004 | counting-stars-yun-dongju | Counting Stars at Night | 별 헤는 밤 | yun-dongju | quiet | frame-medium | mood-deep | nature | 004-scene-2-v1 |
| 005 | silence-of-beloved-han-yongun | The Silence of My Beloved | 님의 침묵 | han-yongun | quiet | frame-wide | mood-grey | longing | 005-scene-1-v1 |
| 006 | green-grapes-yi-yuksa | Green Grapes | 청포도 | yi-yuksa | quiet | frame-square | mood-green | resistance nature | 006-scene-1-v1 |
| 007 | as-time-passes-park-inhwan | As Time Passes | 세월이 가면 | park-inhwan | quiet | frame-medium | mood-rain | longing | 007-scene-2-v1 |
| 008 | calling-back-the-soul-kim-sowol | Calling Back the Soul | 초혼 | kim-sowol | quiet | frame-tall | mood-autumn | longing | 008-scene-2-v1 |
| 009 | glass-window-jeong-jiyong | The Glass Window | 유리창 | jeong-jiyong | quiet | frame-square | mood-snow | nature | 009-scene-2-v3 |
| 010 | stolen-fields-lee-sanghwa | Does Spring Come to Stolen Fields? | 빼앗긴 들에도 봄은 오는가 | lee-sanghwa | quiet | frame-wide | mood-field | resistance nature | 010-scene-2-v1 |
| 011 | wilderness-yi-yuksa | The Wilderness | 광야 | yi-yuksa | quiet | frame-tall | mood-candle | resistance | 011-scene-3-v1 |
| 012 | mountain-flowers-kim-sowol | Mountain Flowers | 산유화 | kim-sowol | quiet | frame-square | mood-spring | nature | 012-scene-4-v1 |
| 013 | self-portrait-yun-dongju | Self-Portrait | 자화상 | yun-dongju | quiet | frame-medium | mood-sea | resistance | 013-scene-2-v1 |

> **참고**: galleryImageFile의 확장자는 변환 후 `.webp`가 됨 (원본은 `.png`)
> **exhibition**: 001만 "full" (영상 완성), 나머지 12편은 "quiet" (번역+이미지 완성, 영상 미완성)
> **slug**: URL에 사용. 예: `/poems/prologue-yun-dongju`

---

## 4. 에셋 변환

### 4-1. 이미지 PNG → WebP

```bash
# ffmpeg 또는 cwebp 사용
for poem_dir in /path/to/data/poems/*/; do
  id=$(basename "$poem_dir")
  # 갤러리에서 사용할 이미지 + 씬 이미지 변환
  for img in "$poem_dir"/images/*.png; do
    out="public/poems/$id/images/$(basename "${img%.png}.webp")"
    cwebp -q 85 "$img" -o "$out"
  done
  # 썸네일 변환
  if [ -f "$poem_dir/thumbnail.png" ]; then
    cwebp -q 85 "$poem_dir/thumbnail.png" -o "public/poems/$id/thumbnail.webp"
  fi
done
```

### 4-2. 오디오 WAV → MP3

```bash
# ffmpeg 사용
for poem_dir in /path/to/data/poems/*/; do
  id=$(basename "$poem_dir")
  if [ -f "$poem_dir/audio/mixed.wav" ]; then
    ffmpeg -i "$poem_dir/audio/mixed.wav" -codec:a libmp3lame -b:a 192k \
      "public/poems/$id/audio/mixed.mp3"
  fi
done
```

### 4-3. 어떤 이미지/오디오를 사용할지

각 시의 `video-script.json`에서 사용되는 이미지 파일명을 참조한다.
gallery-entrance.html에서 각 시에 매핑된 이미지도 참조한다.

**갤러리 카드용 이미지**: gallery-entrance.html에서 각 시에 사용된 이미지 1장
**상세 페이지 씬 이미지**: video-script.json의 scenes에서 사용된 이미지들
**오디오**: `audio/mixed.wav` → `audio/mixed.mp3`

---

## 5. 페이지별 구현 상세

### 5-1. 홈 페이지 (`/`) — gallery-entrance.html 기반

**구성**:
1. **Featured 시 섹션** (100vh 히어로)
   - 배경: 001번 시 이미지 + Ken Burns 애니메이션 (25s ease-in-out infinite alternate)
   - 제목, 한국어 제목, 시인 이름, 발췌문
   - "Enter →" 버튼 → `/poems/prologue-yun-dongju`
   - 스크롤 힌트 (스크롤 시 fade out)
   - **네비게이션 바 없음** — 시작부터 몰입

2. **갤러리 Wall** (비대칭 Masonry 레이아웃)
   - CSS columns 기반 Masonry (3→2→2열 반응형)
   - 13개 시 카드 — 크기가 전부 다름 (tall, wide, square, large). 큰 프레임 = 편집자 추천
   - 호버 시 excerpt 노출 + 이미지 줌 (scale 1.03)
   - IntersectionObserver로 fade-in + 랜덤 딜레이 (stagger)

3. **필터 바** — 드롭다운이 아닌 조용한 텍스트 한 줄
   ```
   All · Yun Dong-ju · Kim Sowol · Jeong Ji-yong · Yi Yuksa · Resistance · Nature · Longing
   ```
   - 클라이언트 사이드 필터링. 해당하지 않는 프레임은 조용히 사라짐 (filtered-out 클래스)

4. **푸터**

**렌더링**: SSG (정적 생성). 모든 데이터가 빌드 타임에 확정.

### 5-2. 시 상세 페이지 (`/poems/[slug]`) — gallery-sample.html 기반

> **전환 설계 상세**: `video-koreanmoment/docs/web-transitions.md` 참조

**전시 유형별 Room 구성**:
- **full**: Room 1-7 전체 (001번 서시)
- **quiet**: Room 1, 2, 3, 5, 7만 (나머지 12편 — 텍스트+사실만으로도 강력)
- **coming-soon**: Room 1, 3만

**구성** (full 기준, 스크롤 기반 7개 "방"):

| # | Room | 전환 기법 | 감정적 역할 |
|---|------|-----------|-------------|
| 1 | **The Threshold** — 풀스크린 히어로 (fixed 배경 + Ken Burns) | — | 몰입 시작, UI 없음 |
| | **Dissolve Spacer** | 디졸브 (이미지 opacity 1→0) | 이미지 여운 위에서 시 읽기 시작 |
| 2 | **The Poem** — 영문 번역 (stanza별 fade-in) | — | 텍스트 자체로 읽는다 |
| | **Breath Spacer** (30vh) | 없음 (같은 공간) | 같은 시의 다른 언어 |
| 3 | **The Voice** — 한국어 원문 + ▶ 재생 버튼 | — | 소리가 먼저, 의미는 나중 |
| | **Play** — 오디오 play/pause (100vh) | — | — |
| | **Blackout Spacer** (100vh) | 암전 | 텍스트→이미지 세계 전환 |
| 4 | **The Scenery** — 씬 이미지 (간격 30vh→50vh→80vh→120vh) | 점진적 비움 | 풍성함→고요, 대비가 무게를 만듦 |
| | **Emptying Spacer** (120vh) | — | — |
| 5 | **The Silence** — 사실 한 줄. 위아래 40vh 여백 | 긴 호흡 | **이 Room이 갤러리의 핵심** |
| | **Warm Spacer** | 색온도 변화 (#0a0a0a → #141210) | 침묵에서 빠져나옴 |
| 6 | **The Return** — YouTube 영상 | — | 관람의 마무리 |
| | **Lighten Spacer** | 밝아짐 (#141210 → #1a1814) | 전시실→로비 |
| 7 | **The Shop** — "Take this moment with you" + 다른 시 추천 | — | 출구 |
| | **Footer** | — | — |

**핵심 구현 규칙** (web-transitions.md 기준):
- **스크롤 하이재킹 금지** — 사용자가 자기 속도로 걷는다
- **자동 재생 금지** — 소리를 시작하는 선택은 관람자의 것
- **Room 5의 fade-in은 가장 느리게** (transition-duration: 2s)
- **Room 5의 여백이 가장 넓다** — 사실 하나를 위해 화면 전체를 비운다
- **시를 읽는 동안 화면에는 시만 있어야 한다** — NavBar 숨김, 공유 버튼은 Room 7에만

**렌더링**: `generateStaticParams()`로 13개 slug 경로 SSG.

### 5-3. About 페이지 (`/about`)

Korean Moment 프로젝트를 소개하는 정적 페이지. 사이트 전체 톤(어두운 배경, Noto Serif)을 유지하되 텍스트 중심의 읽기 편한 레이아웃.

**구성**:
1. **히어로 섹션** — 프로젝트 타이틀 + 한 줄 소개
2. **프로젝트 소개** — Korean Moment이 무엇인지, 왜 만들었는지
   - 한국 현대시를 시각·청각 경험으로 재해석하는 프로젝트
   - 영문 번역을 통해 한국시를 세계에 소개하는 목적
3. **수록 시인 소개** — 윤동주, 김소월, 정지용, 이육사, 한용운, 박인환, 이상화
   - 시인별 간략 소개 (생몰년, 대표작, 문학사적 의의)
   - 각 시인의 시 목록 링크 (해당 시인 필터가 적용된 홈으로 이동)
4. **번역에 대하여** — 번역 철학과 접근 방식
5. **연락처 / 링크** — YouTube 채널(https://www.youtube.com/@koreanmoment-kr), SNS 등
6. **푸터** (공용 Footer 컴포넌트 재사용)

**렌더링**: SSG. 정적 콘텐츠.

**네비게이션**: 홈 푸터의 "About" 링크 → `/about`, About 페이지에서 홈으로 돌아가는 링크.

---

## 6. 스타일링 전략

- **CSS Modules** 또는 **globals.css** 사용 (Tailwind 사용하지 않음 — 원본 HTML의 섬세한 커스텀 CSS를 최대한 보존)
- 기존 HTML의 CSS를 거의 그대로 옮기되, React 컴포넌트에 맞게 분리
- Google Fonts: `Noto Serif`, `Noto Serif KR` — Next.js `next/font`로 최적화
- 어두운 테마 (#0a0a0a 배경, #e8e4df 텍스트)

---

## 7. 최적화 & SEO

### 7-1. 성능 최적화

- **next/image**: WebP 이미지를 `<Image>` 컴포넌트로 서빙 (lazy loading, priority 설정)
  - Cloudflare에서 런타임 최적화 비활성화: `unoptimized: true` (미리 WebP 변환)
- **정적 에셋**: `public/poems/` 아래에 모든 이미지/오디오를 두고 Cloudflare 엣지에서 서빙
- **오디오**: 필요 시에만 로드 (클릭 시)
- **번들 크기**: Cloudflare Workers 제한 (Free: 3MB, Paid: 10MB compressed)에 주의

### 7-2. SEO

- **각 시 페이지**: Schema.org `CreativeWork` 구조화 데이터 마크업
  ```json
  { "@type": "CreativeWork", "name": "Prologue", "author": "Yun Dong-ju", "inLanguage": ["ko", "en"] }
  ```
- **OG 이미지**: 각 시의 대표 씬 이미지를 OG 이미지로 사용
- **meta description**: excerpt 텍스트 활용
- **타겟 키워드**: `"Yun Dong-ju poems english"`, `"prologue korean poem translation"` 등
- **URL slug**: SEO 친화적 (`/poems/prologue-yun-dongju`)

### 7-3. 모바일 반응형

- 모든 전환은 세로 스크롤 기반이므로 모바일에서 더 자연스럽다
- 여백은 vh 단위 — 화면 크기에 비례
- Room 5 여백: 데스크탑 40vh → 모바일 30vh
- Emptying Spacer: 데스크탑 120vh → 모바일 80vh
- 갤러리 Wall: 3열 → 2열 (≤800px), gap 축소
- 터치 스크롤의 관성(momentum scrolling)이 전환의 부드러움을 도움

---

## 8. 구현 순서

> **작업 상태는 `wbs.md`에서 추적한다.**
> 각 작업 항목 완료 시 wbs.md의 체크박스를 `[x]`로 갱신할 것.
> 새 세션 시작 시 wbs.md를 먼저 읽고, 마지막 완료 항목 다음부터 이어서 진행.

### Phase 1: 프로젝트 초기화
1. Next.js 프로젝트 생성 (`create-next-app`)
2. Cloudflare 관련 패키지 설치 (`@opennextjs/cloudflare`, `wrangler`)
3. `wrangler.jsonc`, `open-next.config.ts` 설정
4. 기본 레이아웃 및 글로벌 CSS 설정

### Phase 2: 에셋 변환
5. `scripts/convert-assets.sh` 작성 & 실행
   - 13개 시의 이미지 PNG → WebP 변환
   - 13개 시의 오디오 WAV → MP3 변환
   - `public/poems/` 디렉토리에 배치

### Phase 3: 데이터 레이어
6. `src/data/poems.ts`에 13편 시 메타데이터 정의
   - meta.json, poem.md, translation.md, video-script.json, gallery-entrance.html에서 데이터 추출
7. `src/lib/poems.ts` 유틸리티 함수 작성

### Phase 4: 홈 페이지 구현
8. `FeaturedPoem` 컴포넌트 (히어로 섹션)
9. `FilterBar` 컴포넌트
10. `GalleryWall` + `GalleryFrame` 컴포넌트 (Masonry 레이아웃)
11. `Footer` 컴포넌트
12. `page.tsx` 조합

### Phase 4-B: About 페이지 구현
12-1. `about/page.tsx` — 프로젝트 소개, 수록 시인, 번역 철학

### Phase 5: 시 상세 페이지 구현
13. `ThresholdRoom` (Room 1: 히어로)
14. `PoemTextRoom` (Room 2: 영문 시)
15. `VoiceRoom` (Room 3: 한국어 원문)
16. `useAudioPlayer` 훅 + 재생 버튼
17. `SceneryRoom` (Room 4: 씬 이미지)
18. `SilenceRoom` (Room 5: 시인 정보)
19. `VideoRoom` (Room 6: YouTube)
20. `ShopRoom` + `MorePoems` (Room 7: 상점 + 추천)
21. `poems/[id]/page.tsx` 조합 + `generateStaticParams`

### Phase 6: 인터랙션 & 애니메이션
22. `useIntersectionObserver` 훅 (fade-in 애니메이션)
23. 히어로 스크롤 패럴랙스 (dissolve 효과)
24. 필터 애니메이션

### Phase 7: 빌드 & 배포
25. `npm run build` 테스트
26. `opennextjs-cloudflare build` 테스트
27. Cloudflare Workers에 배포

---

## 9. 새 시 추가 스킬 (scripts/add-poem.sh)

새로운 시가 `video-koreanmoment/data/poems/XXX/`에 추가되었을 때:

```bash
#!/bin/bash
# Usage: ./scripts/add-poem.sh <poem-id> <source-data-path>
# Example: ./scripts/add-poem.sh 014 /path/to/video-koreanmoment/data/poems/014

POEM_ID=$1
SOURCE_DIR=$2
TARGET_DIR="public/poems/$POEM_ID"

echo "=== Adding poem $POEM_ID ==="

# 1. 디렉토리 생성
mkdir -p "$TARGET_DIR/images" "$TARGET_DIR/audio"

# 2. 이미지 변환 (PNG → WebP)
for img in "$SOURCE_DIR"/images/*.png; do
  filename=$(basename "${img%.png}.webp")
  cwebp -q 85 "$img" -o "$TARGET_DIR/images/$filename"
  echo "  Converted: $filename"
done

# 3. 썸네일 변환
if [ -f "$SOURCE_DIR/thumbnail.png" ]; then
  cwebp -q 85 "$SOURCE_DIR/thumbnail.png" -o "$TARGET_DIR/thumbnail.webp"
  echo "  Converted: thumbnail.webp"
fi

# 4. 오디오 변환 (WAV → MP3)
if [ -f "$SOURCE_DIR/audio/mixed.wav" ]; then
  ffmpeg -y -i "$SOURCE_DIR/audio/mixed.wav" -codec:a libmp3lame -b:a 192k \
    "$TARGET_DIR/audio/mixed.mp3"
  echo "  Converted: mixed.mp3"
fi

# 5. meta.json 출력 (src/data/poems.ts에 수동으로 추가 필요)
echo ""
echo "=== Add this entry to src/data/poems.ts ==="
echo "Read these files for data:"
echo "  - $SOURCE_DIR/meta.json"
echo "  - $SOURCE_DIR/poem.md"
echo "  - $SOURCE_DIR/translation.md"
echo "  - $SOURCE_DIR/video-script.json"
echo ""
echo "Done! Remember to update src/data/poems.ts with the new poem entry."
```

### Claude Code용 스킬 (.claude/skills/add-poem.md)

```markdown
# Add Poem Skill

새로운 시를 Korean Moment 웹사이트에 추가하는 스킬입니다.

## 사용법
사용자가 "시 추가" 또는 "add poem XXX"를 요청하면:

1. `video-koreanmoment/data/poems/XXX/` 디렉토리 확인
2. `scripts/add-poem.sh XXX /path/to/source` 실행
3. `meta.json`, `poem.md`, `translation.md`, `video-script.json` 읽기
4. `src/data/poems.ts`에 새 Poem 항목 추가
5. `gallery-entrance.html`의 패턴을 참조하여 frameSize, moodColor, mood 결정
6. 빌드 테스트 (`npm run build`)
```

---

## 10. 필수 도구 (로컬에 필요)

```bash
# WebP 변환
brew install webp        # cwebp 명령어 제공

# 오디오 변환
brew install ffmpeg      # wav→mp3 변환

# Cloudflare 배포
npm install -g wrangler  # 또는 npx wrangler
```

---

## 11. 주의사항 & 제약

1. **Cloudflare Workers 번들 크기**: Free 3MB / Paid 10MB (compressed). 이미지/오디오는 static assets로 서빙되므로 이 제한에 포함되지 않음.
2. **next/image 최적화**: Cloudflare에서 런타임 이미지 최적화는 별도 설정 필요. 미리 WebP로 변환해두므로 `unoptimized: true` 설정 권장.
3. **오디오 자동재생**: 브라우저 정책상 사용자 인터랙션 없이 자동재생 불가. 기존 HTML과 동일하게 수동 재생.
4. **SSG**: 모든 페이지를 빌드 타임에 정적 생성. 13편의 시 데이터가 빌드 시점에 확정됨.
5. **비디오 파일**: output.mp4는 용량이 크므로(50-100MB) 웹에 포함하지 않음. YouTube 링크로 대체.

---

## 12. 세션 핸드오프 프로토콜

세션이 중단되거나 새 세션에서 작업을 이어받을 때 아래 절차를 따른다.

### 새 세션 시작 시 (복구 절차)

```
1. wbs.md 읽기 → 현재 진행 상태 파악
2. plan.md 읽기 → 전체 계획 및 세부사항 확인
3. 마지막 완료 항목([x]) 다음의 미완료 항목([ ])부터 작업 재개
4. 진행 중이던 항목이 있으면(wbs.md에 🔧 표시) 해당 파일 상태 확인 후 이어서 진행
```

### 세션 종료 시 (인계 절차)

```
1. wbs.md 갱신: 완료 항목 [x] 체크, 진행 중 항목에 🔧 표시
2. 진행 중 작업이 있으면 wbs.md 하단 "핸드오프 노트"에 기록:
   - 현재 작업 중인 파일 경로
   - 남은 작업 내용
   - 발생한 이슈나 블로커
3. git status 확인 → 커밋되지 않은 변경사항 목록 기록
```

### 핸드오프 프롬프트 (새 세션에 붙여넣기)

```
Korean Moment 프로젝트를 이어서 진행합니다.
- 프로젝트: /Users/zag/work/projects/toys/koreanmoment/
- 계획서: plan.md
- 작업 상태: wbs.md
- 소스 데이터: /Users/zag/work/projects/toys/video-koreanmoment/data/poems/
- 디자인 원본: /Users/zag/work/projects/toys/video-koreanmoment/docs/gallery-entrance.html, gallery-sample.html

wbs.md를 읽고 마지막 완료 항목 이후부터 작업을 이어서 진행해주세요.
```
