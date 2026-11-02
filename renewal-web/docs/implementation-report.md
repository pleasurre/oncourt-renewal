# ONCOURT 정적 랜딩페이지 구현 및 검수 보고서

2026-10-25 · 1차 구현 · 이미지 일부 보완 필요

## 1. 작성한 파일 목록

- `index.html`: 랜딩 1장, 7개 섹션, 공통 GNB/Footer.
- `css/style.css`: 토큰 선언, 역할별 타이포, mobile-first 반응형, 접근성.
- `css/fonts.css`: Pretendard Variable / Manrope Variable base64 임베딩. HeroTitleFont 영문/한글 unicode-range 분리.
- `js/script.js`: 모바일 메뉴, Escape 닫기, 선택 후 닫기, 반응형 전환 시 상태 초기화, 섹션 등장.
- `fonts/`: 임베딩 원본. `licenses/`: 두 폰트의 OFL 라이선스.
- `docs/jy-ux-lab.md`: custom.md 내 Base J.영 Design.md Reference 추출본. 별도 원본과 동일성을 주장하지 않음.
- `img/`: 공식 이미지 4개. 아래 6번 참조.
- `README.md`: 실행 방법과 남은 작업.

입력 PRD 및 토큰 원본은 수정하지 않았음. 원본 준비 ZIP과 별도로 구현 결과 패키지를 작성함.

## 2. reference-analysis.md에서 반영한 디자인 기준

| 항목 | 구현 |
|---|---|
| 레이아웃 | 선언형 Hero → 공감 → 연결 → 서비스 → 신뢰 → 확장 → 다운로드 |
| 타이포 | Manrope 800 영문 디스플레이 / Pretendard 한글 본문·제목. Hero와 본문 크기 대비 |
| 여백·컨테이너 | 정보 컨테이너 1200px, 본문 최대 680px, 섹션 상하 clamp(80px,10vw,160px) |
| 이미지 비율 | Hero 16:9 영역에 cover, 공식 앱 화면 966:1327 및 콘솔 16:9 원본 비율 보존, 로고 1000:326 |
| 섹션 리듬 | 실사 full-bleed → 밝은 텍스트 비대칭 → 짙은 스토리보드 → 5:7 앱 split → 가로 정보 행 → 큰 콘솔 이미지 → 라임 CTA |
| 무드 | Minimal / Spacious / Editorial. 그라디언트·장식 아이콘·가상 후기·수치 없음 |

Waabi 원본 CSS 실측을 완료한 것처럼 표현하지 않음. 프로젝트 temporary 토큰을 그대로 사용함.

보완: Problem의 빈 코트 이미지와 Connection의 실제 3장면이 미확보되어, 해당 섹션의 텍스트/정적 순서만 구현됨. 따라서 이미지 중심 서사는 아직 완전 충족이 아님.

## 3. tokens.json에서 CSS variable로 옮긴 항목

- 컬러: primary #172E28 / accent #E4F35A / background #F5F3EA / surface #FFFFFF / text #252725 / border / inverse.
- 폰트: display-en, body-ko, 400·600·800, Hero/hero-ko/section-title/subtitle/body/caption/CTA 크기·행간·자간.
- 간격: section padding·gap, heading-body gap, component/card gap, card padding.
- 컨테이너: 1200px, body 680px, page padding 20/32/48px.
- 그리드: 4/8/12 컬럼 값, gutter 12/20/24px, split 5fr 7fr. 섹션에서는 목적에 따라 5:7·7:5·균등 3열을 사용.
- 이미지: 16:9 / 4:5 / 3:2 비율 토큰 및 cover/center. 실제 앱 화면은 내용 잘림 방지를 위해 원본 비율 적용.
- 컴포넌트: 버튼 48/56px, 최소 타깃 44px, 버튼 radius 12px / 카드 16px, header/footer.
- 반응형: 375/480/768/1024/1440px 값과 min-width 규칙. CSS custom property를 미디어쿼리 조건에 직접 쓸 수 없어 같은 값을 리터럴로 작성.
- `needs-check`인 Waabi 측정값은 CSS로 가져오지 않음.
- z-index와 모션 시간은 토큰에 수치가 없어 구현 보조값으로 명시: header 20 / UI 180ms / 등장 500ms. 원본 토큰 변경 없음.

## 4. PRD의 사이트맵과 페이지 구조

`index.html` 하나: #hero → #problem → #connection → #match → #why-oncourt → #beyond → #download → Footer.

