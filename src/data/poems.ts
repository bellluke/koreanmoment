export type ExhibitionType = "full" | "quiet" | "coming-soon";

export interface PoemScene {
  imageFile: string;
  alt: string;
  cssClass: string;
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

export const poems: Poem[] = [
  {
    id: "001",
    slug: "prologue-yun-dongju",
    titleEn: "Prologue",
    titleKo: "서시",
    authorEn: "Yun Dong-ju",
    authorKo: "윤동주",
    authorSlug: "yun-dongju",
    exhibitionType: "full",
    mood: ["resistance"],
    frameSize: "frame-large",
    moodColor: "mood-night",
    excerpt: "Until the day I die, I wish to look up at the heavens with not a speck of shame...",
    galleryImageFile: "001-scene-1-v2.webp",
    youtubeId: "Xfn2BTWhnhg",
    scenes: [
      { imageFile: "001-scene-1-v2.webp", alt: "A lone figure looking up at a vast sky", cssClass: "scene-1" },
      { imageFile: "001-scene-2-v2.webp", alt: "Leaves swaying gently in the breeze", cssClass: "scene-2" },
      { imageFile: "001-scene-3-v2.webp", alt: "Stars in a deep twilight sky", cssClass: "scene-3" },
      { imageFile: "001-scene-4-v2.webp", alt: "Stars flickering through wind-blown branches", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["Until the day I die, I wish to look up", "at the heavens with not a speck of shame.", "Even the wind stirring through leaves", "has caused me suffering."],
        ["With a heart that sings of stars,", "I must love all things that perish—", "and I must walk", "the path given to me."],
        ["Tonight, too, the stars are brushed by the wind."]
      ],
      stanzasKo: [
        ["죽는 날까지 하늘을 우러러", "한 점 부끄럼이 없기를,", "잎새에 이는 바람에도", "나는 괴로워했다."],
        ["별을 노래하는 마음으로", "모든 죽어 가는 것을 사랑해야지", "그리고 나한테 주어진 길을", "걸어가야겠다."],
        ["오늘 밤에도 별이 바람에 스치운다."]
      ]
    },
    silence: {
      writtenDate: "Written November 20, 1941.",
      deathInfo: ["Yun Dong-ju died in Fukuoka Prison,", "February 16, 1945."],
      age: "He was 27."
    }
  },
  {
    id: "002",
    slug: "azaleas-kim-sowol",
    titleEn: "Azaleas",
    titleKo: "진달래꽃",
    authorEn: "Kim Sowol",
    authorKo: "김소월",
    authorSlug: "kim-sowol",
    exhibitionType: "full",
    mood: ["longing"],
    frameSize: "frame-medium",
    moodColor: "mood-red",
    excerpt: "When you leave, weary of the sight of me, I shall let you go in silence...",
    galleryImageFile: "002-scene-2-v1.webp",
    youtubeId: "9Rh2yQ1Sw6A",
    scenes: [
      { imageFile: "002-scene-1-v1.webp", alt: "A path through mountain azaleas", cssClass: "scene-1" },
      { imageFile: "002-scene-2-v1.webp", alt: "Pink azalea petals scattered on ground", cssClass: "scene-2" },
      { imageFile: "002-scene-3-v4.webp", alt: "A flower-strewn path in spring", cssClass: "scene-3" },
      { imageFile: "002-scene-4-v1.webp", alt: "A figure walking away into silence", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["When you leave,", "weary of the sight of me,", "I shall let you go in silence."],
        ["From Mount Yak", "in Yeongbyeon,", "I will gather azaleas by the armful", "and scatter them on your path."],
        ["Step by step,", "as you go,", "tread softly upon those flowers", "I have laid for you."],
        ["When you leave,", "weary of the sight of me,", "though I die, I shall not shed a tear."]
      ],
      stanzasKo: [
        ["나 보기가 역겨워", "가실 때에는", "말없이 고이 보내 드리우리다"],
        ["영변에 약산", "진달래꽃", "아름 따다 가실 길에 뿌리우리다"],
        ["가시는 걸음 걸음", "놓인 그 꽃을", "사뿐히 즈려밟고 가시옵소서"],
        ["나 보기가 역겨워", "가실 때에는", "죽어도 아니 눈물 흘리우리다"]
      ]
    },
    silence: {
      writtenDate: "Published in 1925.",
      deathInfo: ["Kim Sowol died on December 24, 1934."],
      age: "He was 32."
    }
  },
  {
    id: "003",
    slug: "nostalgia-jeong-jiyong",
    titleEn: "Nostalgia",
    titleKo: "향수",
    authorEn: "Jeong Ji-yong",
    authorKo: "정지용",
    authorSlug: "jeong-jiyong",
    exhibitionType: "full",
    mood: ["longing", "nature"],
    frameSize: "frame-tall",
    moodColor: "mood-earth",
    excerpt: "Across the broad field, toward the eastern edge, a narrow stream winds away...",
    galleryImageFile: "003-scene-1-v2.webp",
    youtubeId: "2zyodJXhDIc",
    scenes: [
      { imageFile: "003-scene-1-v2.webp", alt: "A wide field with a winding stream", cssClass: "scene-1" },
      { imageFile: "003-scene-2-v1.webp", alt: "An old farmhouse at dusk", cssClass: "scene-2" },
      { imageFile: "003-scene-3-v1.webp", alt: "A child searching through dewy grass", cssClass: "scene-3" },
      { imageFile: "003-scene-4-v1.webp", alt: "A family gathered by a humble home", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["Across the broad field, toward the eastern edge,", "a narrow stream winds away, murmuring old tales,", "where a dappled ox", "lows its golden, languid cry at dusk—", "", "— How could I ever forget that place, even in dreams?"],
        ["When the ashes cool in the clay stove", "and night winds gallop across the empty fields,", "where my aged father, drowsy with thin sleep,", "raises his straw pillow and settles down to rest—", "", "— How could I ever forget that place, even in dreams?"],
        ["My heart, grown from the soil,", "longing for the blue of the sky,", "where I searched for carelessly shot arrows", "and soaked my trouser hems in the dew of the grass—", "", "— How could I ever forget that place, even in dreams?"],
        ["Where my little sister's black sidelocks flew", "like night waves dancing on a sea of legends,", "and my wife, plain and unadorned,", "her feet bare through all seasons,", "gleaned the fallen grain with the harsh sun on her back—", "", "— How could I ever forget that place, even in dreams?"],
        ["Under sparse stars in the sky,", "stepping toward some unknowable sandcastle,", "beneath a humble roof where frost-ravens caw and pass,", "where we sit together around a dim light, murmuring softly—", "", "— How could I ever forget that place, even in dreams?"]
      ],
      stanzasKo: [
        ["넓은 벌 동쪽 끝으로", "옛이야기 지줄대는 실개천이 회돌아 나가고,", "얼룩백이 황소가", "해설피 금빛 게으른 울음을 우는 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
        ["질화로에 재가 식어지면", "뷔인 밭에 밤바람 소리 말을 달리고,", "엷은 졸음에 겨운 늙으신 아버지가", "짚벼개를 돋아 고이시는 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
        ["흙에서 자란 내 마음", "파아란 하늘빛이 그립어", "함부로 쏜 화살을 찾으려", "풀섶 이슬에 함추름 휘적시던 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
        ["전설 바다에 춤추는 밤물결 같은", "검은 귀밑머리 날리는 어린 누이와", "아무렇지도 않고 예쁠 것도 없는", "사철 발 벗은 아내가", "따가운 햇살을 등에 지고 이삭 줍던 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."],
        ["하늘에는 성근 별", "알 수도 없는 모래성으로 발을 옮기고,", "서리 까마귀 우지짖고 지나가는 초라한 지붕,", "흐릿한 불빛에 돌아앉아 도란도란거리는 곳,", "", "— 그곳이 차마 꿈엔들 잊힐 리야."]
      ]
    },
    silence: {
      writtenDate: "Published in 1927.",
      deathInfo: ["Jeong Ji-yong disappeared during the Korean War,", "presumed taken to North Korea in 1950."],
      age: "He was 48."
    }
  },
  {
    id: "004",
    slug: "counting-stars-yun-dongju",
    titleEn: "Counting Stars at Night",
    titleKo: "별 헤는 밤",
    authorEn: "Yun Dong-ju",
    authorKo: "윤동주",
    authorSlug: "yun-dongju",
    exhibitionType: "full",
    mood: ["nature"],
    frameSize: "frame-medium",
    moodColor: "mood-deep",
    excerpt: "One star for memory, one star for love, one star for loneliness...",
    galleryImageFile: "004-scene-2-v1.webp",
    youtubeId: "Zf3Sd3s8Y-0",
    scenes: [
      { imageFile: "004-scene-1-v1.webp", alt: "Autumn sky filled with stars", cssClass: "scene-1" },
      { imageFile: "004-scene-2-v1.webp", alt: "A young man gazing at the night sky", cssClass: "scene-2" },
      { imageFile: "004-scene-3-v1.webp", alt: "Names and memories drifting among stars", cssClass: "scene-3" },
      { imageFile: "004-scene-4-v1.webp", alt: "Green grass growing on a hillside", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
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
      ],
      stanzasKo: [
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
    },
    silence: {
      writtenDate: "Written November 5, 1941.",
      deathInfo: ["Yun Dong-ju died in Fukuoka Prison,", "February 16, 1945."],
      age: "He was 27."
    }
  },
  {
    id: "005",
    slug: "silence-of-beloved-han-yongun",
    titleEn: "The Silence of My Beloved",
    titleKo: "님의 침묵",
    authorEn: "Han Yong-un",
    authorKo: "한용운",
    authorSlug: "han-yongun",
    exhibitionType: "full",
    mood: ["longing"],
    frameSize: "frame-wide",
    moodColor: "mood-grey",
    excerpt: "My beloved has gone. Ah, my cherished beloved has departed...",
    galleryImageFile: "005-scene-1-v1.webp",
    youtubeId: "hWgKf7Xw_Fo",
    scenes: [
      { imageFile: "005-scene-1-v1.webp", alt: "A figure standing alone in misty mountains", cssClass: "scene-1" },
      { imageFile: "005-scene-2-v3.webp", alt: "Golden flowers turning to dust in the wind", cssClass: "scene-2" },
      { imageFile: "005-scene-3-v1.webp", alt: "A compass turning in the darkness", cssClass: "scene-3" },
      { imageFile: "005-scene-4-v1.webp", alt: "A narrow path through maple forest", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["My beloved has gone. Ah, my cherished beloved has departed.", "Breaking through the green mountain light, toward the maple forest, walking the narrow path that was made, my beloved shook me off and left.", "The old vow, firm and radiant like golden flowers, turned into cold dust and scattered away in the breeze of my sighs.", "The memory of our sharp first kiss turned the compass of my destiny and retreated, vanishing into nothing."],
        ["I have grown deaf to my beloved's fragrant voice and blind to my beloved's beautiful face.", "Love, too, is a human affair—when we meet, we already worry and guard against parting, and yet separation comes as an unexpected blow, and my startled heart bursts with fresh sorrow.", "But knowing that to make farewell a source of useless tears would be to destroy love itself, I have channeled the uncontrollable force of my grief into the wine jar of new hope."],
        ["Just as we worry about parting when we meet, so when we part, we believe we shall meet again.", "Ah, my beloved has gone, yet I have not let my beloved go.", "The song of love, unable to suppress its own melody, wraps around and embraces the silence of my beloved."]
      ],
      stanzasKo: [
        ["님은 갔습니다. 아아, 사랑하는 나의 님은 갔습니다.", "푸른 산빛을 깨치고 단풍나무 숲을 향하여 난 적은 길을 걸어서 차마 떨치고 갔습니다.", "황금의 꽃같이 굳고 빛나던 옛 맹세는 차디찬 티끌이 되어서 한숨의 미풍에 날아갔습니다.", "날카로운 첫 키스의 추억은 나의 운명의 지침을 돌려 놓고 뒷걸음쳐서 사라졌습니다."],
        ["나는 향기로운 님의 말소리에 귀먹고 꽃다운 님의 얼굴에 눈멀었습니다.", "사랑도 사람의 일이라 만날 때에 미리 떠날 것을 염려하고 경계하지 아니한 것은 아니지만, 이별은 뜻밖의 일이 되고 놀란 가슴은 새로운 슬픔에 터집니다.", "그러나 이별을 쓸데없는 눈물의 원천을 만들고 마는 것은 스스로 사랑을 깨치는 것인 줄 아는 까닭에, 걷잡을 수 없는 슬픔의 힘을 옮겨서 새 희망의 정수박이에 들어부었습니다."],
        ["우리는 만날 때에 떠날 것을 염려하는 것과 같이 떠날 때에 다시 만날 것을 믿습니다.", "아아, 님은 갔지마는 나는 님을 보내지 아니하였습니다.", "제 곡조를 못 이기는 사랑의 노래는 님의 침묵을 휩싸고 돕니다."]
      ]
    },
    silence: {
      writtenDate: "Published in 1926.",
      deathInfo: ["Han Yong-un died on June 29, 1944,", "one year before Korea's liberation."],
      age: "He was 65."
    }
  },
  {
    id: "006",
    slug: "green-grapes-yi-yuksa",
    titleEn: "Green Grapes",
    titleKo: "청포도",
    authorEn: "Yi Yuksa",
    authorKo: "이육사",
    authorSlug: "yi-yuksa",
    exhibitionType: "full",
    mood: ["resistance", "nature"],
    frameSize: "frame-square",
    moodColor: "mood-green",
    excerpt: "In my homeland, July is the season when green grapes ripen...",
    galleryImageFile: "006-scene-1-v1.webp",
    youtubeId: "hOmN6EZKZh0",
    scenes: [
      { imageFile: "006-scene-1-v1.webp", alt: "Green grapes ripening in July sun", cssClass: "scene-1" },
      { imageFile: "006-scene-2-v1.webp", alt: "Village legends hanging like clusters", cssClass: "scene-2" },
      { imageFile: "006-scene-3-v1.webp", alt: "White sailboats on a blue sea", cssClass: "scene-3" },
      { imageFile: "006-scene-4-v1.webp", alt: "A weary guest in blue-green cloth", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["In my homeland, July", "is the season when green grapes ripen."],
        ["The village legends hang in clusters,", "and the distant sky dreams itself into each grape, settling there."],
        ["Beneath the sky, the blue sea opens its heart,", "and white sailboats glide gently toward us."],
        ["The guest I await, weary and worn,", "will come dressed in blue-green cloth, they say."],
        ["When I welcome him and we share these grapes,", "let my hands be drenched with their sweetness."],
        ["Child, set our table with a silver tray", "and a white ramie cloth, ready and waiting."]
      ],
      stanzasKo: [
        ["내 고장 칠월은", "청포도가 익어 가는 시절."],
        ["이 마을 전설이 주저리주저리 열리고", "먼 데 하늘이 꿈꾸며 알알이 들어와 박혀,"],
        ["하늘 밑 푸른 바다가 가슴을 열고", "흰 돛단배가 곱게 밀려서 오면,"],
        ["내가 바라는 손님은 고달픈 몸으로", "청포를 입고 찾아온다고 했으니,"],
        ["내 그를 맞아 이 포도를 따 먹으면", "두 손은 함뿍 적셔도 좋으련."],
        ["아이야, 우리 식탁엔 은쟁반에", "하이얀 모시 수건을 마련해 두렴."]
      ]
    },
    silence: {
      writtenDate: "Published in 1939.",
      deathInfo: ["Yi Yuksa died in Beijing Prison,", "January 16, 1944."],
      age: "He was 39."
    }
  },
  {
    id: "007",
    slug: "as-time-passes-park-inhwan",
    titleEn: "As Time Passes",
    titleKo: "세월이 가면",
    authorEn: "Park In-hwan",
    authorKo: "박인환",
    authorSlug: "park-inhwan",
    exhibitionType: "full",
    mood: ["longing"],
    frameSize: "frame-medium",
    moodColor: "mood-rain",
    excerpt: "I have forgotten that person's name now, but their eyes, their lips remain...",
    galleryImageFile: "007-scene-2-v1.webp",
    youtubeId: "p0uHmmr2czs",
    scenes: [
      { imageFile: "007-scene-1-v2.webp", alt: "Rain-soaked city streets at night", cssClass: "scene-1" },
      { imageFile: "007-scene-2-v1.webp", alt: "A window pane with condensation", cssClass: "scene-2" },
      { imageFile: "007-scene-3-v1.webp", alt: "Blurred car lights on an empty street", cssClass: "scene-3" },
      { imageFile: "007-scene-4-v1.webp", alt: "Youth fading into back alleys", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["I have forgotten that person's name now,", "but their eyes, their lips", "remain in my heart."],
        ["When the wind blows,", "when the rain falls,", "I call out beyond that window glass", "to the name of a sorrow like a withered leaf—", "but now all is lost, scattered apart in the snow:", "only hollow names,", "only the sound of cars", "rushing down the blurred streets."],
        ["As time passes,", "things are forgotten.", "All the sufferings of this world, too, are forgotten."],
        ["Knowing this,", "I call out with all my voice", "for that one blessed word of love", "left somewhere on these streets—", "but time comes and goes,", "bidding farewell and departing", "from the back paths of youth", "once held so dear."],
        ["As time passes,", "even your name will be forgotten."],
        ["You who grieve—", "what is there that lasts forever?", "Today again in the streets", "a cold wind blows."]
      ],
      stanzasKo: [
        ["지금 그 사람 이름은 잊었지만", "그의 눈동자 입술은", "내 가슴에 있네."],
        ["바람이 불고", "비가 올 때도", "나는 저 유리창 밖", "가랑잎 같은 슬픔의 이름을 불러 보지만", "지금은 모두 눈 속에 따로 헤어진", "허전한 이름과", "흐릿한 거리를 달리는", "자동차 소리뿐."],
        ["세월이 가면", "잊혀지는 것", "이 세상 모든 괴로움도 다 잊혀지는 것."],
        ["그런 줄 알면서도", "이 거리 어딘가에 하나 남은", "축복받은 사랑의 말 한마디는", "끝끝내 소리쳐 불러 보지만", "세월은 가고 오는 것", "한때는 고이 간직한", "젊은 날의 뒤안길에서", "인사하며 떠나가고"],
        ["세월이 가면", "그대 이름도 잊혀지겠지."],
        ["슬퍼하는 그대여.", "영원한 것이 어디 있으랴.", "오늘도 거리에는", "찬바람이 분다."]
      ]
    },
    silence: {
      writtenDate: "Published in 1955.",
      deathInfo: ["Park In-hwan died on March 20, 1956."],
      age: "He was 30."
    }
  },
  {
    id: "008",
    slug: "calling-back-the-soul-kim-sowol",
    titleEn: "Calling Back the Soul",
    titleKo: "초혼",
    authorEn: "Kim Sowol",
    authorKo: "김소월",
    authorSlug: "kim-sowol",
    exhibitionType: "full",
    mood: ["longing"],
    frameSize: "frame-tall",
    moodColor: "mood-autumn",
    excerpt: "O name shattered into pieces! O name I will call until I die...",
    galleryImageFile: "008-scene-2-v1.webp",
    youtubeId: "m5-9iXGYW9Q",
    scenes: [
      { imageFile: "008-scene-1-v1.webp", alt: "A shattered name echoing in the void", cssClass: "scene-1" },
      { imageFile: "008-scene-2-v1.webp", alt: "A lone figure calling from a mountaintop", cssClass: "scene-2" },
      { imageFile: "008-scene-3-v1.webp", alt: "Red sun caught on the western ridge", cssClass: "scene-3" },
      { imageFile: "008-scene-4-v1.webp", alt: "A figure turning to stone on a mountain", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["O name shattered into pieces!", "O name scattered through the void!", "O name with no owner to answer!", "O name I will call until I die!"],
        ["That one word lingering in my heart—", "I could never finish saying it.", "O my beloved!", "O my beloved!"],
        ["The red sun has caught on the western ridge.", "Even the deer cry out in sorrow.", "From this distant mountaintop where I sit alone,", "I call out your name."],
        ["I call until grief piles upon grief.", "I call until grief piles upon grief.", "My calling voice veers away,", "but the space between heaven and earth is too vast."],
        ["Even if I stand here and turn to stone,", "O name I will call until I die!", "O my beloved!", "O my beloved!"]
      ],
      stanzasKo: [
        ["산산이 부서진 이름이여!", "허공 중에 헤어진 이름이여!", "불러도 주인 없는 이름이여!", "부르다가 내가 죽을 이름이여!"],
        ["심중에 남아 있는 말 한마디는", "끝끝내 마저 하지 못하였구나.", "사랑하던 그 사람이여!", "사랑하던 그 사람이여!"],
        ["붉은 해는 서산마루에 걸리었다.", "사슴의 무리도 슬피 운다.", "떨어져 나가 앉은 산 위에서", "나는 그대의 이름을 부르노라."],
        ["설움에 겹도록 부르노라.", "설움에 겹도록 부르노라.", "부르는 소리는 비껴가지만", "하늘과 땅 사이가 너무 넓구나."],
        ["선 채로 이 자리에 돌이 되어도", "부르다가 내가 죽을 이름이여!", "사랑하던 그 사람이여!", "사랑하던 그 사람이여!"]
      ]
    },
    silence: {
      writtenDate: "Published in 1925.",
      deathInfo: ["Kim Sowol died on December 24, 1934."],
      age: "He was 32."
    }
  },
  {
    id: "009",
    slug: "glass-window-jeong-jiyong",
    titleEn: "The Glass Window",
    titleKo: "유리창",
    authorEn: "Jeong Ji-yong",
    authorKo: "정지용",
    authorSlug: "jeong-jiyong",
    exhibitionType: "full",
    mood: ["nature"],
    frameSize: "frame-square",
    moodColor: "mood-snow",
    excerpt: "Something cold and sorrowful hovers on the glass...",
    galleryImageFile: "009-scene-2-v3.webp",
    youtubeId: "DKpSdetwpmE",
    scenes: [
      { imageFile: "009-scene-1-v1.webp", alt: "Cold glass window in the night", cssClass: "scene-1" },
      { imageFile: "009-scene-2-v3.webp", alt: "Mist forming on cold glass", cssClass: "scene-2" },
      { imageFile: "009-scene-3-v1.webp", alt: "A tear-soaked star glinting like a jewel", cssClass: "scene-3" },
      { imageFile: "009-scene-4-v1.webp", alt: "A wild bird flying into the darkness", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["Something cold and sorrowful hovers on the glass.", "I press close without warmth, breathing mist upon it—", "like a tamed bird, frozen wings begin to flutter.", "I wipe and look, wipe and look again,", "but pitch-black night surges in and out, crashing against it,", "and a tear-soaked star, glinting, lodges there like a jewel.", "To polish the glass alone at night", "is a lonely, rapturous meditation—", "with delicate lung vessels torn apart,", "ah, you flew away like a wild bird!"]
      ],
      stanzasKo: [
        ["유리에 차고 슬픈 것이 어린거린다.", "열없이 붙어서서 입김을 흐리우니", "길들은 양 언 날개를 파닥거린다.", "지우고 보고 지우고 보아도", "새까만 밤이 밀려나가고 밀려와 부디치고,", "물먹은 별이, 반짝, 보석처럼 백힌다.", "밤에 홀로 유리를 닦는 것은", "외로운 황홀한 심사이어니,", "고운 폐혈관이 찢어진 채로", "아아, 늬는 산새처럼 날아갔구나!"]
      ]
    },
    silence: {
      writtenDate: "Published in 1935.",
      deathInfo: ["Jeong Ji-yong disappeared during the Korean War,", "presumed taken to North Korea in 1950."],
      age: "He was 48."
    }
  },
  {
    id: "010",
    slug: "stolen-fields-lee-sanghwa",
    titleEn: "Does Spring Come to Stolen Fields?",
    titleKo: "빼앗긴 들에도 봄은 오는가",
    authorEn: "Lee Sang-hwa",
    authorKo: "이상화",
    authorSlug: "lee-sanghwa",
    exhibitionType: "full",
    mood: ["resistance", "nature"],
    frameSize: "frame-wide",
    moodColor: "mood-field",
    excerpt: "Now it is another's land — does spring come even to stolen fields?",
    galleryImageFile: "010-scene-2-v1.webp",
    youtubeId: "4TL_OcVzoLc",
    scenes: [
      { imageFile: "010-scene-1-v1.webp", alt: "Sunlit stolen fields in spring", cssClass: "scene-1" },
      { imageFile: "010-scene-2-v1.webp", alt: "Blue sky meeting blue field", cssClass: "scene-2" },
      { imageFile: "010-scene-3-v1.webp", alt: "Well-grown barley fields after rain", cssClass: "scene-3" },
      { imageFile: "010-scene-4-v1.webp", alt: "A hoe resting in soft earth", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
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
      ],
      stanzasKo: [
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
    },
    silence: {
      writtenDate: "Published in 1926.",
      deathInfo: ["Lee Sang-hwa died on April 25, 1943."],
      age: "He was 41."
    }
  },
  {
    id: "011",
    slug: "wilderness-yi-yuksa",
    titleEn: "The Wilderness",
    titleKo: "광야",
    authorEn: "Yi Yuksa",
    authorKo: "이육사",
    authorSlug: "yi-yuksa",
    exhibitionType: "full",
    mood: ["resistance"],
    frameSize: "frame-tall",
    moodColor: "mood-candle",
    excerpt: "In the distant dawn of time, when the heavens first opened...",
    galleryImageFile: "011-scene-3-v1.webp",
    youtubeId: "gPrTZCIl_lI",
    scenes: [
      { imageFile: "011-scene-1-v1.webp", alt: "The heavens opening in primordial dawn", cssClass: "scene-1" },
      { imageFile: "011-scene-2-v1.webp", alt: "Mountain ranges rushing toward the sea", cssClass: "scene-2" },
      { imageFile: "011-scene-3-v1.webp", alt: "Snow falling on plum blossoms", cssClass: "scene-3" },
      { imageFile: "011-scene-4-v1.webp", alt: "A white horse rider in the wilderness", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["In the distant dawn of time,", "when the heavens first opened", "and somewhere a rooster's crow was heard—"],
        ["Even when all the mountain ranges", "rushed headlong toward the sea in longing,", "they could not dare trespass upon this place."],
        ["Through endless ages,", "the diligent seasons bloomed and fell,", "until at last the great river carved its path."],
        ["Now snow falls,", "and the plum blossom's fragrance drifts alone, faint and far—", "here I scatter the seeds of my poor song."],
        ["In the eons yet to come,", "a savior on a white horse will arrive", "and sing with all his might in this wilderness."]
      ],
      stanzasKo: [
        ["까마득한 날에", "하늘이 처음 열리고", "어데 닭 우는 소리 들렸으랴"],
        ["모든 산맥들이", "바다를 연모해 휘달릴 때도", "차마 이곳을 범하던 못하였으리라"],
        ["끊임없는 광음을", "부지런한 계절이 피어선 지고", "큰 강물이 비로소 길을 열었다"],
        ["지금 눈 내리고", "매화 향기 홀로 아득하니", "내 여기 가난한 노래의 씨를 뿌려라"],
        ["다시 천고의 뒤에", "백마 타고 오는 초인이 있어", "이 광야에서 목놓아 부르게 하리라"]
      ]
    },
    silence: {
      writtenDate: "Published posthumously, 1946.",
      deathInfo: ["Yi Yuksa died in Beijing Prison,", "January 16, 1944."],
      age: "He was 39."
    }
  },
  {
    id: "012",
    slug: "mountain-flowers-kim-sowol",
    titleEn: "Mountain Flowers",
    titleKo: "산유화",
    authorEn: "Kim Sowol",
    authorKo: "김소월",
    authorSlug: "kim-sowol",
    exhibitionType: "full",
    mood: ["nature"],
    frameSize: "frame-square",
    moodColor: "mood-spring",
    excerpt: "On the mountain, flowers bloom — flowers bloom...",
    galleryImageFile: "012-scene-4-v1.webp",
    youtubeId: "_0ttQm5FnZ8",
    scenes: [
      { imageFile: "012-scene-1-v1.webp", alt: "Mountain flowers blooming in spring", cssClass: "scene-1" },
      { imageFile: "012-scene-2-v1.webp", alt: "Flowers standing alone far off on a mountain", cssClass: "scene-2" },
      { imageFile: "012-scene-3-v1.webp", alt: "A small bird singing among flowers", cssClass: "scene-3" },
      { imageFile: "012-scene-4-v1.webp", alt: "Flowers falling through the seasons", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["On the mountain, flowers bloom—", "flowers bloom.", "Through spring, through summer, endlessly,", "flowers bloom."],
        ["On the mountain,", "on the mountain,", "the blossoming flowers", "stand alone, far off by themselves."],
        ["A small bird singing on the mountain—", "loving the flowers,", "on the mountain", "it makes its home."],
        ["On the mountain, flowers fall—", "flowers fall.", "Through spring, through summer, endlessly,", "flowers fall."]
      ],
      stanzasKo: [
        ["산에는 꽃 피네", "꽃이 피네", "갈 봄 여름 없이", "꽃이 피네"],
        ["산에", "산에", "피는 꽃은", "저만치 혼자서 피어 있네"],
        ["산에서 우는 작은 새요", "꽃이 좋아", "산에서", "사노라네"],
        ["산에는 꽃 지네", "꽃이 지네", "갈 봄 여름 없이", "꽃이 지네"]
      ]
    },
    silence: {
      writtenDate: "Published in 1925.",
      deathInfo: ["Kim Sowol died on December 24, 1934."],
      age: "He was 32."
    }
  },
  {
    id: "013",
    slug: "self-portrait-yun-dongju",
    titleEn: "Self-Portrait",
    titleKo: "자화상",
    authorEn: "Yun Dong-ju",
    authorKo: "윤동주",
    authorSlug: "yun-dongju",
    exhibitionType: "full",
    mood: ["resistance"],
    frameSize: "frame-medium",
    moodColor: "mood-sea",
    excerpt: "I walk around the mountain bend to a lonesome well...",
    galleryImageFile: "013-scene-2-v1.webp",
    youtubeId: "hrc_YudBFTU",
    scenes: [
      { imageFile: "013-scene-1-v1.webp", alt: "A path around a mountain bend", cssClass: "scene-1" },
      { imageFile: "013-scene-2-v1.webp", alt: "Moon and clouds reflected in a well", cssClass: "scene-2" },
      { imageFile: "013-scene-3-v3.webp", alt: "A man's reflection in the water", cssClass: "scene-3" },
      { imageFile: "013-scene-4-v1.webp", alt: "Walking away from the well", cssClass: "scene-4" }
    ],
    poem: {
      stanzasEn: [
        ["I walk around the mountain bend to a lonesome well", "by the rice paddies, and go alone to peer inside."],
        ["In the well, the moon shines bright, clouds drift by,", "the sky opens wide, a blue wind blows, and autumn lives there."],
        ["And there is a man.", "Something about him repels me, and I turn away."],
        ["Walking back, I think—and begin to pity him.", "I return and look again; the man is still there, unchanged."],
        ["Once more he repels me, and I turn away.", "Walking back, I think—and begin to miss him."],
        ["In the well, the moon shines bright, clouds drift by,", "the sky opens wide, a blue wind blows, autumn lives there,", "and like a memory, the man remains."]
      ],
      stanzasKo: [
        ["산모퉁이를 돌아 논가 외딴 우물을 홀로 찾아가선", "가만히 들여다봅니다."],
        ["우물 속에는 달이 밝고 구름이 흐르고 하늘이 펼치고", "파아란 바람이 불고 가을이 있습니다."],
        ["그리고 한 사나이가 있습니다.", "어쩌지 그 사나이가 미워져 돌아갑니다."],
        ["돌아가다 생각하니 그 사나이가 가엾어집니다.", "도로 가 들여다보니 사나이는 그대로 있습니다."],
        ["다시 그 사나이가 미워져 돌아갑니다.", "돌아가다 생각하니 그 사나이가 그리워집니다."],
        ["우물 속에는 달이 밝고 구름이 흐르고 하늘이 펼치고", "파아란 바람이 불고 가을이 있고 추억처럼 사나이가 있습니다."]
      ]
    },
    silence: {
      writtenDate: "Written in 1941.",
      deathInfo: ["Yun Dong-ju died in Fukuoka Prison,", "February 16, 1945."],
      age: "He was 27."
    }
  }
];
