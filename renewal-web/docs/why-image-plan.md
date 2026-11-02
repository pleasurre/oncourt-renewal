# WHY ONCOURT — 최종 이미지 기획 및 생성 프롬프트 4개

상태: **2026-10-26 사용자 제작 요청에 따라 최종 이미지 4장 생성 및 적용 완료**. 아래는 최초 기획 기록입니다. 실제 실행 프롬프트는 `why-final-image-prompts.json`, 적용 결과는 `final-visuals-update-report.md`를 참고하세요. 원본은 1586×992px이며 WebP로 저장했습니다.

## 공통 제작·크롭 기준
- 원본 2048×1280px, 16:10. 모두 같은 크기·비율로 제작하고 WebP로 저장할 예정입니다.
- 톤: 자연광, 뮤트 그린 코트, 아이보리·라임 소품, 프리미엄 스포츠 에디토리얼. 과도한 필터나 피부 보정 없이 사실적인 질감.
- 주요 피사체는 가로 25~60% 범위에 배치합니다. 오른쪽 약 25%는 겹치는 설명 카드를 위한 비주요 영역으로 남깁니다. 여기에 인물 얼굴이나 중요한 소품을 놓지 않습니다.
- 전 화면 16:10, object-fit:cover, object-position:40% center. 모바일에서 인물 2명이 모두 보이는지 최종 확인합니다.
- 이미지 안에 텍스트·숫자·로고·가격·설명 오버레이를 넣지 않습니다. 앱 UI를 합성할 경우 승인된 공식 원본만 별도 처리합니다. 생성 모델에 앱 UI나 글자를 새로 그리게 하지 않습니다.
- 생성 이미지는 온코트의 공식 서비스 기록이나 실제 대회 현장 사진으로 표기하지 않습니다.

## 01 MATCH
예정 경로: `img/why-match.webp`
현재 임시 경로: `img/temp-empty.webp`
콘셉트: 가까운 코트에서 다음 경기를 준비하는 차분한 장면. 왼쪽 아래의 테니스공과 코트 선, 중간의 네트로 탐색의 출발을 암시합니다. 앱 화면은 넣지 않는 사진 중심 안입니다.
예정 alt: 자연광이 드는 테니스 코트의 라인 위에 놓인 테니스공.

```text
Create a photorealistic premium sports editorial photograph, 2048x1280, landscape 16:10. An inviting well-kept muted green hard tennis court in Korea under soft neutral daylight, a single yellow-green tennis ball resting near a painted court line in the lower-left to middle-left, a tennis net visible farther back. Natural acrylic court grain, restrained shadows, realistic ball felt, calm anticipation before a local friendly match. Position the important ball and court detail within the left 25–60 percent of the frame; keep the rightmost 25 percent visually quiet and free of critical objects for an overlapping website panel. Eye-level to slightly low camera, realistic 50mm lens feeling, natural color and texture. No people required. No text, letters, numbers, logos, brand marks, interface, captions, prices, banners or watermarks. This is an illustrative brand photo, not a documentary image of an actual ONCOURT event.
```

## 02 FREE MATCH
예정 경로: `img/why-free-match.webp`
현재 임시 경로: `img/temp-equipment.webp`
콘셉트: 코트 옆 라켓과 공 2개. 운동을 가볍게 시작하는 일상적이고 편안한 분위기. 수수료 0원은 카드에서만 전달합니다.
예정 alt: 테니스 코트 옆에 놓인 라켓과 두 개의 테니스공.

```text
Create a photorealistic premium sports editorial still life, 2048x1280, landscape 16:10. A real tennis racket and two lime-yellow felt tennis balls placed casually beside a muted green hard tennis court, with a clean ivory sports towel if needed. An accessible relaxed feeling of starting a friendly tennis session, no luxury advertising pose. Soft neutral daylight and gentle natural shadows, tactile racket strings, worn grip and fine court aggregate. Place the racket and balls within the left 25–60 percent of the frame; reserve the rightmost 25 percent as calm background. Match the natural muted green and ivory palette of the other series images. Realistic 50mm photographic rendering. No text, no prices, no zero symbols, no numbers, no logos, no badges, no UI, no explanatory overlays and no watermark.
```

