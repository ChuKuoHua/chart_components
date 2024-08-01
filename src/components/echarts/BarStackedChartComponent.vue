<script setup>
import { useSetBarStartChart } from '@/composables/echarts/barStartChart.js'
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
  isTitleShow: {
    type: Boolean,
    default: true
  },
  isLegendShow: {
    type: Boolean,
    default: true
  },
  isHorizontal: {
    type: Boolean,
    default: false
  }
})
const elChart = ref(null)
const getData = () => {
  if (elChart.value) {
    useSetBarStartChart({
      dom: elChart.value,
      title: props.title,
      xAxisData: props.xAxisData,
      yAxisData: props.yAxisData,
      legendShow: props.isLegendShow,
      titleShow: props.isTitleShow,
      horizontal: props.isHorizontal
    })
  }
}
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
