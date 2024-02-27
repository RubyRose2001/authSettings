// import './assets/main.css'
import './assets/css/index.css'

import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'
import { pinia } from './utils/pinia'

const app = createApp(App)
// const pinia = createPinia()
app.use(pinia)
app.use(router)
// app.use(ElementPlus, {
//   locale: zhCn
// })



app.mount('#app')
