# ONCOURT — 브랜드 경험형 단일 랜딩페이지 PRD

- 문서 버전: v2.0 · 2026-10-25
- **최종 제작 범위: `index.html` 1개만. 서브페이지 HTML 제작 금지.**
- 브랜드: ONCOURT(온코트, 구 테친소) — https://www.techinso.com/
- 기준 레퍼런스: Waabi — https://waabi.ai/
- 입력 문서: `reference-analysis(2).md`, `ONCOURT_tokens_download(2).json`, `custom.md` 및 이전 대화에서 확정한 기획/문제정의/인사이트
- 우선순위: **사용자 최신 지시(랜딩만)** > custom.md > reference-analysis.md / tokens.json > J.영 기본 규칙 > Waabi 관찰 패턴.
- 변경 이력: 기존 reference-analysis.md의 '랜딩 1페이지' 결정을 유지한다. 이전 단계에서 제시되었던 다중 페이지 정적 MVP 기획은 **폐기**한다.
- **범위 잠금:** 하나의 랜딩페이지, 7개 본문 섹션, 공통 GNB/Footer. 다음 섹션 이외 추가·삭제·순서 변경은 PRD 승인 후 개정하여 진행.
- 1차 구현: **정적 반응형 HTML/CSS**, 필수 링크·모바일 메뉴에 한한 최소 JS. GSAP, 인터랙티브 검색/매칭, 서버·DB는 후속 단계.

## 1. 프로젝트 개요

| 항목 | 요구사항 |
|---|---|
| 브랜드명 | ONCOURT / 온코트 |
| 프로젝트 정의 | 기능적 테니스 매칭 서비스를 '함께 플레이하는 즐거움'이라는 브랜드 경험으로 전달하는 반응형 웹 리뉴얼 |
| 리뉴얼 목적 | 브랜드 첫인상 강화, 매칭 이용 흐름 이해, 실력/매너 기반 신뢰 형성, 앱 다운로드 유도 |
| 핵심 문제 | 온코트는 서비스의 기능적 가치를 전달하지만 테니스를 통해 연결되는 즐거움과 확장된 브랜드 정체성을 일관된 웹 경험으로 표현할 여지가 있다. 기능 부재보다 브랜드 가치 → 사용자 이해 → 전환 행동 사이 연결이 과제다. |
| 콘셉트 | **Find Your Rally. — 당신의 랠리를 함께할 사람을 만나다.** |
| 솔루션 | ① 시네마틱 Hero ② '혼자→파트너 등장→랠리' Connection 스토리 ③ 사용 순서대로 매칭 가치 소개 ④ NTRP·매너·공식 지표에 근거한 신뢰 ⑤ 앱 다운로드 CTA |
| 기대 결과 | 브랜드 인지, 서비스 이해, 신뢰감, 다운로드 경로 발견성 개선이라는 **검증 전 가설** |
| 비범위 | 서브페이지, 목록/상세 템플릿, 문의 폼, 회원가입/로그인, 실시간 매칭, 가상의 대회·후기, 결제 및 백엔드 |

## 2. 타깃 사용자와 사용 맥락

- **핵심 타깃(기획 가설):** 지역·시간·실력이 맞는 테니스 상대를 찾고 싶은 취미 플레이어. 처음 만나는 플레이어의 매너·실력 확인이 중요함. 20~30대는 설계 가설이지 실제 이용자 통계가 아님.
- **첫 화면에서 먼저 이해할 정보:** '온코트는 함께 테니스할 상대를 찾도록 돕는 서비스', '앱으로 이용', '다운로드가 주요 행동'. 감성 카피만 단독 노출 금지.
- **스크롤하며 확인할 정보:** 파트너 필요 상황 → 사람과 연결되는 가치 → 지역/일정/실력 기반 매칭 흐름 → NTRP·매너와 실제 공식 신뢰 근거 → 대회까지 이어지는 활동.
- **최종 CTA:** 확인된 App Store 또는 Google Play의 실제 온코트 다운로드 링크 클릭. 공식 URL을 확보하지 못하면 임의 URL/`#` 링크 금지, 공개 전 검증 필요 표시.
- **핵심 UX 동선:** Hero → The Problem → The Connection → Find Your Match → Why OnCourt → Beyond the Match → Final CTA. 모든 구간은 같은 문서 내 앵커로 이동.

