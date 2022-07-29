// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import { Message } from 'element-ui'


Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
Vue.prototype.$echarts = echarts
axios.defaults.baseURL='/api'
Vue.prototype.$axios = axios
// // 挂载到$message上
Vue.prototype.$message = Message
baseURL: process.env.VUE_APP_BASE_API

// Vue.prototype.$axios.defaults.baseURL = "http://127.0.0.1:8080"

//定义一个响应拦截器
axios.interceptors.request.use(function(config){
  console.log("==============请求拦截============")
  console.log(config)
  var token = localStorage.getItem("token");
  if(token){
    config.headers.Authorization = `token ${token}`;
    config.headers.token  = token;
    // config.headers.Referer = 'http://127.0.0.1:8080/'
  }
  console.log(token)
  
  return config;

});
axios.interceptors.response.use(config=>{
  console.log("==================全局拦截=========================")
  console.log(config)
  console.log(localStorage)
  var code=config.data.code;
  
  if(code=="403"){
    localStorage.removeItem("token")
    Vue.prototype.$message({
      type:'error',
      message:'登录错误'
    });
    router.push("/login")//跳转到登录页面
   
  }else if(code == 500){
    Vue.prototype.$message({
      type:'error',
      message: config.data.message
    });
  }
  var token = config.headers.token;
  console.log("========token===",token )
  if(token && token != ""){
    localStorage.removeItem("token")
    localStorage.setItem("token", token)
  }
  return config;
});
// axios.interceptors.response.use(function(config){
//   console.log("==================全局拦截=========================")
//   console.log(config)
//   console.log(localStorage)
//   var code=config.data.code;
  
//   if(code=="403"){
//     localStorage.removeItem("token")
//     router.push("/login")//跳转到登录页面
//     this.$message({
//       type: 'error',
//       message: '消息提示内容',
//       showClose: false,
//       duration: 3,
//       center: true
//   })
//   }
//   var token = config.headers.token;
//   console.log("========token===",token )
//   if(token && token != ""){
//     localStorage.removeItem("token")
//     localStorage.setItem("token", token)
//   }
//   return config
// });


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})



