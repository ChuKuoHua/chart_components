# project
圖表元件

## Project setup
- npm install
  - bootstrap 目前使用 5.x 以上
  - dayjs 用來處理時間、日期
  - vue-echarts 圖表
  - unplugin-auto-import 自動引入套件
  - unplugin-vue-components 自動引入 vue 功能
    - 注意: 目前套件會自動引入 vue 功能, 因此不需再 import 進來，但要先設定 import 路徑，vite.config.js 的 AutoImport 的 dts 設定要建立的位置跟檔案名稱

### 開發用
- npm run dev

### 打包專案
- npm run build

