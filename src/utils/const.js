// 系统名称
export const SYS_NAME = '某管理系统'
// 路由默认路径
export const DEFAULT_ROUTER = '/Home'
// 默认路由标签页
export const DEFAULT_ROUTER_ITEM = {
  path: DEFAULT_ROUTER,
  label: '主页'
}
// 默认路由标签页
export const DEFAULT_RECENT_ROUTERS = [
  {
    path: DEFAULT_ROUTER,
    label: '主页'
  }
]
// 左侧菜单列表
export const MENU_LIST = [
  {
    label: '菜单一',
    path: '1',
    icon: 'el-icon-s-order',
    children: [
      {
        label: '用户',
        path: '/User'
      },
      {
        label: 'test1',
        path: '/Test1'
      },
      {
        label: 'test2',
        path: '/Test2'
      }
    ]
  },
  {
    label: '菜单二',
    icon: 'el-icon-s-order',
    path: '4'
  }
]
// 右上角用户头像下拉菜单
export const USER_INFO_DROPDOWN = [
  {
    command: 'mypage',
    label: '个人主页'
  },
  {
    command: 'myxxx',
    label: '我的XXX'
  },
  {
    command: 'logout',
    label: '退出登录',
    divided: true,
    style: 'color: #F56C6C;'
  }
]
// 标签栏保留最大标签数
export const MAX_TAB_NUM = 5
// 默认组件大小
export const DEFAULT_COMP_SIZE = 'mini'
