# Custom Design.md

## Priority Rule

이 custom.md는 현재 프로젝트에서 가장 우선 적용되는 디자인 기준 문서입니다.
custom.md의 입력값과 J.영 Design.md 기준이 충돌할 경우, 사용자가 입력한 custom.md 값을 우선 적용합니다.
사용자가 Prompt Builder에 입력한 폰트, 컬러, radius, 톤, 추가 기준은 최우선 디자인 지시사항입니다.
J.영 Design.md는 반응형 웹 UI의 기본 구조와 보조 기준으로 사용합니다.

## Based on

- Base file: /downloads/jy-ux-lab.md
- Purpose: J.영 Design.md를 기본 베이스로 사용하되, 사용자가 입력한 프로젝트별 디자인 값을 추가합니다.
- Priority: 사용자가 Prompt Builder에 직접 입력한 값이 J.영 Design.md보다 우선 적용됩니다.

---

## 사용자 입력값 우선 적용 규칙

- 아래 Custom Typography, Custom Color Tokens, Additional Rules를 최우선 기준으로 적용합니다.
- J.영 Design.md와 충돌하는 경우 반드시 custom.md의 사용자 입력값을 따릅니다.
- 폰트, 컬러, 버튼 radius, 카드 radius, 추가 규칙은 아래 Custom 섹션 값을 먼저 적용합니다.
- J.영 Design.md의 레이아웃, 접근성, 기본 UI 규칙은 보조 기준으로 사용합니다.
- 구현 또는 Figma 작업 시 아래 Custom 값을 CSS 변수 또는 Figma style/token에 먼저 반영합니다.

---

## Custom Typography

```css
font-family: Manrope, Pretendard, Noto Sans KR, sans-serif;
font-weight: 400 / 600 / 800;
```

## Custom Color Tokens

```css
:root {
  --primary-color: #172E28;
  --point-color: #E4F35A;
  --button-radius: 12px;
  --card-radius: 16px;
}
```

## Additional Rules

Minimal, Clean, Professional, Spacious, Modern, Editorial 스타일을 유지한다.

**브랜드 디자인**
- Waabi.ai의 대형 타이포그래피, 이미지 중심 레이아웃, 넓은 여백, 명확한 정보 위계를 참고한다.
- 온코트만의 테니스 스포츠 문화와 사람 간 연결을 시각적으로 표현한다.
- 기존 SaaS 랜딩페이지처럼 반복적인 카드와 박스 중심 UI는 지양한다.
- 프리미엄 스포츠 브랜드의 에디토리얼 웹사이트와 같은 분위기를 지향한다.

**타이포그래피**
- 영문 헤드라인은 Manrope ExtraBold(800)를 사용한다.
- 한글 본문은 Pretendard를 사용한다.
- 히어로에는 대형 타이포그래피를 적용하고 짧고 강렬한 메시지를 사용한다.
- 제목과 본문의 크기 대비를 명확하게 구성한다.

**컬러 시스템**
- Primary: #172E28
- Accent: #E4F35A
- Background: #F5F3EA
- Surface: #FFFFFF
- Text: #252725
- 포인트 컬러는 CTA, 강조 텍스트, 테니스공 관련 그래픽에 제한적으로 사용한다.
- 어두운 배경과 밝은 배경을 교차하여 섹션마다 시각적 리듬을 만든다.

**레이아웃**
- 최대 콘텐츠 너비는 1200px을 기준으로 한다.
- 데스크톱에서는 12컬럼 그리드를 사용한다.
- 풀스크린 히어로와 넓은 이미지 섹션을 적극적으로 활용한다.
- 섹션 간 여백을 충분히 확보하고 텍스트가 지나치게 밀집되지 않도록 한다.
- 이미지와 타이포그래피의 비대칭 배치를 허용한다.

**이미지 스타일**
- 실제 테니스 코트, 선수의 움직임, 사람 간의 상호작용을 강조한다.
- 자연스러운 스포츠 사진과 시네마틱한 이미지 구도를 사용한다.
- 과도하게 인위적인 합성 이미지와 일반적인 스톡 이미지 분위기를 지양한다.

**인터랙션 및 구현**
- Hero와 The Connection을 핵심 브랜드 경험 섹션으로 설계한다.
- Find Your Match는 기존 섹션명을 유지한다.
- 우선 인터랙션이 없는 정적 반응형 랜딩페이지를 제작한다.
- 정적 디자인 검토 후 스크롤 애니메이션과 인터랙션을 추가한다.
- 데스크톱, 태블릿, 모바일에서 정보 위계와 가독성을 유지한다.

