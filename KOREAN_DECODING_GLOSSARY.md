# 《韓語三小時》共用韓語解碼詞彙表 v0.1

## 文件角色

本檔案是《韓語三小時》全課程共用的解碼詞彙表，供以下產品與教材使用：

- Teaching Web
- Practice Web
- Final Challenge
- 解碼卡
- 七週後續 Encounter

同一個韓語 Encounter 一旦在本表確認，所有介面與教材應使用相同的中文解碼詞，不再於個別頁面重新判斷或自行改寫。

## 使用原則

1. 中文 Reveal 優先使用韓語原來的漢語詞／漢字詞，而不是先使用自然語意翻譯。
2. 這樣做是為了保留漢字線索，讓學員感受到韓語與中文之間的可解碼關係。
3. 若漢語詞的漢字形式接近學員熟悉的漢字／日文漢字，且一般學員可辨識，優先保留原漢語詞；例如 `仁川國際空港` 不改成 `仁川國際機場`。
4. 台灣常用中文翻譯可作為補充，但不取代主要的漢語詞 Reveal。
5. 漢字詞與 English 外來語分開管理，不混用同一套來源邏輯。
6. 未確認的詞彙只能標記為「待確認」，不得直接進入正式 Teaching Web、Practice Web 或 Final Challenge。
7. 詞彙表確認後，後續使用不需要再次判斷；若要修改，必須留下變更紀錄與原因。

## 欄位定義

| 欄位 | 說明 |
|---|---|
| `id` | 全課程唯一識別名稱 |
| `korean` | 韓語原文 |
| `romanization` | Teaching Web 使用的羅馬拼音 |
| `source_type` | `hanja`、`english`、`scene` 或其他來源類型 |
| `hanja_term` | 韓語對應的漢字／漢語詞 |
| `teaching_zh_tw` | Teaching Web 主要顯示詞 |
| `common_zh_tw` | 台灣常用中文翻譯，可作補充 |
| `literal_note` | 必要時的字面說明 |
| `status` | `待確認` 或 `已確認` |
| `approved_date` | 確認日期；未確認留白 |
| `notes` | 發音、字形、使用範圍或限制 |

## 詞彙表

### A. 第一版 Teaching Web Encounter

| id | Korean | Romanization | Source | 漢語詞 | Teaching Web 顯示詞 | 台灣常用詞 | 狀態 |
|---|---|---|---|---|---|---|---|
| `hwajangsil` | 화장실 | hwajangsil | hanja | 化粧室 | 化粧室 | 洗手間 | 已確認 |
| `gwang` | 광 | gwang | hanja | 光 | 光 | 光 | 待確認 |
| `gwanghwamun` | 광화문 | gwanghwamun | hanja | 光化門 | 光化門 | 光化門 | 待確認 |
| `incheon-gukje-gonghang` | 인천국제공항 | Incheon Gukje Gonghang | hanja／scene | 仁川國際空港 | 仁川國際空港 | 仁川國際機場 | 已確認 |

### B. Baseline 已提出的候選詞

| id | Korean | Romanization | Source | 漢語詞 | Teaching Web 顯示詞 | 台灣常用詞 | 狀態 |
|---|---|---|---|---|---|---|---|
| `byeongwon` | 병원 | byeongwon | hanja | 病院 | 病院 | 醫院 | 待確認 |
| `yakguk` | 약국 | yakguk | hanja | 藥局 | 藥局 | 藥局 | 待確認 |
| `eunhaeng` | 은행 | eunhaeng | hanja | 銀行 | 銀行 | 銀行 | 待確認 |
| `ipgu` | 입구 | ipgu | hanja | 入口 | 入口 | 入口 | 待確認 |
| `chulgu` | 출구 | chulgu | hanja | 出口 | 出口 | 出口 | 待確認 |
| `baekhwajeom` | 백화점 | baekhwajeom | hanja | 百貨店 | 百貨店 | 百貨公司／百貨店 | 待確認 |
| `jihacheol` | 지하철 | jihacheol | hanja | 地下鐵 | 地下鐵 | 地鐵 | 待確認 |

### C. 第一版「高可猜性」外來語／熟悉詞候選詞庫

選擇原則：優先選國中以前已熟悉、且韓語音譯後仍有高度可猜性的詞。這 30 個是第一版候選詞庫，不代表全部都已通過最終 Corpus 審查。

English 外來語保留 English source；韓語固有詞與漢字詞則保留正確詞源分類，不為了放進同一張表而誤稱為 English 外來語。

