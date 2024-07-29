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
        path: 'process_management',
        name: 'ProcessManagement',
        children: [
          {
            path: 'project_kanban',
            name: 'ProjectKanban',
            component: () => import('@/views/dashboard/kanban/ProjectKanban.vue'),
            meta: {
              title: '工程看版'
            }
          },
          {
            path: 'pie_chart',
            name: 'PieChart',
            component: () => import('@/views/dashboard/kanban/PieChart.vue'),
            meta: {
              title: '圓餅圖'
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
