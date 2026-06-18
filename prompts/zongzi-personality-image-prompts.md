# 粽子人格图片生成提示词

## 统一规格

- 用途：H5 结果页人格主视觉 / 分享卡片。
- 建议比例：`4:5` 或 `1080x1350`，可裁成 1080x1440 海报。
- 统一风格：Ave.ai 深色交易终端、端午粽子、Web3、链上行情、霓虹绿色。
- 背景：暗色交易界面、K 线、行情网格、链上数据光点。
- 品牌占位：画面角落可出现简洁文字 `Ave.ai`，不要生成复杂不可读 logo。
- 负面通用：不要出现旧 SBTI 人格图风格，不要真人照片，不要恐怖血腥，不要低清晰度，不要乱码文字，不要夸张金融收益承诺，不要出现“稳赚”“必涨”。

## 文件名约定

- 至尊肉粽：`assets/zong/rou.png`
- 咸蛋黄粽：`assets/zong/egg.png`
- 甜粽：`assets/zong/sweet.png`
- 冰粽：`assets/zong/ice.png`

页面开发时先按以上路径预留。图片未放入前使用占位卡；后续把生成图放到对应路径即可。

## 至尊肉粽 · 月球冲锋官

Prompt:

```text
Create a vertical 4:5 personality card illustration for a Dragon Boat Festival Web3 quiz. Main character is a heroic meat zongzi shaped like a rocket pilot, wrapped in dark green bamboo leaves, with glowing rice grains and a bold red-brown meat core. It is launching upward from a crypto trading terminal toward a moon made of candlestick charts. Background: dark Ave.ai-inspired trading dashboard, neon green K-lines, token tickers, chain data particles, subtle rocket exhaust. Mood: fearless, fast, FOMO, alpha hunter. Composition: central zongzi hero, strong diagonal upward motion, clean empty area at top for result title, small Ave.ai text mark in corner. Color palette: black, deep forest green, neon lime, warm meat red, gold highlights. High detail, modern fintech poster, crisp edges, no photoreal human, no clutter.
```

Negative prompt:

```text
old SBTI character, anime human, realistic person, gore, messy text, unreadable logo, guaranteed profit wording, low resolution, blurry, beige-only palette
```

## 咸蛋黄粽 · Alpha 鉴定师

Prompt:

```text
Create a vertical 4:5 personality card illustration for a Dragon Boat Festival Web3 quiz. Main character is a smart salted egg yolk zongzi analyst, wrapped in precise geometric bamboo leaves, with a glowing golden salted egg yolk core like an alpha signal. It sits in front of multiple floating research panels, candlestick charts, token watchlists, address labels, and chain analytics screens. Background: dark Ave.ai-inspired terminal interface, neon green grid, subtle blue data lines, focused workstation atmosphere. Mood: rational, analytical, prepared, alpha researcher. Composition: central zongzi with magnifying glass or scanner beam, clean space for title, small Ave.ai text mark in corner. Color palette: black, deep green, neon lime, egg-yolk gold, cool cyan accents. Premium fintech illustration, sharp UI details, no clutter.
```

Negative prompt:

```text
old SBTI character, cute childish cartoon only, human portrait, messy Chinese text, fake profit claims, low resolution, blurry, overexposed yellow, cluttered dashboard
```

## 甜粽 · 人间体验家

Prompt:

```text
Create a vertical 4:5 personality card illustration for a Dragon Boat Festival Web3 quiz. Main character is a sweet zongzi lifestyle explorer, wrapped in soft green bamboo leaves with visible red bean and honey-like sweet filling, relaxed but stylish. It is floating above a dark crypto terminal that blends into a festival night market, with subtle candlestick charts in the sky, neon green Ave.ai interface elements, small travel and social icons. Mood: happy, light, low-frequency investing, life experience, not only K-lines. Composition: central sweet zongzi, warm glow, balanced dark fintech background, clean space for title, small Ave.ai text mark in corner. Color palette: dark green, neon lime, warm red bean, soft gold, rice white accents. Modern Web3 festival poster, polished and shareable.
```

Negative prompt:

```text
old SBTI character, childish sticker style, human photo, chaotic food pile, unreadable text, profit guarantee, low resolution, blurry, overly cute pastel-only design
```

## 冰粽 · 长期观察者

Prompt:

```text
Create a vertical 4:5 personality card illustration for a Dragon Boat Festival Web3 quiz. Main character is an ice zongzi long-term observer, wrapped in cool translucent bamboo leaves with crystalline rice texture and frost edges. It calmly watches a dark trading terminal with long-term candlestick charts, risk control lines, portfolio allocation rings, and quiet chain data signals. Background: deep black and emerald Ave.ai-inspired interface, subtle icy blue glow, disciplined grid, minimal noise. Mood: calm, patient, risk control, long-term observation. Composition: central ice zongzi sitting still while volatile charts move around it, clean title space, small Ave.ai text mark in corner. Color palette: black, deep green, neon lime, ice blue, rice white. Premium fintech poster, elegant, restrained, high clarity.
```

Negative prompt:

```text
old SBTI character, horror ice monster, human face, messy text, guaranteed profit wording, low resolution, blurry, too much blue without green brand accents
```
