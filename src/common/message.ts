/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-03-30 16:40:53
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-06-09 17:54:42
 * @FilePath: \asrweb-ui\src\common\message.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message,notification } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export const Message = (obj:any) => {
    switch(obj.type) {
        case "info":
            message.info({
                content : obj.msg,
                duration: obj.duration || 2,
            })
            break;
        case "success":
            message.success({
                content: obj.msg,
                duration: obj.duration || 1,
            })
            break;
        case "warning":
            message.warning({
                content: obj.msg,
                duration: obj.duration || 2,
            })
            break;
        case "error":
            message.error({
                content: obj.msg,
                duration: obj.duration || 2,
            })
            break;
        default:
            message.info({
                content: obj.msg,
                duration: obj.duration || 2,
            })
    }
    
}
export const Notification = (obj:any) => {
    switch(obj.type) {
        case "info":
            notification.info({
                message : obj.msg,
                duration: obj.duration || 3,
            })
            break;
        case "success":
            notification.success({
                message: obj.msg,
                duration: obj.duration || 3,
            })
            break;
        case "warning":
            notification.warning({
                message: obj.msg,
                duration: obj.duration || 3,
            })
            break;
        case "error":
            notification.error({
                message: obj.msg,
                duration: obj.duration || 3,
            })
            break;
        default:
            notification.info({
                message: obj.msg,
                duration: obj.duration || 3,
            })
    }
    
}