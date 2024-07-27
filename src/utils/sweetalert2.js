import Swal from 'sweetalert2'

import 'sweetalert2/src/sweetalert2.scss'
import '@/scss/helpers/sweetalert2/custom.scss'
export const showAlert = (title = '', text = '', icon = 'success') => {
  Swal.fire({
    title,
    text,
    icon
  })
}

export const showSuccessAlert = (title = '成功', text = '') => {
  // showAlert(title, text = '', 'success')
  Swal.fire({
    title,
    text,
    iconColor: 'black',
    icon: 'success',
    timer: 3000,
    showConfirmButton: false
  })
}

export const showSuccessAlertPromise = (title = '成功', text = '') => {
  return Swal.fire({
    title,
    text,
    iconColor: 'black',
    icon: 'success',
    timer: 3000,
    showConfirmButton: false
  })
}

export const showCancelAlert = (title = '取消', text = '') => {
  showAlert(title, text = '', 'error')
}

export const showConfirmAlert = (title = '', text = '', icon = 'question') => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: '確認',
    cancelButtonText: '取消'
  })
}

export const closeAlert = () => Swal.close()
