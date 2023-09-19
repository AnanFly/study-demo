import { defineStore } from 'pinia'
export const userStore = defineStore({
    id: 'store',
    state: () => ({
        user_name: 'jiangnan',
    }),
    getters: {
        getUserName() {
            return this.user_name
        },
    },
    actions: {
        setUserName(name) {
            this.user_name = name
        }
    },
    persist: {
        enabled: true, // 开启持久化
        // strategies
        strategies: [
          {
            storage: localStorage, // 默认是sessionStorage
            // 修改为localStorage
            key : 'store', // 本地存储的key
            paths: ['user_name'] // 持久化的数据
          }
        ],
      },
})