| id | Korean | Romanization | Source／English source | Teaching Web 顯示詞 | 台灣常用詞 | 狀態 |
|---|---|---|---|---|---|---|
| `keopi` | 커피 | keopi | English: coffee | coffee | 咖啡 | 第一版候選 |
| `uyu` | 우유 | uyu | 韓語固有詞／非外來語 | 우유 | 牛奶 | 第一版候選 |
| `juseu` | 주스 | juseu | English: juice | juice | 果汁 | 第一版候選 |
| `kolla` | 콜라 | kolla | English: cola | cola | 可樂 | 第一版候選 |
| `wain` | 와인 | wain | English: wine | wine | 葡萄酒 | 第一版候選 |
| `maekju` | 맥주 | maekju | 漢字詞：麥酒 | 麥酒 | 啤酒 | 第一版候選 |
| `kape` | 카페 | kape | English: café | café | 咖啡廳 | 第一版候選 |
| `hotel` | 호텔 | hotel | English: hotel | hotel | 飯店 | 第一版候選 |
| `menyu` | 메뉴 | menyu | English: menu | menu | 菜單 | 第一版候選 |
| `beoseu` | 버스 | beoseu | English: bus | bus | 公車 | 第一版候選 |
| `taeksi` | 택시 | taeksi | English: taxi | taxi | 計程車 | 第一版候選 |
| `kadeu` | 카드 | kadeu | English: card | card | 卡片／信用卡 | 第一版候選 |
| `keompyuteo` | 컴퓨터 | keompyuteo | English: computer | computer | 電腦 | 第一版候選 |
| `inteonet` | 인터넷 | inteonet | English: internet | internet | 網路 | 第一版候選 |
| `seumateupon` | 스마트폰 | seumateupon | English: smartphone | smartphone | 智慧型手機 | 第一版候選 |
| `bidio` | 비디오 | bidio | English: video | video | 影片 | 第一版候選 |
| `radio` | 라디오 | radio | English: radio | radio | 收音機 | 第一版候選 |
| `tellebijeon` | 텔레비전 | tellebijeon | English: television | television | 電視 | 第一版候選 |
| `aiseukeurim` | 아이스크림 | aiseukeurim | English: ice cream | ice cream | 冰淇淋 | 第一版候選 |
| `chokollit` | 초콜릿 | chokollit | English: chocolate | chocolate | 巧克力 | 第一版候選 |
| `keikeu` | 케이크 | keikeu | English: cake | cake | 蛋糕 | 第一版候選 |
| `saendeuwichi` | 샌드위치 | saendeuwichi | English: sandwich | sandwich | 三明治 | 第一版候選 |
| `haembeogeo` | 햄버거 | haembeogeo | English: hamburger | hamburger | 漢堡 | 第一版候選 |
| `pija` | 피자 | pija | English: pizza | pizza | 披薩 | 第一版候選 |
| `chijeu` | 치즈 | chijeu | English: cheese | cheese | 起司 | 第一版候選 |
| `tomato` | 토마토 | tomato | English: tomato | tomato | 番茄 | 第一版候選 |
| `banana` | 바나나 | banana | English: banana | banana | 香蕉 | 第一版候選 |
| `remon` | 레몬 | remon | English: lemon | lemon | 檸檬 | 第一版候選 |
| `orenji` | 오렌지 | orenji | English: orange | orange | 柳橙 | 第一版候選 |
| `milkeu` | 밀크 | milkeu | English: milk | milk | milk；日常牛奶為 `우유` | 第一版候選 |

### 分類注意

- `우유`：韓語固有詞，不是 English 外來語；可作熟悉詞對照素材，但不能當作 `English → 韓語音譯` 的示例。
- `맥주`：漢字詞「麥酒」，不是 English 外來語；應放入漢字詞解碼路徑。
- `밀크`：English `milk` 的外來語形式；與日常更常用的 `우유` 並列，可用來示範「同一概念有不同來源」。
- 其餘 English source 仍需在 Corpus 中依旅遊出現率、可破解度、立即有用度與視覺素材價值排序。

### D. 韓國旅遊地名候選詞

這一類是旅遊場景中的地名／固有名詞。主要任務是讓學員把韓語文字與已知地理名稱連起來，不強行套用漢字詞或 English 外來語的解碼路徑。

| id | Korean | Romanization | 類型 | Teaching Web 顯示詞 | 台灣常用地名 | 狀態 |
|---|---|---|---|---|---|---|
| `seoul` | 서울 | Seoul | 旅遊地名／固有名詞 | Seoul | 首爾 | 第一版候選 |
| `busan` | 부산 | Busan | 旅遊地名／固有名詞 | Busan | 釜山 | 第一版候選 |
| `incheon` | 인천 | Incheon | 旅遊地名／固有名詞 | Incheon | 仁川 | 第一版候選 |
| `gangnam` | 강남 | Gangnam | 旅遊地名／固有名詞 | Gangnam | 江南 | 第一版候選 |
| `myeongdong` | 명동 | Myeongdong | 旅遊地名／固有名詞 | Myeongdong | 明洞 | 第一版候選 |

### 地名顯示順序

```text
韓語
→ 羅馬拼音
→ 台灣常用地名（必要時）
```

例如：

```text
서울
→ Seoul
→ 首爾
```

地名的中文不是漢字詞解碼的主要答案；它是旅遊使用者已知地理名稱的對照線索。

## 顯示順序規則

### 漢字詞 Encounter

```text
韓語
→ 羅馬拼音
→ 韓語漢字詞／漢語詞
→ 台灣常用中文（必要時）
```

例如：

```text
화장실
→ hwajangsil
→ 化粧室
→ 洗手間
```

### English 外來語 Encounter

```text
韓語
→ 羅馬拼音
→ English source
→ 繁體中文（必要時）
```

## 確認流程

詞彙進入 `已確認` 前，至少檢查：

1. 韓語拼寫與羅馬拼音是否正確。
2. 漢語詞／漢字詞是否為適合本課程的解碼顯示形式。
3. 是否保留台灣學員能理解的中文補充詞。
4. 是否符合台灣赴韓旅客的 Encounter 情境。
5. 是否適合用於拆 → 擬 → 猜 → 驗證。

確認後，應同步更新使用該詞的 Corpus 與產品介面；不在單一頁面建立例外翻譯。

## 變更紀錄

| 日期 | 變更 | 原因 |
|---|---|---|
| 2026-09-18 | 建立 v0.1，收錄第一版 Teaching Web 與 Baseline 候選詞 | 建立全課程共用的中文解碼基準 |

## 目前待確認

- `화장실` 的主要顯示形式已確認為「化粧室」。
- `인천국제공항` 的主要顯示形式已確認為「仁川國際空港」，不改成「仁川國際機場」。
- 哪些候選詞可正式進入第一版 Corpus，需依旅遊出現率與可破解度再確認。
