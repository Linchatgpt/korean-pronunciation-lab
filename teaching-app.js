const warmupEncounters = [
  ["yakguk", "약국", "yak｜guk", "藥局", "藥局 → 藥局"],
  ["byeongwon", "병원", "byeong｜won", "病院", "病院 → 醫院"],
  ["miyongsil", "미용실", "mi｜yong｜sil", "美容室", "美容室 → 美髮院"],
  ["hagwon", "학원", "hak｜won", "學院", "學院 → 補習班"],
  ["sikdang", "식당", "sik｜dang", "食堂", "食堂 → 餐廳"],
  ["baekhwajeom", "백화점", "baek｜hwa｜jeom", "百貨店", "百貨店 → 百貨公司"],
  ["eunhaeng", "은행", "eun｜haeng", "銀行", "銀行 → 銀行"],
].map(([slug, korean, units, source, modern]) => ({
  id: `sound-warmup-${slug}`,
  kicker: "PRELUDE / SOUND",
  korean,
  contextLabel: "SOUND → SOURCE",
  ruleLabel: "FIND THE TRACE",
  prompt: "你聽到哪些熟悉的聲音輪廓？",
  instructorPrompt: "先不要顯示韓文字母。讓學員猜它可能來自哪個熟悉的漢字詞。",
  purpose: "先建立聲音解碼力，再進入文字解碼力。",
  warmup: true,
  audio: `assets/audio/warmup-${slug}.mp3?v=minimax-1`,
  reveals: ["", slug, units, source, modern, korean],
}));

