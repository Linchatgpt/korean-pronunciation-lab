# 專案交接紀錄

## 最新狀態

2026-09-28 已初始化本機 Git，`origin` 指向公開 GitHub repository `Linchatgpt/korean-pronunciation-lab`，且已 fetch 遠端 `main`。遠端最新 commit `6a3b9ef`（2026-09-20）未包含目前使用中的 `soundlab.css`、`lab-overrides.css`、`data/word-lists.json` 與新單字音檔。本地 `main` 尚無 commit，專案檔案未追蹤；沒有執行 commit、push、merge 或覆蓋遠端。下一步需決定如何把目前本機網站納入既有 Git 歷史。

2026-09-27 最新 UI 調整：將整列「播放這一組／字卡間隔／點選卡片即可翻面」放在每一種分類標題下方（母音、W／Y 系列、子音、硬音、單字皆顯示），從首頁主視覺區移除。刪除「所有字卡皆使用預錄 MP3 音檔。」常駐提示，也移除播放成功後「正在播放…」文字，必要錯誤仍可顯示。HTML、JavaScript、覆寫 CSS 更新快取識別，Service Worker 升至 v18。本機預覽已確認功能列位於分類標題下方；已部署至 production，deploy ID `6ab8d8582fc1f1d495a7da5f`。正式 HTML、App、CSS、Service Worker、30 筆單字詞表及一筆單字 MP3 均回應成功，正式 HTML／App 中已找不到兩條被移除的常駐訊息。

首頁播放器目前為混合來源：既有母音、W／Y 系列、子音、硬音音檔，加上 30 個指定 MiniMax voice 的單字 MP3。程式不使用瀏覽器語音合成。

2026-09-27 使用者接受「單字」30 個發音改用 MiniMax voice `Korean_objective_reporter_vv1`。新 MP3 位於 `audio/soundlab/words-objective-reporter/`，詞表與正式 manifest 已更新指向新檔；原 `audio/soundlab/words/` 舊錄音保留。產音腳本預設 voice、PRODUCT、USER_GUIDE 與 assets README 已更新；腳本仍支援 `MINIMAX_VOICE_ID` 與 `MINIMAX_MANIFEST_FILENAME` 環境變數覆寫。

新 voice 已部署至 Netlify，deploy ID `6ab89c086a9120e7189fa440`。正式站 30/30 單字 MP3、舊母音音檔及 Service Worker v15 已核對。本機預覽仍在 `http://127.0.0.1:8784/`。

使用者回報手機播放整組只播放第一張，之後只有卡片標記輪播。已修改 `app.js`，整組使用同一個 HTML 音訊元素播放每個 MP3，錯誤時停止並提示；HTML 音檔版本標記更新為 `mobile-sequence-audio-1`，Service Worker 更新為 v12。已部署至正式 Netlify，deploy ID `6ab88ea991bf29c90615e80d`；正式網址回應新版 HTML、程式與 Service Worker 均已核對，待手機實機確認。

使用者已在手機確認連續播放正常。已新增跨頁互斥播放：開始播放時向同來源其他頁籤透過 BroadcastChannel 與 `storage` 事件通知停止；版本標記為 `cross-page-audio-1`，Service Worker v13。已部署至正式 Netlify，deploy ID `6ab89138d79aa5a8a73aadd3`；正式頁、程式與 Service Worker v13 已核對。範圍限同一瀏覽器／裝置，不同訪客／裝置各自播放。

最新要求：播放時切換字母組別或單字清單應立即停播。已在分類和單字清單切換事件中先呼叫 `stopCurrentAudio()`，新程式標記 `stop-on-group-switch-1`，Service Worker v14。已部署至正式 Netlify，deploy ID `6ab891ed8a010d3a5ea15c3a`；正式 HTML、程式和 SW 已核對。尚未手動操作網站確認切換行為。

## 本次完成

