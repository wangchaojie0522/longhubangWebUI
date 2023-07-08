/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 18:52:12
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-06-06 19:47:31
 * @FilePath: \webUI\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router';
import request from '@/axios/axios';
const app = createApp(App)
app.config.globalProperties.$axios = request
app.use(router).mount('#app')
