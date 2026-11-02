# Why OnCourt — 레이아웃·탭 구현 결과

## 변경 파일
index.html, css/style.css, js/script.js. 이미지 기획/프롬프트는 docs/why-image-plan.md. 본 보고서와 README 업데이트.

## 레이아웃
PLAY WITH CONFIDENCE는 Manrope 800, 오른쪽 보조 카피는 Pretendard 400 회색으로 변경했습니다. 데스크톱 헤드라인 아래 간격은 88px입니다. 카드 폭은 1024px에서 360px, 1440px 이상에서 400px, 태블릿에서는 340px입니다. 카드 전체 너비의 60%가 이미지 안, 40%가 이미지 밖에 위치합니다. 이미지와 카드가 단순 두 열이 되지 않도록 겹치는 레이어로 구현했습니다. 카드 탭과 설명은 36px, 제목과 본문은 18px 간격입니다.

이미지에 추가 제목·본문·장식 글씨·CTA는 없습니다. 임시 자산 안내는 이미지 밖 figcaption에 있습니다. TOURNAMENT 탭은 실제 공식 앱 UI의 원래 글자만 허용했습니다.

## 기능
MATCH / FREE MATCH / TRUST / TOURNAMENT를 선택하면 이미지·제목·본문·선택 밑줄이 함께 바뀝니다. 사용자 조작에만 반응하며 자동 재생은 없습니다. 짧은 220ms fade가 있고 prefers-reduced-motion에서는 생략합니다. 좌우 방향키·Home·End 및 이전/다음 버튼으로도 전환됩니다.

## BELONG 아래 여백 추가
추가 요청에 따라 #connection의 하단 패딩에 기존 section-gap 토큰을 더했습니다. 기존 대비 모바일/태블릿 80px, 넓은 화면 최대 160px 여백이 늘어납니다. Connection의 HTML·문구·이미지와 Match 인터랙션 코드는 그대로입니다.

## 검수
- 320/390/430px: 이미지 위·카드 아래. 가로 넘침/설명 잘림 없음.
- 768px: 카드 340px, 겹침 60:40, 브라우저 안에 표시.
- 1024px: 카드 360px, 1440/1740px: 카드 400px. 모두 겹침 60:40 확인.
- 전 폭에서 탭 터치 영역 최소 44×44px, 본문 잘림 없음.
- 4개 탭 각각의 제목/본문/이미지 변경 확인. End로 TOURNAMENT 이동 및 이전 버튼으로 TRUST 복귀 확인.
- #why-oncourt 밖 HTML은 업로드 ZIP과 완전히 동일합니다. CSS는 #why-oncourt 및 요청된 #connection 하단 여백만 추가, JS는 Why 탭 모듈만 추가했습니다.
- JS 구문 검사와 ZIP 무결성 검사 통과.

## 출처·이미지 상태
Waabi https://waabi.ai/ 의 Trusted by the best in the industry 정보 분리 구조를 참고했습니다. 온코트 공식 홈 https://www.techinso.com/ 에서 주변 경기·일정/유형, 매칭 등록/참가 수수료 없음, NTRP/리뷰, 대회 기능을 확인했습니다. 코트 이용료는 별도라는 제한을 본문에 유지했습니다. 현재 서비스 정책 변경 여부는 최종 공개 전에 다시 확인해야 합니다.

새 AI 이미지는 생성하지 않았습니다. 최종 경로 img/why-match.webp, img/why-free-match.webp, img/why-trust.webp, img/why-tournament.webp는 사용자 확인 이후 적용할 계획이며 현재 HTML에 존재하지 않는 파일을 연결하지 않았습니다.

실기기 iOS/Android와 실제 모션 감소 OS 설정 전환은 추가 확인 대상입니다.
