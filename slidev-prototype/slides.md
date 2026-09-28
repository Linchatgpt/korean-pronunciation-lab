---
theme: default
title: 基本母音｜講師投影版
info: 《韓語三小時》Teaching Web 的講師投影原型
author: Korean 3H
class: stage
transition: fade
mdc: true
---

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+KR:wght@500;700&display=swap');

:root {
  --ink: #15191c;
  --paper: #f4f0e8;
  --muted: #9ea6a7;
  --signal: #ee5b42;
  --line: rgba(244, 240, 232, .18);
}

.stage { background: var(--ink); color: var(--paper); font-family: 'Noto Sans TC', sans-serif; }
.stage h1, .stage h2, .stage h3 { font-family: 'Noto Serif KR', 'Noto Sans TC', sans-serif; letter-spacing: -.04em; }
.stage h1 { font-size: 4.8rem; line-height: 1.05; }
.stage h2 { font-size: 3.1rem; line-height: 1.1; }
.stage p { color: var(--muted); }
.eyebrow { color: var(--signal); font: 500 .85rem 'IBM Plex Mono', monospace; letter-spacing: .14em; text-transform: uppercase; }
.rule { border-top: 1px solid var(--line); margin-top: 1.4rem; padding-top: 1rem; }
.hangul { color: var(--paper); font-family: 'Noto Serif KR', serif; font-size: 8rem; line-height: 1; }
.hangul-small { color: var(--paper); font-family: 'Noto Serif KR', serif; font-size: 5rem; line-height: 1; }
.signal { color: var(--signal); }
.mono { font-family: 'IBM Plex Mono', monospace; }
.hint { position: absolute; bottom: 2.3rem; left: 3rem; right: 3rem; display:flex; justify-content:space-between; color: var(--muted); font: .72rem 'IBM Plex Mono', monospace; letter-spacing: .08em; }
.number { color: var(--signal); font: 500 1.1rem 'IBM Plex Mono', monospace; }
.memory-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2.6rem; }
.memory-cell { border-top: 1px solid var(--line); padding-top: .7rem; }
.memory-cell strong { display:block; color: var(--paper); font-size: 1.4rem; }
.memory-cell span { color: var(--muted); font: .8rem 'IBM Plex Mono', monospace; }
.footer-note { color: var(--muted); font-size: .95rem; }
</style>

# 基本母音

<div class="eyebrow">KOREAN 3H / SHAPE → SOUND</div>

<h1>母音不是一串<br><span class="signal">要背的符號</span></h1>

<p class="rule">今天只找一件事：方向，如何長成聲音。</p>

<div class="hint"><span>講師投影原型 · 01</span><span>按 Space 開始</span></div>

<!--
先問：你看到哪些方向？
不要先公布韓語母音。
-->

---

<div class="eyebrow">01 / 起點</div>

<h2>先從三個基本符號開始</h2>

<div class="memory-grid">
  <div class="memory-cell"><div class="hangul-small">ㆍ</div><strong>天</strong><span>點</span></div>
  <div class="memory-cell"><div class="hangul-small">ㅡ</div><strong>地</strong><span>橫線</span></div>
  <div class="memory-cell"><div class="hangul-small">ㅣ</div><strong>人</strong><span>直立</span></div>
</div>

<div class="hint"><span>不要急著背讀音</span><span>看形 → 找方向</span></div>

<!--
講師提示：這一頁不是歷史課。只把 ㆍ、ㅡ、ㅣ 當成後面記憶圖的骨架。
-->

---

<div class="eyebrow">02 / 記憶圖</div>

<h2>讓聲音站在方向上</h2>

<div class="grid grid-cols-3 gap-8 items-center mt-12">
  <div class="text-center"><div class="hangul-small signal">ㅏ</div><div class="mono">a</div></div>
  <div class="text-center"><div class="hangul-small">ㅓ</div><div class="mono">eo</div></div>
  <div class="text-center"><div class="hangul-small">ㅣ</div><div class="mono signal">i</div></div>
  <div class="text-center"><div class="hangul-small">ㅗ</div><div class="mono">o</div></div>
  <div class="text-center"><div class="hangul-small">ㅜ</div><div class="mono">u</div></div>
  <div class="text-center"><div class="hangul-small">ㅡ</div><div class="mono">eu</div></div>
</div>

<p class="rule">先用方向搭橋；真正陌生的聲音，留到後面集中突破。</p>

<div class="hint"><span>講師提問：哪一個最像你已經知道的聲音？</span><span>形 → 音</span></div>

<!--
講師提示：接受不精準的第一猜。這裡的目標是建立 retrieval anchor，不是考發音。
-->

---

<div class="eyebrow">03 / 聲音校準</div>

<h2>先猜，再聽標準音</h2>

<div class="flex items-center gap-16 mt-16">
  <div class="hangul">ㅏ</div>
  <div>
    <div class="number">YOUR GUESS</div>
    <div class="text-4xl mt-3 mono">a ?</div>
    <div class="rule footer-note">按下播放鍵，讓耳朵校準，不讓音檔代替思考。</div>
  </div>
</div>

<div class="hint"><span>Audio：標準韓語音檔</span><span>形 → 音 → 驗證</span></div>

<!--
原型備註：正式版可在此頁加入 audio button；目前先驗證投影敘事與講師節奏。
-->

---

<div class="eyebrow">04 / 回收</div>

<h2>現在看見 <span class="signal">ㅏ</span>，<br>你會先想到什麼？</h2>

<div class="grid grid-cols-2 gap-12 mt-12">
  <div class="rule"><div class="number">01</div><div class="text-2xl mt-3">一個方向</div><p>不是亂碼，是有設計的形。</p></div>
  <div class="rule"><div class="number">02</div><div class="text-2xl mt-3">一個聲音</div><p>先擬，再用標準音校準。</p></div>
</div>

<div class="hint"><span>下一段：y 系列</span><span>完成一個小循環</span></div>

<!--
講師提示：請學員說出「我現在有一條線索」即可，不要求完整背誦。
-->
