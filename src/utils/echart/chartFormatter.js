import { round } from 'lodash-es'
export function setFormatter (params, type = 'base') {
  let msg = ''
  switch (type) {
    case 'base':
      params.forEach((item) => {
        msg += `
        <div class="flex-between-center">
          <p class="mb-1">
            ${item.seriesName}：${item.seriesName === '不良率'
              ? `${round(item.data?.scrapValue, 2)} %`
              : item.data?.value
            }
          </p>
        </div>`
      })
      msg += `
        <p class="mb-1">投入數：${params[0].data.total}</p>
        <p class="mb-1">總工時：${params[0].data.totalTime} min</p>
      `
      return msg
    default:
      return ''
  }
}