## 3. 전체 사이트맵 및 페이지 목록 — 확정

```text
index.html  ONCOURT Home
├─ #hero              01 Hero
├─ #problem           02 The Problem
├─ #connection        03 The Connection
├─ #match             04 Find Your Match
├─ #why-oncourt       05 Why OnCourt
├─ #beyond            06 Beyond the Match
└─ #download          07 Final CTA
    └─ Footer (같은 index.html 안의 공통 푸터)

GNB: Logo → #hero | ONCOURT → #connection | 매칭 → #match | 신뢰 → #why-oncourt | 대회 → #beyond | 다운로드 → #download
Footer: 본 페이지 섹션 앵커, 검증된 공식 다운로드/이용약관/개인정보/문의 외부 링크(존재 확인 시에만)
```

| 구분 | 파일명 | 페이지명 | 목적 | 핵심 콘텐츠 | 연결되는 GNB/Footer | 필요한 하위/상세 페이지 | CTA |
|---|---|---|---|---|---|---|---|
| Main | `index.html` | ONCOURT Home | 브랜드 경험 → 매칭 이해 → 신뢰 → 다운로드 | 7개 고정 섹션, 앱 UI 및 테니스 이미지, 공식 신뢰 요소 | 동일 페이지 앵커 GNB/Footer | **없음(서브페이지 제작 금지)** | 다운로드 및 섹션 이동 |

**디자인 원칙:** 단일 페이지라도 정보량을 Hero/Story/CTA의 3개 블록으로 축소하지 말 것. 매칭 기능 소개, 신뢰, 서비스 확장까지 **7개 섹션 전체** 구현.

## 4. 페이지별 기능 요구사항

| 파일명 | 페이지 역할 | 필요한 섹션 (순서 고정) | 필요한 이미지 | 필요한 카피 | 적용할 tokens.json 항목 | 완료 기준 |
|---|---|---|---|---|---|---|
| `index.html` | 브랜드 경험형 단일 랜딩 | **Hero → The Problem → The Connection → Find Your Match → Why OnCourt → Beyond the Match → Final CTA → Footer** | Hero 테니스 실사, 빈 코트, Alone/Connect/Rally 이미지, 공식 매칭 앱 스크린, NTRP/매너 관련 실제 자료, 공식 대회 UI/실사 | 영어 디스플레이 헤드라인, 한국어 역할 설명, 문제 공감, 연결의 가치, 매칭 행동 순서, 신뢰의 이유, 대회 소개, 앱 다운로드 CTA | `color.*`, `typography.*`, `layout.*`, `spacing.*`, `radius.*`, `image.*`, `component.button`, `component.header`, `component.footer`, `breakpoint.*` | 7개 섹션 모두 존재; 정적인 상태에서도 이야기가 이해됨; 작동하는 앵커/모바일 메뉴/다운로드 링크; 반응형·접근성 QA 통과 |

### 고정 섹션별 상세 요구

