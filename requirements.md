# Korean Moment — Implementation Requirements

Build the remaining components and pages for a Korean poetry gallery website using Next.js (App Router) with TypeScript. The project is partially built — config files, layout, CSS, and assets are already in place. **Your job is to implement the data layer, components, pages, and interactions.**

---

## CRITICAL RULES

1. **DO NOT modify** `src/app/globals.css` — all CSS is already defined (994 lines). Components must use the existing CSS class names exactly.
2. **DO NOT modify** `src/app/layout.tsx` — root layout with Google Fonts is already configured.
3. **DO NOT use Tailwind CSS** — this project uses plain CSS via globals.css.
4. **All pages are SSG** (Static Site Generation). No server-side runtime data fetching.
5. Use `next/image` with `<Image>` component for all images (already configured with `unoptimized: true`).
6. Use `"use client"` directive only for components that need browser APIs (IntersectionObserver, audio, scroll events, useState, etc.)

---

## EXISTING PROJECT STATE

### Already Created Files
- `package.json` — next@15, react@19, @opennextjs/cloudflare
- `tsconfig.json` — paths: `@/*` → `./src/*`
- `next.config.ts` — images.unoptimized: true
- `wrangler.jsonc`, `open-next.config.ts` — Cloudflare Workers config
- `src/app/layout.tsx` — Root layout with Noto Serif + Noto Serif KR (CSS vars: `--font-noto-serif`, `--font-noto-serif-kr`)
- `src/app/globals.css` — Complete CSS for all components (DO NOT MODIFY)
- `public/poems/001-013/images/*.webp` — 95 WebP scene images
- `public/poems/001-013/audio/mixed.mp3` — 13 MP3 audio files

### CSS Classes Available in globals.css

**Home Page:**
- `.featured`, `.featured-bg`, `.featured-content`, `.featured-label`, `.featured-title`, `.featured-title-ko`, `.featured-poet`, `.featured-excerpt`, `.featured-enter`
- `.scroll-down` (with `::after` pulse animation)
- `.gallery-section`, `.filter-bar`, `.filter-link`, `.filter-link.active`, `.filter-sep`
- `.wall` (CSS columns masonry), `.frame`, `.frame.visible`, `.frame.filtered-out`
- `.frame-image`, `.frame-overlay`, `.frame-title`, `.frame-title-ko`, `.frame-poet`, `.frame-excerpt`
- `.frame-large`, `.frame-medium`, `.frame-tall`, `.frame-wide`, `.frame-square` (size variations)
- `.mood-night`, `.mood-red`, `.mood-earth`, `.mood-deep`, `.mood-grey`, `.mood-green`, `.mood-autumn`, `.mood-spring`, `.mood-sea`, `.mood-snow`, `.mood-field`, `.mood-rain`, `.mood-candle`
- `.footer`, `.footer-brand`, `.footer-links`

**Detail Page:**
- `.room`, `.room-content`, `.room-content.visible`
- `.room-threshold`, `.hero-image`, `.hero-title`, `.hero-title h1`, `.hero-title .title-ko`, `.hero-title .poet`
- `.scroll-hint` (with `::after` animation)
- `.dissolve-spacer`, `.breath-spacer`, `.blackout-spacer`, `.emptying-spacer`, `.warm-spacer`, `.lighten-spacer`
- `.room-poem`, `.poem-text`, `.poem-text .stanza`, `.poem-text .line`
- `.room-voice`, `.poem-text-ko`, `.poem-text-ko .stanza`, `.poem-text-ko .line`
- `.room-play`, `.play-btn`
- `.room-scenery`, `.scene-image`, `.scene-image.visible`, `.scene-image img`
- `.scene-1`, `.scene-2`, `.scene-3`, `.scene-4` (background gradients)
- `.scene-gap-1` (30vh), `.scene-gap-2` (50vh), `.scene-gap-3` (80vh)
- `.room-silence`, `.silence-text`, `.silence-text .year`, `.silence-text .death`, `.silence-text .age`
- `.room-video`, `.video-frame`, `.video-play`, `.youtube-link`
- `.room-shop`, `.shop-heading`, `.shop-items`, `.shop-card`, `.shop-divider`
- `.more-heading`, `.more-poems`, `.more-card`, `.more-card .more-title`, `.more-card .more-ko`
- `.footer-detail`

---

## TASK 1: Data Layer

### src/data/poems.ts

Define TypeScript interfaces and export all 13 poems' data.

```ts
export type ExhibitionType = "full" | "quiet" | "coming-soon";

export interface PoemScene {
  imageFile: string;   // e.g. "001-scene-1-v2.webp"
  alt: string;
  cssClass: string;    // "scene-1" | "scene-2" | "scene-3" | "scene-4"
}

export interface PoemText {
  stanzasEn: string[][];
  stanzasKo: string[][];
}

export interface SilenceInfo {
  writtenDate: string;
  deathInfo: string[];
  age: string;
}

export interface Poem {
  id: string;
  slug: string;
  titleEn: string;
  titleKo: string;
  authorEn: string;
  authorKo: string;
  authorSlug: string;
  exhibitionType: ExhibitionType;
  mood: string[];
  frameSize: string;
  moodColor: string;
  excerpt: string;
  galleryImageFile: string;
  scenes: PoemScene[];
  poem: PoemText;
  silence: SilenceInfo;
  youtubeId?: string;
}
```

### 13 Poems Data

