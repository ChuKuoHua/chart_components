<script setup>
import { pieData } from '@/constants/ChartData'
const chartData = reactive({
  title: '',
  data: []
})
const setChartData = () => {
  chartData.title = '圓餅圖'
  chartData.data = pieData
}

onMounted(() => {
  setChartData()
})

</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <PieChartComponent
          :id="'pie'"
          :title="chartData.title"
          :h="'450px'"
          :axis-data="chartData.data"
          :is-gearing="true"
          :border-style="[5, 2]"
        />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <PieChartComponent
              :id="'pie2'"
              :title="chartData.title"
              :h="'250px'"
              :axis-data="chartData.data"
              :is-gearing="true"
              :is-half-chart="true"
              :is-legend-show="false"
              :is-title-show="false"
              :radius="['20%', '40%']"
              :border-style="[3, 2]"
            />
          </div>
          <div class="col-12">
            <PieChartComponent
              :id="'pie3'"
              :title="chartData.title"
              :h="'250px'"
              :axis-data="chartData.data"
              :is-gearing="true"
              :is-half-chart="true"
              :is-legend-show="false"
              :is-title-show="false"
              :radius="['0%', '40%']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
