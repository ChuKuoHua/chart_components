<script setup>
import { Offcanvas } from 'bootstrap'
import { getCookie, deleteAllCookies } from '@/utils/tools.js'

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
// const user = ref('')
const userName = ref('')
const openOffcanvas = () => {
  bsOffcanvas.value.show()
}
const closeOffcanvas = () => {
  bsOffcanvas.value.hide()
}
const logout = () => {
  // localStorage.removeItem('hyUser')
  deleteAllCookies()
  router.push('/login')
}

onMounted(async () => {
  // user.value = await JSON.parse(localStorage.getItem('hyUser') || 'null')
  const apiToken = JSON.parse(getCookie('apiToken')) || null
  if (!apiToken) {
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
            </button>
            <ul
              id="process"
              class="collapse list-unstyled"
              data-bs-parent="#sidebarAccordion"
            >
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/chart_management/project_kanban"
                  @click="closeOffcanvas"
                >
                  工程看板<br>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/chart_management/pie_chart"
                  @click="closeOffcanvas"
                >
                  圓餅圖<br>
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="text-decoration-none btn btn-primary-200 text-start py-3 w-100 rounded-0"
                  to="/chart_management/stacked_area_chart"
                  @click="closeOffcanvas"
                >
                  堆疊面積圖<br>
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <RouterView />
  </div>
</template>
