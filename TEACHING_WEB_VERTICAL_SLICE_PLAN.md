# Teaching Web 10–15 分鐘 Vertical Slice 設計規格 v0.1

## 狀態

設計已獲確認，第一版已開始 coding；本文件同步記錄目前 Reveal 調整。

## 已確認決策

- 主線：`화장실 → 화 → 광 → 광화문 → 機場場景`
- 同一個 Vertical Slice 同時驗證「形、音、義」。
- 真實場景選擇：機場。
- Audio 第一版：一個標準韓語音檔、手動播放、可重播、不自動播放。
- 最小技術方向：靜態 JSON、本地／已授權圖片與音訊、前端 state management、講師 keyboard controls。
- Practice Web 不使用 AI；本 Vertical Slice 也不加入 AI。

## 驗證目標

驗證互動式 Teaching Web 是否能取代 PPT，並支援：

1. 講師控制 progressive reveal，而非一次展示完整答案。
2. 學員依序經歷拆 → 擬 → 猜 → 驗證，並以「韓語 → 羅馬拼音 → 中文／漢字線索」呈現解碼路徑。
3. 同一個 Encounter 從形的拆解連到音的校準，再連到義的猜測。
4. 講師主要使用鍵盤授課，不依賴滑鼠操作。
5. 真實機場場景能提供語義線索，而不是只展示白底韓文字。
6. 同一份 Corpus 資料可以支援 Teaching Web 的多層 Reveal。

### 後續新增的聲音暖身方向

聲音暖身是 Baseline 的課程設計新增項目，尚未納入目前已完成的主線 Vertical Slice。未來可另做一個小型驗證段落，不改寫現有 `화장실 → 화 → 광 → 광화문 → 機場` 主線。

建議 Reveal：

1. 只播放 Audio
2. 顯示 Romanization
3. 切分聲音單位
4. 顯示漢字／English source
5. 顯示現代中文語意
6. 最後顯示韓文字母

這個方向與正式文字解碼相反，目的是先驗證聲音解碼力，不是增加一套單字課程。

## 目前已完成的 12–14 分鐘主線旅程

以下主線維持原設計，不包含尚未 coding 的聲音暖身：

| 時間 | State | 畫面與活動 | 主要驗證 |
|---|---|---|---|
| 0:00–1:00 | Boss Challenge | 只顯示 `화장실`；講師問能否拆、念、理解 | 大字、留白、課堂張力 |
| 1:00–2:30 | 音節 Reveal | `화장실 → 화｜장｜실` | 第一層 progressive reveal |
| 2:30–4:30 | `화` 結構 | `화 → ㅎ + ㅘ → hwa` | 方塊拆解與羅馬拼音 |
| 4:30–6:30 | `광` 結構 | `광 → ㄱ + ㅘ + ㅇ → gwang` | 複合母音與尾音，不再拆 `ㅘ` |
| 6:30–8:00 | Audio | 保留 `광` 拆解，手動播放標準韓語發音 | 音的校準與操作感 |
| 8:00–10:00 | 漢字詞 Reveal | `광화문 → 광｜화｜문 → 光｜化｜門 → 光化門` | 從音連到義 |
| 10:00–12:30 | 機場 Encounter | 顯示新機場實景題，學員先拆、擬、猜 | Transfer 與場景線索 |
| 12:30–14:00 | 回收 | 顯示 `拆 → 擬 → 猜 → 驗證`，講師總結 | Teaching Web 是否形成教學節奏 |

## Screen / State Map

### State 0：待機

顯示課程標題與「今天不是背韓文，而是找線索」。`Space` 進入 State 1。

### State 1：Boss Challenge

只顯示：

```text
화장실
```

不顯示中文、Romanization、圖片或答案。

### State 2：音節拆解

```text
화장실
↓
화｜장｜실
```

### State 3：`화` 字母拆解

```text
화
↓
ㅎ + ㅘ
↓
hwa
```

### State 4：`광` 字母拆解

```text
광
↓
ㄱ + ㅘ + ㅇ
↓
gwang
```

### State 5：Audio

保留目前拆解，顯示「播放標準韓語發音」按鈕。Audio 不自動播放，也不自動跳至下一層。

### State 6：`광화문` 意義

```text
광화문
↓
광｜화｜문
↓
gwanghwamun
↓
光化門
```

### State 7：機場真實場景

顯示一張已授權的機場場景圖片與新 Encounter。先只顯示場景／韓文，講師讓學員完成拆、擬、猜，再逐層揭露答案與 audio／意義線索。