| 순서 / ID | 제목 | 정보 목적 | 정적 구성 및 콘텐츠 밀도 | CTA/링크 |
|---|---|---|---|---|
| 01 `#hero` | **Find Your Rally.** | 감성과 서비스 정의 동시 전달 | Full-bleed 테니스 비주얼 + 커다란 영문 H1 + 한글 서비스 설명 1~2문장 | 앱 다운로드 / 매칭 알아보기(`#match`) |
| 02 `#problem` | **The Problem** | 함께 칠 상대가 없는 상황에 공감 | 빈 코트 실사 + 짧은 공감 카피, 텍스트 밀도 낮음 | 다음 섹션 스크롤 안내(링크 선택) |
| 03 `#connection` | **The Connection** | 사람 사이 연결의 가치 전달 | Alone → Connect → Rally 3장면을 **정적 스토리보드**로 제공; 페이지 스크롤 인터랙션은 후속 | `#match` 앵커 선택 |
| 04 `#match` | **Find Your Match** | 매칭 이용 흐름을 브랜드 경험으로 설명 | 딥그린 배경, 01–04 세로 단계, 곡선 코트 경로와 첫 단계에 놓인 테니스공. 7:5 정적 구성. 앱 목업 제거. | `#download` 텍스트 CTA |
| 05 `#why-oncourt` | **Why OnCourt** | 첫 매칭에 대한 불안 해소 | NTRP, 매너/리뷰, 무료 매칭 관련 확인된 정보, 최신성이 검증된 공식 통계만 사용; 가짜 후기·숫자 금지 | 앱 다운로드 |
| 06 `#beyond` | **Beyond the Match** | 매칭에서 대회 참여까지의 확장성 | 공식 대회 운영/참가 이미지와 짧은 설명, 큰 에디토리얼 이미지 | 확인된 공식 대회 URL로 이동할 수 있음(선택, 새 HTML 금지) |
| 07 `#download` | **Final CTA — See You On Court.** | 앱 설치 유도 | 전환을 방해하지 않는 명료한 CTA, 앱스토어별 공식 연결, 필요 시 공식 앱 화면 | 공식 App Store / Google Play |

### 공통 GNB / Footer

- GNB는 한 문서 내 **앵커 링크**로만 주요 섹션을 연결한다. 로고는 `#hero`로 이동한다.
- Footer는 본문 아래 위치하고 페이지 내 앵커 및 **존재를 확인한** 공식 외부 링크만 제공한다.
- `about.html`, `service.html`, `contact.html`, 리스트/상세 등 **그 어떤 HTML도 현재 범위에 없음**.
- 스크롤 모션이 없어도 콘텐츠 순서만으로 충분히 읽히도록 제작한다.

## 5. 단일 페이지 제작 기준 및 범위 관리

1. 오직 `index.html`만 생성한다. 모바일 화면은 **같은 HTML의 반응형 버전**이며 새 페이지가 아니다.
2. 메뉴는 `#hero`, `#connection`, `#match`, `#why-oncourt`, `#beyond`, `#download`에 연결한다. `#problem`도 문서 내 유효 ID를 유지한다.
3. 외부 공식 서비스(대회 페이지, 앱스토어 등)는 검증된 URL에만 링크를 둔다. 별도 자체 제작 서브페이지는 생성하지 않는다.
4. 매칭 UI는 정적 이미지/콘텐츠 쇼케이스다. 조건 선택, 결과 카드 변형, 가짜 실시간 매칭을 현 단계에서 구현하지 않는다.
5. Hero와 Connection의 동적 랠리/서브 모션은 **추후 디자인 평가 후** 추가한다. PRD 내 정적 장면만 필수다.
6. 페이지 추가·삭제 또는 섹션 추가·삭제는 사용자의 명시적 요청에 따라 PRD를 먼저 수정한다.
7. 원본 자산이 확보되지 않았을 때 공식 서비스 화면을 임의로 새로 그려 실제 기능인 양 표시하지 않는다.

## 6. 레퍼런스 적용 기준

### 레이아웃과 간격

