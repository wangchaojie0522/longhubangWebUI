/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 19:32:37
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-06-09 11:16:57
 * @FilePath: \webUI\src\axios\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-06-06 19:32:37
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2023-06-06 19:38:30
 * @FilePath: \webUI\src\axios\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios,  { AxiosError, AxiosResponse } from "axios";
const { VITE_APP_BASE_URL } = import.meta.env;
const request = axios.create({
    baseURL: VITE_APP_BASE_URL as string,
    timeout: 1800000//数据响应过期时间
})
const errorHandler = (error: AxiosError) => {
    console.info(error)
    const status = error.response?.status;
    switch (status) {
      case 400:
        error.message = '接口请求错误';
        break;
      case 401:
        error.message = '未授权，请登录';
        break;
      case 403:
        error.message = '拒绝访问';
        break;
      case 404:
        error.message = `请求地址出错: ${error.response?.config.url}`;
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器内部错误';
        break;
      case 501:
        error.message = '服务未实现';
        break;
      case 502:
        error.message = '网关错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网关超时';
        break;
      case 505:
        error.message = 'HTTP版本不受支持';
        break;
      default:
        break;
    }
    return Promise.reject(error);
  };
//请求拦截器
request.interceptors.request.use((config) => {
  //在发送之前做点什么
  return config
}, (error) => {
  //对请求错误做点什么
  errorHandler(error)
})
 
//响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code, message } = dataAxios;
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios;
    }
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (code) {
      case 200000:
        // code === 0 代表没有错误
        return  dataAxios;
      case 200:
        // code === 0 代表没有错误
        return  dataAxios;
      case 1:
        // code === 1 代表请求错误
        return  dataAxios;
      case 401:
        return  dataAxios;
      case 403:
        return  dataAxios;
      default:
        // 不是正确的 code
        return '不是正确的code';
    }
  }, errorHandler);
// 异常拦截处理器

//导出
request.all = axios.all
request.spread = axios.spread
export default request