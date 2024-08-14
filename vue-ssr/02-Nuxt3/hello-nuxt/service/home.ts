import baseRequest from './index'

export const fetchHomeInfoData = ()=>{
    return baseRequest.get('/homeInfo')
}