const encounters = [
  ...warmupEncounters,
  {
    id: "boss",
    kicker: "ENCOUNTER 01",
    korean: "화장실",
    contextLabel: "NO CONTEXT YET",
    ruleLabel: "DISCOVER THE CLUES",
    prompt: "能拆嗎？能念嗎？知道意思嗎？",
    instructorPrompt: "先不要公布答案。讓陌生感停留，請學員記下第一直覺。",
    purpose: "建立問題，不急著教。",
    audio: "assets/audio/hwajangsil.mp3?v=minimax-1",
    reveals: ["", "화｜장｜실", "hwajangsil", "化粧室"],
  },
  {
    id: "hwa",
    kicker: "ENCOUNTER 02 / SHAPE",
    korean: "화",
    contextLabel: "SHAPE / SYLLABLE",
    ruleLabel: "A BLOCK HAS PARTS",
    prompt: "這個方塊裡面，哪些是字母？",
    instructorPrompt: "先問：這是一個字，還是一組可以繼續拆的聲音？",
    purpose: "從方塊進入字母，不一次攤平。",
    audio: "assets/audio/hwa.mp3?v=minimax-1",
    reveals: ["", "ㅎ + ㅘ", "hwa"],
  },
  {
    id: "vowels",
    kicker: "ENCOUNTER 03 / SHAPE",
    korean: "ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ",
    contextLabel: "SHAPE / VOWELS",
    ruleLabel: "A VOWEL HAS A DIRECTION",
    prompt: "哪些母音的方向，你已經有感覺？",
    instructorPrompt: "先讓學員用注音或口腔方向找已知線索，不要求一次背完。",
    purpose: "用已知聲音搭橋，只把 ㅡ 留作真正的新差異。",
    reveals: ["ㆍ　ㅡ　ㅣ", "ㅏ　ㅓ　ㅗ　ㅜ　ㅡ　ㅣ", "五角形：尖角向下", "A　I　U　E　O", "ae　eo　eu", "ㅏ　ㅓ　ㅗ　ㅜ　ㅡ　ㅣ"],
  },
  {
    id: "y-series",
    kicker: "ENCOUNTER 04 / SHAPE + SOUND",
    korean: "ㅏ → ㅑ　ㅓ → ㅕ",
    contextLabel: "SHAPE / SOUND",
    ruleLabel: "ONE EXTRA STROKE = Y",
    prompt: "多一筆，是多背一個，還是多了一個聲音方向？",
    instructorPrompt: "請學員先觀察成對母音，再說出自己的規則，不先給術語。",
    purpose: "把 y 系列理解成基本母音的加筆規律。",
    audioByReveal: [null, "assets/audio/y-series-1.mp3?v=minimax-1", "assets/audio/y-series-2.mp3?v=minimax-1", "assets/audio/y-series-3.mp3?v=minimax-1"],
    reveals: ["", "ㅏ → ㅑ　ㅓ → ㅕ\n\na → ya　eo → yeo", "ㅗ → ㅛ　ㅜ → ㅠ\n\no → yo　u → yu", "ㅔ → ㅖ　ㅐ → ㅒ\n\ne → ye　ae → yae"],
  },
  {
    id: "w-series",
    kicker: "ENCOUNTER 05 / SHAPE",
    korean: "ㅘ　ㅝ",
    contextLabel: "SHAPE / VOWELS",
    ruleLabel: "YANG + YIN → W FAMILY",
    prompt: "先分陽性、陰性，再看它們怎麼組合。",
    instructorPrompt: "先問學員：哪些母音看起來朝同一組方向？再揭露陽性／陰性與組合規則。",
    purpose: "先建立陰陽母音的方向感，再把複合母音視為新的可操作單位。",
    audioByReveal: [null, null, null, "assets/audio/w-series.mp3?v=minimax-1"],
    reveals: [
      "",
      "陽性第一列：ㅗ + ㅏ → ㅘ　ㅗ + ㅐ → ㅙ　ㅗ + ㅣ → ㅚ\n陰性第二列：ㅜ + ㅓ → ㅝ　ㅜ + ㅔ → ㅞ　ㅜ + ㅣ → ㅟ",
      "三組六個複合母音\nㅘ　ㅙ　ㅚ\nㅝ　ㅞ　ㅟ",
      "wa　wae　oe\nwo　we　wi",
    ],
  },
  {
    id: "gwang",
    kicker: "ENCOUNTER 06 / SHAPE + SOUND",
    korean: "광",
    contextLabel: "SHAPE / SOUND",
    ruleLabel: "COMPOUND + FINAL",
    prompt: "先擬一個聲音，再聽標準發音。",
    instructorPrompt: "請學員先說出自己的嘗試，再按 A 播放標準韓語發音。",
    purpose: "讓音訊校準，而不是代替思考。",
    audio: "assets/audio/gwang.mp3?v=minimax-1",
    reveals: ["", "ㄱ + ㅘ + ㅇ", "gwang", "光"],
  },
  {
    id: "consonants",
    kicker: "ENCOUNTER 07 / SHAPE",
    korean: "子音家族",
    contextLabel: "SHAPE / CONSONANTS",
    ruleLabel: "FAMILY BY FAMILY",
    prompt: "先記一家，再看下一家。",
    instructorPrompt: "每次只呈現一個家族，讓學員用中文提示建立 retrieval anchor，再補上韓語形狀。",
    purpose: "以爸媽、弟弟、奶奶、哥哥、姐姐建立子音家族的記憶入口。",
    audioByReveal: [
      null,
      "assets/audio/consonant-parents-1.mp3?v=minimax-1",
      "assets/audio/consonant-parents-2.mp3?v=minimax-1",
      "assets/audio/consonant-parents-3.mp3?v=minimax-1",
      "assets/audio/consonant-siblings-1.mp3?v=minimax-1",
      "assets/audio/consonant-siblings-2.mp3?v=minimax-1",
      "assets/audio/consonant-siblings-3.mp3?v=minimax-1",
      "assets/audio/consonant-grandma-1.mp3?v=minimax-1",
      "assets/audio/consonant-grandma-2.mp3?v=minimax-1",
      "assets/audio/consonant-grandma-3.mp3?v=minimax-1",
      "assets/audio/consonant-brothers-1.mp3?v=minimax-1",
      "assets/audio/consonant-brothers-2.mp3?v=minimax-1",
      "assets/audio/consonant-brothers-3.mp3?v=minimax-1",
      "assets/audio/consonant-sisters-1.mp3?v=minimax-1",
      "assets/audio/consonant-sisters-2.mp3?v=minimax-1",
      "assets/audio/consonant-sisters-3.mp3?v=minimax-1",
      null,
      null,
    ],
    reveals: [
      "",
      "爸媽行｜純子音：\nㅂ　　ㅍ　　ㅁ\nb/p　　p　　m",
      "爸媽行＋a：\n바　　파　　마\nba　　pa　　ma",
      "爸媽行＋i：\n비　　피　　미\nbi　　pi　　mi",
      "弟弟行｜純子音：\nㄷ　　ㅌ\nd/t　　t",
      "弟弟行＋a：\n다　　타\nda　　ta",
      "弟弟行＋i：\n디　　티\ndi　　ti",
      "奶奶行｜純子音：\nㄴ　　ㄹ\nn　　r/l",
      "奶奶行＋a：\n나　　라\nna　　ra",
      "奶奶行＋i：\n니　　리\nni　　ri",
      "哥哥行｜純子音：\nㄱ　　ㅋ　　ㅎ\ng/k　 k　　h",
      "哥哥行＋a：\n가　　카　　하\nga　　ka　　ha",
      "哥哥行＋i：\n기　　키　　히\ngi　　ki　　hi",
      "姐姐行｜純子音：\nㅈ　　ㅊ　　ㅅ\nj　　ch　　s",
      "姐姐行＋a：\n자　　차　　사\nja　　cha　　sa",
      "姐姐行＋i：\n지　　치　　시\nji　　chi　　si",
      "激音／送氣音：\nㅋ　　ㅌ　　ㅍ　　ㅊ\nk　　t　　p　　ch",
      "緊音：\nㄲ　　ㄸ　　ㅃ　　ㅆ　　ㅉ\nkk　　tt　　pp　　ss　　jj",
    ],
  },
  {
    id: "gwanghwamun",
    kicker: "ENCOUNTER 08 / MEANING",
    korean: "광화문",
    contextLabel: "MEANING / HANJA",
    ruleLabel: "A CLUE CAN TRAVEL",
    prompt: "像不像你已經見過的漢字？",
    instructorPrompt: "請學員先依音與形猜，再揭露漢字線索。",
    purpose: "把聲音線索連到中文／漢字資源。",
    audio: "assets/audio/gwanghwamun.mp3?v=minimax-1",
    reveals: ["", "광｜화｜문", "gwanghwamun", "光｜化｜門", "光化門"],
  },
  {
    id: "airport",
    kicker: "ENCOUNTER 09 / TRANSFER",
    korean: "인천국제공항",
    contextLabel: "AIRPORT / NEW ENCOUNTER",
    ruleLabel: "TRY THE METHOD",
    prompt: "現在換一個機場場景：你先找哪一個線索？",
    instructorPrompt: "讓學員先獨立完成拆、擬、猜，再按 Reveal 給最少提示。",
    purpose: "驗證 Teaching Web 是否支持陌生題的遷移。",
    context: true,
    audio: "assets/audio/incheon-gukjegonghang.mp3?v=minimax-2",
    reveals: ["", "인천｜국제｜공항", "Incheon Gukje Gonghang", "仁川｜國際｜空港"],
  },
];