---

## AI Implementation Rule

- 감성적인 표현보다 CSS 속성 기반으로 판단합니다.
- 색상, 폰트, 여백, 카드 반경, 버튼 상태를 먼저 고정합니다.
- 화면을 만들 때 custom.md의 사용자 입력값을 먼저 적용하고, J.영 Design.md는 보조 기준으로 사용합니다.
- 결과물이 흔들리면 이 파일의 Custom Typography, Custom Color Tokens, Additional Rules를 최우선으로 다시 적용합니다.

---

# Base J.영 Design.md Reference

The following section is the base reference from /downloads/jy-ux-lab.md.
It is included for consistency, but it has lower priority than the Custom Design.md rules above.

# JYOUNG UIUX AI PROJECT SYSTEM

AI 기반 UIUX 프로젝트 스타터 시스템입니다. 이 문서를 AI에 첨부하면 반응형 웹 UI를 일관된 품질로 제작합니다.

우선순위: Breakpoint → Hero Typography → Font Embedding → Color → Layout → Components → Accessibility/Quality.

---

# 1. Breakpoint System

```css
xs:  375px    /* 일반 모바일 */
sm:  480px    /* 대형 모바일 */
md:  768px    /* 태블릿 */
lg:  1024px   /* 노트북 */
xl:  1440px   /* 데스크탑 */
```

```txt
- 기본(default)은 320px 이상 소형 모바일 기준이다.
- mobile-first 방식으로 작성한다.
- 미디어쿼리는 min-width 기반만 사용한다.
- max-width 기반 미디어쿼리는 금지한다.
```

---

# 2. Typography System

```txt
- 모든 font-size는 clamp() 또는 명시된 토큰을 사용한다.
- 고정 px 단독 사용은 금지한다. 단, 접근성/입력 필드처럼 명시된 예외는 허용한다.
- title 계열은 NexonLv2Gothic을 우선 사용하고, 본문은 Pretendard를 우선 사용한다.
```

## 2.1 Hero h1 — CRITICAL

Hero 섹션의 h1은 한글과 영문을 반드시 분리 적용한다.
외부 CDN은 금지하며, 필요한 woff2 폰트는 base64 인라인으로 삽입한다.

### Hero h1 CSS

```css
.hero h1 {
  font-family: "HeroTitleFont", "NexonLv2Gothic", Arial, sans-serif;
  font-size: clamp(58px, 6.8vw, 68px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

### Hero h1 Font Split

```css
/* 영문 — Cosmica Semibold */
@font-face {
  font-family: "HeroTitleFont";
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  src: url('data:font/woff2;base64,{{COSMICA_SEMIBOLD_BASE64}}') format('woff2');
  unicode-range: U+0020-007E, U+00A0-00FF, U+0100-024F, U+2000-206F;
}

/* 영문 — Cosmica Regular */
@font-face {
  font-family: "HeroTitleFont";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('data:font/woff2;base64,{{COSMICA_REGULAR_BASE64}}') format('woff2');
  unicode-range: U+0020-007E, U+00A0-00FF, U+0100-024F, U+2000-206F;
}

/* 한글 — NexonLv2Gothic */
@font-face {
  font-family: "HeroTitleFont";
  font-weight: 600;
  font-style: normal;
  src: local("NEXON Lv2 Gothic"), local("NEXONLv2Gothic"), local("NexonLv2Gothic");
  unicode-range: U+AC00-D7A3, U+1100-11FF, U+3130-318F, U+A960-A97F, U+D7B0-D7FF;
}
```

### Hero Font Rules

```txt
1. Hero h1에는 HeroTitleFont를 사용한다.
2. 영문은 Cosmica, 한글은 NexonLv2Gothic으로 unicode-range를 분리한다.
3. Cosmica는 반드시 woff2 base64 인라인으로 삽입한다.
4. NexonLv2Gothic은 local()로 참조한다.
5. hero h1에 단일 font-family만 사용하는 것은 금지한다.
6. 외부 CDN(Google Fonts, jsdelivr 등)은 금지한다.
```

Cosmica source:

```txt
Cosmica-Semibold.woff2:
https://awesomic-prod.nyc3.cdn.digitaloceanspaces.com/site/Font/Cosmica-Semibold.woff2

