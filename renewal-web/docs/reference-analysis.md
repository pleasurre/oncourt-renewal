# ONCOURT × Waabi — Reference Analysis

- 분석 일자: 2026-10-25 (Asia/Seoul)
- 기준 사이트: Waabi, https://www.waabi.ai/
- 리뉴얼 브랜드: 온코트(구 테친소), https://www.techinso.com/
- 입력 우선순위: 첨부 `custom.md` > 파일에 포함된 `J.영 Design.md` > Waabi에서 관찰한 **패턴** > 임시 구현값. Waabi의 색/폰트 등은 원본 참고자료일 뿐 온코트 사용자 지정값을 덮어쓰지 않는다.
- 상태 정의: **verified** = 사이트 내용/외부 캡처 분석 자료 또는 첨부 문서에서 명시적으로 확인; **needs-check** = 원본 CSS·뷰포트 실측/행동 테스트 불가; **temporary** = 구현을 위해 근거를 기록한 프로젝트 임시값.
- 조사 제한: URL의 공개 HTML 콘텐츠 및 공개 디자인 캡처 설명을 조사했다. 브라우저 DevTools의 computed style, 네트워크 리소스, 실시간 모바일 전환, 애니메이션 타이밍을 실측하지 않았다. 따라서 출처가 없는 수치의 Waabi 실측 주장은 금지한다.

## 1. 기준 레퍼런스 정보

### 확인 페이지
| 유형 | URL | 확인한 구조 | 확인 상태 |
|---|---|---|---|
| Main | https://www.waabi.ai/ | 선언형 Hero → 비전 소개 → 차별점(Safe/Scalable/Practical) → 기술 안내 → 안전 → 파트너·인용 → Insights → Careers CTA → Footer | verified (콘텐츠) |
| About / Company | https://www.waabi.ai/company | 브랜드 역사·창업자 인용·사람·투자자/파트너·소식·위치 | verified |
| Safety | https://www.waabi.ai/safety | 서술형 상단 → 수치 3종 → 핵심 방법론 → 이미지·기술 소개 → CTA | verified |
| Careers | https://www.waabi.ai/careers | 채용 Hero → 미션 → 직원 인용(1/9 표시) → 가치 목록 01–08 → 지원 CTA | verified |
| Insights list | https://www.waabi.ai/insights | 대표 기사 → All Articles → 분류(All/Technology/Company news/Research) → 리스트 → Press | verified |
| Article detail | https://www.waabi.ai/insights/waabi-and-warrior-logistics-partner-on-autonomous-trucking-operations-in-texas | 목록 복귀·공유 → 분류/날짜 → H1 → 작성자 → 긴 본문·인용·이미지 | verified |
| Press | https://waabi.ai/press | 외부 보도·Insights 목록 | verified |
| Technology | 홈에 Explore the tech 링크 존재, 실제 목적지 미확인 | 기술 소개 진입은 확인됨; `/technology` 접근 실패 | needs-check |
| Contact / Form | 전용 `/contact` 페이지 접근 실패 | Footer의 press@waabi.ai / info@waabi.ai 연락처 확인, 별도 문의 폼 확인 안 됨 | needs-check |

### GNB / Footer / 이동
- Waabi Footer에서 Home, Safety, Research, Company, Careers, Insights, Privacy Policy 진입 항목 확인. 실제 GNB 배치·메뉴 토글/모바일 네비게이션 세부 동작은 **needs-check**.
- Main의 `Explore the tech`, `Explore our approach`, `View all`, `Join the team` 링크가 탐색의 중심. 콘텐츠에서 관련 상세/목록으로 이어지는 구조가 관찰됨.
- Footer: 기업/연락처 정보, 페이지 이동, 저작권, 법적 링크. 온코트에서는 홈/대회/블로그, 앱 다운로드, 서비스 관련 안내로 변형.

### 온코트 적용 이유
온코트의 현행 홈페이지는 매칭, 무료, NTRP/매너 리뷰, 대회 및 실제 누적 지표가 강점이다. 하지만 사용자가 공감할 만한 ‘혼자 있는 코트 → 상대를 만나는 순간 → 랠리’라는 브랜드 경험을 사이트의 중심 서사로 강화할 수 있다. Waabi에서 **선언형 히어로·이미지 중심 흐름·개념 → 기능 → 증거 → CTA**라는 정보 구성 원리를 추출한다. Waabi의 기술기업 느낌이나 시각 자산을 복제하지 않는다.

