import request from "../utils/request"
export function payMoney(data) {
  return request('/pay/payMoney', {
    method: 'POST',
    data
  })
}