const firstHourModules = [
  { id: "sound-warmup", label: "韓語耳朵暖身", status: "built", encounterIndex: 0 },
  { id: "boss", label: "Boss Challenge", status: "built", encounterIndex: 7 },
  { id: "blocks", label: "韓文方塊與字母設計", status: "built", encounterIndex: 8 },
  { id: "vowels", label: "基本母音", status: "built", encounterIndex: 9 },
  { id: "y-series", label: "y 系列", status: "built", encounterIndex: 10 },
  { id: "w-series", label: "w 系列", status: "built", encounterIndex: 11 },
  { id: "consonants", label: "子音家族", status: "built", encounterIndex: 13 },
  { id: "rebuild", label: "音節方塊重建", status: "built", encounterIndex: 14 },
];

const state = { encounterIndex: 0, revealIndex: 0, moduleIndex: 0, panelHidden: false, audio: null };
const $ = (selector) => document.querySelector(selector);

const elements = {
  app: $("#app"),
  stageGrid: $(".stage-grid"),
  routeList: $("#routeList"),
  routeCount: $("#routeCount"),
  stateEyebrow: $("#stateEyebrow"),
  stagePrompt: $("#stagePrompt"),
  revealReadout: $("#revealReadout"),
  encounterCard: $("#encounterCard"),
  encounterContext: $("#encounterContext"),
  moduleNotice: $("#moduleNotice"),
  memoryDiagram: $("#memoryDiagram"),
  encounterKicker: $("#encounterKicker"),
  koreanDisplay: $("#koreanDisplay"),
  revealLayer: $("#revealLayer"),
  promptChip: $("#promptChip"),
  contextLabel: $("#contextLabel"),
  ruleLabel: $("#ruleLabel"),
  instructorPrompt: $("#instructorPrompt"),
  revealPurpose: $("#revealPurpose"),
  audioStatus: $("#audioStatus"),
  audioButton: $("#audioButton"),
  previousButton: $("#previousButton"),
  nextButton: $("#nextButton"),
  resetButton: $("#resetButton"),
  panelToggle: $("#panelToggle"),
  instructorPanel: $("#instructorPanel"),
  fullscreenButton: $("#fullscreenButton"),
  footerStatus: $("#footerStatus"),
};

