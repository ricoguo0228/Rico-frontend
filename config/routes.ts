export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'}
    ]
  },
  {
    path: '/chat',
    name: '聊天',
    icon: 'smile',
    routes: [
      {path: '/chat/huaxue', name: '化学实验室', icon: 'barChart', component: './Chat/huaxue'},
      {path: '/chat/shuli', name: '欧几里得', icon: 'barChart', component: './Chat/shuli'},
      {path: '/chat/jisuanji', name: '初号机', icon: 'pieChart',component: './Chat/jisuanji'}
    ]
  },
  {
    path: '/table',
    name: '图表分析',
    icon: 'pieChart',
    routes: [
      {path: '/table/add_chart', name: '立即分析', icon: 'barChart', component: './Table/AddChart'},
      {path: '/table/add_chart_async', name: '后台分析', icon: 'barChart', component: './Table/AddChartAsync'},
      {path: '/table/my_chart', name: '我的分析结果', icon: 'pieChart',component: './Table/MyChart'}
    ]
  },
  {name: '用户中心', path: '/center', component: './User/Center', hideInMenu: true},
  {path: '*', layout: false, component: './404'},
  {path: '/', redirect: '/table/add_chart'}
];
