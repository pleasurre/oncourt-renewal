# ONCOURT — Problem 이미지 / Connection 핵심 가치 / 상단 바 고정

2026-10-26 · 최신 수정 기록. 과거 story-revision-report.md는 이전 정적 단계의 기록입니다.

## 변경 파일

- `index.html`: Problem 주변 사진 연결 및 바깥쪽 4개 슬롯 추가, Connection 소개/핵심 가치 버튼/설명/사진 스택.
- `css/style.css`: sticky header, 앵커 보정, 넓은 갤러리, 선택 상태, 이미지 스택, 반응형.
- `js/script.js`: 핵심 가치 선택/키보드 이동, Problem→Connection 공유 이미지 이동.
- `img/temp-*.webp`: 승인받은 임시 AI 사진 8개. 기존 공식 Hero 사진은 유지.
- `docs/generated-image-prompts.json`: 실제 제작에 사용한 전체 프롬프트.
- `docs/values-update-report.md`: 본 문서.

04 Find Your Match, 05 Why OnCourt, 06 Beyond the Match, 07 Final CTA, Footer, 다운로드 링크, 토큰, 폰트 원본은 유지했습니다. 넓은 Hero의 얼굴 크롭은 상단이 보이도록 초점을 조정했습니다.

## Problem — 좌우 빈 공간 보완

- 1440px 이상에서 기존 1200px 정보 컨테이너를 넘어 사진 갤러리를 확장. 최대 폭은 기존 container와 body-text 토큰의 합(1880px).
- 12컬럼을 2개 하위 트랙으로 나눈 24트랙 구성으로 중앙 카피를 보호하고 외곽에 사진 4개 추가.
- 넓은 화면의 총 슬롯 11개: 기존 중심1 + 주변6 + 외곽4. 일부 사진을 다른 크롭으로 재사용.
- 768–1439px은 7개, 320–767px은 중심1+주변4로 정리하여 넘침을 방지.
- 기존 플레이스홀더를 사진으로 교체. 새 사진은 실제 온코트 사용자나 공식 운영 현장 사진이 아닌 검수용 AI 이미지입니다.

## Connection — BETTER TOGETHER / CONNECT · PLAY · BELONG

상단에 `BETTER TOGETHER.`를 표시하고 회색 보조글로 아래 문구를 넣었습니다.

“온코트는 테니스를 좋아하는 사람들이 자신에게 맞는 파트너를 만나고, 더 자주 함께 플레이할 수 있도록 돕습니다.”

레퍼런스처럼 큰 사진 스택을 왼쪽에, 핵심 가치 키워드를 오른쪽에 세로로 배치했습니다. 첫 상태는 CONNECT이며 한 번에 한 항목만 선택됩니다.

| 키워드 | 보조 제목 | 설명 | 사진 |
|---|---|---|---|
| CONNECT | 새로운 연결. | 테니스를 좋아하는 사람들과 새로운 인연이 시작됩니다. | temp-aerial.webp |
| PLAY | 함께하는 즐거움. | 나와 맞는 파트너와 더 자주 코트에 설 수 있습니다. | temp-play.webp |
| BELONG | 코트 위의 소속감. | 한 번의 경기가 함께하는 테니스 라이프로 이어집니다. | temp-ready.webp |

- 선택 항목: 짙은 primary 색상, 보조 제목/설명 표시, 해당 이미지 전면 배치.
- 비선택 항목: 회색 키워드만 표시하고 설명을 접음.
- 버튼은 aria-expanded/aria-controls로 설명 영역과 연결. 클릭, Enter/Space, 방향키, Home/End 지원.
- 사진 스택은 선택한 사진을 앞에 두고 다른 사진의 가장자리를 뒤에 드러냄.
- 데스크톱에서 왼쪽 이미지가 sticky로 유지되며 오른쪽 소개글 이후 키워드가 스크롤로 이어짐.
- 모바일은 세로 구성. 키워드를 선택하는 동안 사진이 상단 바 아래에 머물러 선택 결과를 함께 확인할 수 있음.

## 빨간 화살표의 이미지 연결