## 2. 한글 콘텐츠 적용 기준

- 출처: `custom.md` 안의 **Base J.영 Design.md Reference**가 현재 접근 가능한 `jy-ux-lab.md` 내용이다. 독립 경로 `/downloads/jy-ux-lab.md`의 실제 별도 파일과 동일성은 검증하지 못했다.
- 문체: 간결하고 구체적인 한국어; 영문 구호를 직역하지 않고 **사용자 혜택 + 명확한 행동**을 앞세운다. 제목은 1개 아이디어, 설명은 1~2문장, CTA는 동사 중심.
- 기능 설명: 실사용 행동 순서 `근처 매칭 찾기 → 날짜·유형 확인 → 상대 실력·매너 확인 → 참여`를 따른다. 현재 온코트 실제 기능과 일치하는 내용만 사용.
- 한글/영문 폰트: English Hero = Manrope 800; Korean body = Pretendard 400; section heading = Manrope/Pretendard 600–800; fallback Noto Sans KR. 사용자 지정 `custom.md`가 base의 Cosmica/Nexon 영문 히어로보다 우선함.
- 한글 제목 줄바꿈은 의미 단위로 제어; 한 행이 지나치게 길어지면 `max-inline-size`를 줄이고 line-height를 1.15~1.3으로 조정한다. **Waabi 원본 대비 크기/행간 변경은 프로젝트 temporary 토큰**으로 기록한다.
- 역할별 문구 예시:
  - Hero eyebrow: `테니스 파트너를 찾는 새로운 방법`
  - Hero title: `FIND YOUR RALLY.`
  - Hero sub: `내 주변에서 함께 칠 사람을 찾고, 다음 경기를 시작하세요.`
  - Primary CTA: `앱 다운로드`
  - The Connection title: `함께할 사람이 생기면, 테니스는 달라집니다.`
  - Find Your Match title: `나에게 맞는 다음 경기.`
  - Feature body: `지역과 일정에 맞는 매칭을 살펴보고, 실력과 매너 정보를 확인하세요.`
  - Trust label: `함께 치기 전, 먼저 확인하세요.`
  - Final CTA: `다음 랠리를 시작하세요.`
- 한국어 카피의 모바일 표시를 확인하고 과도한 영문 디스플레이어의 조형성을 우선하지 않는다.

## 3. Layout System

| 항목 | Waabi 관찰/검증 | 온코트 적용 | 상태 |
|---|---|---|---|
| body/background | 밝은 배경이 주류, 히어로/이미지 영역 대조 | `#F5F3EA` 일반 배경, `#172E28` 어두운 서사 섹션 | Waabi 패턴 verified; 값 custom verified |
| 전체 페이지 최대 폭 | 풀-블리드 이미지 섹션 존재; 정확한 px 확인 불가 | 전체 섹션 `width:100%`, 별도 max-width 없음 | Waabi px needs-check / 적용 temporary |
| content container | 원본 CSS 수치 확인 불가 | `max-width:1200px`, 중앙 정렬 | custom verified |
| margin/padding | 원본 실측 불가 | 모바일 20px / 태블릿 32px / 데스크톱 48px 측면 패딩, 단 콘텐츠 중앙 최대 1200px | temporary |
| desktop grid | 원본 컬럼 수 확인 불가 | 12 columns | custom verified |
| tablet/mobile grid | 원본 확인 불가 | 태블릿 8 / 모바일 4 | temporary (base breakpoint와 일관) |
| gutter | Waabi CSS 확인 불가 | 데스크톱 24px / 태블릿 20px / 모바일 12px | temporary |
| vertical section space | Waabi 실측 불가 | `clamp(80px,10vw,160px)` | base J.영 verified as project baseline; Waabi needs-check |
| heading/body/button space | 원본 실측 불가 | 16/24/32px 계층, title group `clamp(16px,2vw,30px)` | temporary/base |
| cards | Waabi 고정값 확인 불가 | 패딩 `clamp(20px,3vw,32px)`, gap `clamp(12px,1.5vw,24px)` | temporary/base |
| breakpoints | 원본 CSS 확인 불가 | mobile-first 375/480/768/1024/1440px (min-width) | base verified |
| sticky | Waabi 실제 헤더 sticky 여부 검증 불가 | 정적 1차에서는 sticky 불필요, 필요 시 후속 검토 | needs-check |
| full-bleed | 이미지/패럴랙스 콘텐츠 관찰 | Hero, The Connection, Beyond the Match 풀-블리드 | observed pattern + temporary |
| split/asymmetric | 이미지와 카피를 서로 대비하는 구성 | Find Your Match: 5/7 또는 6/6, Why OnCourt: 7/5 비대칭 허용 | temporary |

