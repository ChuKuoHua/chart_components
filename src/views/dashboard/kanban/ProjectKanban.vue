<script setup>
import dayjs, {
  dashNow,
  dashYYYYMM
} from '@/utils/day'

const kanbanManage = kanbanManageStore()
const kanBanEngData = computed(() => kanbanManage.kanBanEngData || [])
const startWorkOrderData = computed(() => kanbanManage.OverdueWorkOrdersData?.started?.[0]?.sort((a, b) => {
  return dayjs(b.expected_delivery_date).valueOf() - dayjs(a.expected_delivery_date).valueOf()
}) || [])

const newWorkOrderData = computed(() => kanbanManage.OverdueWorkOrdersData?.new?.[0]?.sort((a, b) => {
  return dayjs(b.expected_delivery_date).valueOf() - dayjs(a.expected_delivery_date).valueOf()
}) || [])
const w = ref(150)
const now = ref(dashNow())
const month = ref([])
// const xAxisData = ref([])
const xAxisData = reactive({
  A: {
    xData: []
  },
  B: {
    xData: []
  }
})
const chartData = reactive({
  A: {
    title: '',
    yData: []
  },
  B: {
    title: '',
    yData: []
  }
})
const initQuery = () => ({
  woSn: '',
  matCodename: '',
  beginMonth: '',
  endMonth: ''
})
const lazyQuery = reactive(initQuery())
const getKanBanQuery = () => kanbanManage.getKanBanQueryDueWo({ dueDate: now.value })
const getKanBanEngData = catchError(async (type = 'init', item) => {
  let woSm = ''
  switch (type) {
    case 'init':
      Object.assign(lazyQuery, initQuery())
      getKanBanQuery()
      break
    case 'query':
      woSm = lazyQuery.woSn
      break
    case 'due':
      Object.assign(lazyQuery, initQuery())
      woSm = item.sn
      break
    default:
      break
  }
  await kanbanManage.getKanBanEngData({
    woSn: woSm,
    matCodename: lazyQuery.matCodename,
    beginMonth: lazyQuery.beginMonth ? dashYYYYMM(lazyQuery.beginMonth) : '',
    endMonth: lazyQuery.endMonth ? dashYYYYMM(lazyQuery.endMonth) : ''
  })
})

const setChartData = () => {
  for (const key in chartData) {
    chartData[key].title = ''
    chartData[key].yData = []
  }
  if (kanBanEngData.value?.xAxisData.length === 0) {
    showAlert('查無資料', '', 'warning')
    return
  }
  // xAxisData.value = kanBanEngData.value?.xAxisData?.map(item => {
  //   return `${item.complete_percentage}% ${item.wo_sn} ${item.mat_codename}`
  // })

  for (const key in kanBanEngData.value.xAxisData) {
    xAxisData[key].xData = []
    xAxisData[key].xData = kanBanEngData.value.xAxisData[key]?.data?.map(item => `${item.complete_percentage}% ${item.wo_sn} ${item.mat_codename}`)
  }
  for (const key in kanBanEngData.value.yAxisData) {
    chartData[key].title = kanBanEngData.value.yAxisData[key].title
    chartData[key].yData = [
      {
        name: '良品',
        type: 'bar',
        data: kanBanEngData.value.yAxisData[key]?.finish_qty
      },
      {
        name: '不良品',
        type: 'bar',
        data: kanBanEngData.value.yAxisData[key]?.scrap_qty
      },
      {
        name: '不良率',
        type: 'line',
        data: kanBanEngData.value.yAxisData[key]?.scrap_rate
      }
    ]
  }
}

watch(
  kanBanEngData,
  () => {
    setChartData()
  },
  {
    deep: true
  }
)

onMounted(() => {
  getKanBanEngData()
  for (let i = 0; i < 12; i++) {
    month.value.push({
      id: i + 1,
      name: `${i + 1} 月`
    })
  }
})

</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <span
              class="p-input-icon-right me-2"
            >
              <InputText
                v-model="lazyQuery.woSn"
                :style="{ width: `${w}px` }"
                placeholder="訂單號碼"
              />
            </span>
            <span
              class="p-input-icon-right me-2"
            >
              <!-- <i class="pi pi-search" /> -->
              <InputText
                v-model="lazyQuery.matCodename"
                :style="{ width: `${w}px` }"
                placeholder="產品編號"
              />
            </span>
            <Calendar
              v-model="lazyQuery.beginMonth"
              view="month"
              date-format="yy/mm"
              placeholder="開始日期"
              :style="{ width: `${w + 25}px` }"
            />
            <!-- <Dropdown
              v-model="lazyQuery.beginMonth"
              :options="month"
              option-label="name"
              placeholder="月份"
            /> -->
            -
            <Calendar
              v-model="lazyQuery.endMonth"
              class="me-2"
              view="month"
              date-format="yy/mm"
              placeholder="結束日期"
              :style="{ width: `${w + 25}px` }"
            />
            <!-- <Dropdown
              v-model="lazyQuery.endMonth"
              class="me-2"
              :options="month"
              option-label="name"
              placeholder="月份"
              :style="{ width: `${w}px` }"
            /> -->
            <button
              type="button"
              class="btn btn-info px-3 me-2"
              @click="getKanBanEngData('query')"
            >
              確定
            </button>
          </div>
          <button
            type="button"
            class="btn btn-secondary px-3"
            @click="getKanBanEngData('init')"
          >
            重載圖表
            <i
              class="pi pi-replay ms-1"
              style="font-size: 1rem"
            />
          </button>
        </div>
        <BaseChartComponent
          v-if="chartData.A.yData.length > 0"
          :id="'project1'"
          :title="chartData.A.title"
          :h="'250px'"
          :x-axis-data="xAxisData.A.xData"
          :y-axis-data="chartData.A.yData"
          :is-gearing="true"
        />
        <BaseChartComponent
          v-if="chartData.B.yData.length > 0"
          :id="'project2'"
          :title="chartData.B.title"
          :h="'250px'"
          :x-axis-data="xAxisData.B.xData"
          :y-axis-data="chartData.B.yData"
          :is-gearing="true"
        />
      </div>
      <div class="col-3">
        <h3 class="h5 border-bottom mb-0">
          逾期交貨訂單
        </h3>
        <div :class="{ 'table-h-scroll': startWorkOrderData.length > 6 }">
          <table class="text-center w-100">
            <thead>
              <tr>
                <th scope="col">
                  訂單號碼
                </th>
                <th scope="col">
                  預定交貨日
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item of startWorkOrderData"
                :key="item"
              >
                <td>
                  <button
                    class="btn sn_btn py-1"
                    @click="getKanBanEngData('due', item)"
                  >
                    {{ item.sn }}
                  </button>
                </td>
                <td>
                  <p class="mb-0 px-3">
                    {{ item.expected_delivery_date }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 class="h5 border-bottom mb-0 mt-3">
            逾期交貨訂單(未開工)
          </h3>
        </div>
        <div :class="{ 'table-h-scroll': newWorkOrderData.length > 6 }">
          <table class="text-center w-100">
            <thead>
              <tr>
                <th scope="col">
                  訂單號碼
                </th>
                <th scope="col">
                  預定交貨日
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item of newWorkOrderData"
                :key="item"
              >
                <td>
                  <p class="mb-0 text-center">
                    {{ item.sn }}
                  </p>
                </td>
                <td>
                  <p class="mb-0 text-center">
                    {{ item.expected_delivery_date }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sn_btn:hover {
  color: #0c4f5c;
}
.table-h-scroll {
  height: 250px;
  overflow-y: scroll;
}
</style>
