import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// 引入组件
import ToutiaoIcon from './components/ToutiaoIcon'
import Vant from 'vant'
import 'vant/lib/index.less'
// 引入适配
import 'amfe-flexible'
// axios
import request from './utils/request'
Vue.use(Vant)
// 注册全局组件
Vue.component('ToutiaoIcon', ToutiaoIcon)
request.get('/v1_0/channels').then((res) => {
  console.log(res)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
