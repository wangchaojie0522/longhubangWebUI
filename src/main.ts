/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 18:52:12
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-08-31 18:00:22
 * @FilePath: \webUI\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router';
import request from '@/axios/axios';
import { components, plugins } from './components';
import directive from './common/directive/index'; // 统一自定义指令入口
//导入组件库
import * as antIcons from '@ant-design/icons-vue'
const app = createApp(App)
app.config.globalProperties.$axios = request
app.use(router).mount('#app')
directive(app)
// 重新赋值定义类型 避免后续遍历注册组件的时候ts报错
const antIconsList: any = antIcons; 
for (const key in antIconsList) {
    app.component(key, antIconsList[key])
}
app.config.globalProperties.$antIcons = antIcons; // 挂在到vue实例上
// 加载全局组件
components.forEach((component:any) => {
    app.component(component.name, component);
});
// 加载全局插件
plugins.forEach((plugin:any) => {
    app.use(plugin);
});