서브·상세페이지: 해당 없음. PRD가 명시적으로 제작을 금지하므로 일반 프롬프트의 다중 페이지/GNB 지시보다 단일 페이지 범위를 적용. GNB/Footer는 유효한 내부 앵커로 연결. 공식 대회/스토어만 외부 링크.

## 5. copy-strategy.md에서 반영한 카피

| 구간 | 반영한 핵심 카피 |
|---|---|
| Hero | FIND YOUR RALLY. / 당신의 랠리를 함께할 사람을 만나다. / 함께 테니스할 파트너를 찾는 앱, 온코트. |
| Problem | 치고 싶은 날, 함께할 사람이 없다면? |
| Connection | BETTER TOGETHER. / 함께할 사람이 생기면, 테니스는 달라집니다. / ALONE·CONNECT·RALLY 3단계 설명 |
| Match | FIND YOUR MATCH. / 나에게 맞는 다음 경기. / 내 주변 → 일정·경기 유형 → 실력·매너 → 앱에서 참여 |
| Trust | PLAY WITH CONFIDENCE. / 실력 정보를 확인하고 / 매너도 살펴보고 / 부담 없이 시작하도록 |
| Beyond | BEYOND THE MATCH. / 일상의 한 경기에서, 더 큰 코트로. |
| Download | SEE YOU ON COURT. / 다음 랠리를 시작하세요. |
| CTA | 앱 다운로드 / 매칭 알아보기 / 앱에서 매칭 살펴보기 / 온코트 시작하기 / 대회 알아보기 / App Store에서 받기 / Google Play에서 받기 |

무료 안내는 공식 홈페이지 및 App Store 설명에 근거해 매칭 수수료와 실제 운동 비용을 구분함. 허구의 숫자·후기 미사용. 영문/한글은 동시에 읽히는 정적 노출. 언어 교차 효과는 PRD의 정적 우선 기준에 따라 생략.

## 6. 사용한 이미지와 필요한 이미지

| 파일 / 크기 | 위치 | alt |
|---|---|---|
| img/oncourt-tennis.jpg / 1920×2400 | Hero | 클레이 코트에서 라켓을 들고 리턴을 준비하는 테니스 플레이어 |
| img/oncourt-matching-ui.png / 966×1327 | Match | 지역, 날짜, 경기 유형과 NTRP 정보를 표시하는 온코트 공식 앱 매칭 목록 |
| img/oncourt-tournament-console.png / 1600×900 | Beyond | 코트별 현재 경기와 진행 현황을 보여주는 온코트 공식 대회 운영 코트 보드 |
| img/oncourt-logo.png / 1000×326 | Footer | 온코트 공식 로고 |

GNB 좌측은 공식 로고 이미지 원본을 사용. 우측 ONCOURT 메뉴는 사용자 요청에 따라 삭제(2026-10-26).

공식 출처:
- https://www.techinso.com/images/etc/bg1.jpg
- https://www.techinso.com/images/seo/matching-mobile.png
- https://www.techinso.com/images/cups/court-board.png
- https://www.techinso.com/images/seo/techinso-logo.png

공식 홈페이지에 연결된 원본을 로컬에 확보함. 재사용 허락이나 공개 배포 라이선스까지 확보한 것은 아님. 포트폴리오 공개 전 권리 확인 필요. 비공식 리디자인 고지 포함.

추가 필요한 이미지: ① 빈 코트 실사 ② 동일 인물·동일 코트의 Alone ③ 파트너 등장 Connect ④ 두 사람이 랠리하는 Rally. NTRP/매너 공식 UI는 선택 보완. 대회 현장 실사도 다음 단계 후보. 임의 스톡/AI 이미지 생성 없음.

## 7. 전체 페이지 링크 확인 결과

- GNB/Footer/CTA 내부 앵커 대상 존재 확인. `href="#"` 없음.
- 모바일 메뉴에서 매칭 선택 후 #match 상단 약 20px 위치로 이동하고 메뉴 닫힘 확인.
- App Store: https://apps.apple.com/kr/app/id6751803003 — 공식 사이트 링크 및 스토어 앱 이름 확인.
- Google Play: https://play.google.com/store/apps/details?id=com.billions.techinso — 공식 사이트 링크 및 스토어 앱 이름 확인.
- 대회: https://www.techinso.com/cups — 공식 사이트의 대회 링크.
- 법적 링크는 공식 URL 확인 자료가 없어 임의 추가하지 않음.
- 리스트→상세 연결: PRD 범위에 없으므로 해당 없음.

검증 출처 및 확인일: 공식 홈페이지, App Store, Google Play / 2026-10-25. 공유 ChatGPT URL은 열기 실패하여 근거로 쓰지 않음.

