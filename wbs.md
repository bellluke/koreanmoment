# Korean Moment — WBS (Work Breakdown Structure)

> 각 항목 완료 시 `[ ]` → `[x]`로 갱신. 진행 중 항목은 `🔧` 표시.
> 새 세션 시작 시 이 파일을 먼저 읽고, 미완료 항목부터 작업 재개.

---

## Phase 1: 프로젝트 초기화

- [ ] 1.1 Next.js 프로젝트 생성 (`create-next-app`)
- [ ] 1.2 `@opennextjs/cloudflare`, `wrangler` 설치
- [ ] 1.3 `wrangler.jsonc` 작성
- [ ] 1.4 `open-next.config.ts` 작성
- [ ] 1.5 `next.config.ts` 설정 (images.unoptimized 등)
- [ ] 1.6 `src/app/layout.tsx` 루트 레이아웃 (Noto Serif, Noto Serif KR)
- [ ] 1.7 `src/app/globals.css` 글로벌 스타일 (리셋, 배경색, 기본 타이포)
- [ ] 1.8 `.gitignore` 설정
- [ ] 1.9 git init & 초기 커밋

## Phase 2: 에셋 변환

- [ ] 2.1 `cwebp`, `ffmpeg` 설치 확인
- [ ] 2.2 `scripts/convert-assets.sh` 작성
- [ ] 2.3 스크립트 실행 — 13개 시 이미지 PNG → WebP 변환
- [ ] 2.4 스크립트 실행 — 13개 시 오디오 WAV → MP3 변환
- [ ] 2.5 `public/poems/` 디렉토리 구조 및 파일 검증

## Phase 3: 데이터 레이어

- [ ] 3.1 `src/data/poems.ts` — Poem 인터페이스 정의
- [ ] 3.2 `src/data/poems.ts` — 13편 시 메타데이터 입력 (plan.md 매핑표 기준)
- [ ] 3.3 `src/data/poems.ts` — 각 시의 poem 텍스트 (stanzasEn, stanzasKo) 입력
- [ ] 3.4 `src/data/poems.ts` — 각 시의 scenes 정보 입력
- [ ] 3.5 `src/data/poems.ts` — silence 정보 입력 (가용한 시만)
- [ ] 3.6 `src/lib/poems.ts` — 유틸리티 함수 (getPoem, getAllPoems, getPoetFilterList 등)

## Phase 4: 홈 페이지 구현

- [ ] 4.1 `src/components/FeaturedPoem.tsx` — 히어로 섹션 (배경 이미지, Ken Burns, 발췌문)
- [ ] 4.2 `src/components/FilterBar.tsx` — 필터 바 (All/시인별/테마별)
- [ ] 4.3 `src/components/GalleryFrame.tsx` — 개별 시 카드 (이미지+오버레이+호버)
- [ ] 4.4 `src/components/GalleryWall.tsx` — Masonry 레이아웃 (CSS columns)
- [ ] 4.5 `src/components/Footer.tsx` — 공용 푸터 (About·YouTube·Newsletter)
- [ ] 4.6 `src/app/page.tsx` — 홈 페이지 조합
- [ ] 4.7 홈 페이지 브라우저 확인 (`npm run dev`)

## Phase 4-B: About 페이지 구현

- [ ] 4B.1 `src/app/about/page.tsx` — 프로젝트 소개
- [ ] 4B.2 수록 시인 7명 소개 섹션
- [ ] 4B.3 번역 철학 섹션
- [ ] 4B.4 연락처/링크 섹션
- [ ] 4B.5 About 페이지 브라우저 확인

## Phase 5: 시 상세 페이지 구현

