import type { RouteRecordRaw } from 'vue-router'
import { basicRouteMap } from './router-modules'

export default [
  {
    path: '/dashboard',
    name: 'Homepage',
    parentKeys: [],
    meta: {
      title: '首页',
      icon: 'HomeOutlined',
    },
    component: () => import('~/pages/dashboard/homepage/index.vue'),
  },
  {
    path: '/dashboard/analysis',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: '品牌中心',
      icon: 'DashboardOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/dashboard/analysis',
        name: 'DashboardAnalysis',
        component: () => import('~/pages/dashboard/analysis/index.vue'),
        meta: {
          title: '专属公众号',
        },
      },
      {
        path: '/dashboard/monitor',
        name: 'DashboardMonitor',
        new: 'new',
        component: () => import('~/pages/dashboard/monitor/index.vue'),
        meta: {
          title: '专属小程序',
        },
      },
      {
        path: '/dashboard/workplace',
        name: 'DashboardWorkplaces',
        component: () => import('~/pages/dashboard/workplace/index.vue'),
        meta: {
          title: '微机构',
          new:true
        },
      },
    ],
  },
  {
    path: '/enroll-center',
    redirect: '/enroll-center/basic-form',
    name: 'Form',
    meta: {
      title: '招生中心',
      icon: 'FormOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/enroll-center/basic-form',
        name: 'FormBasic',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '超级裂变',
          // locale: 'menu.form.basic-form',
        },
      },
      {
        path: '/enroll-center/intention-student',
        name: 'Intention-student',
        component: () => import('~/pages/enroll-center/intention-student.vue'),
        meta: {
          title: '意向学员',
        },
      },
      {
        path: '/enroll-center/follow-up-list',
        name: 'FollowUpList',
        component: () => import('~/pages/enroll-center/follow-up-list.vue'),
        meta: {
          title: '跟进记录',
        },
      },
      {
        path: '/enroll-center/try-listening',
        name: 'FormAdvanced2',
        component: () => import('~/pages/enroll-center/try-listening.vue'),
        meta: {
          title: '试听管理',
        },
      },
    ],
  },
  {
    path: '/edu-center',
    redirect: '/edu-center/registr-renewal',
    name: 'EduCenter',
    meta: {
      title: '教务中心',
      icon: 'WarningOutlined',
    },
    children: [
      {
        path: '/edu-center/registr-renewal',
        name: 'RegistrRenewal',
        component: () => import('~/pages/edu-center/registr-renewal.vue'),
        meta: {
          title: '报名续费',
        },
      },
      {
        path: '/edu-center/student-list',
        name: 'Exception404',
        component: () => import('~/pages/edu-center/student-list.vue'),
        meta: {
          title: '学员管理',
        },
      },
      {
        path: '/edu-center/register-read-list',
        name: 'RegisterReadList',
        component: () => import('~/pages/edu-center/register-read-list.vue'),
        meta: {
          title: '报读列表',
        },
      },
      {
        path: '/edu-center/class-list',
        name: 'ClassList',
        component: () => import('~/pages/edu-center/class-list.vue'),
        meta: {
          title: '班级管理',
        },
      },
      {
        path: '/edu-center/oneToOne',
        name: 'OneToOne',
        component: () => import('~/pages/edu-center/oneToOne.vue'),
        meta: {
          title: '一对一',
        },
      },
      {
        path: '/exception/5003',
        name: 'Exception5003',
        component: () => import('~/pages/exception/500.vue'),
        meta: {
          title: '课表',
        },
      },
      {
        path: '/edu-center/roll-call-list',
        name: 'RollCall',
        component: () => import('~/pages/edu-center/roll-call-list.vue'),
        meta: {
          title: '上课点名',
        },
      },
      {
        path: '/edu-center/class-record',
        name: 'ClassRecord',
        component: () => import('~/pages/edu-center/class-record.vue'),
        meta: {
          title: '上课记录',
        },
      },
      {
        path: '/edu-center/makeup-a-missedlesson',
        name: 'MakeupAmissedLesson',
        component: () => import('~/pages/edu-center/makeup-a-missedlesson.vue'),
        meta: {
          title: '补课',
        },
      },
      {
        path: '/edu-center/face-to-face',
        name: 'FaceToFace',
        component: () => import('~/pages/edu-center/face-to-face.vue'),
        meta: {
          title: '人脸考勤',
          new:true
        },
      },
      {
        path: '/exception/5008',
        name: 'Exception5008',
        component: () => import('~/pages/exception/500.vue'),
        meta: {
          title: '课程商品',
        },
      },
    ],
  },
  {
    path: '/teacherCenter',
    redirect: '/teacherCenter/1',
    name: 'TeacherCenter',
    meta: {
      title: '教研中心',
      icon: 'WarningOutlined',
    },
    children: [
      {
        path: '/teacherCenter/1',
        name: 'TeacherCenter1',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '评估量表',
        },
      },
      {
        path: '/teacherCenter/3',
        name: 'TeacherCenter2',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '交互训练',
        },
      },
      {
        path: '/teacherCenter/0',
        name: 'TeacherCenter10',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '教案库',
        },
      },
      {
        path: '/teacherCenter/4',
        name: 'TeacherCenter3',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '评估记录',
        },
      },
      {
        path: '/teacherCenter/5',
        name: 'TeacherCenter5',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '交互记录',
        },
      },
      {
        path: '/teacherCenter/51',
        name: 'TeacherCenter51',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '作业记录',
        },
      },
      {
        path: '/teacherCenter/6',
        name: 'TeacherCenter6',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '康复小结',
        },
      },
      {
        path: '/teacherCenter/7',
        name: 'TeacherCenter7',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '康复档案',
        },
      },
    ],
  },
  {
    path: '/form1',
    redirect: '/form/basic-form1',
    name: 'Form1',
    meta: {
      title: '家校服务',
      icon: 'FormOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/form/basic-form1',
        name: 'FormBasic1',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '课堂点评',
        },
      },
      {
        path: '/form/basic-form2',
        name: 'FormBasic2',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '课后任务',
        },
      },
      {
        path: '/form/basic-form3',
        name: 'FormBasic3',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '通知公告',
        },
      },
      {
        path: '/form/basic-form4',
        name: 'FormBasic4',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '请假管理',
        },
      },
    ],
  },
  {
    path: '/form2',
    redirect: '/form/basic1',
    name: 'Form1',
    meta: {
      title: '财务中心',
      icon: 'FormOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/form/basic1',
        name: 'Basic1',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '订单管理',
        },
      },
      {
        path: '/form/basic2',
        name: 'Basic2',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '审批管理',
        },
      },
      {
        path: '/form/basic3',
        name: 'Basic3',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '报名优惠',
        },
      },
      {
        path: '/form/basic4',
        name: 'Basic4',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '电子合同',
        },
      },
      {
        path: '/form/basic5',
        name: 'Basic5',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '业绩管理',
        },
      },
      {
        path: '/form/basic6',
        name: 'Basic6',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '账单管理',
        },
      },
      {
        path: '/form/basic7',
        name: 'Basic7',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '工资管理',
        },
      },
      {
        path: '/form/basic8',
        name: 'Basic8',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '确认收入明细',
        },
      },
      {
        path: '/form/basic9',
        name: 'Basic9',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '学费变动记录',
        },
      },
      {
        path: '/form/basic10',
        name: 'Basic10',
        component: () => import('~/pages/form/basic-form/index.vue'),
        meta: {
          title: '储值账户',
        },
      },
    ],
  },
  {
    path: '/exception1',
    redirect: '/exception/4031',
    name: 'Exception',
    meta: {
      title: '数据中心',
      icon: 'WarningOutlined',
    },
    children: [
      {
        path: '/exception/4031',
        name: 'Exception4031',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '数据大屏',
        },
      },
      {
        path: '/exception/4032',
        name: 'Exception4032',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '报表管理',
        },
      },
      {
        path: '/exception/4033',
        name: 'Exception4033',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '招生数据',
        },
      },
      {
        path: '/exception/4034',
        name: 'Exception4034',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '教务数据',
        },
      },
      {
        path: '/exception/4036',
        name: 'Exception4036',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '家校数据',
        },
      },
      {
        path: '/exception/4037',
        name: 'Exception4037',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '财务数据',
        },
      },
    ],
  },
  {
    path: '/excepti',
    redirect: '/exception/1',
    name: 'Excepti',
    meta: {
      title: '内部管理',
      icon: 'WarningOutlined',
    },
    children: [
      {
        path: '/exception/2',
        name: 'Exception42',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '员工管理',
        },
      },
      {
        path: '/exception/3',
        name: 'Exception43',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        path: '/exception/4',
        name: '4',
        component: () => import('~/pages/exception/403.vue'),
        meta: {
          title: '业务设置',
        },
      },
    ],
  },
] as RouteRecordRaw[]
