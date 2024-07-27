# project
華億_MES

## Project setup
- copy .env.example to .env, 設定 API URL 還有自定義的變數
- npm install
  - bootstrap 目前使用 5.x 以上
  - primevue 大多用來做 datatable 或元件功能
  - sweetalert2 alert 功能
  - dayjs 用來處理時間、日期
  - lodash 提供了很多常用的函式
  - onscan 條碼掃描功能
  - vee-validate 驗證功能統一使用此套件管理
  - unplugin-auto-import 自動引入套件
  - unplugin-vue-components 自動引入 vue 功能
    - 注意: 目前套件會自動引入 vue 功能, 因此不需再 import 進來，但要先設定 import 路徑，vite.config.js 的 AutoImport 的 dts 設定要建立的位置跟檔案名稱

### 開發用
- npm run dev

### 打包專案
- npm run build