Cosmica-Regular.woff2:
https://awesomic-prod.nyc3.cdn.digitaloceanspaces.com/site/Font/Cosmica-Regular.woff2
```

## 2.2 Required Font Style Block Order

```txt
① Pretendard @font-face (base64 인라인)
② HeroTitleFont @font-face (Cosmica 영문 + NexonLv2Gothic 한글)
③ Font Awesome @font-face (base64 인라인)
④ Main CSS (variables, layout, components)
```

```txt
- @font-face 블록과 Font Awesome CSS를 같은 <style> 블록에 섞지 않는다.
- 폰트 / 아이콘 / 메인 CSS 역할별로 <style> 블록을 분리한다.
```

## 2.3 Title Font Family

```css
font-family: "NexonLv2Gothic", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
```

## 2.4 Type Scale

### Main Title

```css
font-size: clamp(28px, 5vw, 52px);
font-weight: 800;
line-height: 1.1;
letter-spacing: -0.02em;
```

### Subtitle

```css
font-size: clamp(18px, 3vw, 28px);
font-weight: 700;
line-height: 1.3;
letter-spacing: -0.02em;
```

### Section Title

```css
font-family: "NexonLv2Gothic", Pretendard, sans-serif;
font-size: clamp(18px, 3vw, 40px);
font-weight: 700;
line-height: 1.3;
letter-spacing: -0.02em;
color: var(--text);
margin-bottom: clamp(16px, 2vw, 30px);
```

### Body Text

```css
font-size: clamp(14px, 1.5vw, 16px);
font-weight: 400;
line-height: 1.6;
letter-spacing: -0.02em;
```

### Card Title — 2 Columns

```css
font-size: clamp(24px, 3.2vw, 46px);
font-weight: 600;
line-height: 1.4;
letter-spacing: -0.02em;
```

### Card Title — 3 Columns

```css
font-size: clamp(18px, 2.1vw, 30px);
font-weight: 600;
line-height: 1.4;
letter-spacing: -0.02em;
```

### Caption / Label

```css
font-size: clamp(12px, 1.2vw, 14px);
font-weight: 400;
line-height: 1.4;
```

## 2.5 Body Font — Pretendard

```txt
- 본문 전용 폰트: Pretendard
- npm 패키지: pretendard
- 사용 파일: woff2-subset
- 외부 CDN 금지
- 필요한 웨이트: 400 / 600 / 700 / 800
- 설치: npm install pretendard
- 경로: node_modules/pretendard/dist/web/static/woff2-subset/
```

---

# 3. Color System

```txt
Primary:          #111111
Accent (Point):   #3D6CFF
Secondary Point:  #FF9B42  (warn-box, 경고, 보조 강조)
Background:       #ffffff
Background soft:  #f5f5f5
Text:             #111111
Text sub:         #444444
Text muted:       #888888
```

```txt
- 포인트 컬러 배경 위 텍스트는 반드시 #ffffff를 사용한다.
- warn-box 계열은 #FF9B42를 사용한다.
- 포인트 컬러는 의미 있는 액션/강조에만 사용한다.
- 연한 회색 배경(`#f5f5f5`, `#e5e5e5`, `#eeeeee`, `#f8f8f8`, `#fafafa`) 위 텍스트는 반드시 `#000000` 또는 `#111111`을 사용한다.
- 연한 회색 배경 위에 `#ffffff` 텍스트를 사용하는 것은 절대 금지한다.
- 흰색 텍스트(`#ffffff`)는 Primary `#111111`, Accent `#3D6CFF`, Secondary Point `#FF9B42`처럼 충분히 어두운/강한 배경 위에서만 사용한다.
- 색상 적용 후 반드시 배경색과 텍스트색의 조합을 review 단계에서 재검토한다.
```

---

# 4. Layout System

## Container

```css
max-width: 1440px;
width: 90%;
padding-inline: clamp(20px, 5vw, 24px);
margin: 0 auto;
```

## Max Text Width

```css
max-width: 680px;
```

## Section Structure

```txt
subtitle → title → description → button → image
```

---

# 5. Grid System

```txt
mobile  (< 768px)   → 1 column
tablet  (≥ 768px)   → 2 column
desktop (≥ 1024px)  → 3 column
```

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: clamp(16px, 2vw, 32px);
```

---

# 6. Spacing System

