# 최신 수정 — 이미지 단계 분리 / 대칭 갤러리

2026-10-26. 이전 values-update-report.md보다 이 문서를 우선합니다.

## 1. Connection 이미지

- BETTER TOGETHER 소개 사진: img/temp-aerial.webp.
- CONNECT 사진: img/temp-partners.webp. 소개 사진과 별개입니다.
- 소개글에서 핵심 가치 목록으로 스크롤하면 소개 사진을 숨기고 선택된 핵심 가치 사진을 표시합니다. 위로 돌아오면 소개 사진으로 복귀합니다.
- CONNECT: CONNECT 사진만 표시. PLAY/BELONG 사진은 화면에서 완전히 숨김.
- PLAY: PLAY 사진 앞, CONNECT 사진만 뒤에 표시.
- BELONG: BELONG 사진 앞, PLAY 사진 중간, CONNECT 사진 가장 뒤에 표시.
- 다시 CONNECT를 누르면 뒤의 사진을 모두 숨깁니다. 클릭 방문 기록이 아니라 CONNECT→PLAY→BELONG의 고정 순서를 기준으로 합니다.
- Problem 하단 항공 사진이 Connection 소개 사진으로 이어지는 기존 연결은 유지했습니다.

## 2. Problem 사진 정렬

모든 사진 슬롯을 동일한 3:2 비율, 동일한 너비·높이로 통일했습니다. 중심 Hero 재사용 사진도 같은 크기입니다. 사진끼리의 좌우 위치와 행 높이를 대칭으로 맞추고 중앙 카피 공간을 분리했습니다.

- 320–767px: 중앙 사진 + 좌우 2쌍, 총 5개.
- 768–1439px: 중앙 사진 + 좌우 3쌍, 총 7개.
- 1440px 이상: 중앙 사진 + 좌우 5쌍, 총 11개.
- 기존 임시 AI 사진을 그대로 사용하며 새 사진은 제작하지 않았습니다.

## 3. Hero

하단 “아래로 스크롤” 및 “01 — FIND YOUR RALLY” 문구와 해당 하단 영역을 삭제했습니다. 브랜드 메시지·CTA는 유지했습니다.

## 변경 파일

- index.html
- css/style.css
- js/script.js
- README.md
- docs/balanced-update-report.md

## 검수

Chrome iframe의 실제 콘텐츠 폭으로 320·390·430·768·1024·1440·1740·2048px을 확인했습니다.

- 가로 넘침 없음, 중앙 카피와 사진 겹침 없음.
- 같은 화면에서 사진별 너비/높이 차이 최대 약 0.016px: 그리드 분할의 서브픽셀 반올림 수준.
- 좌우 사진쌍의 중심/높이 대칭 오차 최대 약 0.016px.
- 소개 단계의 항공 사진 표시 → 스크롤 후 CONNECT의 파트너 사진 표시 확인.
- CONNECT→PLAY→BELONG→CONNECT를 클릭하며 실제 보이는 이미지 수 1→2→3→1 및 순서 확인.
- Hero 하단 두 문구가 HTML에서 제거된 것 확인.
- JS 구문 검사, 내부 앵커·이미지 경로 및 ID 검사.
- 04–07 섹션, GNB/Footer HTML, 브랜드 토큰 및 폰트 파일은 이전 수정본과 동일.

이 결과는 Chrome 렌더 검수이며 실물 기기 및 다른 브라우저 전체 검증을 의미하지는 않습니다.
