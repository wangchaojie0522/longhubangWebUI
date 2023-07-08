import  axios from '@/axios/axios';
const Gupiao_url = '/api/gupiao/'
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
export {
    Gupiao_API,
}