import { use, init, getInstanceByDom } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import 'echarts/lib/component/markArea'
import { setFormatter } from '@/utils/echart/chartFormatter'
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
  DataZoomComponent,
  GridComponent,
  LineChart,
  BarChart
])

/**
 *
 * @param dom // DOM 元素
 * @param {string} title // 標題
 * @param {array} xAxisData // x 軸資料
 * @param {array} yAxisData // y 軸資料
 * @param {boolean} zoomShow // 是否顯示滾動條
 * @returns
 */
const start = ref(0) // dataZoom 開始位置
const end = ref(20) // dataZoom 結束位置
const xAxisInitLength = reactive({}) // 存 x 資料長度用，用來判斷是否改變 dataZoom 範圍

// 設定 Series 資料
const setSeries = (data) => {
  const series = []
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      series.push({
        name: data[i].name,
        type: data[i].type,
        data: data[i].data,
        itemStyle: {
          color: data[i]?.color
        }
        // label: {
        //   show: i === 0, // 顯示標籤
        //   // position: 'top',
        //   color: '#ff000a',
        //   align: 'right',
        //   formatter (params) {
        //     return params.data.complete_percentage
        //   }
        // }
      })
    }
  }
  return series
}
// 連動其他元件的 dataZoom
const onDataZoomHandle = (dom) => {
  dom.on('dataZoom', (params) => {
    start.value = params.start
    end.value = params.end
  })
}

export function useSetBaseChart (id, dom, title, xAxisData, yAxisData, zoomShow = false, isGearing) {
  // 依資料數量改變 dataZoom 的初始範圍
  if (xAxisInitLength[id] !== xAxisData.length) {
    start.value = 0
    end.value = xAxisData.length < 8
      ? 100
      : xAxisData.length < 16
        ? 60
        : xAxisData.length < 24
          ? 40
          : 20
  }

  let myChart = getInstanceByDom(dom) // 檢查 DOM 是否存在
  // 不存在就初始畫圖表
  if (!myChart) {
    myChart = init(dom)
  }
  myChart.resize()
  xAxisInitLength[id] = xAxisData.length
  const textColor = 'block'
  const seriesData = setSeries(yAxisData)
  const option = {
    title: {
      text: title,
      top: '5%',
      left: '10%',
      textStyle: {
        fontWeight: '800',
        fontSize: '16'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      formatter (params) {
        return setFormatter(params)
      }
    },
    legend: {
      show: false,
      left: 80,
      bottom: 25,
      textStyle: {
        color: textColor
      }
    },
    dataZoom: [
      {
        type: 'inside', // 內側滑動
        zoomLock: true, // 禁用滾動縮放
        start: start.value, // 默認開始位置
        end: end.value // 默認結束位置
      },
      {
        type: 'slider', // 滑動元件
        height: 25,
        show: zoomShow, // 是否顯示滑動區塊
        showDetail: true, // 是否顯示內容
        zoomLock: true, // 禁用滾動縮放
        left: '70', // 元件左側距離
        right: '80', // 元件右側距離
        brushSelect: false, // 是否開啟框選部分區域
        bottom: 6,
        showDataShadow: false, // 滑動區塊資料陰影隱藏
        textStyle: {
          color: textColor
        },
        backgroundColor: 'transparent',
        fillerColor: '#62a0d52e'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0, // 顯示所有標籤
          fontSize: 12, // 調整標籤字體大小
          formatter: function (value) {
            return `{a|${value.split(' ')[0]}} \n {b|${value.split(' ')[1]}} \n {b|${value.split(' ')[2]}}`
          },
          rich: {
            a: {
              color: 'red',
              fontSize: 24
            },
            b: {
              color: '#000',
              fontWeight: 'bolder'
            }
          }
        },
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '數量',
        nameTextStyle: {
          color: textColor, // 修改字體顏色
          padding: [0, 40, 0, 0]
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, .6)'
          }
        },
        axisLabel: {
          color: textColor
        }
      }
    ],
    series: seriesData,
    grid: {
      top: '20%',
      left: '10%',
      right: '12%',
      bottom: '35%'
    }
  }

  option && myChart.setOption(option)
  // isGearing 為 true 代表 DataZoom 要連動
  if (isGearing) {
    onDataZoomHandle(myChart)
  }
  return myChart
}
