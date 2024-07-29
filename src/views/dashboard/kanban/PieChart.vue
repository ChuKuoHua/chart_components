<script setup>
const chartData = reactive({
  title: '',
  data: []
})
const setChartData = () => {
  chartData.title = '圓餅圖'
  chartData.data = [
    { name: '第一站', value: 30, color: '#1A3636' },
    { name: '第二站', value: 70, color: '#40534C' },
    { name: '第三站', value: 20, color: '#677D6A' },
    { name: '第四站', value: 40, color: '#D6BD98' },
    { name: '第五站', value: 30, color: '#344C64' }
  ]
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
        />
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">
            <PieChartComponent
              :id="'pie2'"
              :title="chartData.title"
              :h="'200px'"
              :axis-data="chartData.data"
              :is-gearing="true"
              :is-half-chart="true"
              :is-legend-show="false"
              :is-title-show="false"
              :radius="['20%', '40%']"
            />
          </div>
          <div class="col-6">
            <PieChartComponent
              :id="'pie3'"
              :title="chartData.title"
              :h="'200px'"
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
