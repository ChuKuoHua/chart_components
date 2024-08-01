import { use, init, getInstanceByDom } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent
} from 'echarts/components'
use([
  TitleComponent,
  CanvasRenderer,
  MarkLineComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart
])

/**
 *
 * @param dom // DOM 元素
 * @param {string} title // 標題
 * @param {array} axisData // data 資料
 * @returns
 */
// 設定 Series 資料
const setSeries = (data) => {
  const series = []
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      series.push({
        name: data[i].name,
        data: data[i].value,
        type: data[i].type || 'bar',
        // areaStyle: {}, // 須加上這行才會有面積效果
        stack: data[i].stack, // 資料堆疊效果，設為 total 才會有堆疊效果
        itemStyle: {
          color: data[i]?.color
        }
      })
    }
  }
  return series
}

export function useSetBarStartChart ({
  dom, title, xAxisData, yAxisData, legendShow, titleShow, horizontal
}) {
  let myChart = getInstanceByDom(dom) // 檢查 DOM 是否存在
  // 不存在就初始畫圖表
  if (!myChart) {
    myChart = init(dom)
  }
  myChart.resize()
  const seriesData = setSeries(yAxisData)
  const xAxis = horizontal
    ? {
        type: 'value'
      }
    : {
        type: 'category',
        data: xAxisData
      }
  const yAxis = horizontal
    ? {
        type: 'category',
        data: xAxisData
      }
    : {
        type: 'value'
      }
  console.log(horizontal)
  const option = {
    title: {
      text: title,
      // top: '5%',
      left: 'center',
      show: titleShow,
      textStyle: {
        fontWeight: '800',
        fontSize: '16'
      }
    },
    legend: {
      show: legendShow,
      // left: 80,
      bottom: 0,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
    xAxis,
    yAxis,
    grid: {
      left: 50,
      right: 50,
      top: 50,
      bottom: 50
    },
    series: seriesData
  }

  option && myChart.setOption(option)
  return myChart
}
