import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import vueToPdf from 'vue-to-pdf'
import VueEasyPrinter from 'vue-easy-printer'
import 'element-ui/lib/theme-chalk/index.css';
import { commonApi } from '@/api/constApi'
import Moment from 'moment'
Vue.use(ElementUI)
Vue.use(vueToPdf)
Vue.use(VueEasyPrinter)

Vue.prototype.$commonApi = commonApi

Vue.prototype.moment = Moment
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem("qinStoreManagementToken")
  console.log(token)
  if(token == 'qinAdmin'){
    next()
  }else{
    console.log(to.path)
    if(to.path == '/login' || to.path == '/'){
      next()
    }else{
      // alert('请先登录')
      // next({path: 'login'})
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
