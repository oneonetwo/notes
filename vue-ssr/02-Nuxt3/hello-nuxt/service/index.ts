import type { AsyncData, UseFetchOptions } from '#app'


const BASE_URL = "http://localhost:3000/api"
type Methods = "GET" | "POST"

class BaseRequest{
    request<T = any>(
        url: string, 
        method: Methods, 
        data?:any, 
        options?: UseFetchOptions<T>
    ): Promise<AsyncData<T, Error>>{
        return new Promise((resolve, reject)=>{
            const newOptions: UseFetchOptions<T> = {
                ...options,
                baseURL: BASE_URL,
                method: method
            }
            if(method === 'GET'){
                newOptions.query = data
            }
            if(method === 'POST'){
                newOptions.body = data
            }
            useFetch<T>(url, newOptions as any).then(res=>{
                resolve(res as AsyncData<T, Error>)
            }).catch(error=>{
                reject(error)
            })
        })
    }

    get<T=any>(url: string, params?:any, options?: UseFetchOptions<T>){
        return this.request(url, 'GET', params, options)
    }

    post<T=any>(url: string, data?:any, options?: UseFetchOptions<T>){
        return this.request(url, 'POST', data, options)
    }
}


export default new BaseRequest