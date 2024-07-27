import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/zh-tw'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.locale('zh-tw')
dayjs.extend(isBetween)
dayjs.extend(isLeapYear)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)

const defaultDate = (dayObj, dayFormat) => {
  if (!dayObj) {
    dayObj = dayjs()
  }
  return dayjs(dayObj).format(dayFormat)
}

/**
 * 取得一個月有幾天
 * @param {string | number} year  年
 * @param {string | number} month 月
 */

export const getDaysInMonth = (yearMonth) => {
  const date = dayjs(`${yearMonth}`)
  const daysInMonth = date.daysInMonth()
  return daysInMonth
}

/**
 * 取得當月起始與結束日期
 * @param {string} yearMonth
 * @param {string} dayFormat
 * @returns [開始日期, 結束日期]
 */
export const startEndDayInMonth = (yearMonth = yyyymm(), dayFormat = 'YYYYMMDD') => {
  const dateObj = dayjs(yearMonth)
  const startdDte = dateObj.startOf('month').format(dayFormat)
  const endDate = dateObj.endOf('month').format(dayFormat)
  return [
    startdDte,
    endDate
  ]
}

export const yyyy = (dayObj) => defaultDate(dayObj, 'YYYY')
export const yyyymm = (dayObj) => defaultDate(dayObj, 'YYYYMM')
export const yyyymmdd = (dayObj) => defaultDate(dayObj, 'YYYYMMDD')
export const yyyymmddhhmm = (dayObj) => defaultDate(dayObj, 'YYYYMMDD HH:mm')
export const yyyymmddthhmm = (dayObj) => defaultDate(dayObj, 'YYYY-MM-DDTHH:mm:ss')
export const yyyymmddhhmmss = (dayObj) => defaultDate(dayObj, 'YYYY-MM-DD HH:mm:ss')

export const hhmmss = (dayObj) => defaultDate(dayObj, 'HH:mm:ss')
export const dashYYYYMM = (dayObj) => defaultDate(dayObj, 'YYYY-MM')
export const dashYYYYMMNDD = (dayObj) => defaultDate(dayObj, 'YYYY-MM-DD')
export const slashYYYYMMDD = (dayObj) => defaultDate(dayObj, 'YYYY/MM/DD')
export const slashYYYYMM = (dayObj) => defaultDate(dayObj, 'YYYY/MM')
export const HHmm = (dayObj) => defaultDate(dayObj, 'HH:mm')

export const dashNow = () => dayjs().format('YYYY-MM-DD')
export const dashYYYYMMNow = () => dayjs().format('YYYY-MM')
export const dashyyyymmddhhmmss = () => dayjs().format('YYYY-MM-DD HH:mm:ss')
/**
 * 用來將時分秒 組合成日期格式
 * @param {string} timePart 時分秒 或者時分 去調整 timeString
 * @param {string} timeString
 * @returns {date}
 */
export const createCombinedDateWithTime = (timePart, timeString = 'HH:mm:ss') => {
  if (!timePart) return ''
  const currentDate = dayjs()
  const timeFromParams = dayjs(timePart, timeString)
  const combinedDateTime = currentDate
    .set('hour', timeFromParams.hour())
    .set('minute', timeFromParams.minute())
    .set('second', timeFromParams.second())
  return combinedDateTime.toDate()
}

export const isSameMonth = (targetDate) => {
  const today = dayjs()
  return today.isSame(targetDate, 'month')
}

export const isBeforeMonth = (targetDate) => {
  const today = dayjs()
  return today.isBefore(targetDate, 'month')
}

export default dayjs