function renderRoute() {
  elements.routeList.innerHTML = firstHourModules.map((module, index) => `
    <button class="route-item ${index === state.moduleIndex ? "active" : ""} ${module.status === "planned" ? "planned" : ""}" data-module-index="${index}" type="button">
      <span class="route-index">0${index + 1}</span>
      <span>${module.label}</span>
      ${module.status === "planned" ? '<span class="route-status">待製作</span>' : ''}
    </button>
  `).join("");
  elements.routeCount.textContent = `0${state.moduleIndex + 1} / 0${firstHourModules.length}`;
  elements.routeList.querySelectorAll("[data-module-index]").forEach((item) => {
    item.addEventListener("click", () => selectModule(Number(item.dataset.moduleIndex)));
  });
}

function selectModule(index) {
  const module = firstHourModules[index];
  if (!module) return;
  state.moduleIndex = index;
  stopAudio();
  if (module.status === "built") {
    state.encounterIndex = module.encounterIndex;
    state.revealIndex = 0;
  }
  render();
}

function renderContext(encounter) {
  if (!encounter.context) {
    elements.encounterCard.classList.remove("has-context");
    elements.encounterContext.innerHTML = "";
    return;
  }
  elements.encounterCard.classList.add("has-context");
  elements.encounterContext.innerHTML = `
    <div class="airport-scene" role="img" aria-label="韓國機場抵達大廳的概念場景">
      <span class="airport-light"></span>
      <span class="airport-floor"></span>
    </div>
  `;
}

function render() {
  const encounter = encounters[state.encounterIndex];
  const module = firstHourModules[state.moduleIndex];
  const moduleIsPlanned = module.status === "planned";
  const reveal = encounter.reveals[state.revealIndex];
  elements.stateEyebrow.textContent = moduleIsPlanned ? `MODULE 0${state.moduleIndex + 1} / ${module.label}` : encounter.kicker;
  elements.stagePrompt.textContent = encounter.prompt;
  elements.revealReadout.textContent = `${String(state.revealIndex + 1).padStart(2, "0")} / ${String(encounter.reveals.length).padStart(2, "0")}`;
  elements.encounterKicker.textContent = moduleIsPlanned ? `MODULE 0${state.moduleIndex + 1}` : encounter.kicker;
  const hideFamilyTitle = encounter.id === "consonants" && state.revealIndex > 0;
  const hideYSeriesHeader = encounter.id === "y-series" && state.revealIndex > 0;
  const hideWSeriesHeader = encounter.id === "w-series" && state.revealIndex > 0;
  elements.koreanDisplay.textContent = hideFamilyTitle || hideYSeriesHeader || hideWSeriesHeader ? "" : encounter.warmup && state.revealIndex < encounter.reveals.length - 1 ? "🔊" : encounter.korean;
  elements.revealLayer.textContent = reveal;
  elements.revealLayer.classList.remove("is-new");
  void elements.revealLayer.offsetWidth;
  elements.revealLayer.classList.add("is-new");
  elements.promptChip.textContent = encounter.prompt;
  elements.contextLabel.textContent = encounter.contextLabel;
  elements.ruleLabel.textContent = encounter.ruleLabel;
  elements.instructorPrompt.textContent = encounter.instructorPrompt;
  elements.revealPurpose.textContent = encounter.purpose;
  elements.previousButton.disabled = state.encounterIndex === 0 && state.revealIndex === 0;
  elements.nextButton.textContent = state.revealIndex === encounter.reveals.length - 1 ? "下一題  →" : "下一層  →";
  const activeAudio = encounter.audioByReveal?.[state.revealIndex] || encounter.audio;
  elements.audioButton.disabled = moduleIsPlanned || !activeAudio;
  elements.audioButton.innerHTML = activeAudio ? "◉ <span>播放標準發音</span>" : "◉ <span>此題沒有音檔</span>";
  elements.footerStatus.textContent = moduleIsPlanned ? "Module content not connected yet." : activeAudio ? "Audio ready · press A" : "Waiting for the next clue.";
  elements.moduleNotice.hidden = !moduleIsPlanned;
  elements.moduleNotice.innerHTML = moduleIsPlanned ? `
    <div>
      <span class="notice-kicker">MODULE 0${state.moduleIndex + 1} / FIRST HOUR</span>
      <strong>${module.label}</strong>
      <p>這個模組已加入第一小時目錄，內容尚未接入 Teaching Web。講師可以用左側目錄先行切換，完成模組規格後再製作 Reveal。</p>
    </div>
  ` : "";
  const isVowelModule = encounter.id === "vowels";
  elements.encounterCard.classList.toggle("is-memory", isVowelModule);
  elements.memoryDiagram.hidden = !isVowelModule;
  elements.memoryDiagram?.classList.toggle("is-revealed", isVowelModule && state.revealIndex > 0);
  elements.memoryDiagram?.classList.toggle("is-complete", isVowelModule && state.revealIndex >= encounter.reveals.length - 1);
  if (isVowelModule) {
    elements.memoryDiagram.dataset.stage = String(state.revealIndex);
  } else {
    delete elements.memoryDiagram.dataset.stage;
  }
  renderContext(encounter);
  renderRoute();
}