#### Poem 001 — Prologue
- id: "001", slug: "prologue-yun-dongju"
- titleEn: "Prologue", titleKo: "서시"
- authorEn: "Yun Dong-ju", authorKo: "윤동주", authorSlug: "yun-dongju"
- exhibitionType: "full" (the ONLY full exhibition)
- mood: ["resistance"], frameSize: "frame-large", moodColor: "mood-night"
- excerpt: "Until the day I die, I wish to look up at the heavens with not a speck of shame..."
- galleryImageFile: "001-scene-1-v2.webp"
- youtubeId: "Xfn2BTWhnhg"
- scenes: [
    { imageFile: "001-scene-1-v2.webp", alt: "A lone figure looking up at a vast sky", cssClass: "scene-1" },
    { imageFile: "001-scene-2-v2.webp", alt: "Leaves swaying gently in the breeze", cssClass: "scene-2" },
    { imageFile: "001-scene-3-v2.webp", alt: "Stars in a deep twilight sky", cssClass: "scene-3" },
    { imageFile: "001-scene-4-v2.webp", alt: "Stars flickering through wind-blown branches", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["Until the day I die, I wish to look up", "at the heavens with not a speck of shame.", "Even the wind stirring through leaves", "has caused me suffering."],
    ["With a heart that sings of stars,", "I must love all things that perish—", "and I must walk", "the path given to me."],
    ["Tonight, too, the stars are brushed by the wind."]
  ]
- stanzasKo: [
    ["죽는 날까지 하늘을 우러러", "한 점 부끄럼이 없기를,", "잎새에 이는 바람에도", "나는 괴로워했다."],
    ["별을 노래하는 마음으로", "모든 죽어 가는 것을 사랑해야지", "그리고 나한테 주어진 길을", "걸어가야겠다."],
    ["오늘 밤에도 별이 바람에 스치운다."]
  ]
- silence: { writtenDate: "Written November 20, 1941.", deathInfo: ["Yun Dong-ju died in Fukuoka Prison,", "February 16, 1945."], age: "He was 27." }

#### Poem 002 — Azaleas
- id: "002", slug: "azaleas-kim-sowol"
- titleEn: "Azaleas", titleKo: "진달래꽃"
- authorEn: "Kim Sowol", authorKo: "김소월", authorSlug: "kim-sowol"
- exhibitionType: "quiet", mood: ["longing"], frameSize: "frame-medium", moodColor: "mood-red"
- excerpt: "When you leave, weary of the sight of me, I shall let you go in silence..."
- galleryImageFile: "002-scene-2-v1.webp"
- scenes: [
    { imageFile: "002-scene-1-v1.webp", alt: "A path through mountain azaleas", cssClass: "scene-1" },
    { imageFile: "002-scene-2-v1.webp", alt: "Pink azalea petals scattered on ground", cssClass: "scene-2" },
    { imageFile: "002-scene-3-v4.webp", alt: "A flower-strewn path in spring", cssClass: "scene-3" },
    { imageFile: "002-scene-4-v1.webp", alt: "A figure walking away into silence", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["When you leave,", "weary of the sight of me,", "I shall let you go in silence."],
    ["From Mount Yak", "in Yeongbyeon,", "I will gather azaleas by the armful", "and scatter them on your path."],
    ["Step by step,", "as you go,", "tread softly upon those flowers", "I have laid for you."],
    ["When you leave,", "weary of the sight of me,", "though I die, I shall not shed a tear."]
  ]
- stanzasKo: [
    ["나 보기가 역겨워", "가실 때에는", "말없이 고이 보내 드리우리다"],
    ["영변에 약산", "진달래꽃", "아름 따다 가실 길에 뿌리우리다"],
    ["가시는 걸음 걸음", "놓인 그 꽃을", "사뿐히 즈려밟고 가시옵소서"],
    ["나 보기가 역겨워", "가실 때에는", "죽어도 아니 눈물 흘리우리다"]
  ]
- silence: { writtenDate: "Published in 1925.", deathInfo: ["Kim Sowol died on December 24, 1934."], age: "He was 32." }

#### Poem 003 — Nostalgia
- id: "003", slug: "nostalgia-jeong-jiyong"
- titleEn: "Nostalgia", titleKo: "향수"
- authorEn: "Jeong Ji-yong", authorKo: "정지용", authorSlug: "jeong-jiyong"
- exhibitionType: "quiet", mood: ["longing", "nature"], frameSize: "frame-tall", moodColor: "mood-earth"
- excerpt: "Across the broad field, toward the eastern edge, a narrow stream winds away..."
- galleryImageFile: "003-scene-1-v2.webp"
- scenes: [
    { imageFile: "003-scene-1-v2.webp", alt: "A wide field with a winding stream", cssClass: "scene-1" },
    { imageFile: "003-scene-2-v1.webp", alt: "An old farmhouse at dusk", cssClass: "scene-2" },
    { imageFile: "003-scene-3-v1.webp", alt: "A child searching through dewy grass", cssClass: "scene-3" },
    { imageFile: "003-scene-4-v1.webp", alt: "A family gathered by a humble home", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["Across the broad field, toward the eastern edge,", "a narrow stream winds away, murmuring old tales,", "where a dappled ox", "lows its golden, languid cry at dusk—", "", "— How could I ever forget that place, even in dreams?"],
    ["When the ashes cool in the clay stove", "and night winds gallop across the empty fields,", "where my aged father, drowsy with thin sleep,", "raises his straw pillow and settles down to rest—", "", "— How could I ever forget that place, even in dreams?"],
    ["My heart, grown from the soil,", "longing for the blue of the sky,", "where I searched for carelessly shot arrows", "and soaked my trouser hems in the dew of the grass—", "", "— How could I ever forget that place, even in dreams?"],
    ["Where my little sister's black sidelocks flew", "like night waves dancing on a sea of legends,", "and my wife, plain and unadorned,", "her feet bare through all seasons,", "gleaned the fallen grain with the harsh sun on her back—", "", "— How could I ever forget that place, even in dreams?"],
    ["Under sparse stars in the sky,", "stepping toward some unknowable sandcastle,", "beneath a humble roof where frost-ravens caw and pass,", "where we sit together around a dim light, murmuring softly—", "", "— How could I ever forget that place, even in dreams?"]
  ]
- stanzasKo: [
    ["넓은 벌 동쪽 끝으로", "옛이야기 지줄대는 실개천이 회돌아 나가고,", "얼룩백이 황소가", "해설피 금빛 게으른 울음을 우는 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
    ["질화로에 재가 식어지면", "뷔인 밭에 밤바람 소리 말을 달리고,", "엷은 졸음에 겨운 늙으신 아버지가", "짚벼개를 돋아 고이시는 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
    ["흙에서 자란 내 마음", "파아란 하늘빛이 그립어", "함부로 쏜 화살을 찾으려", "풀섶 이슬에 함추름 휘적시던 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
    ["전설 바다에 춤추는 밤물결 같은", "검은 귀밑머리 날리는 어린 누이와", "아무렇지도 않고 예쁠 것도 없는", "사철 발 벗은 아내가", "따가운 햇살을 등에 지고 이삭 줍던 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
    ["하늘에는 성근 별", "알 수도 없는 모래성으로 발을 옮기고,", "서리 까마귀 우지짖고 지나가는 초라한 지붕,", "흐릿한 불빛에 돌아앉아 도란도란거리는 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."]
  ]
- silence: { writtenDate: "Published in 1927.", deathInfo: ["Jeong Ji-yong disappeared during the Korean War,", "presumed taken to North Korea in 1950."], age: "He was 48." }

#### Poem 004 — Counting Stars at Night
- id: "004", slug: "counting-stars-yun-dongju"
- titleEn: "Counting Stars at Night", titleKo: "별 헤는 밤"
- authorEn: "Yun Dong-ju", authorKo: "윤동주", authorSlug: "yun-dongju"
- exhibitionType: "quiet", mood: ["nature"], frameSize: "frame-medium", moodColor: "mood-deep"
- excerpt: "One star for memory, one star for love, one star for loneliness..."
- galleryImageFile: "004-scene-2-v1.webp"
- scenes: [
    { imageFile: "004-scene-1-v1.webp", alt: "Autumn sky filled with stars", cssClass: "scene-1" },
    { imageFile: "004-scene-2-v1.webp", alt: "A young man gazing at the night sky", cssClass: "scene-2" },
    { imageFile: "004-scene-3-v1.webp", alt: "Names and memories drifting among stars", cssClass: "scene-3" },
    { imageFile: "004-scene-4-v1.webp", alt: "Green grass growing on a hillside", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["As the seasons pass through the sky,", "autumn fills it entirely."],
    ["Without a single worry,", "I could count all the stars in autumn."],
    ["The stars engraved one by one in my heart—", "I cannot count them all", "because morning comes too soon,", "because tomorrow night remains,", "because my youth is not yet over."],
    ["One star for memory,", "one star for love,", "one star for loneliness,", "one star for longing,", "one star for poetry,", "one star for Mother, Mother,"],
    ["Mother, I call out one beautiful word for each star. The names of children who shared desks with me in elementary school, the names of foreign girls like Pae, Kyong, and Ok, the names of girls who are already mothers now, the names of poor neighbors, and dove, puppy, rabbit, mule, deer, Francis Jammes, Rainer Maria Rilke—I call out the names of such poets."],
    ["They are all too far away.", "As distant as the stars seem,"],
    ["Mother,", "and you are far away in North Gando."],
    ["Longing for something,", "on this hill where starlight has fallen,", "I write my name", "and bury it with earth."],
    ["The insects crying through the night", "mourn my shameful name."],
    ["But when winter passes and spring comes to my star,", "as green grass blooms upon a grave,", "upon the hill where my name is buried,", "grass will grow thick like pride."]
  ]
- stanzasKo: [
    ["계절이 지나가는 하늘에는", "가을로 가득 차 있습니다."],
    ["나는 아무 걱정도 없이", "가을 속의 별들을 다 헤일 듯합니다."],
    ["가슴 속에 하나 둘 새겨지는 별을", "이제 다 못 헤는 것은", "쉬이 아침이 오는 까닭이요,", "내일 밤이 남은 까닭이요,", "아직 나의 청춘이 다하지 않은 까닭입니다."],
    ["별 하나에 추억과", "별 하나에 사랑과", "별 하나에 쓸쓸함과", "별 하나에 동경과", "별 하나에 시와", "별 하나에 어머니, 어머니,"],
    ["어머님, 나는 별 하나에 아름다운 말 한마디씩 불러 봅니다. 소학교 때 책상을 같이 했던 아이들의 이름과, 패, 경, 옥, 이런 이국 소녀들의 이름과, 벌써 아기 어머니 된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, 프랑시스 잠, 라이너 마리아 릴케, 이런 시인의 이름을 불러 봅니다."],
    ["이네들은 너무나 멀리 있습니다.", "별이 아슬히 멀 듯이,"],
    ["어머님,", "그리고 당신은 멀리 북간도에 계십니다."],
    ["나는 무엇인지 그리워", "이 많은 별빛이 내린 언덕 위에", "내 이름자를 써 보고,", "흙으로 덮어 버리었습니다."],
    ["딴은 밤을 새워 우는 벌레는", "부끄러운 이름을 슬퍼하는 까닭입니다."],
    ["그러나 겨울이 지나고 나의 별에도 봄이 오면", "무덤 위에 파란 잔디가 피어나듯이", "내 이름자 묻힌 언덕 위에도", "자랑처럼 풀이 무성할 거외다."]
  ]
- silence: { writtenDate: "Written November 5, 1941.", deathInfo: ["Yun Dong-ju died in Fukuoka Prison,", "February 16, 1945."], age: "He was 27." }

#### Poem 005 — The Silence of My Beloved
- id: "005", slug: "silence-of-beloved-han-yongun"
- titleEn: "The Silence of My Beloved", titleKo: "님의 침묵"
- authorEn: "Han Yong-un", authorKo: "한용운", authorSlug: "han-yongun"
- exhibitionType: "quiet", mood: ["longing"], frameSize: "frame-wide", moodColor: "mood-grey"
- excerpt: "My beloved has gone. Ah, my cherished beloved has departed..."
- galleryImageFile: "005-scene-1-v1.webp"
- scenes: [
    { imageFile: "005-scene-1-v1.webp", alt: "A figure standing alone in misty mountains", cssClass: "scene-1" },
    { imageFile: "005-scene-2-v3.webp", alt: "Golden flowers turning to dust in the wind", cssClass: "scene-2" },
    { imageFile: "005-scene-3-v1.webp", alt: "A compass turning in the darkness", cssClass: "scene-3" },
    { imageFile: "005-scene-4-v1.webp", alt: "A narrow path through maple forest", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["My beloved has gone. Ah, my cherished beloved has departed.", "Breaking through the green mountain light, toward the maple forest, walking the narrow path that was made, my beloved shook me off and left.", "The old vow, firm and radiant like golden flowers, turned into cold dust and scattered away in the breeze of my sighs.", "The memory of our sharp first kiss turned the compass of my destiny and retreated, vanishing into nothing."],
    ["I have grown deaf to my beloved's fragrant voice and blind to my beloved's beautiful face.", "Love, too, is a human affair—when we meet, we already worry and guard against parting, and yet separation comes as an unexpected blow, and my startled heart bursts with fresh sorrow.", "But knowing that to make farewell a source of useless tears would be to destroy love itself, I have channeled the uncontrollable force of my grief into the wine jar of new hope."],
    ["Just as we worry about parting when we meet, so when we part, we believe we shall meet again.", "Ah, my beloved has gone, yet I have not let my beloved go.", "The song of love, unable to suppress its own melody, wraps around and embraces the silence of my beloved."]
  ]
- stanzasKo: [
    ["님은 갔습니다. 아아, 사랑하는 나의 님은 갔습니다.", "푸른 산빛을 깨치고 단풍나무 숲을 향하여 난 적은 길을 걸어서 차마 떨치고 갔습니다.", "황금의 꽃같이 굳고 빛나던 옛 맹세는 차디찬 티끌이 되어서 한숨의 미풍에 날아갔습니다.", "날카로운 첫 키스의 추억은 나의 운명의 지침을 돌려 놓고 뒷걸음쳐서 사라졌습니다."],
    ["나는 향기로운 님의 말소리에 귀먹고 꽃다운 님의 얼굴에 눈멀었습니다.", "사랑도 사람의 일이라 만날 때에 미리 떠날 것을 염려하고 경계하지 아니한 것은 아니지만, 이별은 뜻밖의 일이 되고 놀란 가슴은 새로운 슬픔에 터집니다.", "그러나 이별을 쓸데없는 눈물의 원천을 만들고 마는 것은 스스로 사랑을 깨치는 것인 줄 아는 까닭에, 걷잡을 수 없는 슬픔의 힘을 옮겨서 새 희망의 정수박이에 들어부었습니다."],
    ["우리는 만날 때에 떠날 것을 염려하는 것과 같이 떠날 때에 다시 만날 것을 믿습니다.", "아아, 님은 갔지마는 나는 님을 보내지 아니하였습니다.", "제 곡조를 못 이기는 사랑의 노래는 님의 침묵을 휩싸고 돕니다."]
  ]
- silence: { writtenDate: "Published in 1926.", deathInfo: ["Han Yong-un died on June 29, 1944,", "one year before Korea's liberation."], age: "He was 65." }

#### Poem 006 — Green Grapes
- id: "006", slug: "green-grapes-yi-yuksa"
- titleEn: "Green Grapes", titleKo: "청포도"
- authorEn: "Yi Yuksa", authorKo: "이육사", authorSlug: "yi-yuksa"
- exhibitionType: "quiet", mood: ["resistance", "nature"], frameSize: "frame-square", moodColor: "mood-green"
- excerpt: "In my homeland, July is the season when green grapes ripen..."
- galleryImageFile: "006-scene-1-v1.webp"
- scenes: [
    { imageFile: "006-scene-1-v1.webp", alt: "Green grapes ripening in July sun", cssClass: "scene-1" },
    { imageFile: "006-scene-2-v1.webp", alt: "Village legends hanging like clusters", cssClass: "scene-2" },
    { imageFile: "006-scene-3-v1.webp", alt: "White sailboats on a blue sea", cssClass: "scene-3" },
    { imageFile: "006-scene-4-v1.webp", alt: "A weary guest in blue-green cloth", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["In my homeland, July", "is the season when green grapes ripen."],
    ["The village legends hang in clusters,", "and the distant sky dreams itself into each grape, settling there."],
    ["Beneath the sky, the blue sea opens its heart,", "and white sailboats glide gently toward us."],
    ["The guest I await, weary and worn,", "will come dressed in blue-green cloth, they say."],
    ["When I welcome him and we share these grapes,", "let my hands be drenched with their sweetness."],
    ["Child, set our table with a silver tray", "and a white ramie cloth, ready and waiting."]
  ]
- stanzasKo: [
    ["내 고장 칠월은", "청포도가 익어 가는 시절."],
    ["이 마을 전설이 주저리주저리 열리고", "먼 데 하늘이 꿈꾸며 알알이 들어와 박혀,"],
    ["하늘 밑 푸른 바다가 가슴을 열고", "흰 돛단배가 곱게 밀려서 오면,"],
    ["내가 바라는 손님은 고달픈 몸으로", "청포를 입고 찾아온다고 했으니,"],
    ["내 그를 맞아 이 포도를 따 먹으면", "두 손은 함뿍 적셔도 좋으련."],
    ["아이야, 우리 식탁엔 은쟁반에", "하이얀 모시 수건을 마련해 두렴."]
  ]
- silence: { writtenDate: "Published in 1939.", deathInfo: ["Yi Yuksa died in Beijing Prison,", "January 16, 1944."], age: "He was 39." }

#### Poem 007 — As Time Passes
- id: "007", slug: "as-time-passes-park-inhwan"
- titleEn: "As Time Passes", titleKo: "세월이 가면"
- authorEn: "Park In-hwan", authorKo: "박인환", authorSlug: "park-inhwan"
- exhibitionType: "quiet", mood: ["longing"], frameSize: "frame-medium", moodColor: "mood-rain"
- excerpt: "I have forgotten that person's name now, but their eyes, their lips remain..."
- galleryImageFile: "007-scene-2-v1.webp"
- scenes: [
    { imageFile: "007-scene-1-v2.webp", alt: "Rain-soaked city streets at night", cssClass: "scene-1" },
    { imageFile: "007-scene-2-v1.webp", alt: "A window pane with condensation", cssClass: "scene-2" },
    { imageFile: "007-scene-3-v1.webp", alt: "Blurred car lights on an empty street", cssClass: "scene-3" },
    { imageFile: "007-scene-4-v1.webp", alt: "Youth fading into back alleys", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["I have forgotten that person's name now,", "but their eyes, their lips", "remain in my heart."],
    ["When the wind blows,", "when the rain falls,", "I call out beyond that window glass", "to the name of a sorrow like a withered leaf—", "but now all is lost, scattered apart in the snow:", "only hollow names,", "only the sound of cars", "rushing down the blurred streets."],
    ["As time passes,", "things are forgotten.", "All the sufferings of this world, too, are forgotten."],
    ["Knowing this,", "I call out with all my voice", "for that one blessed word of love", "left somewhere on these streets—", "but time comes and goes,", "bidding farewell and departing", "from the back paths of youth", "once held so dear."],
    ["As time passes,", "even your name will be forgotten."],
    ["You who grieve—", "what is there that lasts forever?", "Today again in the streets", "a cold wind blows."]
  ]
- stanzasKo: [
    ["지금 그 사람 이름은 잊었지만", "그의 눈동자 입술은", "내 가슴에 있네."],
    ["바람이 불고", "비가 올 때도", "나는 저 유리창 밖", "가랑잎 같은 슬픔의 이름을 불러 보지만", "지금은 모두 눈 속에 따로 헤어진", "허전한 이름과", "흐릿한 거리를 달리는", "자동차 소리뿐."],
    ["세월이 가면", "잊혀지는 것", "이 세상 모든 괴로움도 다 잊혀지는 것."],
    ["그런 줄 알면서도", "이 거리 어딘가에 하나 남은", "축복받은 사랑의 말 한마디는", "끝끝내 소리쳐 불러 보지만", "세월은 가고 오는 것", "한때는 고이 간직한", "젊은 날의 뒤안길에서", "인사하며 떠나가고"],
    ["세월이 가면", "그대 이름도 잊혀지겠지."],
    ["슬퍼하는 그대여.", "영원한 것이 어디 있으랴.", "오늘도 거리에는", "찬바람이 분다."]
  ]
- silence: { writtenDate: "Published in 1955.", deathInfo: ["Park In-hwan died on March 20, 1956."], age: "He was 30." }

#### Poem 008 — Calling Back the Soul
- id: "008", slug: "calling-back-the-soul-kim-sowol"
- titleEn: "Calling Back the Soul", titleKo: "초혼"
- authorEn: "Kim Sowol", authorKo: "김소월", authorSlug: "kim-sowol"
- exhibitionType: "quiet", mood: ["longing"], frameSize: "frame-tall", moodColor: "mood-autumn"
- excerpt: "O name shattered into pieces! O name I will call until I die..."
- galleryImageFile: "008-scene-2-v1.webp"
- scenes: [
    { imageFile: "008-scene-1-v1.webp", alt: "A shattered name echoing in the void", cssClass: "scene-1" },
    { imageFile: "008-scene-2-v1.webp", alt: "A lone figure calling from a mountaintop", cssClass: "scene-2" },
    { imageFile: "008-scene-3-v1.webp", alt: "Red sun caught on the western ridge", cssClass: "scene-3" },
    { imageFile: "008-scene-4-v1.webp", alt: "A figure turning to stone on a mountain", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["O name shattered into pieces!", "O name scattered through the void!", "O name with no owner to answer!", "O name I will call until I die!"],
    ["That one word lingering in my heart—", "I could never finish saying it.", "O my beloved!", "O my beloved!"],
    ["The red sun has caught on the western ridge.", "Even the deer cry out in sorrow.", "From this distant mountaintop where I sit alone,", "I call out your name."],
    ["I call until grief piles upon grief.", "I call until grief piles upon grief.", "My calling voice veers away,", "but the space between heaven and earth is too vast."],
    ["Even if I stand here and turn to stone,", "O name I will call until I die!", "O my beloved!", "O my beloved!"]
  ]
- stanzasKo: [
    ["산산이 부서진 이름이여!", "허공 중에 헤어진 이름이여!", "불러도 주인 없는 이름이여!", "부르다가 내가 죽을 이름이여!"],
    ["심중에 남아 있는 말 한마디는", "끝끝내 마저 하지 못하였구나.", "사랑하던 그 사람이여!", "사랑하던 그 사람이여!"],
    ["붉은 해는 서산마루에 걸리었다.", "사슴의 무리도 슬피 운다.", "떨어져 나가 앉은 산 위에서", "나는 그대의 이름을 부르노라."],
    ["설움에 겹도록 부르노라.", "설움에 겹도록 부르노라.", "부르는 소리는 비껴가지만", "하늘과 땅 사이가 너무 넓구나."],
    ["선 채로 이 자리에 돌이 되어도", "부르다가 내가 죽을 이름이여!", "사랑하던 그 사람이여!", "사랑하던 그 사람이여!"]
  ]
- silence: { writtenDate: "Published in 1925.", deathInfo: ["Kim Sowol died on December 24, 1934."], age: "He was 32." }

#### Poem 009 — The Glass Window
- id: "009", slug: "glass-window-jeong-jiyong"
- titleEn: "The Glass Window", titleKo: "유리창"
- authorEn: "Jeong Ji-yong", authorKo: "정지용", authorSlug: "jeong-jiyong"
- exhibitionType: "quiet", mood: ["nature"], frameSize: "frame-square", moodColor: "mood-snow"
- excerpt: "Something cold and sorrowful hovers on the glass..."
- galleryImageFile: "009-scene-2-v3.webp"
- scenes: [
    { imageFile: "009-scene-1-v1.webp", alt: "Cold glass window in the night", cssClass: "scene-1" },
    { imageFile: "009-scene-2-v3.webp", alt: "Mist forming on cold glass", cssClass: "scene-2" },
    { imageFile: "009-scene-3-v1.webp", alt: "A tear-soaked star glinting like a jewel", cssClass: "scene-3" },
    { imageFile: "009-scene-4-v1.webp", alt: "A wild bird flying into the darkness", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["Something cold and sorrowful hovers on the glass.", "I press close without warmth, breathing mist upon it—", "like a tamed bird, frozen wings begin to flutter.", "I wipe and look, wipe and look again,", "but pitch-black night surges in and out, crashing against it,", "and a tear-soaked star, glinting, lodges there like a jewel.", "To polish the glass alone at night", "is a lonely, rapturous meditation—", "with delicate lung vessels torn apart,", "ah, you flew away like a wild bird!"]
  ]
- stanzasKo: [
    ["유리에 차고 슬픈 것이 어린거린다.", "열없이 붙어서서 입김을 흐리우니", "길들은 양 언 날개를 파닥거린다.", "지우고 보고 지우고 보아도", "새까만 밤이 밀려나가고 밀려와 부디치고,", "물먹은 별이, 반짝, 보석처럼 백힌다.", "밤에 홀로 유리를 닦는 것은", "외로운 황홀한 심사이어니,", "고운 폐혈관이 찢어진 채로", "아아, 늬는 산새처럼 날아갔구나!"]
  ]
- silence: { writtenDate: "Published in 1935.", deathInfo: ["Jeong Ji-yong disappeared during the Korean War,", "presumed taken to North Korea in 1950."], age: "He was 48." }

#### Poem 010 — Does Spring Come to Stolen Fields?
- id: "010", slug: "stolen-fields-lee-sanghwa"
- titleEn: "Does Spring Come to Stolen Fields?", titleKo: "빼앗긴 들에도 봄은 오는가"
- authorEn: "Lee Sang-hwa", authorKo: "이상화", authorSlug: "lee-sanghwa"
- exhibitionType: "quiet", mood: ["resistance", "nature"], frameSize: "frame-wide", moodColor: "mood-field"
- excerpt: "Now it is another's land — does spring come even to stolen fields?"
- galleryImageFile: "010-scene-2-v1.webp"
- scenes: [
    { imageFile: "010-scene-1-v1.webp", alt: "Sunlit stolen fields in spring", cssClass: "scene-1" },
    { imageFile: "010-scene-2-v1.webp", alt: "Blue sky meeting blue field", cssClass: "scene-2" },
    { imageFile: "010-scene-3-v1.webp", alt: "Well-grown barley fields after rain", cssClass: "scene-3" },
    { imageFile: "010-scene-4-v1.webp", alt: "A hoe resting in soft earth", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["Now it is another's land— does spring come even to stolen fields?"],
    ["I walk with sunlight covering my body,", "toward where blue sky meets blue field,", "walking as if in a dream along the parted furrow of a path."],
    ["O silent sky, silent fields,", "it does not feel as though I came here alone—", "did you pull me here, who called me? Tell me, I am stifled with not knowing."],
    ["The wind whispers in my ear,", "do not stop even for a moment, and shakes my garment,", "the lark laughs gladly like a maiden beyond the fence, behind the clouds."],
    ["Thank you, well-grown barley field,", "with the fine rain that fell past midnight,", "you washed your hair like silk ribbons, and even my own head feels light."],
    ["Even alone, let me go breathlessly—", "the kind irrigation ditch that embraces the dry rice paddy", "sings a lullaby to a nursing child and dances alone, shoulders swaying."],
    ["Butterfly, swallow, do not play around—", "I must greet even the cockscomb and wild flowers,", "I want to see it all, those fields where people who oiled their hair with castor oil pulled weeds with devotion."],
    ["Put a hoe in my hand—", "this soft soil like a full breast,", "I want to tread it until my ankles ache and shed good sweat."],
    ["Like a child who came out to the riverside,", "my soul that opens without knowing satiety or end,", "what do you seek, where do you go? It is laughable, answer me."],
    ["I walk with the scent of green all over my body,", "through the mingling of blue laughter and blue sorrow,", "limping through the day—perhaps the spring spirit has possessed me."],
    ["But now— our fields are stolen, even spring will be stolen."]
  ]
- stanzasKo: [
    ["지금은 남의 땅— 빼앗긴 들에도 봄은 오는가?"],
    ["나는 온몸에 햇살을 받고", "푸른 하늘 푸른 들이 맞붙은 곳으로", "가르마 같은 논길을 따라 꿈 속을 가듯 걸어만 간다."],
    ["입술을 다문 하늘아 들아", "내 맘에는 내 혼자 온 것 같지를 않구나", "네가 끌었느냐 누가 부르더냐 답답워라 말을 해 다오."],
    ["바람은 내 귀에 속삭이며", "한 자욱도 섰지 마라 옷자락을 흔들고", "종다리는 울타리 너머 아씨같이 구름 뒤에서 반갑다 웃네."],
    ["고맙게 잘 자란 보리밭아", "간밤 자정이 넘어 나리던 고운 비로", "너는 삼단 같은 머리를 감았구나 내 머리조차 가뿐하다."],
    ["혼자라도 가쁘게나 가자", "마른 논을 안고 도는 착한 도랑이", "젖먹이 달래는 노래를 하고 제 혼자 어깨춤만 추고 가네."],
    ["나비 제비야 깝치지 마라", "맨드라미 들마꽃에도 인사를 해야지", "아주까리 기름을 바른 이가 지심 매던 그 들이라 다 보고 싶다."],
    ["내 손에 호미를 쥐어 다오", "살진 젖가슴과 같은 부드러운 이 흙을", "발목이 시도록 밟아도 보고 좋은 땀조차 흘리고 싶다."],
    ["강가에 나온 아이와 같이", "짬도 모르고 끝도 없이 닫는 내 혼아", "무엇을 찾느냐 어디로 가느냐 웃어웁다 답을 하려무나."],
    ["나는 온몸에 풋내를 띠고", "푸른 웃음 푸른 설움이 어우러진 사이로", "다리를 절며 하루를 걷는다 아마도 봄 신령이 지폈나 보다."],
    ["그러나 지금은— 들을 빼앗겨 봄조차 빼앗기겠네."]
  ]
- silence: { writtenDate: "Published in 1926.", deathInfo: ["Lee Sang-hwa died on April 25, 1943."], age: "He was 41." }

#### Poem 011 — The Wilderness
- id: "011", slug: "wilderness-yi-yuksa"
- titleEn: "The Wilderness", titleKo: "광야"
- authorEn: "Yi Yuksa", authorKo: "이육사", authorSlug: "yi-yuksa"
- exhibitionType: "quiet", mood: ["resistance"], frameSize: "frame-tall", moodColor: "mood-candle"
- excerpt: "In the distant dawn of time, when the heavens first opened..."
- galleryImageFile: "011-scene-3-v1.webp"
- scenes: [
    { imageFile: "011-scene-1-v1.webp", alt: "The heavens opening in primordial dawn", cssClass: "scene-1" },
    { imageFile: "011-scene-2-v1.webp", alt: "Mountain ranges rushing toward the sea", cssClass: "scene-2" },
    { imageFile: "011-scene-3-v1.webp", alt: "Snow falling on plum blossoms", cssClass: "scene-3" },
    { imageFile: "011-scene-4-v1.webp", alt: "A white horse rider in the wilderness", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["In the distant dawn of time,", "when the heavens first opened", "and somewhere a rooster's crow was heard—"],
    ["Even when all the mountain ranges", "rushed headlong toward the sea in longing,", "they could not dare trespass upon this place."],
    ["Through endless ages,", "the diligent seasons bloomed and fell,", "until at last the great river carved its path."],
    ["Now snow falls,", "and the plum blossom's fragrance drifts alone, faint and far—", "here I scatter the seeds of my poor song."],
    ["In the eons yet to come,", "a savior on a white horse will arrive", "and sing with all his might in this wilderness."]
  ]
- stanzasKo: [
    ["까마득한 날에", "하늘이 처음 열리고", "어데 닭 우는 소리 들렸으랴"],
    ["모든 산맥들이", "바다를 연모해 휘달릴 때도", "차마 이곳을 범하던 못하였으리라"],
    ["끊임없는 광음을", "부지런한 계절이 피어선 지고", "큰 강물이 비로소 길을 열었다"],
    ["지금 눈 내리고", "매화 향기 홀로 아득하니", "내 여기 가난한 노래의 씨를 뿌려라"],
    ["다시 천고의 뒤에", "백마 타고 오는 초인이 있어", "이 광야에서 목놓아 부르게 하리라"]
  ]
- silence: { writtenDate: "Published posthumously, 1946.", deathInfo: ["Yi Yuksa died in Beijing Prison,", "January 16, 1944."], age: "He was 39." }

#### Poem 012 — Mountain Flowers
- id: "012", slug: "mountain-flowers-kim-sowol"
- titleEn: "Mountain Flowers", titleKo: "산유화"
- authorEn: "Kim Sowol", authorKo: "김소월", authorSlug: "kim-sowol"
- exhibitionType: "quiet", mood: ["nature"], frameSize: "frame-square", moodColor: "mood-spring"
- excerpt: "On the mountain, flowers bloom — flowers bloom..."
- galleryImageFile: "012-scene-4-v1.webp"
- scenes: [
    { imageFile: "012-scene-1-v1.webp", alt: "Mountain flowers blooming in spring", cssClass: "scene-1" },
    { imageFile: "012-scene-2-v1.webp", alt: "Flowers standing alone far off on a mountain", cssClass: "scene-2" },
    { imageFile: "012-scene-3-v1.webp", alt: "A small bird singing among flowers", cssClass: "scene-3" },
    { imageFile: "012-scene-4-v1.webp", alt: "Flowers falling through the seasons", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["On the mountain, flowers bloom—", "flowers bloom.", "Through spring, through summer, endlessly,", "flowers bloom."],
    ["On the mountain,", "on the mountain,", "the blossoming flowers", "stand alone, far off by themselves."],
    ["A small bird singing on the mountain—", "loving the flowers,", "on the mountain", "it makes its home."],
    ["On the mountain, flowers fall—", "flowers fall.", "Through spring, through summer, endlessly,", "flowers fall."]
  ]
- stanzasKo: [
    ["산에는 꽃 피네", "꽃이 피네", "갈 봄 여름 없이", "꽃이 피네"],
    ["산에", "산에", "피는 꽃은", "저만치 혼자서 피어 있네"],
    ["산에서 우는 작은 새요", "꽃이 좋아", "산에서", "사노라네"],
    ["산에는 꽃 지네", "꽃이 지네", "갈 봄 여름 없이", "꽃이 지네"]
  ]
- silence: { writtenDate: "Published in 1925.", deathInfo: ["Kim Sowol died on December 24, 1934."], age: "He was 32." }

#### Poem 013 — Self-Portrait
- id: "013", slug: "self-portrait-yun-dongju"
- titleEn: "Self-Portrait", titleKo: "자화상"
- authorEn: "Yun Dong-ju", authorKo: "윤동주", authorSlug: "yun-dongju"
- exhibitionType: "quiet", mood: ["resistance"], frameSize: "frame-medium", moodColor: "mood-sea"
- excerpt: "I walk around the mountain bend to a lonesome well..."
- galleryImageFile: "013-scene-2-v1.webp"
- scenes: [
    { imageFile: "013-scene-1-v1.webp", alt: "A path around a mountain bend", cssClass: "scene-1" },
    { imageFile: "013-scene-2-v1.webp", alt: "Moon and clouds reflected in a well", cssClass: "scene-2" },
    { imageFile: "013-scene-3-v3.webp", alt: "A man's reflection in the water", cssClass: "scene-3" },
    { imageFile: "013-scene-4-v1.webp", alt: "Walking away from the well", cssClass: "scene-4" }
  ]
- stanzasEn: [
    ["I walk around the mountain bend to a lonesome well", "by the rice paddies, and go alone to peer inside."],
    ["In the well, the moon shines bright, clouds drift by,", "the sky opens wide, a blue wind blows, and autumn lives there."],
    ["And there is a man.", "Something about him repels me, and I turn away."],
    ["Walking back, I think—and begin to pity him.", "I return and look again; the man is still there, unchanged."],
    ["Once more he repels me, and I turn away.", "Walking back, I think—and begin to miss him."],
    ["In the well, the moon shines bright, clouds drift by,", "the sky opens wide, a blue wind blows, autumn lives there,", "and like a memory, the man remains."]
  ]
- stanzasKo: [
    ["산모퉁이를 돌아 논가 외딴 우물을 홀로 찾아가선", "가만히 들여다봅니다."],
    ["우물 속에는 달이 밝고 구름이 흐르고 하늘이 펼치고", "파아란 바람이 불고 가을이 있습니다."],
    ["그리고 한 사나이가 있습니다.", "어쩌지 그 사나이가 미워져 돌아갑니다."],
    ["돌아가다 생각하니 그 사나이가 가엾어집니다.", "도로 가 들여다보니 사나이는 그대로 있습니다."],
    ["다시 그 사나이가 미워져 돌아갑니다.", "돌아가다 생각하니 그 사나이가 그리워집니다."],
    ["우물 속에는 달이 밝고 구름이 흐르고 하늘이 펼치고", "파아란 바람이 불고 가을이 있고 추억처럼 사나이가 있습니다."]
  ]
- silence: { writtenDate: "Written in 1941.", deathInfo: ["Yun Dong-ju died in Fukuoka Prison,", "February 16, 1945."], age: "He was 27." }

---

## TASK 2: Utility Functions

### src/lib/poems.ts

```ts
import { poems } from "@/data/poems";
import type { Poem } from "@/data/poems";

export function getAllPoems(): Poem[] {
  return poems;
}

export function getPoemBySlug(slug: string): Poem | undefined {
  return poems.find((p) => p.slug === slug);
}

export function getPoemById(id: string): Poem | undefined {
  return poems.find((p) => p.id === id);
}

export function getPoetFilterList(): { label: string; slug: string }[] {
  const seen = new Map<string, string>();
  for (const p of poems) {
    if (!seen.has(p.authorSlug)) {
      seen.set(p.authorSlug, p.authorEn);
    }
  }
  return Array.from(seen.entries()).map(([slug, label]) => ({ label, slug }));
}

export function getMoodFilterList(): string[] {
  const moods = new Set<string>();
  for (const p of poems) {
    for (const m of p.mood) moods.add(m);
  }
  return Array.from(moods);
}

export function getAdjacentPoems(currentSlug: string, count: number = 3): Poem[] {
  const idx = poems.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return poems.slice(0, count);
  const result: Poem[] = [];
  for (let i = 1; result.length < count; i++) {
    const nextIdx = (idx + i) % poems.length;
    if (nextIdx !== idx) result.push(poems[nextIdx]);
  }
  return result;
}
```

---

## TASK 3: Home Page Components

### src/components/FeaturedPoem.tsx (Server Component)

Displays poem 001 as the hero section.

```
<section className="featured">
  <Link href="/poems/prologue-yun-dongju">
    <div className="featured-bg" style={{ backgroundImage: `url(/poems/001/images/001-scene-1-v2.webp)` }} />
    <div className="featured-content">
      <div className="featured-label">Featured Poem</div>
      <h1 className="featured-title">Prologue</h1>
      <p className="featured-title-ko">서시</p>
      <p className="featured-poet">Yun Dong-ju · 윤동주</p>
      <p className="featured-excerpt">
        "Until the day I die, I wish to look up<br/>at the heavens with not a speck of shame."
      </p>
      <span className="featured-enter">Enter →</span>
    </div>
    <div className="scroll-down" />
  </Link>
</section>
```

### src/components/FilterBar.tsx ("use client")

Client component for filtering poems. Receives `onFilterChange` callback.

Filters:
- "All" (default, active class)
- Separator `·`
- Poet names: Yun Dong-ju, Kim Sowol, Jeong Ji-yong, Yi Yuksa, Han Yong-un, Park In-hwan, Lee Sang-hwa
- Separator `·`
- Themes: Resistance, Nature, Longing

When a filter is clicked:
- Toggle active class on the clicked button
- Call `onFilterChange(type, value)` where type is "all" | "poet" | "mood"

### src/components/GalleryFrame.tsx (Server Component)

Individual poem card for the masonry wall.

Props: `poem: Poem`

```
<Link href={`/poems/${poem.slug}`} className={`frame ${poem.frameSize} ${poem.moodColor}`}>
  <div className="frame-image">
    <Image
      src={`/poems/${poem.id}/images/${poem.galleryImageFile}`}
      alt={poem.titleEn}
      fill
      sizes="(max-width: 800px) 50vw, 33vw"
    />
  </div>
  <div className="frame-overlay">
    <div className="frame-title">{poem.titleEn}</div>
    <div className="frame-title-ko">{poem.titleKo}</div>
    <div className="frame-poet">{poem.authorEn}</div>
    <div className="frame-excerpt">{poem.excerpt}</div>
  </div>
</Link>
```

Note: The `Image` component needs `fill` prop with the parent having `position: relative` (already set in CSS).

### src/components/GalleryWall.tsx ("use client")

Client component that combines FilterBar + masonry wall with filtering and IntersectionObserver.

- State: `activeFilter` (string), `filterType` ("all" | "poet" | "mood")
- Renders FilterBar and the `.wall` div with GalleryFrame components
- When filter changes, add/remove `filtered-out` class on frames
- Uses IntersectionObserver to add `visible` class to frames as they enter viewport (with staggered delay)

### src/components/Footer.tsx (Server Component)

```
<footer className="footer">
  <div className="footer-brand">Korean Moment</div>
  <div className="footer-links">
    <Link href="/about">About</Link>
    <a href="https://www.youtube.com/@koreanmoment-kr" target="_blank" rel="noopener noreferrer">YouTube</a>
    <button onClick={...}>Newsletter</button>  <!-- alert("We are preparing something thoughtful for you. Our newsletter will be available shortly.") -->
  </div>
</footer>
```

Note: Since Footer has an onClick handler for Newsletter, it needs "use client" OR use a separate small client component for the newsletter button.

### src/app/page.tsx

Home page. Composes: FeaturedPoem + GalleryWall (which includes FilterBar) + Footer.

Import all poems from data, pass to GalleryWall.

---

## TASK 4: About Page

### src/app/about/page.tsx

Static page with project introduction. Use the same dark theme.

Sections:
1. **Hero** — "Korean Moment" title + subtitle "A Gallery of Korean Poetry"
2. **About the Project** — Korean modern poetry reimagined as visual/auditory experience. English translations to introduce Korean poetry worldwide.
3. **The Poets** (7 poets):
   - **Yun Dong-ju** (윤동주, 1917-1945) — Poet of conscience and stars. Died in Fukuoka Prison during Japanese occupation. Works: Prologue, Counting Stars at Night, Self-Portrait.
   - **Kim Sowol** (김소월, 1902-1934) — Korea's most beloved lyric poet. Master of Korean rhythm and sentiment. Works: Azaleas, Calling Back the Soul, Mountain Flowers.
   - **Jeong Ji-yong** (정지용, 1902-1950?) — Pioneer of Korean modernist poetry. Disappeared during the Korean War. Works: Nostalgia, The Glass Window.
   - **Yi Yuksa** (이육사, 1904-1944) — Poet of resistance. Died in Beijing Prison fighting Japanese imperialism. Works: Green Grapes, The Wilderness.
   - **Han Yong-un** (한용운, 1879-1944) — Buddhist monk, independence activist, poet. Works: The Silence of My Beloved.
   - **Park In-hwan** (박인환, 1926-1956) — Post-war modernist poet of urban melancholy. Works: As Time Passes.
   - **Lee Sang-hwa** (이상화, 1901-1943) — Poet of lost homeland. Works: Does Spring Come to Stolen Fields?
4. **On Translation** — Brief note about translation philosophy
5. **Links** — YouTube channel, contact
6. **Footer** (reuse Footer component, but with `.footer-detail` class for different background)

Use CSS classes already defined: `.footer-detail` for the detail page footer variant.

For content sections, use simple inline styles or add minimal styles. The page should feel like reading an essay — centered text, generous line-height, subtle typography.

---

## TASK 5: Detail Page — Room Components

### Exhibition Type Rules

- **full** (only poem 001): Show ALL rooms — Threshold, Poem, Voice, Play, Scenery, Silence, Video, Shop
- **quiet** (poems 002-013): Show rooms — Threshold, Poem, Voice, Silence, Shop (skip Play, Scenery, Video)
- **coming-soon**: Show rooms — Threshold, Voice (not used currently but define the logic)

### src/components/ThresholdRoom.tsx ("use client")

Room 1: Full-screen hero with fixed background and Ken Burns animation.

- Uses `hero-image` (fixed position, Ken Burns via CSS)
- Hero title overlay with h1 (titleEn), .title-ko (titleKo), .poet (authorEn)
- Scroll hint at bottom
- **Scroll dissolve**: As user scrolls down, hero-image opacity decreases from 1 to 0 over the first 100vh. Use `useEffect` + scroll event listener. Apply opacity directly to the `.hero-image` element.

```
<section className="room room-threshold">
  <div className="hero-image" style={{ backgroundImage: `url(/poems/${poem.id}/images/${poem.scenes[0].imageFile})` }} />
  <div className="hero-title">
    <h1>{poem.titleEn}</h1>
    <p className="title-ko">{poem.titleKo}</p>
    <p className="poet">{poem.authorEn}</p>
  </div>
  <div className="scroll-hint" />
</section>
<div className="dissolve-spacer" />
```

### src/components/PoemTextRoom.tsx (Server Component)

Room 2: English translation. Each stanza fades in via IntersectionObserver (handled by parent or a wrapper).

```
<section className="room room-poem">
  <div className="room-content poem-text">
    {poem.poem.stanzasEn.map((stanza, i) => (
      <div key={i} className="stanza">
        {stanza.map((line, j) => (
          line === "" ? <br key={j} /> : <span key={j} className="line">{line}</span>
        ))}
      </div>
    ))}
  </div>
</section>
<div className="breath-spacer" />
```

### src/components/VoiceRoom.tsx (Server Component)

Room 3: Korean original text.

```
<section className="room room-voice">
  <div className="room-content poem-text-ko">
    {poem.poem.stanzasKo.map((stanza, i) => (
      <div key={i} className="stanza">
        {stanza.map((line, j) => (
          line === "" ? <br key={j} /> : <span key={j} className="line">{line}</span>
        ))}
      </div>
    ))}
  </div>
</section>
```

### src/hooks/useAudioPlayer.ts ("use client" hook)

```ts
import { useState, useRef, useCallback } from "react";

export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [src, isPlaying]);

  return { isPlaying, toggle };
}
```

### src/components/AudioPlayButton.tsx ("use client")

Play/pause button for audio. Used after VoiceRoom.

```
<section className="room room-play">
  <button className="play-btn" onClick={toggle} aria-label={isPlaying ? "Pause" : "Play"}>
    {isPlaying ? "❚❚" : "▶"}
  </button>
</section>
```

### src/components/SceneryRoom.tsx (Server Component)

Room 4: Scene images with increasing gaps. Only shown for "full" exhibition type.

```
<section className="room room-scenery">
  {poem.scenes.map((scene, i) => (
    <Fragment key={i}>
      <div className={`scene-image ${scene.cssClass}`}>
        <Image src={`/poems/${poem.id}/images/${scene.imageFile}`} alt={scene.alt} fill sizes="960px" />
      </div>
      {i < poem.scenes.length - 1 && (
        <div className={`scene-gap-${Math.min(i + 1, 3)}`} />
      )}
    </Fragment>
  ))}
</section>
<div className="emptying-spacer" />
```

### src/components/SilenceRoom.tsx (Server Component)

Room 5: Poet death information. THE most important room.

```
<section className="room room-silence">
  <div className="room-content silence-text">
    <span className="year">{poem.silence.writtenDate}</span>
    {poem.silence.deathInfo.map((line, i) => (
      <span key={i} className="death">{line}</span>
    ))}
    <span className="age">{poem.silence.age}</span>
  </div>
</section>
<div className="warm-spacer" />
```

### src/components/VideoRoom.tsx (Server Component)

Room 6: YouTube video link. Only shown for "full" exhibition type.

```
<section className="room room-video">
  <div className="room-content">
    <a className="video-frame" href={`https://www.youtube.com/watch?v=${poem.youtubeId}`} target="_blank" rel="noopener noreferrer">
      <Image src={`https://img.youtube.com/vi/${poem.youtubeId}/maxresdefault.jpg`} alt="Watch on YouTube" fill sizes="720px" />
      <div className="video-play" />
    </a>
    <a className="youtube-link" href={`https://www.youtube.com/watch?v=${poem.youtubeId}`} target="_blank" rel="noopener noreferrer">
      Watch on YouTube →
    </a>
  </div>
</section>
<div className="lighten-spacer" />
```

### src/components/ShopRoom.tsx (Server Component)

Room 7: "Take this moment with you" section + more poems.

```
<section className="room room-shop">
  <div className="room-content">
    <h2 className="shop-heading">Take this moment with you</h2>
    <div className="shop-items">
      <div className="shop-card">
        <div className="icon">🎨</div>
        <div className="label">Art Print</div>
        <div className="sublabel">Museum-quality giclée</div>
        <div className="price">Coming Soon</div>
      </div>
      <div className="shop-card">
        <div className="icon">📖</div>
        <div className="label">Poetry Book</div>
        <div className="sublabel">Bilingual edition</div>
        <div className="price">Coming Soon</div>
      </div>
    </div>
    <div className="shop-divider" />
    <!-- MorePoems component here -->
  </div>
</section>
```

### src/components/MorePoems.tsx (Server Component)

Shows 3 adjacent poems as recommendations.

```
<div>
  <h3 className="more-heading">More Poems</h3>
  <div className="more-poems">
    {adjacentPoems.map(p => (
      <Link key={p.id} href={`/poems/${p.slug}`} className="more-card">
        <Image src={`/poems/${p.id}/images/${p.galleryImageFile}`} alt={p.titleEn} fill sizes="200px" />
        <span className="more-title">{p.titleEn}</span>
        <span className="more-ko">{p.titleKo}</span>
      </Link>
    ))}
  </div>
</div>
```

---

## TASK 6: Detail Page Assembly

### src/app/poems/[slug]/page.tsx

```ts
import { getAllPoems, getPoemBySlug, getAdjacentPoems } from "@/lib/poems";
import { notFound } from "next/navigation";
// Import all room components...

export function generateStaticParams() {
  return getAllPoems().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) return {};
  return {
    title: `${poem.titleEn} — ${poem.authorEn} | Korean Moment`,
    description: poem.excerpt,
    openGraph: {
      title: `${poem.titleEn} by ${poem.authorEn}`,
      description: poem.excerpt,
      images: [`/poems/${poem.id}/images/${poem.galleryImageFile}`],
    },
  };
}

export default function PoemPage({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) notFound();

  const adjacentPoems = getAdjacentPoems(poem.slug, 3);
  const isFull = poem.exhibitionType === "full";
  const isQuiet = poem.exhibitionType === "quiet";

  return (
    <main>
      <ThresholdRoom poem={poem} />
      {/* dissolve-spacer is inside ThresholdRoom */}

      <PoemTextRoom poem={poem} />
      {/* breath-spacer is inside PoemTextRoom */}

      <VoiceRoom poem={poem} />

      {isFull && <AudioPlayButton src={`/poems/${poem.id}/audio/mixed.mp3`} />}
      {isFull && <div className="blackout-spacer" />}

      {isFull && <SceneryRoom poem={poem} />}
      {/* emptying-spacer is inside SceneryRoom */}

      <SilenceRoom poem={poem} />
      {/* warm-spacer is inside SilenceRoom */}

      {isFull && poem.youtubeId && <VideoRoom poem={poem} />}
      {/* lighten-spacer is inside VideoRoom */}

      <ShopRoom poem={poem} adjacentPoems={adjacentPoems} />

      <Footer variant="detail" />
    </main>
  );
}
```

NOTE for quiet exhibition: Show Threshold → Poem → Voice → Silence → Shop. Skip AudioPlayButton, blackout-spacer, SceneryRoom, VideoRoom.

Actually for quiet, we should still show AudioPlayButton since all poems have audio. Let me revise: Show audio for ALL poems (not just full). The Play button and audio should appear after VoiceRoom for all exhibition types. Only SceneryRoom and VideoRoom are full-only.

Revised logic:
- **All types**: Threshold, Poem, Voice, AudioPlayButton
- **full only**: blackout-spacer, Scenery
- **All types**: Silence
- **full only**: Video
- **All types**: Shop + Footer

---

## TASK 7: Interactions & Animation

### src/hooks/useIntersectionObserver.ts ("use client" hook)

A reusable hook that observes elements and adds "visible" class when they enter the viewport.

```ts
import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  selector: string,
  options?: IntersectionObserverInit
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, ...options });

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [selector, options]);
}
```

### Applying IntersectionObserver

Create a client wrapper component (e.g., `PageAnimations.tsx`) that:
1. Calls `useIntersectionObserver(".room-content")` for room content fade-ins
2. Calls `useIntersectionObserver(".scene-image")` for scene image fade-ins
3. Calls `useIntersectionObserver(".frame")` for gallery frame fade-ins with staggered delay

For gallery frames, add a random delay (0-300ms) to each frame's transition-delay before observing.

### Hero Scroll Dissolve (in ThresholdRoom)

On scroll, reduce the `.hero-image` opacity:
```ts
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const heroEl = document.querySelector(".hero-image") as HTMLElement;
    if (heroEl) {
      const opacity = Math.max(0, 1 - scrollY / window.innerHeight);
      heroEl.style.opacity = String(opacity);
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Scroll Hint Auto-Hide

Hide `.scroll-hint` after user scrolls past 100px:
```ts
useEffect(() => {
  const handleScroll = () => {
    const hint = document.querySelector(".scroll-hint") as HTMLElement;
    if (hint) {
      hint.style.opacity = window.scrollY > 100 ? "0" : "0.3";
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Gallery Filter Animation

When filter changes, for each frame element:
- If it matches the filter: remove `filtered-out` class
- If it doesn't match: add `filtered-out` class

The CSS already handles the animation (opacity, scale, max-height transitions).

---

## TASK 8: SEO & Metadata

### Each poem page — generateMetadata (already shown in Task 6)

### Schema.org structured data

Add a `<script type="application/ld+json">` in the poem page with:
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Prologue",
  "alternateName": "서시",
  "author": { "@type": "Person", "name": "Yun Dong-ju" },
  "inLanguage": ["ko", "en"],
  "genre": "Poetry",
  "description": "Until the day I die..."
}
```

### Home page metadata

Already set in layout.tsx. Add specific home page metadata in page.tsx if needed.

---

## TASK 9: Build Verification

After all code is written, run:
```bash
npm run build
```

Fix any TypeScript errors or build failures. Ensure all 13 poem pages are generated via `generateStaticParams`.
