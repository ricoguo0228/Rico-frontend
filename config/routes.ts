export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' },{ path: '/user/register', component: './User/Register' }] },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', name: '立即分析', icon: 'barChart', component: './AddChart' },
  { path: '/add_chart_async', name: '后台分析', icon: 'barChart', component: './AddChartAsync' },
  { name: '用户中心', path: '/center', component: './User/Center',hideInMenu: true },
  { path: '/my_chart', name: '我的分析结果', icon: 'pieChart', component: './MyChart' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', name: '管理页面', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '管理页面2', component: './Admin' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