- 主頁圓環中央現在使用使用者提供的盾牌形太極旗徽章 PNG，取代手繪 SVG 和學習進度數字。已去除外部漸層背景，透明 PNG 加入 PWA 快取；本機預覽確認顯示正常，快取版本升至 v10。
- 使用者要求徽章放大並與內圈保留約 0.2 間距；已將可視徽章調至內圈直徑約 80%，本機瀏覽器確認周圍仍有空間。快取版本升至 v11。
- `app.js` 恢復其他分類到原有 `audio/vowels/`、`audio/consonants/` 路徑；單字維持 `audio/soundlab/words/`。
- `audio/soundlab/manifest.json` 現在只列 30 個單字音檔。
- `generate_pronunciation_lab_audio.py` 已改成只產生單字 MP3；只會生成缺少的檔案，不會覆寫既有音檔，並保留／更新 manifest。
- PWA 快取同時包含原字母音檔和 30 個單字音檔。
- 新增 `data/word-lists.json` 作為單字資料來源；原有 30 張卡是「全部單字」且為預設。支援分類與自訂清單，網站單字卡與產音腳本共用此資料。
- 單字選擇列新增交通、食品／餐飲、外來語、旅遊常用詞、地名／品牌、測驗題、釜山旅遊。測驗題現階段只呈現卡片，沒有作答或計分功能。
- 產音腳本依 JSON 詞條韓文與 MP3 路徑執行，只生成尚不存在的音檔；PWA 安裝快取也依 JSON 讀取單字音檔。
- `USER_GUIDE.md` 已補上未來操作流程：新增單字時由我協助確認詞條資料與分類、產生 MiniMax MP3、加入所需清單；新增清單時引用既有單字 ID；只改分類不必重產音檔。
- 「播放這一組」旁提供 1／2／3 秒間隔與自訂拉桿；自訂為 1–10 秒整數，預設 1 秒，套用於目前選取的字母組或單字清單。
- 播放當下字卡會翻面並以黃色／橘色外框標示，音檔結束後翻回正面並保留「剛播放」標記到下一張開始；停止時清除標示。原效果太短暫，不易察覺，已改為標示持續到下一張播放。
- 使用者反映看不到效果後，在原本 8766 預覽分頁重新載入最新版，手動播放「硬音」確認正在播放的卡片翻面並顯示明顯黃／橘外框；音檔結束後卡片翻回正面，保留「剛播放」標記。舊分頁先前曾顯示播放狀態不同步，原因是舊版播放邏輯曾清除高亮；目前載入的 `app.js?v=sequence-feedback-2` 已修正。
- 同步更新 `PRODUCT.md`、`TASK.md`、`assets/README.md`。

## 尚未完成

- 本機預覽已確認：單字預設呈現 30 張全部單字卡；交通清單切換為 4 張卡；測驗題空清單可呈現編輯提示。尚未逐張聽取音檔。
- 上一輪多產生的 `audio/soundlab/vowels/`、`audio/soundlab/consonants/` 保留在檔案系統，但不再被頁面引用或收錄於 manifest。
- Teaching Web 的獨立 HTML/CSS 入口尚待復原。

## 正式發布

- 2026-09-27 將 80 個執行所需檔案部署至既有 Netlify production site `korean-pronunciation-lab`；deploy ID：`6ab88b5608b0ba41350c73bb`。
- 正式網址：<https://korean-pronunciation-lab.netlify.app>。部署後確認首頁、太極旗 PNG、30 個單字／8 份清單、Service Worker v11 與一筆 MP3 均可正常載入；使用者既有分頁的舊 Service Worker 曾顯示舊版，使用新網址更新後，正式根網址也確認載入新版。
- 發布時只上傳靜態執行檔與音檔，排除產品文件和產音腳本。

## 下一個最小步驟

目前正式單字卡已使用新 voice；後續新增單字沿用更新後的產音腳本與使用手冊。Teaching Web 入口復原另列新階段。
