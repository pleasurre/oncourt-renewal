# Photo Hero / Wind Shadows 구현 보고

## 변경 범위
기존 첫 Hero 및 The Serve 3D 장면을 제거하고 사진 기반 Hero로 교체했습니다. 서브 영상은 추가하지 않았습니다. The Problem 이후 HTML과 js/script.js는 이전 버전과 바이트 단위로 동일합니다. 갤러리 흰색 배경, 열당 3장, Connection 전환 및 Why 탭도 유지했습니다.

## 파일
- index.html: 사진, 독립 그림자 2개, 제목, 전환용 stage.
- css/style.css: Hero 반응형·바람·그림자 농도·reduced motion.
- js/hero-shadows.js: 헤더 높이 및 스크롤 시 그림자 페이드. 화면 밖/비활성 탭에서는 애니메이션 일시 정지.
- img/hero-blue-court.png: 사용자 첨부 원본, 픽셀 및 파일 바이트 변경 없음. 1678×937.
- img/hero-shadow-canopy.svg, img/hero-shadow-leaves.svg: 투명 배경의 코드 기반 나뭇가지/잎 실루엣. 사진 위 별도 레이어.

## 조절값
css/style.css의 .court-hero에서 조절합니다.
| 항목 | 변수 또는 속성 | 현재 값 |
|---|---|---|
| 큰 그림자 주기 | --shadow-canopy-speed | 31s |
| 잎 그림자 주기 | --shadow-leaf-speed | 43s |
| 큰 그림자 농도 | --shadow-canopy-opacity | 0.26 |
| 잎 그림자 농도 | --shadow-leaf-opacity | 0.15 |
| 기본 확대 | --shadow-scale | 1.08 |
| 레이어 크기 | .court-shadow width/height | 108% |
| 큰 그림자 흐림 | .court-shadow--canopy filter | 2.5px |
| 잎 그림자 흐림 | .court-shadow--leaves filter | 4px |

주기 값을 늘리면 더 느려지고 농도를 낮추면 더 옅어집니다. 키프레임의 각 scale은 1.08~1.10 범위이며 일괄 크기 조절 시 width/height 또는 해당 scale도 함께 조정할 수 있습니다. 이동 폭은 약 22px 이내, 회전은 약 ±0.9도입니다. 서로 다른 위상과 주기로 겹쳐 완전히 동기화된 왕복을 피하고 시작과 끝 좌표를 같게 했습니다.

## 사진과 스크롤
데스크톱은 object-fit:cover, 중앙 정렬로 원본 수직 탑뷰를 유지합니다. 세로 모바일은 같은 사진을 90도 회전해 코트를 세로로 배치합니다. 새 코트나 시설물을 생성하지 않았습니다.
Hero는 125svh, 내부 stage는 헤더 아래에서 한 화면 높이로 잠시 고정됩니다. 사진 자체를 이동·확대하지 않으며 이후 문서 흐름으로 자연스럽게 해제됩니다. 스크롤 때 그림자 투명도만 1→0.35로 감소합니다. 향후 영상 교체 지점은 data-next-scene="serve-film-pending"와 .court-hero-stage입니다. 현재는 빈 영상 섹션 없이 기존 The Problem으로 이어집니다.

## 검수
- 데스크톱: 코트 네트와 주요 라인, Manrope 800 흰색 제목, 원본 사진 로딩 확인.
- scrollY=0을 유지한 두 시점에서 두 그림자의 transform이 달라짐을 실제 브라우저에서 확인.
- PageDown 이후 진행도 1, 그림자 농도 0.35, 다음 섹션 흰색 배경 확인.
- 390px·430px iframe 뷰포트: 가로 넘침 없음, 제목 화면 안 배치. 모바일 메뉴 열기 확인.
- 감소된 모션용 QA 페이지에서 CSS/JS 분기를 적용해 animation:none 및 sticky 해제 확인. 운영 파일은 prefers-reduced-motion 미디어쿼리를 사용합니다.
- Why TRUST 탭 클릭 후 제목·본문 전환 확인.
- 3D canvas와 Three.js 런타임 호출 없음. JS 구문, 로컬 경로 및 ZIP 무결성 검사 완료.
