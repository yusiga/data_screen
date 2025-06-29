import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import DataVVue3 from '@kjgl77/datav-vue3'
import 'vue-plyr/dist/vue-plyr.css'
import router from "./router/index.js"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(DataVVue3)
app.use(router);
app.use(ElementPlus)
app.mount('#app')
