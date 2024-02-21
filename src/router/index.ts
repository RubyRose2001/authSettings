import { createRouter, createWebHistory } from 'vue-router'
import { User, Roles, Organization, Test } from './export'
import Layout from '@/layout/index.vue'
import { asyncModules } from '@/utils/asyncModules'
const arr = [
  {
    path: '/settings',
    name: 'settings',
    redirect: '/settings/user',
    // which is lazy-loaded when the route is visited.
    component: Layout,
    meta: {
      title: '系统管理'
    },
    children: [{
      path: 'auth',
      name: 'auth',
      meta: {
        title: '权限管理'
      },
      children: [{
        path: 'user',
        name: 'user',
        component: () => User,
        meta: {
          title: '用户管理',
        }
      }, {
        path: 'roles',
        name: 'roles',
        component: () => Roles,
        meta: {
          title: '角色管理',
        }
      }, {
        path: 'test',
        name: 'test',
        component: () => Test,
        meta: {
          title: '测试'
        }
      }, {
        path: 'organization',
        name: 'organization',
        component: () => Organization,
        meta: {
          title: '组织机构',
          hidden: true
        }
      }],
    }]
  }]
  
export const constantRoutes = [{
  path: '/:404*',
  name: '404',
  component: () => import('../views/404.vue'),
  meta: {
    title: '404',
    hidden: true,
  }
}]
export const asyncComponent:any[] = arr

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...asyncComponent,
    ...constantRoutes
  ]
})
router.beforeEach((to, from, next) => {
  // 浏览器标题
  document.title = to.meta.title as string
  next()
});
export default router
