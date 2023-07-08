<!--
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 18:52:12
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-06-07 09:49:41
 * @FilePath: \webUI\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { defineComponent,ref} from 'vue';

export default defineComponent({
  setup(){
    const locale = ref()
    locale.value = zhCN
    return {
      locale,
    }
  }
})
</script>

<template>
<a-config-provider :locale="locale">
      <router-view />
</a-config-provider>
</template>

<style>
html,body,#app{
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-size: 16px;
  width: 100%
}

</style>