**컨테이너 해석:** 1200px은 모든 사진/텍스트의 강제 너비가 아니라 정보 컨테이너 한계다. Hero 이미지/영상은 섹션 전체로 확장되며 그 위의 제목·버튼만 1200px 컨테이너의 정렬선에 맞춘다. 본문 읽기 영역 `max-width:680px`은 base 문서 확인값.

**공통 서브페이지 규칙(온코트 MVP에만 적용):** 헤더/푸터 동일 컨테이너, 상단 페이지 타이틀, 목록은 3열(데스크톱)/2열(태블릿)/1열(모바일), 상세는 본문 680px + 선택형 측면 메타, 문의는 단일 컬럼 폼 680px. Waabi에서 이 **정확한 숫자**가 확인된 것은 아니며 적용 temporary.

## 4. Typography System

### 원본 Waabi 현황
- 공개된 UI Discovery의 Waabi 캡처에서는 **Zagma**가 제목과 본문에 사용된 것으로 기록됨(3자 캡처 보고; 공식 computed style 실측 아님).
- **Waabi의 정확한 font-size, font-weight, line-height, letter-spacing, 반응형 스케일은 모두 needs-check.**

### 온코트 확정/임시 글꼴 규칙
| 역할 | font-family | font-size | weight | line-height | letter-spacing | 상태 |
|---|---|---|---|---|---|---|
| English Hero H1 | Manrope, Pretendard, sans-serif | `clamp(58px,7vw,112px)` | 800 | 0.98 | -0.045em | family/weight custom; 나머지 temporary |
| Korean Hero line | Pretendard, Noto Sans KR, sans-serif | `clamp(28px,4vw,52px)` | 600 | 1.2 | -0.025em | temporary |
| Section heading | Manrope, Pretendard, sans-serif | `clamp(32px,5vw,72px)` | 800 | 1.08 | -0.035em | temporary |
| Subtitle | Pretendard, sans-serif | `clamp(18px,3vw,28px)` | 600 | 1.3 | -0.02em | size/spacing base; weight custom |
| Body | Pretendard, Noto Sans KR, sans-serif | `clamp(14px,1.5vw,16px)` | 400 | 1.6 | -0.02em | base/custom |
| Caption/metadata | Pretendard, sans-serif | `clamp(12px,1.2vw,14px)` | 400 | 1.4 | 0 | base-derived/temporary |
| CTA/button | Pretendard, Manrope, sans-serif | `clamp(14px,1.2vw,16px)` | 600 | 1.2 | -0.01em | temporary |
| Page title(sub) | Manrope, Pretendard, sans-serif | `clamp(36px,5vw,64px)` | 800 | 1.1 | -0.035em | temporary |

**조정 이유:** Waabi의 영어 전용 타이포를 그대로 한국어에 적용하면 글자 밀도가 과도할 수 있으므로 설명/한글 타이틀은 line-height 1.2~1.6으로 확보한다. 디스플레이용 영문은 브랜드 개성을 위해 더욱 타이트하게 설정. font-family는 사용자 첨부 명세가 최우선. 폰트는 개발시 로컬 서빙/라이선스 점검; CDN 금지.

## 5. Visual System

