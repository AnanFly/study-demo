// vite从环境变量中获取请求地址
// const BASE_URL = import.meta.env.VITE_BASE_URL
// console.log('请求地址',BASE_URL);
import { BaseUrl } from '@/config/urls'
// 本地部署的请求
// export function authRequest(url, options) {
//     return new Promise((resolve, reject) => {
//         uni.request({
//             url: BaseUrl + url,
//             method: options?.method || 'GET',
//             data: options?.data || {},
//             header: {
//                 'Authorization': 'Bearer ' + uni.getStorageSync('token')
//             },
//             success: (res) => {
//                 resolve(res.data)
//             },
//             fail: (err) => {
//                 reject(err)
//             }
//         })
//     })
// }
// 登录请求
export default function request(url, options) {
    return new Promise((resolve, reject) => {
        // console.log('这个option',options);
        uni.request({
            url: BaseUrl + url,
            method: options?.method || 'GET',
            data: options?.data || {},
            // header: options?.header || header,
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}