const groups = {
  vowels: { label: '母音', sub: '基本母音', color: 'mint', cards: [['ㅏ','a','a'],['ㅓ','eo','ŏ'],['ㅗ','o','o'],['ㅜ','u','u'],['ㅡ','eu','ŭ'],['ㅣ','i','i'],['ㅐ','ae','ae'],['ㅔ','e','e']] },
  w: { label: 'W 系列', sub: '複合母音', color: 'yellow', cards: [['ㅘ','wa','wa'],['ㅙ','wae','wae'],['ㅚ','oe','we'],['ㅝ','wo','wŏ'],['ㅞ','we','we'],['ㅟ','wi','wi'],['ㅢ','ui','ŭi']] },
  y: { label: 'Y 系列', sub: '滑音母音', color: 'blue', cards: [['ㅑ','ya','ya'],['ㅕ','yeo','yŏ'],['ㅛ','yo','yo'],['ㅠ','yu','yu'],['ㅒ','yae','yae'],['ㅖ','ye','ye']] },
  consonants: { label: '子音', sub: '基本子音', color: 'orange', cards: [['ㅂ','b / p','b'],['ㅍ','p','p'],['ㅁ','m','m'],['ㄷ','d / t','d'],['ㅌ','t','t'],['ㄴ','n','n'],['ㄹ','r / l','r'],['ㄱ','g / k','g'],['ㅋ','k','k'],['ㅇ','ng / —','ng'],['ㅎ','h','h'],['ㅈ','j','j'],['ㅊ','ch','ch'],['ㅅ','s','s']] },
  tense: { label: '硬音', sub: '緊音子音', color: 'tense', cards: [['ㄲ','kk','ㄲ'],['ㄸ','tt','ㄸ'],['ㅃ','pp','ㅃ'],['ㅆ','ss','ㅆ'],['ㅉ','jj','ㅉ']] },
  words: { label: '單字', sub: 'Korean words', color: 'word', cards: [] }
};
const AUDIO_PATHS = {
  ...Object.fromEntries(Object.entries({
    'ㄱ':'ㄱ_g.mp3','ㄲ':'ㄲ_gg.mp3','ㄴ':'ㄴ_n.mp3','ㄷ':'ㄷ_d.mp3','ㄸ':'ㄸ_dd.mp3','ㄹ':'ㄹ_l.mp3','ㅁ':'ㅁ_m.mp3','ㅂ':'ㅂ_b.mp3','ㅃ':'ㅃ_bb.mp3','ㅅ':'ㅅ_s.mp3','ㅆ':'ㅆ_ss.mp3','ㅈ':'ㅈ_j.mp3','ㅉ':'ㅉ_jj.mp3','ㅊ':'ㅊ_ch.mp3','ㅋ':'ㅋ_k.mp3','ㅌ':'ㅌ_t.mp3','ㅍ':'ㅍ_p.mp3','ㅎ':'ㅎ_h.mp3',
  }).map(([symbol,file])=>[symbol,`audio/consonants/${file}`])),
  ...Object.fromEntries(Object.entries({
    'ㅏ':'ㅏ_ a.mp3','ㅐ':'ㅐ_ ae.mp3','ㅓ':'ㅓ_ eo.mp3','ㅔ':'ㅔ_ e.mp3','ㅗ':'ㅗ_ o.mp3','ㅜ':'ㅜ_u.mp3','ㅡ':'ㅡ_ eu.mp3','ㅣ':'ㅣ_ i.mp3','ㅘ':'ㅘ wa.mp3','ㅙ':'ㅙ wae.mp3','ㅚ':'ㅚ oe.mp3','ㅝ':'ㅝ wo.mp3','ㅞ':'ㅞ we.mp3','ㅟ':'ㅟ wi.mp3','ㅢ':'ㅢ ui.mp3','ㅑ':'ㅑ ya.mp3','ㅒ':'ㅒ yae.mp3','ㅕ':'ㅕ yeo.mp3','ㅖ':'ㅖ ye.mp3','ㅛ':'ㅛ yo.mp3','ㅠ':'ㅠ yu.mp3',
  }).map(([symbol,file])=>[symbol,`audio/vowels/${file}`]))
};
let wordData = { words: [], lists: [] };
let current = 'vowels';
let currentWordList = 'all-words';
let playGapSeconds = 1;
let seen = new Set(); let soundOn = true; let activeAudio = null; let playingKey = null; let sequenceTimer = null; let sequenceActiveCard = null; let sequenceRunId = 0;
const AUDIO_LOCK_KEY = 'korean-pronunciation-lab-audio-start';
const AUDIO_TAB_ID = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const audioChannel = 'BroadcastChannel' in window ? new BroadcastChannel('korean-pronunciation-lab-audio') : null;
const tabs = document.querySelector('#tabs'), wordListsNav = document.querySelector('#wordLists'), cards = document.querySelector('#cards'), count = document.querySelector('#cardCount');
const audioMessage = document.querySelector('#audioMessage');
function showAudioMessage(message){audioMessage.textContent=message;audioMessage.hidden=!message;}

