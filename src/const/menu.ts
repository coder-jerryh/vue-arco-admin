export const MENU: object[] = [
  // 首页
  {
    icon: 'icon-home',
    path: '/homePage',
    menuName: '首页',
    hidden: true
  },
  // 审核管理
  {
    icon: 'icon-settings',
    menuName: '系统管理',
    children: [
      {
        menuName: '待审核商家',
        path: '/auditManage/merchant/list'
      },
      {
        menuName: '待审核活动',
        path: '/auditManage/activity/list'
      }
    ]
  },
  // 商家管理
  {
    icon: 'icon-book',
    menuName: '学校管理',
    children: [
      {
        menuName: '商家信息管理',
        path: '/merchantManage/merchant/list'
      },
      {
        menuName: '商家交易流水',
        path: '/merchantManage/transaction/list'
      }
    ]
  },
  // 用户管理
  {
    icon: 'icon-user',
    menuName: '用户管理',
    children: [
      {
        menuName: '用户信息管理',
        path: '/userManage/user/list'
      }
    ]
  },
  // 活动管理
  {
    icon: 'icon-public',
    menuName: '套餐管理',
    children: [
      {
        menuName: '活动管理',
        path: '/activityManage/activity/list'
      }
    ]
  },
  // 成员管理
  // {
  //   icon: 'icon-profilefill',
  //   menuName: '成员管理',
  //   children: [{
  //     menuName: '成员管理',
  //     path: '/adminManage/admin/list'
  //   }]
  // },
  // 财务管理
  {
    icon: 'icon-gift',
    menuName: '缴费管理',
    children: [
      {
        menuName: '会员管理',
        path: '/financialManage/member/index'
      },
      {
        menuName: '交易明细',
        path: '/financialManage/transaction/index'
      },
      {
        menuName: '提现管理',
        path: '/financialManage/withdraw/index'
      }
    ]
  },
  // 平台管理
  {
    icon: 'icon-video-camera',
    menuName: '设备管理',
    children: [
      {
        menuName: '行业管理',
        path: '/communityManage/industryManage/list'
      },
      {
        menuName: '举报管理',
        path: '/communityManage/report/index'
      },
      {
        menuName: '申诉管理',
        path: '/communityManage/appeal/index'
      },
      {
        menuName: '推广管理',
        path: '/communityManage/adManage/list'
      },
      {
        menuName: '广告管理',
        path: '/communityManage/bannerManage/list'
      }
    ]
  },
  // 数据统计
  {
    icon: 'icon-desktop',
    menuName: '统计管理',
    children: [
      {
        menuName: '数据统计',
        path: '/dataStatistics/dataStatistics/index'
      }
    ]
  },
  // 系统管理
  {
    icon: 'icon-stamp',
    menuName: '签到管理',
    children: [
      {
        menuName: '管理员设置',
        path: '/systemManage/adminManage/list'
      },
      {
        menuName: '隐私政策',
        path: '/systemManage/privacy/index'
      },
      {
        menuName: '用户协议',
        path: '/systemManage/agreement/index'
      },
      {
        menuName: '关于我们',
        path: '/systemManage/aboutUs/index'
      }
    ]
  }
]
