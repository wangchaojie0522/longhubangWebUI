<!--
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 19:12:47
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-06-06 19:16:05
 * @FilePath: \webUI\src\pages\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="homeBox">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({
    components: {
     
    },
    setup() {
       
       
    }
})
</script>
<style scoped lang="scss">

.homeBox {
    height: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;
}
</style>