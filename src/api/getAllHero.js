import request from "../utils/request";
// 获取全部英雄
export function getAll() {
    return request('/allHero')
}
// 根据英雄获取站力数据
export function getHeroData(name, type) {
    return request(`/serch?hero=${name}&type=${type}`)
}