function nextReveal() {
  const encounter = encounters[state.encounterIndex];
  if (state.revealIndex < encounter.reveals.length - 1) {
    state.revealIndex += 1;
  } else if (state.encounterIndex < encounters.length - 1) {
    state.encounterIndex += 1;
    state.revealIndex = 0;
    const linkedModule = firstHourModules.findIndex((module) => module.encounterIndex === state.encounterIndex);
    if (linkedModule >= 0) state.moduleIndex = linkedModule;
  }
  render();
}

function previousReveal() {
  if (state.revealIndex > 0) {
    state.revealIndex -= 1;
  } else if (state.encounterIndex > 0) {
    state.encounterIndex -= 1;
    state.revealIndex = encounters[state.encounterIndex].reveals.length - 1;
    const linkedModule = firstHourModules.findIndex((module) => module.encounterIndex === state.encounterIndex);
    if (linkedModule >= 0) state.moduleIndex = linkedModule;
  }
  render();
}

function resetEncounter() {
  state.revealIndex = 0;
  stopAudio();
  render();
}

function playAudio() {
  const encounter = encounters[state.encounterIndex];
  const audioSource = encounter.audioByReveal?.[state.revealIndex] || encounter.audio;
  if (!audioSource) return;
  stopAudio();
  state.audio = new Audio(audioSource);
  state.audio.addEventListener("play", () => {
    elements.audioStatus.querySelector("p").textContent = "正在播放 · 標準韓語音檔";
  });
  state.audio.addEventListener("ended", () => {
    elements.audioStatus.querySelector("p").textContent = "播放完成 · 可重播";
  });
  state.audio.addEventListener("error", () => {
    elements.audioStatus.querySelector("p").textContent = "尚未放入授權音檔";
    elements.footerStatus.textContent = "Audio asset required · see assets/README.md";
  });
  state.audio.play().catch(() => {
    elements.audioStatus.querySelector("p").textContent = "請再次按下播放";
  });
}

function stopAudio() {
  if (state.audio) {
    state.audio.pause();
    state.audio.currentTime = 0;
    state.audio = null;
  }
  elements.audioStatus.querySelector("p").textContent = "尚未播放";
}

function togglePanel() {
  state.panelHidden = !state.panelHidden;
  elements.instructorPanel.classList.toggle("is-hidden", state.panelHidden);
  elements.stageGrid.classList.toggle("panel-hidden", state.panelHidden);
  elements.panelToggle.innerHTML = state.panelHidden ? "顯示講師提示 <span>⌘ P</span>" : "隱藏講師提示 <span>⌘ P</span>";
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}

elements.nextButton.addEventListener("click", nextReveal);
elements.previousButton.addEventListener("click", previousReveal);
elements.resetButton.addEventListener("click", resetEncounter);
elements.audioButton.addEventListener("click", playAudio);
elements.panelToggle.addEventListener("click", togglePanel);
elements.fullscreenButton.addEventListener("click", toggleFullscreen);

document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
  if (event.key === " ") {
    event.preventDefault();
    event.shiftKey ? previousReveal() : nextReveal();
  } else if (event.key === "ArrowRight") {
    if (firstHourModules[state.moduleIndex]?.status === "planned") selectModule(Math.min(state.moduleIndex + 1, firstHourModules.length - 1));
    else nextReveal();
  } else if (event.key === "ArrowLeft") {
    if (firstHourModules[state.moduleIndex]?.status === "planned") selectModule(Math.max(state.moduleIndex - 1, 0));
    else previousReveal();
  }
  else if (event.key.toLowerCase() === "a") playAudio();
  else if (event.key.toLowerCase() === "r") resetEncounter();
  else if (event.key.toLowerCase() === "f") toggleFullscreen();
  else if (event.key.toLowerCase() === "p") togglePanel();
});

render();