| 분류 | Waabi 원본 관찰 | 온코트 결정/출처 |
|---|---|---|
| colors | 제3자 캡처값 `#FFFFFF`, `#FF2C6B`, `#191818`, `#000000` (직접 원본 CSS 확인 불가) | **custom 우선** primary `#172E28`, accent `#E4F35A`, background `#F5F3EA`, surface `#FFFFFF`, text `#252725` |
| border | Waabi 원본 px needs-check | soft border `#D9DFD6` temporary, line 1px base |
| radius | Waabi 원본 needs-check | button 12px, card 16px **custom verified** |
| shadow | 원본 CSS needs-check | none 기본; 과도한 그림자/글로우 금지(base) |
| image ratio | 원본 비율의 정확한 CSS needs-check | full-bleed hero: 16/9 이미지 후보; editorial split: 4/5; card: 3/2 (temporary) |
| image crop | 이미지 패럴랙스 패턴은 콘텐츠에 확인 | `object-fit:cover`, hero 중심·선수 영역에 따라 `object-position` 수동 조정 (temporary) |
| button | 원본 실측 needs-check | 48px 기본/56px 대형, 가로 패딩 16~24px, radius 12px (height/padding base; radius custom) |
| cards | 원본 실측 needs-check | 패딩 20~32px, border 1px soft, radius 16px (temporary + custom) |

컬러 가이드: 라임은 CTA, 랠리/테니스공 궤적, 의미 있는 강조에만 사용. `#E4F35A` 위 흰색 텍스트는 대비 불충분하므로 **짙은 `#172E28` 텍스트를 사용**한다(custom primary + 접근성 우선). base의 '포인트 배경 위 흰색' 지시는 사용자 지정 라임에서 접근성 요구와 충돌하므로 재검토 필요; WCAG 대비를 우선하도록 충돌 사유를 남긴다.

### 이미지 인벤토리·우선순위
1. 온코트 공식 Hero 이미지: https://www.techinso.com/ 의 매칭 앱 목록 이미지(페이지 이미지 alt `온코트 앱 매칭 목록 화면 — 지역·날짜·게임 유형별 테니스 매칭`), Hero/Find Your Match 후보.
2. 온코트 공식 대회 콘솔 이미지: 동일 출처, alt `온코트 대회관리 콘솔 — 코트별 현재 경기와 진행 현황을 보여주는 코트 보드`, Beyond the Match 후보.
3. 온코트 공식 브랜드 변경 이미지: 동일 출처, 이전 이름/온코트 이미지, Brand Story 후보.
4. 운동 장면 실사: 공식 사이트에서 필요한 품질의 원본 미확인 → 추후 정식 자산 확보 우선, 없을 경우에만 이미지 생성; 생성 사유/프롬프트/적용위치 문서화.

**다운로드 상태:** 실행환경에서 `www.techinso.com` 도메인 DNS 접근 실패로 이미지 파일을 직접 내려받지 못함. `img/` 폴더는 준비했으나 이미지를 확보했다고 주장하지 않음. 실제 이미지 원본 URL(직접 파일 링크)은 **needs-check**이며 alt 텍스트는 URL이 아님. 임의 스톡 이미지 사용 금지.

## 6. Section Pattern

| Waabi 패턴 | 온코트 섹션 | 시각 구조/밀도 | 정적 MVP에서의 구현 |
|---|---|---|---|
| Hero: 짧은 선언 + 이미지 패럴랙스 | 01 Hero | 짧은 카피, 큰 글씨, 한 장의 강한 영상/사진, 다운로드 CTA | 정적인 full-bleed hero; 모션 추후 |
| Vision statement | 02 The Problem | 질문/공감 카피 + 빈 코트 이미지, 텍스트 적음 | 한 장의 큰 이미지와 제목 |
| Visual technology/story | 03 The Connection | Alone/Connect/Rally의 3장면, 강한 화면 전환 | 스크롤 모션 없이 3장면 스토리보드 정적 배치 |
| Technology / benefit sections | 04 Find Your Match | 5/7 split; 앱 UI 1~3장·지역/일정/실력 설명 | **섹션명 유지**, 실시간 검색/인터랙티브 데모는 당장 구현하지 않음 |
| Safety/proof + partners | 05 Why OnCourt | NTRP/매너/무료 매칭/정확한 공식 수치; 중간 밀도 | 통계와 신뢰 정보 중심 |
| Expanded story | 06 Beyond the Match | 대회 정보·운영 화면·커뮤니티 사진 | 이미지 중심으로 간결하게 |
| Careers CTA / footer | 07 Final CTA | 명확한 다운로드 링크 및 푸터 | 외부 앱스토어 연결, 일반 footer |

