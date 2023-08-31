/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-15 12:57:27
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-08-31 18:00:50
 * @FilePath: /asrweb/src/common/directive/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import onResize from "./modules/resize"
// 统一入口
export default function directive(app: any) {
    app.directive('onResize', onResize)
}