## Section

```css
padding-block: clamp(80px, 10vw, 160px);
```

## Title Group

```css
gap: clamp(16px, 2vw, 30px);
```

## Component

```css
gap: clamp(12px, 1.5vw, 24px);
```

---

# 7. Component System

## Button

```css
/* Height */
sm: 40px;
md: 48px;
lg: 56px;

/* Touch target */
min-height: 44px;
min-width: 44px;

/* Primary */
border: 1px solid #111;
background: #111;
color: #fff;
padding-inline: clamp(16px, 2vw, 24px);
border-radius: 16px;
```

## Input

```css
height: 56px;
min-height: 44px;
border: 1px solid #111;
padding-inline: 20px;
font-size: 16px;   /* iOS 자동 줌 방지 */
border-radius: 16px;
```

## Card

```css
border: 1px solid #111;
border-radius: 24px;
padding: clamp(20px, 3vw, 32px);
background: #fff;
```

---

# 8. Icon System

```txt
- Font Awesome 사용 (fa-solid 기본)
- outline icon 우선
- 터치 클릭 영역 최소 44x44px
- 이모지 UI 아이콘 사용 금지
- Font Awesome woff2는 base64 인라인 삽입
- CDN 금지
- 설치: npm install @fortawesome/fontawesome-free
- 경로: node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2
- 아이콘이 필요한 UI에는 Font Awesome을 반드시 포함한다.
- Font Awesome @font-face, fa-solid-900.woff2 base64, `.fa-solid` 기본 클래스 정의가 누락되면 최종 완료로 간주하지 않는다.
- 이모지나 임시 텍스트 기호로 Font Awesome 아이콘을 대체하지 않는다.
```

---

# 9. Border / Radius / Shadow

## Border

```css
border: 1px solid #111;          /* 기본 */
border-soft: 1px solid #e5e5e5;  /* 카드 구분선 */
```

## Radius

```txt
8px   → small  (badge, tag)
16px  → medium (button, input, card, box)
24px  → large  (card, modal) — 기본 카드 radius
```

## Shadow

```txt
기본값: none
허용: none / minimal / soft
```

---

# 10. Motion System

```txt
- subtle motion only
- fast transition
- layout shift 금지
- 과한 animation 금지
- prefers-reduced-motion 대응 필수
```

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 11. AI Ban List

```txt
- neumorphism 금지
- glassmorphism 과다 사용 금지
- gradient 남용 금지
- glow 효과 금지
- floating / bounce animation 금지
- random font mixing 금지
- full rounded button 남용 금지
- font-size 고정 px 단독 사용 금지
- input font-size 16px 미만 금지
- 이미지 aspect-ratio 미지정 금지
- 터치 타겟 44px 미만 금지
- max-width 기반 미디어쿼리 금지
- 외부 CDN 폰트 사용 금지
- @font-face 와 Font Awesome CSS를 같은 <style> 블록에 혼합 금지
- hero h1에 단일 font-family 사용 금지
- emoji를 UI 아이콘으로 사용 금지
- Font Awesome이 필요한 화면에서 Font Awesome @font-face 누락 금지
- 연한 회색 배경 위에 흰색 텍스트 사용 금지
- `#f5f5f5`, `#e5e5e5`, `#eeeeee`, `#f8f8f8`, `#fafafa` 배경 위 텍스트를 `#ffffff`로 설정 금지
```

---

# 12. Design Quality Check

```txt
- [ ] 모든 폰트가 인라인(base64)으로 삽입되어 있는가
- [ ] <style> 블록이 역할별로 분리되어 있는가
- [ ] hero h1이 HeroTitleFont로 설정되어 있는가
- [ ] 영문/한글 unicode-range가 올바르게 분리되어 있는가
- [ ] 포인트 컬러 배경 위 텍스트가 #ffffff인가
- [ ] warn-box에 #FF9B42가 적용되어 있는가
- [ ] Font Awesome 아이콘이 이모지 대신 사용되었는가
- [ ] 모든 font-size가 clamp() 또는 토큰 기반인가
- [ ] 터치 타겟이 44px 이상인가
- [ ] prefers-reduced-motion 대응이 되어 있는가
- [ ] Font Awesome @font-face와 `.fa-solid` 클래스가 누락되지 않았는가
- [ ] Font Awesome이 필요한 아이콘이 이모지/텍스트 기호로 대체되지 않았는가
- [ ] 연한 회색 배경 위 텍스트가 `#000000` 또는 `#111111`인가
- [ ] 연한 회색 배경 위에 `#ffffff` 텍스트가 남아 있지 않은가
- [ ] review 에이전트가 Breakpoint, Typography, Font, Color, Layout, Grid, Spacing, Component, Icon, Border/Radius/Shadow, Motion, AI Ban List 전체 규칙을 검토하고 위반 사항을 직접 수정했는가
```

---

# 13. Review Agent Enforcement

최종 산출 전 반드시 review 에이전트가 이 문서의 전체 규칙을 검토하고, 위반 사항이 있으면 보고만 하지 말고 직접 수정·보완한다. 특정 항목만 확인하지 말고 1번 Breakpoint System부터 12번 Design Quality Check까지 전체 시스템을 기준으로 검수한다.

```txt
0. 전체 시스템 준수 검토
   - Breakpoint System이 mobile-first / min-width 기준을 지키는가
   - Typography System의 clamp(), Hero h1 분리, font-family 규칙을 지키는가
   - Font Embedding 순서와 style block 분리 규칙을 지키는가
   - Color System의 배경/텍스트 대비 규칙을 지키는가
   - Layout / Grid / Spacing System을 지키는가
   - Button / Input / Card Component System을 지키는가
   - Icon System에서 Font Awesome이 누락되지 않았는가
   - Border / Radius / Shadow System을 과하게 벗어나지 않았는가
   - Motion System과 prefers-reduced-motion 대응을 지키는가
   - AI Ban List 위반이 없는가
