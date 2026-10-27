# MBTI Survival Guide｜人格臨時辦公室

這是一個手機直式的惡搞人格測驗。純 HTML、CSS、原生 JavaScript；沒有 React、Next.js、後端、資料庫、API Key 或環境變數。
12 題、16 種結果、24 句選項吐槽、四款角色插畫，以及結果卡 PNG 下載。

## 檔案結構

- `public/index.html`：內容、題庫、計分、結果與下載功能。
- `public/assets/effects.css`：首頁浮動、掃光、跑馬燈、選項與結果動畫。
- `public/assets/effects.js`：題目切換、點擊漣漪、結果彩紙。
- `public/assets/office-hero.webp`：首頁插畫。
- `public/assets/personality-atlas.webp`：結果角色四宮格素材。
- `public/assets/vendor/`：結果卡匯出所用的 html-to-image 1.11.13 及 MIT 授權。
- `vercel.json`：已設定好的 Vercel 部署設定。
- `preview.mjs`：本機預覽工具；不是 Vercel 後端。

## Vercel：GitHub 匯入方式

1. 解壓縮 ZIP。
2. 在 GitHub 建立新 repository，例如 `mbti-survival-guide`。
3. 上傳 **mbti-survival-guide 資料夾裡面的內容**，讓 `public/`、`vercel.json`、`package.json`、`preview.mjs` 和 `README.md` 都位於 repository 最外層。不要只上傳 ZIP。
4. 登入 Vercel，選 Add New → Project，匯入該 repository。
5. Project Name 可填 `mbti-survival-guide`；名稱是否可用由 Vercel 決定。
6. 檢查下表後按 Deploy。設定檔已包含必要值，不需執行編譯。

| 設定欄位 | 這份專案應填 |
| --- | --- |
| Framework Preset | Other |
| Root Directory | ./（repository 最外層） |
| Build Command | 開啟 Override 並留空；不要填 npm run build |
| Output Directory | public |
| Install Command | 開啟 Override 並留空 |
| Environment Variables | 不用填 |

若上傳時多包了一層 `mbti-survival-guide/`，Root Directory 就要選到這個資料夾（包含 vercel.json 和 public 的那一層）。

`vercel.json` 內容：

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "buildCommand": "",
  "installCommand": "",
  "outputDirectory": "public"
}
```

`framework: null` 表示 Other；空字串表示跳過編譯與安裝；`public` 是網頁檔案所在的輸出目錄。
這個專案沒有 `build` script，是刻意省略：網站檔案已能直接提供給瀏覽器。

## Vercel：不使用 GitHub 的 CLI 方式

先在電腦安裝 Node.js，再於 VS Code 開啟解壓縮後的專案資料夾（看得到 vercel.json 的那一層），在終端機執行：

```bash
npx vercel --prod
```

初次執行會安裝 Vercel CLI 並要求登入，依提示建立或連結專案。若詢問設定，使用上表。
這一步會真正發布到你的 Vercel 帳號；目前壓縮檔尚未替你建立 Vercel 專案。

## 本機預覽

VS Code 開啟專案資料夾，在終端機執行：

```bash
npm run dev
```

瀏覽 `http://localhost:3000`。不需要先 `npm install`，因為預覽工具只使用 Node.js 內建模組。
避免用 `file://` 直接開啟 HTML 來測試圖片下載；匯出插畫需要透過 HTTP/HTTPS 載入素材。

## 其他靜態網站平台

如果平台直接接收網站資料夾，上傳 `public/` 裡的全部內容即可。`index.html` 和 `assets/` 必須放在同一層。
部署後的分享按鈕會自動使用目前網站網址，不會帶回原先的 ChatGPT 網址。

## 動畫與下載

- 首頁分段入場、插畫浮動、貼紙搖擺、標題掃光與循環跑馬燈。
- 題目逐段進場、選項漣漪與蓋章、進度條流光。
- 結果卡揭曉、角色彈出、比例條展開、一次性粉彩彩紙。
- 遵從系統「減少動態效果」設定；不播放彩紙或持續動畫。
- 匯出卡片使用靜態結果卡 DOM，避免下載到半透明或尚未展開的動畫影格。
- 分享及下載行為依手機瀏覽器而異；瀏覽器若未提供分享面板，會改嘗試複製分享文字與網址。

## 修改內容

在 `public/index.html` 搜尋 `const questions` 編輯題目；每題結構為：
`[分類, 圖示名稱, 題目, 補充說明, [選項A, 選項B], 維度編號, [吐槽A, 吐槽B]]`。
維度編號依序為 E/I = 0、S/N = 1、T/F = 2、J/P = 3。每個維度三題，選 A 累計該維度左側字母，選 B 累計右側字母。
搜尋 `const profiles` 編輯 16 種結果名稱、金句與標籤。
搜尋 `其實兩個答案都不想選` 編輯結果頁的節目引流文案。

## 官方參考

- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/cli/deploy

## 節目社群連結

結果頁底部已加入 Instagram 與 YouTube 按鈕，不必展開介紹就能點擊。

- Instagram：https://www.instagram.com/mbti_survivalguide?obrf=MXIzemJmanpieWh4dQ==
- YouTube：https://youtube.com/channel/UCPcDNWfqmAapUuud4d6ahCg?si=2BJWQkal7bQngnj2

修改連結時，在 `public/index.html` 搜尋 `social-links`。
