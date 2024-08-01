import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    name: 'DashBoard',
    component: () => import('@/views/layout/NavBar.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashBoard.vue'),
        meta: {
          title: ''
        }
      },
      {
        path: 'chart_management',
        name: 'ChartManagement',
        children: [
          {
            path: 'project_kanban',
            name: 'ProjectKanban',
            component: () => import('@/views/dashboard/chart/ProjectKanban.vue'),
            meta: {
              title: '工程看版'
            }
          },
          {
            path: 'pie_chart',
            name: 'PieChart',
            component: () => import('@/views/dashboard/chart/PieChart.vue'),
            meta: {
              title: '圓餅圖'
            }
          },
          {
            path: 'stacked_area_chart',
            name: 'StackedAreaChart',
            component: () => import('@/views/dashboard/chart/LineStackedAreaChart.vue'),
            meta: {
              title: '堆疊面積圖'
            }
          },
          {
            path: 'bar_stacked_chart',
            name: 'BarStackedChart',
            component: () => import('@/views/dashboard/chart/BarStackChart.vue'),
            meta: {
              title: '堆疊面積長條圖'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