1. Font Awesome 검토
   - Font Awesome @font-face가 있는가
   - fa-solid-900.woff2가 base64 인라인으로 들어갔는가
   - .fa-solid 또는 필요한 icon class가 정의되었는가
   - 아이콘 자리에 이모지/텍스트 기호가 남아 있지 않은가

2. 색상 대비 검토
   - 연한 회색 배경 위 텍스트가 #000000 또는 #111111인가
   - 연한 회색 배경 위 #ffffff 텍스트가 없는가
   - 포인트 컬러 배경 위 텍스트는 #ffffff인가
   - warn-box 배경은 #FF9B42 계열이며 텍스트 대비가 충분한가

3. 폰트 검토
   - Pretendard / HeroTitleFont / Font Awesome style block이 역할별로 분리되어 있는가
   - hero h1의 영문/한글 unicode-range 분리가 유지되는가
   - 외부 CDN 폰트가 남아 있지 않은가

4. Layout / Component / Interaction 검토
   - container, max text width, grid column, spacing token이 문서 기준을 따르는가
   - button/input/card의 height, radius, border, padding, touch target이 문서 기준을 따르는가
   - 이미지에 aspect-ratio가 지정되어 있는가
   - input font-size가 16px 이상인가
   - 터치 타겟이 44px 이상인가
   - prefers-reduced-motion 대응이 있는가

5. AI Ban List 검토
   - neumorphism, 과한 glassmorphism, gradient 남용, glow, bounce/floating animation이 없는가
   - random font mixing, full rounded button 남용, max-width media query가 없는가
   - 외부 CDN 폰트와 emoji UI icon이 없는가

6. 수정 의무
   - 위반 사항 발견 시 review 에이전트는 최종 답변 전에 코드를 직접 수정한다.
   - 수정 후 같은 체크리스트를 다시 실행한다.
   - 모든 항목이 통과해야 완료로 간주한다.
   - 검토만 하고 수정하지 않는 것은 실패로 간주한다.
```

---

# 14. Custom Values

아래 값은 사용자가 직접 입력한 커스텀 설정입니다. 입력값이 있을 경우 기본값보다 우선 적용합니다.

```txt
font_style:      {{font_style | 기본값: Pretendard, NexonLv2Gothic, sans-serif}}
font_weight:     {{font_weight | 기본값: 400 / 600 / 800}}
accent_color:    {{accent_color | 기본값: #3D6CFF}}
secondary_color: {{secondary_color | 기본값: #FF9B42}}
primary_color:   {{primary_color | 기본값: #111111}}
button_radius:   {{button_radius | 기본값: 16px}}
card_radius:     {{card_radius | 기본값: 24px}}
extra_notes:     {{extra_notes | 기본값: Minimal, Clean, Professional, Spacious, Modern, Editorial 톤 유지}}
```
