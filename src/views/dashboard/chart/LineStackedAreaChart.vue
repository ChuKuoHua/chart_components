<script setup>
import { stackedAreaData } from '@/constants/ChartData'
const chartData = reactive({
  title: '',
  xData: [],
  yData: []
})
const setChartData = () => {
  chartData.title = '堆疊面積圖'
  chartData.xData = ['A1101', 'A1102', 'A1103', 'A1104', 'A1105', 'A1106', 'A1107']
  chartData.yData = stackedAreaData
}

onMounted(() => {
  setChartData()
})

</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <LineChartComponent
          :id="'stackedArea'"
          :title="chartData.title"
          :h="'450px'"
          :x-axis-data="chartData.xData"
          :y-axis-data="chartData.yData"
        />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <LineChartComponent
              :id="'stackedArea2'"
              :title="chartData.title"
              :h="'200px'"
              :x-axis-data="chartData.xData"
              :y-axis-data="chartData.yData"
              :is-legend-show="false"
              :is-title-show="false"
            />
          </div>
          <div class="col-12">
            <LineChartComponent
              :id="'stackedArea3'"
              :title="chartData.title"
              :h="'200px'"
              :x-axis-data="chartData.xData"
              :y-axis-data="chartData.yData"
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
