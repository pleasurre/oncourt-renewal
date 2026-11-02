# ONCOURT 복구 및 최종 변경 기록

기존 수정 파일을 이어서 작업했으며 초기화하지 않았습니다. 이전 docs 문서는 작업 이력이며 최신 상태는 이 문서를 기준으로 확인하세요.

## 최종 반영
- 03 The Problem부터 Connection, Why, Beyond, Final CTA와 Footer까지 흰색 배경 유지.
- BETTER TOGETHER 보조 문구의 중심을 이미지 세로 중앙에 정렬.
- CONNECT 보조 문구 중앙 정렬 유지.
- 데스크톱 측정 오차: BETTER 0.10px, CONNECT 0.12px.
- 갤러리 마지막 사진과 Connection의 공유 이미지 전환 유지.
- Find Your Match 삭제 상태, Why 탭과 공식 다운로드 경로 보존.

## 복구된 진행 중 작업
현재 순서는 Hero → The Serve → The Problem → The Connection → Why OnCourt → Beyond the Match → Final CTA입니다.
Hero / The Serve는 로컬 Three.js r169 기반 절차형 3D 서브 장면입니다. 포즈 사이 관절 좌표를 보간하며 코트 탑뷰, 접근, 임팩트, 후속 스윙, 바운드를 스크롤 진행도로 계산합니다. 이후 공과 갤러리 사진이 다음 섹션으로 이어집니다. 나뭇잎 그림자는 스크롤과 별도의 시간으로 변화합니다.

## 검수
- 390px 및 430px 모바일에서 가로 넘침 없음, 코트와 인물 화면 내 배치 확인.
- 데스크톱 BETTER 및 CONNECT 보조 문구 정렬 확인.
- Why TRUST 탭 클릭 시 제목·설명 전환 확인.
- 감소된 모션 설정의 정적 코트 대체 화면 및 일반 문서 흐름 확인.
- 네트 통과 높이와 대각선 서비스 박스 내 바운드를 좌표 계산으로 확인.
- 스크롤 위치를 기준으로 좌표를 계산하여 역방향에서도 장면이 복원되도록 구성.
- HTML 로컬 경로, 고유 ID, JavaScript 구문 및 ZIP 무결성 확인.

## 한계 및 추가 에셋
클라우드 브라우저에서는 WebGL이 제공되지 않아 같은 장면과 카메라를 사용하는 Canvas 대체 렌더러로 검수했습니다. 실제 GPU WebGL 화면은 별도 기기에서 추가 확인해야 합니다. Canvas 렌더러는 성능을 위해 약 5fps로 제한됩니다.
선수는 특정 얼굴을 복제하지 않은 단순화한 절차형 3D 모델로, 실사 스포츠 영상 수준의 최종 에셋은 아닙니다. 실사에 가까운 결과에는 연속 서브 영상 또는 리깅된 선수 GLB와 서브 모션 데이터가 필요합니다.
이번 복구에서 새 실사 AI 이미지나 유료 외부 에셋을 만들지 않았습니다. 참고용 선수 사진은 배포 파일에 포함하지 않았습니다.

## 주요 파일
index.html, css/style.css, js/script.js, js/serve-scene.js, js/vendor/three.local.js, assets/serve-pose-study.json, img/court-blue-clean.svg, licenses/three-LICENSE.txt.
