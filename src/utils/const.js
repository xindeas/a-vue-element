// 系统名称
export const SYS_NAME = '某管理系统'
// 路由默认路径(首页路径)，初次打开系统展示的页面的路由
export const DEFAULT_ROUTER = '/Home'
// 默认路由标签页，初次打开系统展示的页面
export const DEFAULT_ROUTER_ITEM = {
  path: DEFAULT_ROUTER,
  label: '主页'
}
// 默认路由标签页，默认展示且不能被关闭
export const DEFAULT_RECENT_ROUTERS = [
  DEFAULT_ROUTER_ITEM
]
// 左侧菜单列表，如果需要根据权限展示不同菜单，该项设为[]，并且在登录后从后台取菜单数据并依照格式存入vuex的permissionList中
export const MENU_LIST = [
  // {
  //   label: 标签,菜单名
  //   path: 路径,以/开头,
  //   icon: class图标,
  //   children: 子节点
  // }
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
    label: '设计器',
    icon: 'el-icon-s-order',
    path: '/Designer'
  }
]
// 右上角用户头像下拉菜单
export const USER_INFO_DROPDOWN = [
  // {
  //   label: 标签,
  //   command: 命令，见element-ui dropdownlist的command
  //   divided: 是否显示分割线，见element-ui dropdownlist的divided
  //   style: 自定义样式
  // }
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
// 默认组件大小对应element组件大小可选值：medium / small / mini
export const DEFAULT_COMP_SIZE = 'mini'