### State 8：回收

```text
看見 → 拆 → 擬 → 猜 → 驗證
```

## Progressive Reveal 規則

1. 先顯示 Encounter，不先顯示答案。
2. 先分音節，再拆字母；`ㅘ` 保持為一個可操作的複合母音，不再往下拆。
3. 在結構之後揭露羅馬拼音，讓學員先從韓語形走到可擬的聲音。
4. Audio 在學員嘗試之後才播放。
5. 漢字／中文意義在猜測階段之後才揭露。
5. 機場場景中的圖片先作為線索，不直接圈出答案。
6. 每一層均可前進、後退與重設。
7. Reveal 不自動連播；講師決定教學節奏。

## Reusable Components

- `TeachingStage`：大螢幕主舞台與整體狀態容器。
- `EncounterView`：顯示目前 Encounter。
- `SyllableSplit`：顯示音節分組。
- `LetterBreakdown`：顯示字母、複合母音與尾音拆解。
- `RevealController`：管理 Reveal 前進、後退、重設與目前層級。
- `AudioControl`：播放／重播單一標準韓語音檔。
- `ContextImage`：顯示機場真實場景與圖片狀態。
- `PromptPanel`：顯示講師目前可用的提問。
- `InstructorControlBar`：顯示目前 Encounter、Reveal 進度與狀態。
- `KeyboardController`：集中處理講師快捷鍵。

## Keyboard Controls

| 按鍵 | 功能 |
|---|---|
| `Space` | 下一個 Reveal |
| `Shift + Space` | 上一個 Reveal |
| `←` | 上一個 Encounter |
| `→` | 下一個 Encounter |
| `A` | 播放／重播 Audio |
| `R` | 重設目前 Encounter |
| `F` | Fullscreen |
| `P` | 顯示／隱藏講師控制面板 |
| `Esc` | 離開 Fullscreen 或關閉控制面板 |
| `?` | 顯示快捷鍵說明 |

## Vertical Slice 最小 Corpus 欄位

```text
id
korean
syllable_split
letter_breakdown
pronunciation_support
audio
source_type
hanja
traditional_chinese
travel_context
image
image_license
reveal_steps
rules_tested
```

第一版至少需要：`화장실`、`화`、`광`、`광화문` 與 1 個機場場景 Encounter。機場 Encounter 的具體內容、圖片與音檔來源在實作前仍需確認授權。

## 講師操作流程

1. 開啟 Teaching Web，確認大螢幕與 audio 輸出。
2. 從 State 0 進入 Boss Challenge。
3. 顯示 `화장실`，先讓學員猜，不操作 Reveal。
4. 以 `Space` 逐層展示音節與字母結構。
5. 以 `→` 切換至 `광`，重複拆解邏輯。
6. 以 `A` 播放標準 audio；不要求講師示範 native-like pronunciation。
7. 展示 `광화문` 的漢字詞解碼。
8. 進入機場場景，讓學員先獨立嘗試，再按 Reveal 提示。
9. 回到拆 → 擬 → 猜 → 驗證作總結。

聲音暖身若進入下一版，應作為獨立前置流程，不直接插入目前主線 Encounter 的中間；完成暖身後再進入既有 `화장실` Boss。

## 最小技術架構方向

- 瀏覽器型前端 Teaching Web。
- 靜態 JSON 作為初期 Corpus。
- 本地或已授權圖片與音訊 asset。
- 前端 reducer 或 state machine 管理 Encounter／Reveal 狀態。
- 瀏覽器原生 audio API 播放音訊。
- 集中式 keyboard event handler。
- 不加入後端、登入、資料庫、AI、Practice Web、Final Challenge scoring 或學習紀錄。

## 尚待確認的 UX 問題

- 機場 Encounter 的具體韓文目標與圖片素材。
- 是否顯示 Romanization／發音輔助。
- 是否顯示學員猜測區。
- 機場場景是全班共同破解，還是先個人思考。
- 是否提供講師 presenter notes。
- 是否支援滑鼠作為鍵盤以外的備援操作。
- 是否需要離線播放。

## 驗收重點

Vertical Slice 完成後，應能由實際講師在不依賴滑鼠的情況下完成 12–14 分鐘示範，且觀察到：

- Reveal 能控制學員注意順序。
- Audio 播放不打斷講師節奏。
- `화장실`、`광`、`광화문` 能形成連續的形／音／義學習線。
- 機場場景能支持新 Encounter 的猜測，而不是只展示答案。
- 講師感覺是在主持一個互動教學舞台，而不是操作投影片。