- [ ] 5.1 `src/components/ThresholdRoom.tsx` — Room 1: 히어로 (fixed 배경 + Ken Burns)
- [ ] 5.2 `src/components/PoemTextRoom.tsx` — Room 2: 영문 번역 (stanza별 fade-in)
- [ ] 5.3 `src/components/VoiceRoom.tsx` — Room 3: 한국어 원문
- [ ] 5.4 `src/hooks/useAudioPlayer.ts` — 오디오 재생 훅
- [ ] 5.5 오디오 play/pause 버튼 (Room Play)
- [ ] 5.6 `src/components/SceneryRoom.tsx` — Room 4: 씬 이미지 (점진적 간격)
- [ ] 5.7 `src/components/SilenceRoom.tsx` — Room 5: 시인 사망 정보
- [ ] 5.8 `src/components/VideoRoom.tsx` — Room 6: YouTube 영상
- [ ] 5.9 `src/components/ShopRoom.tsx` — Room 7: 상점 카드
- [ ] 5.10 `src/components/MorePoems.tsx` — 다른 시 추천
- [ ] 5.11 exhibitionType별 조건부 Room 렌더링 (full/quiet/coming-soon)
- [ ] 5.12 `src/app/poems/[slug]/page.tsx` — 상세 페이지 조합 + `generateStaticParams`
- [ ] 5.13 상세 페이지 브라우저 확인 (최소 001 full, 002 quiet)

## Phase 6: 인터랙션 & 애니메이션

- [ ] 6.1 `src/hooks/useIntersectionObserver.ts` — fade-in 애니메이션
- [ ] 6.2 히어로 스크롤 디졸브 (scrollY 연동 opacity)
- [ ] 6.3 갤러리 필터 애니메이션 (filtered-out 클래스)
- [ ] 6.4 스크롤 힌트 자동 숨김
- [ ] 6.5 Room 간 배경색 전환 (#0a0a0a → #141210 → #1a1814)
- [ ] 6.6 전환 품질 체크리스트 확인 (web-transitions.md 기준):
  - [ ] Room 1→2: Hero 이미지가 어둠 속으로 가라앉는가?
  - [ ] Room 2→3: 영어→한국어가 같은 공간처럼 느껴지는가?
  - [ ] Room 3→4: 암전 구간에서 잠깐 멈칫하는 순간이 있는가?
  - [ ] Room 4→5: 이미지 간격이 넓어지는 것이 자연스러운가?
  - [ ] Room 5: 사실 한 줄 나타나는 순간의 무게감?
  - [ ] Room 5→6: 색온도 변화를 의식하지 못하지만 분위기가 달라졌는가?
  - [ ] Room 6→7: 관람이 끝났다는 느낌이 부드럽게 오는가?
  - [ ] 전체: 스크롤 하이재킹 없이 사용자 속도 유지?

## Phase 7: SEO & 메타데이터

- [ ] 7.1 각 시 페이지 Schema.org `CreativeWork` 구조화 데이터
- [ ] 7.2 OG 이미지 설정 (각 시의 대표 씬 이미지)
- [ ] 7.3 meta description (excerpt 활용)
- [ ] 7.4 layout.tsx 사이트 전체 메타데이터

## Phase 8: 빌드 & 배포

- [ ] 8.1 `npm run build` 성공 확인
- [ ] 8.2 `npm run preview` 로컬 workerd 테스트
- [ ] 8.3 `npm run deploy` Cloudflare Workers 배포
- [ ] 8.4 배포 URL 동작 확인
- [ ] 8.5 모바일 반응형 확인

## Phase 9: 스킬 & 문서화

- [ ] 9.1 `scripts/add-poem.sh` 작성
- [ ] 9.2 스크립트 실행 권한 설정 (`chmod +x`)
- [ ] 9.3 MEMORY.md 업데이트 (프로젝트 학습 사항)

---

## 핸드오프 노트

> 세션 종료 시 아래에 현재 상태를 기록한다.

**마지막 세션**: 2026-03-09
**상태**: 계획 수립 완료. 구현 미착수.
**다음 작업**: Phase 1.1부터 시작
**미커밋 변경사항**: plan.md, wbs.md (아직 git init 전)
**블로커**: 없음