## 03 TRUST
예정 경로: `img/why-trust.webp`
현재 임시 경로: `img/temp-partners.webp`
콘셉트: 두 취미 플레이어가 네트 너머에서 가볍게 인사하는 자연스러운 순간. 실력·매너 정보는 이미지에 넣지 않습니다.
예정 alt: 테니스 네트를 사이에 두고 자연스럽게 인사하는 두 플레이어.

```text
Create a candid photorealistic tennis editorial photograph, 2048x1280, landscape 16:10. Two adult Korean recreational tennis players naturally greeting each other across a tennis net on a muted green outdoor hard court. A quiet friendly handshake or small racket acknowledgment, believable expressions and relaxed posture, authentic sportsmanship without an exaggerated staged celebration. Neutral white and muted dark green sportswear with no visible branding. Natural daylight, visible real skin texture, subtle facial asymmetry, stray hairs, minimal retouching and realistic proportions. Keep both people and their faces in the left-to-middle 25–60 percent of the frame; the rightmost 25 percent is nonessential court background. Frame wide enough to preserve both people in responsive crops. No text, ratings, review cards, NTRP numbers, logos, badges, captions, watermarks or UI.
```

## 04 TOURNAMENT
예정 경로: `img/why-tournament.webp`
현재 임시 경로: `img/oncourt-tournament-console.png`（기존 공식 대회 운영 화면, 원래 UI 글자만 포함）
콘셉트: 소규모 동호인 대회의 랠리 장면. 과도한 관중·트로피·통계를 추가하지 않고 현장감과 활동 범위의 확장을 전달합니다. 사용 가능한 공식 현장 사진을 받으면 우선 검토합니다.
예정 alt: 야외 테니스 코트에서 동호인 경기를 진행하는 플레이어들.

```text
Create a photorealistic premium tennis editorial photograph, 2048x1280, landscape 16:10. A small local recreational tennis tournament on a muted green outdoor hard court in Korea, adult amateur players engaged in a believable doubles rally, with a few unobtrusive people in the distant court-side background. Bright but neutral natural daylight, authentic racket contact or ready stance, natural athletic proportions and real fabric and skin texture. Dynamic yet refined composition, no staged trophy pose and no large professional stadium. Place the main players within the left 25–60 percent of the frame and keep the rightmost 25 percent free of critical faces for a floating website card. Match the natural green, ivory and restrained lime palette of the series. No event logos, tournament names, scoreboards, fake winner statistics, printed numbers, captions, text, watermarks or UI. It must read as an illustrative amateur sports scene, not a real documented ONCOURT tournament.
```

## 기존 공식 자산 재사용 가능 여부
- `img/oncourt-matching-ui.png`: 기존 공식 매칭 앱 화면. 별도 설명 오버레이 없이 사용 가능하지만 세로 비율이라 이번 가로형 사진 시리즈와 구도가 다릅니다. 필요 시 사용자 확인 후 별도 목업으로 검토합니다.
- `img/oncourt-tournament-console.png`: 기존 공식 대회 운영 UI. 이번 TOURNAMENT 탭에 임시로 적용했습니다. 원래 앱 화면의 메뉴·정보만 있으며 추가 설명은 이미지 밖에 있습니다.
- 공식 대회 현장 사진은 현재 프로젝트에 없고 사용 가능한 사진·권리 범위를 확정하지 못했습니다. 확인되면 생성안보다 우선 검토합니다.
- MATCH/FREE MATCH/TRUST는 기존 임시 생성 자산 재사용입니다. 이번 단계에서 새 이미지를 생성하지 않았습니다.

## 제작 전에 확인할 항목
1. 4장 모두 위의 자연광 스포츠 사진 방향으로 통일할지, MATCH/TOURNAMENT에 공식 UI를 사용할지.
2. TRUST의 인물 구성과 인사 방식, TOURNAMENT의 복식 랠리 구도가 적절한지.
3. 오른쪽 주요 피사체를 비운 16:10 크롭과 현재 카드의 겹침·너비를 확정할지.

위 내용을 확인받은 뒤 최종 이미지 4장을 생성하거나 공식 자산을 적용합니다.
