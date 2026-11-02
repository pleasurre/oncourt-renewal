# ONCOURT 최종 이미지 및 카피 수정

## 수정 파일
- index.html: Why 초기 이미지 및 설명, 숫자 카운터 제거, 핵심 가치 설명 확장.
- css/style.css: 우측 상단 보조 카피를 컨테이너 안쪽으로 이동, 핵심 가치 두 문장 분리.
- js/script.js: Why 4개 이미지·설명 전환, 카운터 갱신 제거, CONNECT 이미지 전환 시점 앞당김.
- img/why-match.webp, why-free-match.webp, why-trust.webp, why-tournament.webp: 최종 AI 생성 브랜드 이미지 4장. 공식 서비스 사진이나 실제 대회 기록이 아님.

## 이미지
모두 1586×992px WebP, 동일한 가로형 크롭. MATCH는 자연광 코트와 공, FREE MATCH는 라켓과 공, TRUST는 네트에서 인사하는 두 사람, TOURNAMENT는 동호인 복식 경기 장면이다. 최종 실행 프롬프트는 why-final-image-prompts.json에 보관했다.

## 카피와 레이아웃
Why 4개 설명을 각각 이용 흐름과 조건이 드러나는 3문장으로 확장했다. 수수료와 코트 대여료를 구분하고, NTRP·리뷰는 참고 정보로 표현했다. 하단 숫자 카운터만 제거하고 이전/다음 버튼과 키보드 탭 조작은 유지했다. 우측 상단 보조 카피는 데스크톱에서 그리드 시작점으로 옮겼다.

CONNECT·PLAY·BELONG은 동일한 글자 크기와 굵기로 각각 두 문장을 표시한다. 선택하지 않은 항목의 설명은 숨긴다. BETTER TOGETHER는 별도 사진을 유지하며 CONNECT 제목이 화면 하단 읽기 영역에 도달하면 사진을 먼저 교체한다. 이미지 이동 모션은 추가하지 않았다.

## 브라우저 검수
- 320·390·430px: 가로 넘침 없음. 이미지 위/카드 아래 구성.
- 768·1024·1440px: 이미지와 겹친 설명 카드, 콘텐츠 범위 안 배치 확인.
- Why 4개 탭: 각기 다른 WebP와 제목·본문·alt가 함께 변경됨. 숫자 카운터 DOM 없음.
- CONNECT·PLAY·BELONG: 각 선택 시 두 문장과 해당 이미지 표시.
- 데스크톱 CONNECT 전환: 사진 상단 128px, 헤더 하단 80px인 상태에서 values 단계로 교체되는 것 확인.
- JavaScript 문법 검사 및 ZIP 무결성 검사 완료.

Hero·Problem·Match·Beyond·Final CTA·GNB·Footer 콘텐츠와 기존 다운로드 경로는 유지했다. 기존 Match 스크롤 구현은 이번 수정 범위가 아니다.
