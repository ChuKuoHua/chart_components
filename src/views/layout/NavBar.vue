<script setup>
import { Offcanvas } from 'bootstrap'

const props = defineProps({
  setTitle: {
    type: String,
    default: ''
  }
})
const uiStore = useUiStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { setOpenOffCanvas } = uiStore
const currentTitle = computed(() => route.meta.title || '')
const role = computed(() => userStore.roleGetter)
const bsOffcanvas = ref(null)
const sidebar = ref(null)
const user = ref('')
const userName = ref('')
const modal = ref(null)
const openModal = () => {
  modal.value.show()
}
const openOffcanvas = () => {
  bsOffcanvas.value.show()
}
const closeOffcanvas = () => {
  bsOffcanvas.value.hide()
}
const logout = () => {
  localStorage.removeItem('hyUser')
  router.push('/login')
}

onMounted(async () => {
  user.value = await JSON.parse(localStorage.getItem('hyUser') || 'null')
  if (!user.value?.apiToken) {
    router.push('/login')
  }
  bsOffcanvas.value = new Offcanvas('#sidebar')
  sidebar.value.addEventListener('show.bs.offcanvas', event => {
    setOpenOffCanvas(true)
  })
  sidebar.value.addEventListener('hide.bs.offcanvas', event => {
    setOpenOffCanvas(false)
  })
  userName.value = userStore.nameGetter
})

onUnmounted(() => {
  sidebar.value?.removeEventListener('show.bs.offcanvas')
  sidebar.value?.removeEventListener('hide.bs.offcanvas')
})

</script>
<template>
  <div
    class="wrap"
  >
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark mb-3">
      <div class="container-fluid">
        <button
          class="btn btn-dark"
          type="button"
          style="z-index: 10"
          @click="openOffcanvas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
        <div
          class="position-absolute text-white w-100 d-flex justify-content-center start-0"
          style="z-index: 1"
        >
          {{ currentTitle }}
        </div>
        <div
          class="ms-auto text-white"
          style="z-index: 10"
        >
          <div
            class="dropdown"
          >
            <button
              id="dropdownMenuButton1"
              class="btn dropdown-toggle text-white"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              您好，{{ userName }}
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <button
                  class="dropdown-item"
                  @click="openModal()"
                >
                  修改密碼
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  @click="logout"
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div
      id="sidebar"
      ref="sidebar"
      class="offcanvas offcanvas-start"
      tabindex="-1"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">
          <!-- 側推選單 -->
          <RouterLink
            class="btn btn-link text-dark text-decoration-none"
            to="/"
            @click="closeOffcanvas"
          >
            {{ props.setTitle }}
          </RouterLink>
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div
        id="sidebarAccordion"
        class="offcanvas-body px-0 pt-0"
      >
        <ul class="list-unstyled">
          <li v-show="role === 'admin' || role === 'system'">
            <button
              class="text-decoration-none btn btn-primary text-start py-3 w-100 rounded-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#system"
              aria-controls="system"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              系統管理
            </button>
            <ul
              id="system"
              class="collapse list-unstyled"
              data-bs-parent="#sidebarAccordion"
            >
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/system_management/personnel"
                  @click="closeOffcanvas"
                >
                  人員資料維護
                </RouterLink>
              </li>
              <!-- <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/system_management/customers"
                  @click="closeOffcanvas"
                >
                  客戶資料維護
                </RouterLink>
              </li> -->
              <!-- <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100"
                  to="/system_management/materials_manage"
                  @click="closeOffcanvas"
                >
                  物料管理維護
                </RouterLink>
              </li> -->
            </ul>
          </li>
          <li v-show="role !== 'operator'">
            <button
              class="text-decoration-none btn btn-primary text-start py-3 w-100 rounded-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#product"
              aria-controls="product"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              訂單管理
            </button>
            <ul
              id="product"
              class="collapse list-unstyled"
              data-bs-parent="#sidebarAccordion"
            >
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100  rounded-0"
                  to="/orders_management/add"
                  @click="closeOffcanvas"
                >
                  訂單資料維護
                </RouterLink>
              </li>
            </ul>
          </li>
          <li>
            <button
              class="text-decoration-none btn btn-primary text-start py-3 w-100 rounded-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#process"
              aria-controls="process"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              現場生產管理<br>
              <span>Quản lí sản xuất Công trường</span>
            </button>
            <ul
              id="process"
              class="collapse list-unstyled"
              data-bs-parent="#sidebarAccordion"
            >
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/process_management/order_view"
                  @click="closeOffcanvas"
                >
                  工單總覽<br>
                  <span>Tổng quan đơn hàng</span>
                </RouterLink>
              </li>
              <li v-show="role !== 'pm'">
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/process_management/start"
                  @click="closeOffcanvas"
                >
                  開工<br>
                  <span>Khởi công</span>
                </RouterLink>
              </li>
              <li v-show="role !== 'pm'">
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/process_management/end"
                  @click="closeOffcanvas"
                >
                  報工<br>
                  <span>Báo công</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/process_management/records"
                  @click="closeOffcanvas"
                >
                  製程紀錄<br>
                  <span>Ghi chép quy trình sản xuất</span>
                </RouterLink>
              </li>
              <li v-show="role !== 'pm'">
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/process_management/change_records"
                  @click="closeOffcanvas"
                >
                  製程異動紀錄<br>
                  <span>Ghi chép biến động quy trình sản xuất</span>
                </RouterLink>
              </li>
              <li class="d-none">
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/process_management/change_records"
                  @click="closeOffcanvas"
                >
                  報表
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/process_management/project_kanban"
                  @click="closeOffcanvas"
                >
                  工程看板<br>
                  <span>Bảng quản lý công việc</span>
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <RouterView />
    <UpdatePwdModal ref="modal" />
  </div>
</template>