function visibleWordCards(){
  const list = wordData.lists.find(item => item.id === currentWordList) || wordData.lists.find(item => item.type === 'all');
  if(!list) return [];
  const wordsById = new Map(wordData.words.map(word => [word.id, word]));
  return list.itemIds.map(id => wordsById.get(id)).filter(Boolean);
}
function visibleCards(){
  if(current === 'words') return visibleWordCards().map(word => ({...word, symbol:word.korean, hint:word.pronounce, key:`word-${word.id}`}));
  return groups[current].cards.map((card,i) => ({symbol:card[0], roman:card[1], hint:card[2], audio:AUDIO_PATHS[card[0]], key:`${current}-${i}`}));
}
function setPlayAllButton(playing){ const button=document.querySelector('#playAll'); button.innerHTML=playing?'<span>■</span> 停止播放':'<span>▶</span> 播放這一組'; }
function clearSequenceHighlight(){ if(sequenceActiveCard){sequenceActiveCard.classList.remove('sequence-active','sequence-speaking','sequence-played','flipped');sequenceActiveCard=null;} }
function announceAudioStart(){ const message={type:'start',owner:AUDIO_TAB_ID,at:Date.now()}; audioChannel?.postMessage(message); try{localStorage.setItem(AUDIO_LOCK_KEY,JSON.stringify(message));}catch{} }
function stopCurrentAudio(updateButton=true,clearHighlight=true){ sequenceRunId++; if(sequenceTimer){clearTimeout(sequenceTimer);sequenceTimer=null;} if(activeAudio){activeAudio.pause();activeAudio.currentTime=0;activeAudio.onended=null;activeAudio.onerror=null;activeAudio=null;} if(clearHighlight)clearSequenceHighlight(); playingKey=null; if(updateButton)setPlayAllButton(false); }
function stopForOtherPage(message){ if(message?.type!=='start'||message.owner===AUDIO_TAB_ID)return; if(playingKey||sequenceTimer||activeAudio){stopCurrentAudio();showAudioMessage('另一個分頁正在播放，已停止此頁的聲音。');} }
audioChannel?.addEventListener('message',event=>stopForOtherPage(event.data));
window.addEventListener('storage',event=>{if(event.key!==AUDIO_LOCK_KEY||!event.newValue)return;try{stopForOtherPage(JSON.parse(event.newValue));}catch{}});
function speak(source,symbol,key='single',onEnded=null){ if(!soundOn) return; if(key!=='sequence' && (sequenceTimer||playingKey==='sequence'||activeAudio)){stopCurrentAudio(key!=='sequence',key!=='sequence');} if(!source){showAudioMessage(`找不到「${symbol}」的預錄音檔。`);if(key==='sequence')stopCurrentAudio();else setPlayAllButton(false);return;} announceAudioStart(); playingKey=key; setPlayAllButton(key==='sequence'); if(!activeAudio)activeAudio=new Audio(); const audio=activeAudio; audio.preload='auto'; audio.onended=()=>{if(activeAudio!==audio)return; if(key==='sequence'){playingKey=null;if(sequenceActiveCard){sequenceActiveCard.classList.remove('sequence-speaking','flipped');sequenceActiveCard.classList.add('sequence-played');}onEnded?.();}else{activeAudio=null;playingKey=null;setPlayAllButton(false)}}; audio.onerror=()=>{if(activeAudio!==audio)return;activeAudio=null;playingKey=null;showAudioMessage(`「${symbol}」的預錄音檔無法載入；播放已停止。`);if(key==='sequence'){stopCurrentAudio();}else setPlayAllButton(false)}; audio.pause();try{audio.currentTime=0;}catch{} audio.src=encodeURI(source); audio.load(); audio.play().catch(()=>{if(activeAudio!==audio)return;activeAudio=null;playingKey=null;showAudioMessage(`「${symbol}」的預錄音檔播放失敗；播放已停止。`);if(key==='sequence')stopCurrentAudio();else setPlayAllButton(false)}); }
function renderTabs(){
  tabs.innerHTML = Object.entries(groups).map(([key,g])=>`<button class="tab ${key===current?'active':''}" data-group="${key}">${g.label}<span class="tab-count">${key==='words'?wordData.words.length:g.cards.length}</span></button>`).join('');
  tabs.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{stopCurrentAudio();current=button.dataset.group; if(current==='words')currentWordList='all-words'; renderTabs();renderWordLists();renderCards();}));
}
function renderWordLists(){
  const isWords=current==='words'; wordListsNav.hidden=!isWords;
  if(!isWords)return;
  wordListsNav.innerHTML=wordData.lists.map(list=>{
    const amount=list.type==='all'?wordData.words.length:list.itemIds.length;
    return `<button class="tab ${list.id===currentWordList?'active':''}" data-list="${list.id}">${list.label}<span class="tab-count">${amount}</span></button>`;
  }).join('');
  wordListsNav.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{stopCurrentAudio();currentWordList=button.dataset.list;renderWordLists();renderCards();}));
}
function renderCards(){
  const isWords=current==='words'; const list=visibleCards();
  count.textContent=`${list.length} cards`;
  document.querySelector('#sectionTitle').textContent=isWords?'選一個單字，聽見它的聲音。':'選一組，開始辨認聲音。';
  if(!list.length){cards.innerHTML='<p class="empty-list">這份清單目前還沒有單字。可在 <code>data/word-lists.json</code> 的 <code>itemIds</code> 加入已存在的單字 ID。</p>';return;}
  cards.innerHTML=list.map((item,i)=>`<article class="card ${isWords?'word-card ':''}${seen.has(item.key)?'seen':''}" tabindex="0" data-index="${i}" aria-label="${item.symbol}，羅馬拼音 ${item.roman}，點擊翻面並播放發音"><div class="card-inner"><div class="card-face card-front"><span class="card-index">${String(i+1).padStart(2,'0')}</span><span class="card-symbol">${item.symbol}</span></div><div class="card-face card-back"><span class="card-symbol">${item.symbol}</span><span class="roman">${item.roman}</span><span class="pronounce">${item.hint}</span><button class="play-card" aria-label="播放或停止 ${item.symbol} 的發音">▶</button></div></div></article>`).join('');
  cards.querySelectorAll('.card').forEach(card=>{
    const item=list[Number(card.dataset.index)];
    const flip=()=>{card.classList.toggle('flipped');seen.add(item.key);updateProgress();if(playingKey===item.key)stopCurrentAudio();else speak(item.audio||AUDIO_PATHS[item.symbol],item.symbol,item.key)};
    card.addEventListener('click',event=>{if(event.target.closest('.play-card')){event.stopPropagation();if(playingKey===item.key)stopCurrentAudio();else speak(item.audio||AUDIO_PATHS[item.symbol],item.symbol,item.key);return}flip()});
    card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();flip()}});
  });
}
function updateProgress(){ /* Progress display was replaced by the Korea flag. */ }
document.querySelector('#soundToggle').addEventListener('click',event=>{soundOn=!soundOn;if(!soundOn)stopCurrentAudio();event.currentTarget.classList.toggle('off',!soundOn);event.currentTarget.setAttribute('aria-pressed',soundOn);event.currentTarget.innerHTML=`<span class="sound-icon" aria-hidden="true">${soundOn?'🔊':'🔇'}</span> ${soundOn?'聲音開啟':'聲音關閉'}`;});
const playGapSelect=document.querySelector('#playGap');
const playGapCustom=document.querySelector('#playGapCustom');
const playGapRange=document.querySelector('#playGapRange');
const playGapValue=document.querySelector('#playGapValue');
playGapSelect.addEventListener('change',event=>{const custom=event.currentTarget.value==='custom';playGapCustom.hidden=!custom;playGapSeconds=custom?Number(playGapRange.value):Number(event.currentTarget.value);});
playGapRange.addEventListener('input',event=>{playGapSeconds=Number(event.currentTarget.value);playGapValue.value=`${playGapSeconds} 秒`;playGapValue.textContent=`${playGapSeconds} 秒`;});
document.querySelector('#playAll').addEventListener('click',()=>{ if(!soundOn)return; if(sequenceTimer||playingKey==='sequence'){stopCurrentAudio();return} const list=visibleCards();if(!list.length)return;stopCurrentAudio(false);const runId=sequenceRunId;let i=0;const playNext=()=>{if(runId!==sequenceRunId)return;if(i>=list.length){clearSequenceHighlight();if(activeAudio){activeAudio.pause();activeAudio=null;}setPlayAllButton(false);return;}clearSequenceHighlight();const index=i;const item=list[i++];sequenceActiveCard=cards.querySelector(`.card[data-index="${index}"]`);sequenceActiveCard?.classList.add('sequence-active','sequence-speaking','flipped');speak(item.audio||AUDIO_PATHS[item.symbol],item.symbol,'sequence',()=>{if(runId!==sequenceRunId)return;sequenceTimer=setTimeout(()=>{sequenceTimer=null;playNext();},playGapSeconds*1000);});};playNext();});
fetch('data/word-lists.json').then(response=>{if(!response.ok)throw new Error('單字清單載入失敗');return response.json();}).then(data=>{wordData=data;renderTabs();renderWordLists();renderCards();}).catch(error=>{showAudioMessage(`${error.message}；字母卡仍可使用。`);renderTabs();renderWordLists();renderCards();});
