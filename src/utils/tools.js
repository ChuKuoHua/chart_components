import Swal from 'sweetalert2'
export const _uuid = () => {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export const getLocalDate = (time) => {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}

// 錯誤不自動取消
export const catchError = (fn, resetFn) => {
  return (...args) => {
    try {
      const fnArg = fn(...args)
      if (fnArg instanceof Promise) {
        // return async () => await fnArg
        fnArg.catch(error => {
          console.log('promise', error)
          resetFn && resetFn()
          let msg = ''
          if (error?.response?.data.message.length > 40) {
            msg = '發生不可預期錯誤 請洽系統管理者'
          } else {
            msg = error.response?.data.message || '錯誤'
          }
          Swal.fire({
            title: msg,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: '取消'
          })
        })
      } else {
        return fnArg
      }
    } catch (error) {
      console.log(error)
      resetFn && resetFn()
      if (error?.message) {
        Swal.fire({
          title: error.message,
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: '取消'
        })
      }
    }
  }
}
// 檢查是否有不是數字的值，有的話就移除
export const checkNumber = (val) => {
  const reg = /^\d+$/
  if (!val.match(reg)) {
    return val.replace(/\D/g, '')
  }
  return val
}
