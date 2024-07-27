<script setup>
import { useSetBaseChart } from '@/composables/echarts/baseChart.js'
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  h: {
    type: String,
    default: '300px'
  },
  xAxisData: {
    type: Array,
    default: () => []
  },
  yAxisData: {
    type: Array,
    default: () => []
  },
  isGearing: {
    type: Boolean
  }
})
const elChart = ref(null)
const getData = () => {
  if (elChart.value) {
    useSetBaseChart(props.id, elChart.value, props.title, props.xAxisData, props.yAxisData, true, props.isGearing)
  }
}
// 監聽視窗寬度
// const handleResize = (width) => {
//   w.value = width || window.innerWidth
// }
// defineExpose({ handleResize })
watchEffect(() => {
  if (props.xAxisData.length > 0 && props.yAxisData.length > 0) {
    getData()
  }
})
onMounted(() => {
})
</script>

<template>
  <div class="flex justify-center md:mx-0">
    <div
      :id="props.id"
      ref="elChart"
      :title="props.title"
      class="w-100"
      :style="`height: ${props.h}`"
    />
  </div>
</template>

<style lang="scss" scoped></style>