공통 GNB: 로고 + 핵심 섹션 앵커 + `대회`/`블로그` 실제 제공 페이지 링크 + 다운로드. Footer: 이용약관/개인정보/문의 링크 **실제 URL 확인 후만** 노출, 미확인 링크는 만들지 말 것.

### 서브페이지 템플릿 패턴
- **List (Insights):** 상단 핵심 기사 이미지/문구 → 카테고리 필터 → 카드/리스트 → 관련 링크. 온코트 블로그/대회 목록의 선택적 확장 패턴.
- **Detail (Article):** 이전 목록으로 돌아가기 → 카테고리·날짜 → 강한 H1 → 읽기 너비 제한한 본문 → 이미지·인용·공유. 온코트 후기/대회 상세에 선택적으로 재해석.
- **About (Company):** 브랜드 이야기 → 사람/창업자 → 신뢰·이정표 → CTA. 온코트 ‘브랜드 스토리’는 우선 랜딩 섹션으로 통합.
- **Proof (Safety):** 이슈를 수치로 정의 → 방법론 설명 → 이미지 카드 → 자세히 보기. 온코트 실력·리뷰 신뢰 섹션에 적용.
- **Careers:** 대형 Hero → 사람의 목소리 → 가치/문화 → 지원 CTA. 온코트에 동일 채용 페이지 불필요.
- **Contact:** Waabi Footer에는 이메일을 확인했으나 전용 폼 패턴은 검증 못했음. 온코트 전용 문의 폼은 임의 생성 금지.

## 7. 서비스 수준 MVP 페이지 패턴

- **현재 요청의 구현 범위는 랜딩 1페이지**. 서브페이지 분석은 재사용 가능한 규칙과 미래 확장용이며, 서브페이지 전부를 즉시 구현할 필요는 없다.
- Waabi confirmed: Home / Company / Safety / Careers / Insights list / Insights detail / Press. 메뉴 항목 중 Research 링크도 확인되나 구체 URL/구성 needs-check.
- 온코트 실제 사이트 확인: Home, 대회, 블로그 링크와 앱스토어/플레이스토어 다운로드 CTA; 신뢰/매칭/대회 기능은 메인에 표시됨.
- MVP 필수: `/` landing 1개, GNB anchor 7개 구간, 외부 대회/블로그 링크(기존 페이지), 앱스토어/구글플레이 CTA.
- 선택적 다음 단계: `/about` 브랜드 소개, `/matches` 목록 및 상세(실제 API가 없는 한 더미를 실제 서비스로 오인시키지 말 것), `/tournaments` 목록/상세, `/stories` 목록/상세, `/contact` 문의. **기획 후보이며 확정된 추가 구현 범위가 아님.**
- 페이지 타입 토큰: header, footer, page-title, list, detail, form 모두 tokens.json에 정의. 서브페이지 값을 Waabi 실측치처럼 표현하지 않는다.

## 8. 적용 / 변형 / 금지 기준

### 적용(패턴 수준)
- 선언형 헤드라인의 높은 시각적 우선순위
- 큰 이미지와 텍스트/정보 섹션의 리듬 변화
- 비전 → 사용 기능 → 신뢰 근거 → CTA 정보 흐름
- 세부 페이지로 이어지는 명확한 링크 및 공통 footer 구조

### 온코트에 맞게 변형
- Waabi의 AI·모빌리티 시각 언어 → 테니스공 궤적·코트·랠리·플레이어
- 기술 설명 블록 → 매칭 탐색/사용 흐름
- 파트너십 증거 → 공식 가입자·매칭 실적, NTRP·매너 리뷰(수치는 현재 시점 최신 확인 후 사용)
- Zagma(원본 제3자 기록) → 사용자 custom의 Manrope/Pretendard
- 기업 중심 CTA → 실제 앱 다운로드

### 가져오면 안 되는 것
- Waabi의 브랜드 로고, 트럭/AI 그래픽, 분홍색을 온코트의 브랜드 자산처럼 사용하는 것
- Waabi 레이아웃의 픽셀 단위 복제, 출처 없는 정확한 CSS 수치 주장
- 실존하지 않는 플레이어 후기/매칭 실적, 근거 없는 통계
- SaaS형 카드만 반복하는 화면, 과도한 glow/gradient/3D, 임의 스톡 이미지
- 사용자 승인 전 실시간 매칭 기능/서버·DB·가입 플로우 추가
- 현 단계에서 Find Your Match를 삭제하거나 이름을 How It Works로 확정 변경

