/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 19:04:04
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2024-01-04 17:33:10
 * @FilePath: \webUI\src\router\router.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter,createWebHashHistory, RouteRecordRaw } from 'vue-router'

 
// 2. 定义一些路由：每个路由都需要映射到一个组件。
const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        component:  () => import('../App.vue'),
        children: [
        {
            path: 'home',
            name: 'home',
            redirect: '/home/baseDataAll',
            component: () => import('@/pages/Home.vue'),
            children: [{
                path: 'baseDataAll',
                name: 'baseDataAll',
                component: () => import('@/pages/baseDataAll/BaseDataAll.vue'),
            },{
                path: 'baseDataEtf',
                name: 'baseDataEtf',
                component: () => import('@/pages/baseDataAll/ETFdata.vue'),
            },{
                path: 'longhubang',
                name: 'longhubang',
                component: () => import('@/pages/longhubang/Longhubang.vue'),
            },{
                path: 'lhbZhangTing',
                name: 'lhbZhangTing',
                component: () => import('@/pages/longhubang/ZhangTing.vue'),
            },]
        }]
    }
]
 
// 3. 创建路由实例并传递 `routes` 配置。
const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
export default router