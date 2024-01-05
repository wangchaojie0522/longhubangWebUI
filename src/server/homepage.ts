/*
 * @Author: chaojiewang chaojiewang@deepglint.com
 * @Date: 2023-07-10 09:57:21
 * @LastEditors: chaojiewang chaojiewang@deepglint.com
 * @LastEditTime: 2024-01-05 15:50:15
 * @FilePath: /longhubangWebUI/src/server/homepage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  axios from '@/axios/axios';
const Gupiao_url = '/api/gupiao/list/'
const GupiaoRL_url = '/api/gupiao/reload/'
const GupiaoKInfo_url = '/api/gupiao/kinfo/'

const Etf_url = '/api/etf/list/'
const EtfRL_url = '/api/etf/reload/'
const EtfKInfo_url = '/api/etf/kinfo/'

const LHBZT_url = '/api/lhb/zhangting/'
const Gupiao_API = {
    Get(params={}) {
        return axios.get(Gupiao_url, {params})
    },
    Post(params={}) {
        return axios.post(Gupiao_url,params)
    },
    Put(params={}) {
        return axios.put(Gupiao_url, params)
    },
    Delete(params={}) {
        return axios.delete(Gupiao_url , {params})
    },
}
const GupiaoRL_API = {
    Post() {
        return axios.post(GupiaoRL_url)
    }
}
const GupiaoKInfo_API = {
    Get(params={}) {
        return axios.get(GupiaoKInfo_url, {params})
    }
}
const Etf_API = {
    Get(params={}) {
        return axios.get(Etf_url, {params})
    },
    Post(params={}) {
        return axios.post(Etf_url,params)
    },
    Put(params={}) {
        return axios.put(Etf_url, params)
    },
    Delete(params={}) {
        return axios.delete(Etf_url , {params})
    },
}
const EtfRL_API = {
    Post() {
        return axios.post(EtfRL_url)
    }
}
const EtfKInfo_API = {
    Get(params={}) {
        return axios.get(EtfKInfo_url, {params})
    }
}
const LHBZT_API = {
    Get(params={}) {
        return axios.get(LHBZT_url, {params})
    }
}
export {
    Gupiao_API,
    GupiaoRL_API,
    GupiaoKInfo_API,
    Etf_API,
    EtfRL_API,
    EtfKInfo_API,
    LHBZT_API,
}