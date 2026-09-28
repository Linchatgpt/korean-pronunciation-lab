# Teaching Web 素材說明

Teaching Web 目前已為主線 Encounter 與「韓語耳朵暖身」七題放入由 MiniMax 產生的內部驗證音檔。正式版本仍需確認 voice、發音品質與使用授權。

```text
assets/audio/hwajangsil.mp3
assets/audio/hwa.mp3
assets/audio/gwang.mp3
assets/audio/gwanghwamun.mp3
assets/audio/incheon-gukjegonghang.mp3
assets/audio/warmup-yakguk.mp3
assets/audio/warmup-byeongwon.mp3
assets/audio/warmup-miyongsil.mp3
assets/audio/warmup-hagwon.mp3
assets/audio/warmup-sikdang.mp3
assets/audio/warmup-baekhwajeom.mp3
assets/audio/warmup-eunhaeng.mp3

子音家族另有 15 個內部驗證音檔，命名規則為：

```text
assets/audio/consonant-{family}-{1|2|3}.mp3

assets/audio/y-series-1.mp3
assets/audio/y-series-2.mp3
assets/audio/y-series-3.mp3
assets/audio/w-series.mp3
```

三個階段分別是純子音、子音＋`아`、子音＋`이`。
```

目前機場 Encounter 播放的是完整 `인천국제공항` 的 MiniMax 音檔。`공항.mp3` 仍保留作為單獨詞語素材；正式版本仍需確認 voice、發音品質與來源紀錄。

機場場景目前使用 CSS 概念場景，僅供內部驗證，不代表正式商業素材；正式版本可替換為圖片，並在 Corpus 記錄 `image_license`。

## Hangul Sound Lab 首頁音檔

首頁所有字卡使用預錄 MP3，不使用瀏覽器語音合成備援。母音、W／Y 系列、子音與硬音沿用既有 `audio/vowels/`、`audio/consonants/` 音檔。

「單字」30 張卡片使用 `scripts/generate_pronunciation_lab_audio.py` 產生的 MiniMax `speech-2.8-hd` MP3，指定 voice ID 為 `Korean_objective_reporter_vv1`，儲存在 `audio/soundlab/words-objective-reporter/`；索引與文字對照見 `audio/soundlab/manifest.json`。正式使用授權與發音品質仍待確認。

後續只為新增單字生成新 MP3，沿用同一腳本、模型、voice ID、檔案路徑與 manifest 格式；不重生成或替換既有母音、W／Y 系列、子音、硬音音檔。原 voice 的 30 個單字 MP3 保留在 `audio/soundlab/words/` 作為舊版素材，不供目前網站使用。
