import { use, init, graphic, getInstanceByDom } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import 'echarts/lib/component/markArea'
use([
  CanvasRenderer,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  UniversalTransition,
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
        type: 'line',
        // areaStyle: {}, // 須加上這行才會有面積效果
        stack: data[i].stack, // 資料堆疊效果，設為 total 才會有堆疊效果
        itemStyle: {
          color: data[i]?.color[0]
        },
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: data[i]?.color[0]
            },
            {
              offset: 1,
              color: data[i]?.color[1]
            }
          ])
        }
      })
    }
  }
  return series
}

export function useSetLineChart ({
  dom, title, xAxisData, yAxisData, legendShow, isTitleShow
}) {
  let myChart = getInstanceByDom(dom) // 檢查 DOM 是否存在
  // 不存在就初始畫圖表
  if (!myChart) {
    myChart = init(dom)
  }
  myChart.resize()
  const seriesData = setSeries(yAxisData)
  const option = {
    title: {
      text: title,
      top: '5%',
      left: 'center',
      show: isTitleShow,
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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: seriesData
  }

  option && myChart.setOption(option)
  return myChart
}
