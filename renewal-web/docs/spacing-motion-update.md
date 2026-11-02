# 갤러리 간격 및 Connection 전환 수정

## Problem
- 네 이미지 열 각각 4장 유지.
- 카드 사이 세로 간격 180px.
- 1024px 이상에서 이미지 열 사이 가로 간격 120px. 태블릿은 48px, 모바일은 기존 거터를 유지해 가로 넘침을 방지.
- 중앙 공감 카피 아래에 기존 temp-aerial.webp를 사용한 사진 1장 추가. 의미 있는 alt 제공.
- 기존 좌우 끝 열의 스크롤 이동 유지.

## Connection
- 초기 BETTER TOGETHER 제목과 설명 그룹을 사진 세로 중앙에 정렬.
- CONNECT 제목이 사진 중앙에 도달하면 전환 시작.
- BETTER 사진은 자체 중앙을 기준으로 축소되고 투명해짐. 새 사진은 아래에서 위로 올라옴.
- 전환 중 키워드 목록은 계속 위로 이동하며, PLAY가 사진 중앙에 도달하면 고정.
- BETTER 소개글은 이후 계속 위로 퇴장. 읽기 구간이 끝나면 정상 문서 스크롤로 다음 섹션에 연결.
- PLAY·BELONG 선택 및 설명 높이가 바뀌면 정렬 위치 재계산.
- 모바일은 사진 위/본문 아래 구조를 유지하여 세 키워드와 본문을 화면 안에 표시.
- 모션 최소화 대체 흐름 및 다른 섹션의 기존 동작 유지.

## 검수
- 데스크톱 실제 computed style: 카드 세로 gap 180px, 열 가로 gap 120px.
- 초기 소개 그룹 중앙과 사진 중앙 차이 약 0.19px.
- 전환 중 이전 사진 scale 0.80 / opacity 0.79 확인. 완료 후 opacity 0.
- PLAY 중앙과 사진 중앙 차이 약 0.03px.
- 역스크롤 시 better 상태와 사진 opacity 1 복원 확인.
- 390×840px 모바일: 가로 넘침 없음. 설명 및 키워드 하단이 스테이지 안에 위치.
- Hero·Match·Why OnCourt·Beyond·Final CTA HTML 변경 없음.
- JS 문법 및 ZIP 무결성 검사 완료.

수정 파일: index.html, css/style.css, js/script.js.

## 추가 요청 — 흰색 배경
사이트 기본 배경 토큰을 #FFFFFF로 변경했다. Header, Problem, Connection, Why의 밝은 바탕에 함께 반영된다. Match의 뮤트 그린 배경 및 다른 브랜드 강조색은 유지한다. 두 JSON 토큰 파일도 동일한 값으로 갱신했다.
