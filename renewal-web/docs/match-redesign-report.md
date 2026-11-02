# Find Your Match — 정적 리디자인

## 수정 범위와 파일
- index.html: #match만 교체. 앞뒤 HTML은 이전 최신본과 완전히 일치.
- css/style.css: #match로 범위를 한정한 스타일만 추가.
- js/script.js: 수정 없음.
- docs/prd.md, docs/copy-strategy.md, docs/reference-analysis.md: 이번 #match 결정만 기록.
- 토큰, 다른 6개 섹션, GNB/Footer 및 외부 링크는 유지.

## 디자인
딥그린 #172E28 단색에 미세한 SVG 그레인. 왼쪽 7/12은 번호·제목·설명·STEP 라벨, 오른쪽 5/12은 곡선 코트 경로와 공 한 개. 단계 사이 얇은 디바이더와 밑줄 CTA를 사용합니다. 이전 앱 목업과 큰 영문 제목은 이 섹션에서 제거했습니다.

## 반응형
- 1024px 이상: 약 58:42의 두 열, STEP 라벨을 행 오른쪽에 배치.
- 768~1023px: 두 열 유지, 제목과 코트 그래픽 크기를 줄이고 STEP 라벨을 설명 아래에 배치.
- 767px 이하: 텍스트를 먼저 읽는 한 열. 코트 라인/공을 하단 보조 비주얼로 배치.

## 모션 확장 지점
- .match-path / #match-roll-path: SVG 경로. 추후 getTotalLength 및 getPointAtLength 또는 MotionPathPlugin의 기준으로 사용.
- .match-ball: 현재 첫 지점에 고정된 그룹. 추후 경로 위치·회전 연결 가능.
- .match-step[data-match-step] 및 .match-marker[data-match-marker]: 01~04 대응.
- .match-step.is-active 및 data-match-active: 단계 강조 상태.
- data-match-mode="static": 현재 정적 단계 표시. 스크롤 이벤트, 드래그, GSAP 추가 없음.
- SCROLL TO ROLL은 사용자가 요청한 향후 연출용 정적 카피입니다.

## 검수
320, 390, 430, 768, 1024, 1440, 1740px 브라우저 검수: 가로 넘침 및 텍스트 내부 잘림 없음. 단계 4개, 공 1개, animation-name none 확인. 모바일 CTA 클릭 시 #download 이동 확인. JS 구문 검사 통과. #match 외 HTML/JS/토큰 동일성 확인.

## 그래픽 자산
코트 선, 공과 질감은 HTML 안의 SVG/CSS로 구현했습니다. 별도 이미지 생성/다운로드는 없습니다. 원본 매칭 앱 이미지는 파일을 보존하되 #match에서 표시하지 않습니다.
