import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

// 导入表格树
import TreeTable from 'vue-table-with-tree-grid'

Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8360/admin'
axios.interceptors.request.use(config => {
  config.headers.common['X-Nideshop-Token'] =
    window.sessionStorage.getItem('token') || ''
  return config
})
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 组件全局注册 表格树
Vue.component('tree-table', TreeTable)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
