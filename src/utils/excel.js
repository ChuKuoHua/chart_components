import XLSX, { utils } from 'xlsx/dist/xlsx.core.min.js'
const Excel = {
  async importFromLocal (file) {
    const workBook = await this.readerWorkBookFromLocal(file)
    // 讀取第一個 tab
    const workSheet = workBook.SheetNames[0]
    // 顯示第一個欄位
    const content = utils.sheet_to_json(workBook.Sheets[workSheet], { header: 1, blankrows: false })
    const data = {}
    data.body = content
    return data
  },
  /**
   * @description              本地讀取文件的方法
   * @param {Object} file      文件
   */
  readerWorkBookFromLocal (file) {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    return new Promise(function (resolve, reject) {
      reader.onload = function (e) {
        const fileData = e.target.result
        if (reader.readyState === 2) {
          const workBook = XLSX.read(fileData, { type: 'binary' })
          resolve(workBook)
        }
      }
    })
  }
}

export default Excel
