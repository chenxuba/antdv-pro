import type { RouteRecordRaw } from 'vue-router'
import { basicRouteMap } from './router-modules'

export default [
  {
    path: '/dashboard/homepage',
    name: 'Homepage',
    parentKeys: [],
    meta: {
      title: '首页',
      icon: 'DashboardOutlined',
    },
    component: () => import('~/pages/dashboard/homepage/index.vue'),
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/dashboard/analysis',
        name: 'DashboardAnalysis',
        component: () => import('~/pages/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
        },
      },
      {
        path: '/dashboard/monitor',
        name: 'DashboardMonitor',
        component: () => import('~/pages/dashboard/monitor/index.vue'),
        meta: {
          title: '监控页',
        },
      },
      {
        path: '/dashboard/workplace',
        name: 'DashboardWorkplace',
        component: () => import('~/pages/dashboard/workplace/index.vue'),
        meta: {
          title: '监控页',
        },
      },
    ],
  },
  {
    path: '/form',
    redirect: '/form/basic-form',
    name: 'Form',
    meta: {
      title: '表单页',
      icon: 'FormOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/form/basic-form',
        name: 'FormBasic',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '基础表单',
          locale: 'menu.form.basic-form',
        },
      },
      {
        path: '/form/step-form',
        name: 'FormStep',
        component: () => import('~/pages/form/step-form/index.vue'),
        meta: {
          title: '分步表单',
          locale: 'menu.form.step-form',
        },
      },
      {
        path: '/form/advanced-form',
        name: 'FormAdvanced',
        component: () => import('~/pages/form/advanced-form/index.vue'),
        meta: {
          title: '高级表单',
          locale: 'menu.form.advanced-form',
        },
      },
    ],
  },
  {
    path: '/exception',
    redirect: '/exception/403',
    name: 'Exception',
    meta: {
      title: '异常页',
      icon: 'WarningOutlined',
      locale: 'menu.exception',
    },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '403',
          locale: 'menu.exception.not-permission',
        },
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import('~/pages/exception/404.vue'),
        meta: {
          title: '404',
          locale: 'menu.exception.not-find',
        },
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import('~/pages/exception/500.vue'),
        meta: {
          title: '500',
          locale: 'menu.exception.server-error',
        },
      },
    ],
  },
] as RouteRecordRaw[]
