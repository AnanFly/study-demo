<template>
    <button @click="pay">点击付款</button>
    <button @click="getInfo">获取用户信息</button>
    <aweme-user-card
        :aweme-id="awemeId"
        :width="width"
        :height="height"
        :left-right-padding="padding"
        :fixed="fixed"
        @Error="onerror"
    >
</aweme-user-card>
    <button
        open-type="openAwemeUserProfile"
        :bindopenawemeuserprofile="eventHandler"
        :data-aweme-id="awemeId"
        >
        跳转抖音号个人页
    </button>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';
import { payMoney } from '@/api/pay'
const awemeId = 'liu2950858517'
const width = 750
const height = 144
const padding = 32
const fixed = false
const onerror = (err) => {
    console.log('错误', err);
}
const  eventHandler = (e) => {
    if (e.detail.errNo) {
      console.log("跳转抖音号个人页失败", e.detail);
    } else {
      console.log("跳转抖音号个人页成功");
    }
}
const pay = async () => {
    const pay_obj = await payMoney()
    startPay(pay_obj.data)
}
const getInfo = () => {
    tt.getUserProfile({
        success: (res) => {
            console.log('用户信息', res.userInfo);
        },
        fail: (err) => {
            console.log('获取用户信息失败', err);
        }
    })
    // uni.getProvider({
    //     service: 'oauth',
    //     success: function (res) {
    //         console.log(res.provider)
    //         // uni.getUserProfile({
    //         //     provider: res.provider[0],
    //         //     success: function (infoRes) {
    //         //         console.log('用户信息', infoRes.userInfo);
    //         //     }
    //         // });
    //         if(res.provider.indexOf('toutiao') !== -1){
    //             tt.getUserProfile({
    //                 success: (res) => {
    //                     console.log('用户信息', res.userInfo);
    //                 },
    //                 fail: (err) => {
    //                     console.log('获取用户信息失败', err);
    //                 }
    //             })
    //         } 
    //         // uni.login({
    //         //     provider: res.provider[0],
    //         //     success: function (loginRes) {
    //         //         console.log(JSON.stringify(loginRes));
    //         //     }
    //         // });
    //         // if (~res.provider.indexOf('qq')) {
    //         //     uni.login({
    //         //         provider: 'qq',
    //         //         success: function (loginRes) {
    //         //             console.log(JSON.stringify(loginRes));
    //         //         }
    //         //     });
    //         // }
    //     }
    // })
}
const startPay = (pay_obj) => {
    uni.requestPayment({
        provider: uni.getStorageSync('providerpayment'),
        orderInfo: pay_obj, //对象。包含order_token和order_id
        service: 5, //微信支付参数(固定值)
        success: function(res) {
            console.log('success:' + JSON.stringify(res));
        },
        fail: function(err) {
            console.log('fail:' + JSON.stringify(err));
        }
    })
} 
onShow(() => {
    uni.getProvider({
        service: 'payment',
		success: function(res) {
			uni.setStorageSync('providerpayment', res.provider[0]);
		}
    });
})
// import { userStore } from '../../store/user'
// import { getAll } from '@/api/getAllHero'
// const store = userStore()
// const change = async () => {
//     const res = await getAll()
//     console.log('请求的数据', res);
//     console.log('仓库数据', store.user_name);
//     // store.$state.user_name = '我是修改后的数据'
//     // store.state.user_name = '我是修改后的数据'
//     store.$patch((state) => {
//         state.user_name = '我是修改后的数据'
//     })
// }
// const changeTwo = () => {
//     console.log('仓库数据', store.user_name);
//     store.$patch((state) => {
//         state.user_name = '我是第二次修改后的数据'
//     })
// }
</script>

<style scoped></style>
