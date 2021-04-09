export default {
  pages: [
    'pages/begin/begin',
    'pages/user/index/index',
    'pages/user/welcome/welcome',
    'pages/user/register/register',
    'pages/user/activity/activity',
    'pages/user/detail/detail',
    'pages/user/sign/sign',
    'pages/user/mine/mine',
    'pages/user/space/space',
    'pages/user/join/join',
    'pages/user/feedback/feedback',
    'pages/organizer/welcome/welcome',
    'pages/organizer/activity/activity',
    'pages/organizer/detail/detail',
    'pages/organizer/login/login',
    'pages/organizer/viewlist/viewlist',
    'pages/organizer/check/check',
    'pages/organizer/launch/launch',
    'pages/organizer/launch/time/time',
    'pages/organizer/launch/typeid/typeid',
    'pages/organizer/launch/scopeid/scopeid',
    'pages/organizer/edit/edit',
    'pages/organizer/edit/time/time',
    'pages/organizer/edit/typeid/typeid',
    'pages/organizer/edit/scopeid/scopeid',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/user/activity/activity',
        text: '',
        iconPath: 'assets/images/activity.png',
        selectedIconPath: 'assets/images/activity_selected.png'
      }, {
        pagePath: 'pages/user/sign/sign',
        text: '',
        iconPath: 'assets/images/sign.png',
        selectedIconPath: 'assets/images/sign_selected.png'
      }, {
        pagePath: 'pages/user/mine/mine',
        text: '',
        iconPath: 'assets/images/mine.png',
        selectedIconPath: 'assets/images/mine_selected.png'
      }
    ]
  },
  window: {
    navigationStyle: 'default',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#6190E8',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  }
}