- Waabi에서 **선언형 큰 Hero → 브랜드 스토리 → 기능/서비스 → 근거 → CTA** 정보 흐름, 큰 이미지와 절제된 정보영역의 교차를 참고한다. 픽셀 단위 복제 금지.
- 컨테이너 `max-width: 1200px` (**custom 확정**), 데스크톱 **12컬럼** (**custom 확정**). Hero/The Connection/Beyond the Match의 배경은 **full-bleed 100%**, 텍스트만 정렬 컨테이너 기준.
- 본문 최대 `680px`(J.영 기본 기준), 섹션 상하 `clamp(80px, 10vw, 160px)`(기본 기준).
- responsive: mobile-first / `min-width`, 375·480·768·1024·1440px (`breakpoint`).
- temporary: 좌우 모바일/태블릿/데스크톱 `20/32/48px`, 4/8/12 그리드, gutter `12/20/24px`, 카드 간격 `clamp(12px,1.5vw,24px)`.
- 카드 패딩 `clamp(20px,3vw,32px)`; 과도한 반복 카드형 SaaS 디자인 금지.
- 이미지 비율 temporary: Hero `16/9`, editorial `4/5`, card `3/2`, `object-fit:cover`. 반응형에서 인물이 잘리지 않게 이미지별 초점 조정.

### 타이포와 컬러 (`tokens.json`의 value 사용)

| 용도 | 글꼴 | size | weight | line-height | letter-spacing |
|---|---|---|---|---|---|
| Hero 영문 | Manrope | `clamp(58px, 7vw, 112px)` | 800 | 0.98 | -0.045em |
| Hero 한글 | Pretendard | `clamp(28px, 4vw, 52px)` | 600 | 1.2 | -0.025em |
| Section title | Manrope / Pretendard | `clamp(32px, 5vw, 72px)` | 800 | 1.08 | -0.035em |
| Body | Pretendard | `clamp(14px, 1.5vw, 16px)` | 400 | 1.6 | -0.02em |
| Caption | Pretendard | `clamp(12px, 1.2vw, 14px)` | 400 | 1.4 | 0 |
| CTA | Pretendard | `clamp(14px, 1.2vw, 16px)` | 600 | 1.2 | -0.01em |

- 사용자 컬러 확정: primary `#172E28`, accent `#E4F35A`, background `#F5F3EA`, surface `#FFFFFF`, text `#252725`; button radius **12px**, card radius **16px**.
- 라임색 버튼 위 텍스트는 대비를 위해 `#172E28` 사용. Waabi의 분홍색/트럭/로고/3D 자산을 재사용하지 않음.
- 원본 Waabi 실제 font-size, line-height, 애니메이션 시간, 그리드 실측치 등 `needs-check` 값은 정답인 것처럼 기재하거나 CSS에 사용하지 않는다.
- `temporary` 토큰은 정적 1차 구현 시작값이며, 수정 시 PRD 및 토큰 파일 변경 기록을 함께 남긴다.
- 글꼴은 로컬 자산 이용(권리 확인), 외부 CDN 강제 사용 금지.

## 7. 이미지 사용 계획

### 공식 온코트 이미지 우선 확보 목록

| 제안 파일명 | 원본 위치/출처 | 적용 섹션 | 상태/규칙 |
|---|---|---|---|
| `img/oncourt-matching-ui.webp` | https://www.techinso.com/ 내 매칭 목록 스크린샷 | `#match` | 직접 이미지 URL·고해상도 원본 **needs-check**, 출처 기록 |
| `img/oncourt-tournament-console.webp` | https://www.techinso.com/ 내 대회 콘솔 이미지 | `#beyond` | 직접 파일 URL **needs-check** |
| `img/oncourt-brand-transition.webp` | https://www.techinso.com/ 내 온코트 브랜드 이미지 | 필요할 때 `#connection` (브랜드 변경 그래픽은 참고용) | 직접 원본 URL **needs-check** |
| `img/oncourt-logo.*` | 온코트 공식 브랜드 로고 | GNB/Footer | 원본 URL·사용 허가 확인 |
| `img/oncourt-trust-ui.webp` | 공식 NTRP/매너 리뷰 관련 앱 UI, 확인된 경우에만 | `#why-oncourt` | 원본 여부 확인 전 임의 재구성 금지 |

