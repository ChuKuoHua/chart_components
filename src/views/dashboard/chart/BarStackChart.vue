<script setup>
import { barStackedData } from '@/constants/ChartData'
const chartData = reactive({
  title: '',
  xData: [],
  yData: []
})
const horizontalData = ref([])
const yData2 = ref([])
const setChartData = () => {
  chartData.title = '堆疊面積長條圖'
  chartData.xData = ['A1101', 'A1102', 'A1103', 'A1104', 'A1105', 'A1106', 'A1107']
  chartData.yData = [
    ...barStackedData,
    {
      name: '不良率',
      value: [150, 232, 201, 154, 190, 330, 410],
      color: '#4C2C2E',
      type: 'line'
    }
  ]

  yData2.value = [
    ...barStackedData,
    {
      name: '不良率',
      value: [150, 232, 201, 154, 190, 330, 410],
      color: '#4C2C2E',
      stack: 'Ad'
    }
  ]
  horizontalData.value = barStackedData
}

onMounted(() => {
  setChartData()
})

</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <BarStackedChartComponent
          :id="'barStacked'"
          :title="chartData.title"
          :h="'450px'"
          :x-axis-data="chartData.xData"
          :y-axis-data="chartData.yData"
        />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <BarStackedChartComponent
              :id="'barStacked2'"
              :title="chartData.title"
              :h="'300px'"
              :x-axis-data="chartData.xData"
              :y-axis-data="horizontalData"
              :is-legend-show="false"
              :is-title-show="false"
              :is-horizontal="true"
            />
          </div>
          <div class="col-12">
            <BarStackedChartComponent
              :id="'barStacked3'"
              :title="chartData.title"
              :h="'200px'"
              :x-axis-data="chartData.xData"
              :y-axis-data="yData2"
              :is-legend-show="false"
              :is-title-show="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
