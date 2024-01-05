<!--
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 19:12:47
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2024-01-04 17:31:49
 * @FilePath: \webUI\src\pages\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
<div class="homeBox">
    <aside class="asideMenu" >
        <div class="logo" />
        <Menu :activeItem="activeItem" :menuArr="menuArr" @routerReload="reload" />
    </aside>
    <main class="mainBox">
        <a-layout-header :style="{ background: '#fff', padding: 0 }" />
        <a-layout-content :style="{ margin: '24px 16px',height: 'calc(100% - 110px)'}">
            <div :style="{ padding: '24px', background: '#fff', textAlign: 'center',height: '100%' ,overflow: 'auto',}">
                <router-view></router-view>
            </div>
        </a-layout-content>
    </main>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    nextTick
} from 'vue';
export default defineComponent({
    components: {},
    setup() {
        const activeItem = ref<string>('baseDataAll');
        const menuArr = [{
            label: 'A股基础数据',
            path: 'baseData',
            showFlag: true,
            icon: 'BarChartOutlined',
            children: [{
                label: '股票数据',
                path: 'baseDataAll',
            },{
                label: 'ETF数据',
                path: 'baseDataEtf',
            }]
        }, {
            label: '龙虎榜',
            path: 'lhb',
            icon: 'ReadOutlined',
            children: [{
                label: '每日涨停',
                path: 'lhbZhangTing',
            }]
        }]
        const isRouterAlive = ref < boolean > (true)
        const reload = () => {
            isRouterAlive.value = false
            nextTick(() => (
                isRouterAlive.value = true
            ))
        }

        return {
            isRouterAlive,
            menuArr,
            activeItem,
            reload,
        }
    },
});
</script>

<style lang="scss" scoped>
html, body, .homeBox {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
}
.homeBox {
    display: flex;
    .asideMenu {
        overflow: auto;
        width: 280px;
        height: 100%
    }
    .mainBox {
        width: calc(100% - 280px);
        background: #f0f2f5
    }
}
</style>