### 공식 이미지 부족 시 생성 *후보* (현재 생성 금지)

| 후보 파일명 | 섹션 | 필요한 장면 | 생성 조건 |
|---|---|---|---|
| `img/hero-tennis.webp` | `#hero` | 영화적인 테니스 플레이 장면, 자연광, 인물 동작, 여백 있는 구도 | 공식 사용 가능 원본 없음이 확인되고 사용자가 이미지 제작 승인할 때 |
| `img/empty-court.webp` | `#problem` | 상대편이 비어 있는 실제 코트, 공감형 시선 | 동일 |
| `img/connection-alone.webp` | `#connection` | 한 사람의 플레이어 | 동일 |
| `img/connection-partner.webp` | `#connection` | 상대편 플레이어 등장 | 동일 |
| `img/connection-rally.webp` | `#connection` | 같은 구도의 랠리 연출 | 동일 |
| `img/tournament-life.webp` | `#beyond` | 실제 테니스 대회/모임의 분위기 | 동일 |

- 임의 스톡 이미지 우선 사용 금지. 이미지마다 자산 장부에 `filename`, `source_page_url`, `direct_original_url`(확인 시), `license/permission`, `created_reason`, `applied_section`, `alt`를 기록.
- 기존 분석에서 이미지 다운로드를 완료하지 못한 상태이므로 **다운로드 완료로 표현하지 않는다**. 자산 확보가 안 된 상태에서 정적 사이트를 만들 경우 구체적인 대체·보류 표시로 구분하고 이미지 파일을 만든 척하지 않는다.
- 스크린샷을 서비스의 실제 실시간 매칭 결과로 오인시키지 않는다.

## 8. 완료 기준 및 다음 단계 계약

### 반드시 제작할 파일

```text
index.html
css/style.css
js/script.js
img/             # 원본 검증 이후 실제 사용 자산
```

**필수 HTML 파일은 오직 `index.html` 한 개다.** 다른 HTML 페이지가 없어도 본 PRD의 완료 조건에 부합한다.

### 섹션 필수 체크

- [ ] Hero — 영어/한글 메시지, Full Bleed 테니스 이미지, CTA
- [ ] The Problem — 혼자 플레이하는 상황/공감 카피
- [ ] The Connection — Alone/Connect/Rally 정적 3장면
- [ ] Find Your Match — 기존 섹션명 유지, 서비스 이용 단계 및 공식 앱 UI
- [ ] Why OnCourt — NTRP/매너/무료 매칭, 검증된 공식 근거
- [ ] Beyond the Match — 대회 참여/운영의 확장 가치
- [ ] Final CTA — 확인된 앱 다운로드 링크
- [ ] Footer — 기존 페이지 앵커 및 검증된 외부 링크

### `css/style.css`에 선언할 token 기반 CSS 변수

- 색상: `--color-primary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`, `--color-accent-foreground`, `--color-border`.
- 폰트: `--font-display-en`, `--font-body-ko`, `--font-weight-regular`, `--font-weight-semibold`, `--font-weight-extrabold`, `--type-hero-size`, `--type-section-title-size`, `--type-body-size`, `--type-caption-size`, `--type-hero-line-height`, `--type-hero-letter-spacing`.
- 컨테이너/간격: `--container-max-width`, `--body-text-max-width`, `--section-padding-block`, `--heading-body-gap`, `--component-gap`, `--card-padding`, `--gutter-mobile`, `--gutter-tablet`, `--gutter-desktop`, `--page-padding-mobile`, `--page-padding-tablet`, `--page-padding-desktop`.
- 구성: `--button-radius`, `--card-radius`, `--button-height-md`, `--button-height-lg`, `--image-hero-ratio`, `--image-editorial-ratio`, `--image-card-ratio`.
- 구현 시 모든 변수는 첨부 `tokens.json` 내 동일한 의미의 `.value`에서 가져온다. 값이 존재하지 않으면 멋대로 생성하지 않고 누락 상태를 기록한다.

