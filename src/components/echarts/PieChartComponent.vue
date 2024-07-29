<script setup>
import { useSetPieChart } from '@/composables/echarts/pieChart.js'
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
  axisData: {
    type: Array,
    default: () => []
  },
  isGearing: {
    type: Boolean
  },
  isTitleShow: {
    type: Boolean,
    default: true
  },
  isHalfChart: {
    type: Boolean,
    default: false
  },
  isLegendShow: {
    type: Boolean,
    default: true
  },
  radius: {
    type: Array,
    default: () => ['40%', '60%']
  }
})
const elChart = ref(null)
const getData = () => {
  if (elChart.value) {
    useSetPieChart({
      dom: elChart.value,
      title: props.title,
      data: props.axisData,
      isHalfChart: props.isHalfChart,
      legendShow: props.isLegendShow,
      radius: props.radius,
      isTitleShow: props.isTitleShow
    })
  }
}
// 監聽視窗寬度
// const handleResize = (width) => {
//   w.value = width || window.innerWidth
// }
// defineExpose({ handleResize })
watchEffect(() => {
  if (props.axisData.length > 0) {
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
