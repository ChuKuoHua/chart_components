import { use, init, getInstanceByDom } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import 'echarts/lib/component/markArea'
use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LabelLayout,
  PieChart
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
        value: data[i].value,
        itemStyle: {
          color: data[i]?.color
        }
      })
    }
  }
  return series
}

export function useSetPieChart ({
  dom, title, data, isHalfChart, legendShow, radius, borderStyle, isTitleShow
}) {
  let myChart = getInstanceByDom(dom) // 檢查 DOM 是否存在
  // 不存在就初始畫圖表
  if (!myChart) {
    myChart = init(dom)
  }
  myChart.resize()
  const seriesData = setSeries(data)
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
      trigger: 'item'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 12,
        fontWeight: 'bold'
      }
    },
    series: [
      {
        type: 'pie',
        radius,
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: borderStyle[0] || 0,
          borderColor: '#fff',
          borderWidth: borderStyle[1] || 2
        },
        // label: {
        //   show: false,
        //   position: 'center'
        // },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: 'bold'
        //   }
        // },
        // labelLine: {
        //   show: false
        // },
        /* startAngle 和 endAngle 可以設定圓餅圖的起始角度和結束角度 */
        startAngle: isHalfChart ? 180 : 0,
        endAngle: 360,
        data: seriesData
      }
    ]
  }

  option && myChart.setOption(option)
  return myChart
}