Problem 하단의 `temp-aerial.webp`와 Connection의 첫 CONNECT 이미지는 동일한 사진입니다.

- 시작: `[data-story-image="connection-source"]`
- 도착: `[data-story-image="connection-target"]`
- 데스크톱 일반 모션 환경에서 자연 스크롤 진행에 따라 같은 사진이 아래의 큰 이미지 영역으로 이동/확대되도록 연결.
- 전환 중 원본과 도착 이미지의 중복을 숨기고 종료 후 정상 사진으로 복원.
- GSAP, 스크롤 가로채기, 강제 스크롤, 스크롤 핀은 없음.
- 모바일 및 prefers-reduced-motion 환경에서는 이동 연출을 끄고 정적으로 같은 사진을 연결.
- CONNECT 이외의 가치를 선택하면 공유 이미지 이동을 중단하고 선택 사진을 유지.

## 상단 바

- 기존 ONCOURT 로고와 메뉴를 `position:sticky;top:0`으로 고정.
- 밝은 바탕과 검정 로고 유지.
- 앵커에 헤더 높이+20px의 scroll-margin을 적용해 목적지 제목이 가려지지 않도록 함.
- 모바일 메뉴 열기/닫기와 기존 다운로드 동선 유지.

## 이미지 자산

| 파일 | 주제 | 사용 위치 |
|---|---|---|
| img/temp-solo.webp | 혼자 코트에 선 플레이어 | Problem |
| img/temp-empty.webp | 빈 코트 | Problem 및 외곽 재사용 |
| img/temp-equipment.webp | 라켓과 테니스공 | Problem 및 외곽 재사용 |
| img/temp-practice.webp | 포핸드 연습 | Problem |
| img/temp-aerial.webp | 네트 앞 두 사람의 항공 구도 | Problem 하단 → CONNECT |
| img/temp-ready.webp | 코트 옆 친구들 | Problem / BELONG |
| img/temp-partners.webp | 파트너 간 교감 | Problem 외곽 |
| img/temp-play.webp | 함께하는 랠리 | Problem 외곽 / PLAY |

모두 ChatGPT 내장 이미지 생성으로 만든 임시 사진입니다. 원본 출력은 1536×1024px, 같은 해상도의 WebP로 변환해 사이트에 포함했습니다. 사용자 제공 사진이나 별도 제작 사진으로 파일을 교체할 수 있습니다. 실제 프롬프트는 generated-image-prompts.json을 참고하세요.

## 검수 결과

Chrome iframe의 실제 콘텐츠 폭 기준. 실물 기기 및 Safari 전체 호환성 시험을 의미하지는 않습니다.

| 폭 | 문서 가로 넘침 | 중앙 카피/사진 겹침 | 갤러리 표시 수 |
|---|---|---|---|
| 320 / 390 / 430px | 없음 | 없음 | 5 |
| 768 / 1024px | 없음 | 없음 | 7 |
| 1440 / 1740 / 2048px | 없음 | 없음 | 11 |

- CONNECT→PLAY→BELONG의 설명 및 전면 사진 변경 확인.
- 비선택 두 설명은 hidden, 선택된 한 설명만 표시되는 상태 확인.
- 선택된 PLAY 색상 #172E28, 비선택 색상 #687068 확인. 회색 설명의 배경 대비 약 4.60:1.
- 모바일에서 선택 사진과 설명이 동시에 보이는 배치 확인.
- 스크롤 중 상단 바의 top=0 확인.
- 공유 사진 이동 중 원본/도착 이미지 opacity=0 및 이동 이미지 표시 확인. 종료/가치 전환 시 이동 이미지 숨김 처리.
- JS 구문 검사, 이미지 경로/alt, 내부 앵커/ID, 7개 섹션 순서 및 보호 영역 원문 비교.
- reduced-motion 및 모바일에서 이동 연출을 끄는 분기는 코드 검수. OS 환경설정을 바꾼 동적 시험은 미실시.

다음 단계에서 임시 사진의 인물/테니스 자세/크롭 취향을 검토하고 필요한 파일을 교체하면 됩니다. 과거 문서의 “이미지 미확보/생성 금지”는 이번 임시 제작 승인 이전 기록입니다.
