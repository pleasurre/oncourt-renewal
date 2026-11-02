# 미확보 이미지 — 교체 위치와 제작 후보

2026-10-26 · **현재 생성하지 않았음. 아래 프롬프트는 승인 후 제작 후보.**

기존 Hero 원본은 계속 재사용한다. 추가로 필요한 사진은 아래 7장이다. 실제 사용 가능한 공식 원본이나 사용자 제공 사진이 있으면 생성보다 우선한다.

## 장면 및 교체 위치

| 파일명 제안 | HTML 슬롯(data-asset-slot) | 장면 | 비율 및 목적 |
|---|---|---|---|
| problem-solo.webp | problem-solo | 혼자 코트에 선 플레이어 | 데스크톱 3:2 / 모바일 4:5, 아직 상대를 만나지 못한 상황 |
| problem-empty.webp | problem-empty | 비어 있는 코트 | 데스크톱 4:5 / 모바일 3:2, 빈 상대편의 공간 |
| problem-equipment.webp | problem-equipment | 라켓과 테니스공 | 데스크톱 4:5 / 모바일 3:2, 개인의 플레이 준비 |
| problem-practice.webp | problem-practice | 혼자 연습하는 플레이어 | 3:2, 매칭 전 개인 연습 |
| problem-aerial.webp | problem-aerial | 코트 항공 구도 | 3:2, 서로 다른 장소와 사람 |
| problem-ready.webp | problem-ready | 경기를 준비하는 플레이어 | 3:2 / 모바일 4:5, 다음 플레이를 기다리는 순간 |
| connection-partners.webp | connection-partners | 네트를 사이에 두고 교감하는 두 파트너 | 데스크톱·모바일 4:5 / 태블릿 3:2, 흩어진 장면에서 한 번의 만남으로 전환 |

반응형 크롭을 고려해 고해상도 원본과 넉넉한 여백이 필요하다. 4K 수준 원본을 확보한 뒤 웹용 최적화본을 만드는 방향이며 승인 전 생성·리사이즈하지 않는다. Hero와 중앙 카드는 같은 img/oncourt-tennis.jpg를 사용한다.

## 공통 제작 방향

Premium but understated sports editorial photography, real tennis court, natural daylight, candid relaxed expressions, realistic skin texture and visible pores, subtle facial asymmetry, natural body proportions, believable tennis equipment and grip, no beauty retouching, no plastic skin, no text, no typography, no logos, no watermark. Grounded Korean recreational tennis culture. Leave crop-safe space around faces, hands, rackets, and balls. No artificial glow, no decorative overlays. Each Problem photo should feel like a different person or place, not a connected match.

각 프롬프트는 아래 장면 설명과 위 공통 방향을 함께 사용한다. 비공식 모델을 실제 온코트 사용자라고 표시하지 않는다.

## 01 Solo

A candid Korean adult recreational tennis player standing alone near the baseline of a quiet outdoor tennis court, holding a racket loosely and looking toward the empty opposite side, calm anticipation, early morning neutral sunlight, full body at a natural distance, eye-level 50mm sports editorial photograph, generous crop-safe surroundings. Show one person only, no staged sadness. Compose for both landscape 3:2 and portrait 4:5 crops.

## 02 Empty court

An empty real outdoor tennis court viewed from behind one baseline, the net and the unoccupied opposite half clearly visible, authentic worn court surface and court lines, soft neutral daylight, quiet human-scale atmosphere, restrained premium sports editorial photography, 35mm perspective. No people, no oversized ball, no signage or text. Keep a broad composition safe for portrait 4:5 and landscape 3:2 crops.

## 03 Equipment

A used tennis racket and two normal-sized tennis balls resting beside a court bench, realistic worn grip and natural ball felt, an authentic tennis court in the soft background, restrained still-life sports photography, soft daylight, 50mm lens, realistic materials and scale. No product advertisement styling, no visible brand labels, no text. Keep both racket and balls clear within portrait and landscape crop-safe framing.

## 04 Practice

A Korean adult recreational tennis player practicing alone on a different outdoor hard court, candid between-strokes moment with a believable forehand preparation, natural athletic posture and correct grip, neutral afternoon sunlight, eye-level 70mm sports editorial photograph, landscape 3:2 framing. One person only, keep full racket and hands in frame, no dramatic advertising pose, no text.

## 05 Aerial

A true overhead aerial photograph of several real tennis courts in a Korean urban park, precise believable tennis markings and nets, restrained natural court colors, soft daylight, a few small distant players on separate courts, documentary sports editorial photography, landscape 3:2 framing. No graphic overlays, no text, no impossible court geometry, no crowded tournament scene.

## 06 Ready

A different Korean adult recreational tennis player preparing for a game beside an outdoor court, adjusting their racket grip and glancing toward the court, natural micro-expression and relaxed anticipation, candid premium sports editorial photograph, 50mm lens and soft daylight. Show one person, ordinary tennis clothing without logos, realistic skin texture, enough surrounding space for portrait and landscape crops. No text or staged commercial smile.

## 07 Partners / Connection

Two Korean adult recreational tennis partners on a real outdoor tennis court, naturally acknowledging each other across the net after a rally, relaxed authentic smiles, each holding a normal tennis racket, candid friendly interaction without a staged handshake, both people equally present and visually connected, natural daylight, realistic skin texture and body proportions, eye-level 50mm premium sports editorial photograph. Include both faces, hands, rackets, and enough of the net to establish the shared court. Compose with generous crop-safe space for portrait 4:5 and landscape 3:2 versions. No text, typography, logos, watermark, or overproduced advertising mood.

## 교체 방법

해당 figure의 `.image-placeholder` div를 다음 형식의 img로 교체한다. figure의 클래스와 data-asset-slot은 유지한다.

```html
<img src="img/problem-solo.webp"
     width="원본 너비" height="원본 높이"
     loading="lazy"
     alt="조용한 테니스 코트에서 상대편을 바라보며 혼자 서 있는 플레이어">
```

연결 사진은 `.connection-visual` 안에 같은 방식으로 삽입한다. 실제 사진 내용에 따라 alt 및 object-position을 확인하고, 출처/허가/생성 여부를 기존 자산 장부에 기록한다. 빈 src 또는 존재하지 않는 이미지 경로를 미리 넣지 않는다.
