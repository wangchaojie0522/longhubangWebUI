<template>
  <div class="leftBox" >
    <template v-for="(item, index) of menuArrN">
      <template v-if="item.children">
        <!-- 有子菜单的 -->
        <div 
          :key="index"
          class="leftFontContainerC"
          :class="{active: activeItemN.indexOf(item.path) > -1}"
          @click="menuExpend(item)">
          <span class="leftIcon">
            <component :is="proxy.$antIcons[item.icon]" />
          </span>
          <span class="leftFont">{{item.label}}</span>
          <span  style="margin:0 10px 0 0;float: right;transform: scale(0.8,0.6);">
            <UpOutlined v-if="item.showFlag" />
            <DownOutlined v-else />
          </span>
        </div>
        <template v-if="item.showFlag">
          <div 
            v-for="(subItem, subIndex) of item.children"
            :key="subIndex"
            class="leftFontContainerChild"
            :class="{active: activeItemN === subItem.path}"
            @click="menuBtn(subItem)">
            <i class="leftIconChild"></i>
            <span class="leftFont">{{subItem.label}}</span>
          </div>
        </template>  
      </template>
      <template v-else >
        <!-- 没有子菜单 -->
        <div 
          :key="index"
          class="leftFontContainer"
          :class="{active: activeItemN === item.path}"
          @click="menuBtn(item)">
          <span class="leftIcon">
            <component :is="proxy.$antIcons[item.icon]" />
          </span>
          <span class="leftFont">{{item.label}}</span>
        </div>  
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref ,onMounted} from 'vue';
import { DownOutlined,UserOutlined, UpOutlined   } from '@ant-design/icons-vue';
import {useRoute,useRouter} from 'vue-router'
import useCurrentInstance from "@/utils/useCurrentInstance";

interface menuItem {
  label: string,
  path: string,
  showFlag: boolean,
  children: []
}

export default defineComponent({
  components: {
    DownOutlined,
    UserOutlined,
    UpOutlined,
  },
  props: {
    menuArr: {
      type: Array,
      required: true
    },
    activeItem: {
      type: String,
      required: true
    }
  },
  setup(props, cxt){
      const { proxy } = useCurrentInstance()

      let activeItemN = ref<string>("") 
      let menuArrN = ref<any[]>([]) 
      //路由
      const router = useRouter()
      const route = useRoute()
      // 获取当前URL激活的子组件
      const getNewItem = () => {
        activeItemN.value = route.path.split('/')[2] || props.activeItem
        menuArrN.value = props.menuArr
      }
      const menuBtn = (obj:any) => {
        activeItemN.value = obj.path;
        cxt.emit('routerReload')
        router.push({name: obj.path})
      }
      const menuExpend =  (obj:any) =>{
        obj.showFlag = !obj.showFlag
      }
      onMounted(getNewItem)
      
      return {
        activeItemN,
        menuArrN,
        // menuClick,
        menuBtn,
        menuExpend,
        proxy
      }
  }
});
</script>
<style lang="scss" scoped>
 .leftBox {
  background: rgb(12, 31, 56);
  // box-shadow:2px 0px 2px 0px rgba(80,131,254,0.2);
  overflow-y: auto;
  height: 100%;
  padding: 24px;
  border-right: 1px solid rgb(178, 202, 238)
}
.leftFontContainer,.leftFontContainerC {
  text-align: left;
  height:40px;
  line-height: 40px;
  margin-bottom:3px;
  font-size: 22px;
  // font-weight: 700;
  color: rgb(246, 247, 248);
}
.leftFontContainerChild {
  text-align: left;
  height:30px;
  line-height: 30px;
  margin-bottom:3px;
  font-size: 20px;
  // font-weight: 700;
  color: rgb(246, 247, 248);
}
.leftFontContainer:hover {
  color:rgb(18, 231, 239);
  background:rgb(2, 52, 106);
  cursor:pointer;
}
.leftFontContainer.active {
  color:rgb(18, 231, 239);
  background:rgb(2, 52, 106);
}
.leftFontContainerC:hover {
  color:rgb(18, 231, 239);
  cursor:pointer;
}
.leftFontContainerC.active {
  color:rgb(18, 231, 239);
  background:rgb(2, 52, 106);
}
.leftFontContainerChild:hover {
  color:rgb(18, 231, 239);
  background:rgb(2, 52, 106);
  cursor:pointer;
}
.leftFontContainerChild.active {
  color:rgb(18, 231, 239);
}
.leftFont {
}
.leftFont:hover {
  cursor:pointer;
}
.leftIcon {
  margin:0px 26px 0 14px;
}
.leftIconChild {
  margin:0px 36px 0 30px;
}
</style>