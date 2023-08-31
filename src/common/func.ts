/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-15 12:57:27
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-07-26 10:53:02
 * @FilePath: /asrweb/src/common/func.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getNowTime = () => {
  let myDate: Date = new Date();
  // myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  // myDate.getMonth(); //获取当前月份(0-11,0代表1月)
  // myDate.getDate(); //获取当前日(1-31)
  // myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
  // myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
  // myDate.getHours(); //获取当前小时数(0-23)
  // myDate.getMinutes(); //获取当前分钟数(0-59)
  // myDate.getSeconds(); //获取当前秒数(0-59)
  // myDate.getMilliseconds(); //获取当前毫秒数(0-999)
  // myDate.toLocaleDateString(); //获取当前日期
  let MM: string = add_10(myDate.getMonth() + 1)
  let HH: string = add_10(myDate.getHours())
  let mm: string = add_10(myDate.getMinutes())
  let ss: string = add_10(myDate.getSeconds())
  let nowTime: string = myDate.getFullYear() + '-' + MM + '-' + myDate.getDate() + ' ' + HH + ':' + mm + ':' + ss;
  return nowTime;
}
// 加0
const add_10 = (num: number) => {
  let numStr: string = ''
  if (num < 10) {
    numStr = '0' + num
  } else {
    numStr = '' + num
  }
  return numStr;
}
const TransTime = (value: number) => {

  let time = '';

  let h = parseInt(`${value / 3600}`);

  value %= 3600;

  let m = parseInt(`${value / 60}`);

  let s = parseInt(`${value % 60}`);

  if (h > 0) {

    time = formatTime(h + ':' + m + ':' + s);

  } else {

    time = formatTime(m + ':' + s);

  }

  return time;

}

const formatTime = (value: string) => {

  let time = '';

  let s = value.split(':');

  let i = 0;

  for (; i < s.length - 1; i++) {

    time += s[i].length === 1 ? '0' + s[i] : s[i];

    time += ':';

  }

  time += s[i].length === 1 ? '0' + s[i] : s[i];

  return time;

}
let timer:any = null
const Throttle =  (fn:any, delay = 300) => {
  if(timer == null){
      timer = setTimeout(() => {
          fn()
          clearTimeout(timer)
          timer = null
      }, delay);
  }
}
const uniqueFunc = (arr:any[], uniId:string) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}
export {
  getNowTime,
  add_10,
  TransTime,
  Throttle,
  uniqueFunc,
}