### AI 임의 추가 금지
- 장식용 떠다니는 테니스공, 움직이는 배경을 임의로 추가하지 않음. 이후 모션 디자인 단계에서 의미와 성능을 검토.
- Figma 캡처/배치/와이어프레임 단계 수행 금지.

## 9. 확인 필요값 및 temporary 토큰

**needs-check (Waabi 원본 검증 미완료):** 실제 CSS font-size/weight/line-height/letter-spacing, 컨테이너 max-width, 그리드/gutter, section padding/gap, 카드 padding/gap, 실제 breakpoints, 이미지 source/ratio/object-position, button height/padding/radius, GNB sticky/모바일 메뉴, 애니메이션 속도·이징, technology/contact 페이지 경로.

**temporary (온코트 구현 시작값):** layout.page-padding(20/32/48), gutter(12/20/24), tablet/mobile columns(8/4), hero/section/page-title type scales, body 대비를 제외한 세부 컬러(border), 16:9·4:5·3:2 이미지 비율, 5/7 split, app UI 쇼케이스 크기/간격, header/footer 높이, list/detail/form 레이아웃, 각 컴포넌트 최소 크기. 출처: custom.md의 1200px·12컬럼·색·radius·폰트와 J.영 base의 clamp·접근성·spacing을 충돌 없이 구현하기 위해 임시 선정.

## 10. 다음 `prd.md` 필수 준수
1. 페이지 1장, 7개 섹션, `Find Your Rally.` 콘셉트 및 **Find Your Match 이름 유지**.
2. 정적 반응형 먼저. Hero/The Connection의 ScrollTrigger 등은 후속 구현 작업으로 분리.
3. Waabi **구조적 원칙**만 사용, 시각 자산·색상은 온코트와 custom.md 우선.
4. `1200px` 컨테이너와 full-bleed 이미지 섹션을 분리; 데스크톱 12컬럼.
5. Manrope 영문(800) / Pretendard 한글(400/600), 컬러 `#172E28 / #E4F35A / #F5F3EA`, radius 버튼12/카드16.
6. 검색·실시간 기능을 구현한 척하지 말고 콘텐츠/앱 화면 쇼케이스와 실제 외부 다운로드 CTA로 제한.
7. 표기 수치·서비스 기능·앱 이미지의 사용 허가/출처와 최신성을 확인.
8. 모든 이미지에 `aspect-ratio`, 적절한 object-fit, 접근성 대체 텍스트를 지정.
9. 모바일 우선 `min-width` 미디어쿼리, 44px 터치 타깃, `prefers-reduced-motion` 고려.
10. CSS 변수는 tokens.json의 `value` 사용; needs-check인 원본 값을 임의로 확정하지 않는다.

## 조사 출처 (2026-10-25)
- Waabi main: https://www.waabi.ai/
- Waabi Company: https://www.waabi.ai/company
- Waabi Safety: https://www.waabi.ai/safety
- Waabi Careers: https://www.waabi.ai/careers
- Waabi Insights: https://www.waabi.ai/insights
- Waabi article: https://www.waabi.ai/insights/waabi-and-warrior-logistics-partner-on-autonomous-trucking-operations-in-texas
- Waabi Press: https://waabi.ai/press
- Capture-based external analysis (not an official CSS audit): https://uidiscovery.com/sites/waabi
- OnCourt: https://www.techinso.com/
- Project custom design rules: user-provided `/mnt/data/custom.md`

## #match 리디자인 적용 — 최신 범위
이번 섹션은 사용자가 선택한 딥그린+미세 텍스처 방향을 기준으로 합니다. 레퍼런스의 절제된 정보 위계와 넓은 여백을 유지하되 테니스 코트 일부를 추상화한 곡선을 직접 SVG로 구성합니다. Waabi의 실측값 또는 자산으로 간주하지 않습니다. 본문 7:5 분할, 서로 구분되는 행/디바이더, 첫 단계에 정지한 공 1개를 사용합니다. SVG의 좌표·선 굵기·공 크기는 이 섹션에 한정한 그래픽 구성값이며 브랜드 토큰 변경이 아닙니다.