## 8. 모바일·반응형 및 자체 확인 결과

브라우저 iframe의 실제 내부 viewport를 지정해 경계를 측정함. 390·430px은 모바일 화면과 메뉴 동작 검수도 진행. 768·1024·1440·1740px은 전체 텍스트 요소 경계/문서 폭을 검사함. 실물 기기·다른 브라우저 호환성 검증과는 구분함.

| 기준 | 결과 |
|---|---|
| 390px / 430px | 문서 폭=viewport, 텍스트 가로 넘침 없음 |
| 768px | 문서 폭=viewport, 텍스트 가로 넘침 없음 |
| 1024px / 1440px / 1740px | 문서 폭=viewport, 텍스트 가로 넘침 없음 |
| 추가 320px | 문서 폭=viewport, 텍스트 가로 넘침 없음 |
| 메뉴 | 열기/닫기, aria-expanded true/false, 링크 선택 후 닫힘 확인 |
| 이미지 | 실제 원본 파일 확인, 앱/콘솔 contain으로 UI 잘림 방지. Hero는 cover로 의도적 크롭 |
| 접근성 | 한국어 lang, 제목 ID/aria-labelledby, nav, 링크/버튼 의미, alt, skip link, focus-visible, 44px 타깃 |
| 폰트 | 로컬 원본/라이선스 포함, base64 임베딩, 외부 CDN 없음 |
| JS | node --check 통과 |
| 무모션 | prefers-reduced-motion reduce에서 smooth scroll/transition 제거, reveal 표시 보장. 코드 검수; OS 설정 전환 시험은 미실시 |
| JS 비활성화 | 기본 CSS에서 내용/메뉴 표시, JS 활성 시에만 토글 방식. 코드 검수 |
| reference 반영 | 구조·컬러·타입·간격 반영. 미확보 서사 이미지 보완 필요 |
| tokens 반영 | 사용 가능한 토큰 CSS 변수 변환 완료 |
| PRD 반영 | 단일 HTML·7개 섹션·순서·앵커 유지 |
| copy 반영 | 핵심 카피/4단계 이용 절차 반영 |
| jy-ux-lab 반영 | custom에 포함된 기준 적용, 프로젝트 지정 폰트·컬러 우선 |
| 전체 페이지 | index.html 1개, 서브/상세 해당 없음 |

등장 효과는 최소 opacity/translate만 사용하며, GSAP·실시간 검색·가짜 매칭 기능 없음. 자동 언어 교차 없음. 키보드 Escape와 외부 클릭 닫기는 구현 및 코드 검수.

## 9. 다음 단계에서 판단할 항목

1. **12단계 정적 검수:** 빈 코트와 Connection 3장면 확보 후 공감→만남→랠리의 시각적 연결 확인. 현재 텍스트 중심 Connection은 레퍼런스의 이미지 몰입감보다 부족함.
2. **13단계 디자인 고도화:** Hero 인물/타입 간 거리, Problem 이미지 비중, Connection 장면 비율, 앱 쇼케이스의 크기와 여백을 검토. 현재 토큰은 유지하며 변경 승인 시 토큰 기록도 갱신.
3. **모바일 개선 후보:** Hero 영문과 인물 위치가 가까우므로 모바일 전용 촬영/크롭을 검토. 앱 화면의 작은 텍스트는 이미지 내부 요소이므로 실제 앱에서 확인하도록 유도하고, 콘솔은 내용 확인보다 확장성 소개 역할에 집중.
4. **카피 검수:** 한국어 Hero의 길이, 무료 안내 표현, 브랜드 공식 문구와 리디자인 제안안 구분을 확인.
5. **이미지 제작:** 위 4개 서사 장면의 촬영/제작 방향 승인 후 확보. 자동 생성하지 않음.
6. **인터랙션:** 정적 디자인 확정 후 Hero 및 Connection의 랠리 전환, 선택적 언어 교차 노출, 스크롤 강도를 판단. 지금은 구현하지 않음.
7. **Figma 검수 후보:** Hero 모바일 크롭, Connection 3장면, Match 5:7 split, CTA 줄바꿈. 현재 Figma 이전은 수행하지 않음.
8. **공개 전:** 이미지 재사용 권리 및 실제 서비스 정보/스토어 URL 재확인, 실물 모바일·Safari·키보드 전 구간 확인.

최종 상태: 소스·기본 탐색·반응형 1차 구현 완료. PRD의 모든 이미지 요구까지 완료된 최종 공개본은 아님. 부족한 자산을 명시한 정적 검수용 결과물.
