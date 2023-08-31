import { nextTick } from "vue";
export default {
    mounted(el:any, binding:any) {
   function throttle(fn:(...args:any []) => any,delay:number){
      let timer:any= null,last:number = 100;
      return function<T>(this:(...args:any []) => any,...args:Array<T>) {
          let now = +new Date();
          if(last && now < last + delay){
              clearTimeout(timer);
              timer = setTimeout(() => {
                  last = now;
                  fn.apply(this,args);
              },delay);
          }else{
              last = now;
              fn.apply(this,args);
          }
      }
  }
     el._resizer = new window.ResizeObserver(throttle(binding.value, Number(binding.arg) || 100))
     el._resizer.observe(el)
   },
   unmounted(el:any) {
     el._resizer.disconnect()
   }
}