### `js/script.js` 최소 동작

1. 모바일 메뉴 열기/닫기 및 `aria-expanded` 상태 갱신(모바일 메뉴가 CSS만으로 접근 가능하면 JS 최소화).
2. 같은 페이지 앵커 링크가 올바른 위치로 이동하도록 지원(네이티브 링크 우선).
3. 다운로드/공식 외부 링크는 실제 검증한 주소로만 이동.
4. 모션이 없는 1차 정적 구현에서 자동 스크롤, GSAP, 필터, 가짜 매칭 데모 추가 금지.

### 모바일 QA

- [ ] 최소 320px 뷰포트부터 가로 스크롤/잘림 없음; 375/480/768/1024/1440에서도 확인.
- [ ] `min-width` 기반 mobile-first 미디어쿼리, 디스플레이 한글/영문 줄바꿈 점검.
- [ ] CTA와 메뉴의 터치 영역 최소 44×44px.
- [ ] 이미지 `aspect-ratio`, `object-fit`, `object-position` 점검, 얼굴·라켓 잘림 확인.
- [ ] 텍스트와 배경색 대비, 키보드 내비게이션, 포커스 표시, `prefers-reduced-motion` 고려.
- [ ] 외부 링크는 유효 URL만 노출, `#` 가짜 CTA 없음.

### 다음 `copy-strategy.md`에서 작성할 카피

| 섹션 | 카피 항목 |
|---|---|
| Hero | 영문 헤드라인, 한글 한 줄 정의, 소개 1~2문장, 다운로드 CTA, 아래 스크롤 안내 |
| The Problem | 문제 제기 질문, 공감형 제목, 보조 설명 |
| The Connection | Alone / Connect / Rally 단계별 한 줄, 감정적 브랜드 가치 문장 |
| Find Your Match | 섹션 제목 유지, 단계별 3~4개 캡션, 기능 설명, 다운로드 CTA |
| Why OnCourt | 신뢰 핵심 카피, NTRP/매너/무료 매칭 설명, 출처·검증된 숫자 레이블 |
| Beyond the Match | 매칭에서 대회로의 확장 메시지, 짧은 설명, 선택적 공식 외부 링크 CTA |
| Final CTA | 전환형 헤드라인, 동기 부여 문장, 앱스토어 별 버튼 레이블 |
| GNB/Footer | 메뉴 레이블, 링크 접근성 이름, 정책/문의 외부 링크명(검증된 것만) |

## 변경 금지 요약

**1개 HTML + 7개 섹션 + Find Your Match 유지 + Waabi 구조적 참고 + 1200px/12컬럼/Manrope·Pretendard/사용자 컬러·라운드 + 정적 반응형 우선**. 추가 페이지/섹션 또는 인터랙션은 사용자 요청 후 PRD 수정 시에만 진행한다.

## 04 Find Your Match — 최신 사용자 요청 반영
- 기존 앱 목업 split 대신 딥그린 단색/미세 그레인과 4단계 에디토리얼 행을 사용합니다.
- 레이블 04 / FIND YOUR MATCH는 이 섹션에만 복원합니다. 다른 섹션의 레이블은 복원하지 않습니다.
- `.match-step.is-active`는 01 고정입니다. SVG `.match-path`, `.match-ball`, `.match-marker`는 추후 모션 연결용입니다.
- 실제 스크롤/드래그 애니메이션은 이번 범위에 없습니다. SCROLL TO ROLL은 향후 연출을 암시하는 정적 디자인 카피이며 조작 가능한 컨트롤이 아닙니다.
- 나머지 6개 섹션, GNB, Footer, 컬러 토큰은 최신 구현 그대로 보존합니다.
