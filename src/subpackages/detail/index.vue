<template>
    <view>
        <u-tabs-swiper ref="tabs1" :list="list" :current="tcurrent" @change="tabsChange" :is-scroll="false"
            swiperWidth="750"></u-tabs-swiper>
    </view>
    <swiper class="sw" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
        <swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
            <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
                <view class="zhanwei"></view>
                <view class="bigBox">
                    <view class="head-container">
                        <image :src="item.photo" class="heroImage"></image>
                        <view class="topHonor">
                            <image src="/images/tabs/top-honor.png" class="top-honor"></image>
                            <text class="heroTitle">{{ item.alias }}</text>
                        </view>
                        <image :src="item.photo" class="heroImage"></image>
                    </view>
                    <view class="body-container">
                        <view class="three-column">
                            <view class="title-one">荣誉牌</view>
                            <image src="/images/tabs/xianbiao.png" class="heroHoror"></image>
                            <image src="/images/tabs/shibiao.png" class="heroHoror"></image>
                            <image src="/images/tabs/shengbiao.png" class="heroHoror"></image>
                        </view>
                        <view class="three-column">
                            <view class="title-two">最低分段</view>
                            <view class="score">{{ item.areaPower }}</view>
                            <view class="score">{{ item.cityPower }}</view>
                            <view class="score">{{ item.provincePower }}</view>
                        </view>
                        <view class="three-column">
                            <view class="title-three">行政区域</view>
                            <view class="area">{{ item.area }}</view>
                            <view class="area">{{ item.city }}</view>
                            <view class="area">{{ item.province }}</view>
                        </view>
                    </view>
                    <view class="foot-container">
                        <view>更新时间:{{ item.updatetime }}</view>
                    </view>
                </view>
            </scroll-view>
        </swiper-item>
    </swiper>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import { getHeroData } from '@/api/getAllHero'
const tabs1 = ref(null)
// uni.getProvider 通过这个判断服务商
const list = ref([
    {
        name: '安卓QQ'
    },
    {
        name: '安卓WX'
    },
    {
        name: '苹果QQ'
    },
    {
        name: '苹果WX'
    }
])
const tcurrent = ref(0) // 当前选中的tab
const swiperCurrent = ref(0) // 当前选中的swiper
const tabs = ref([
    {
    }, {
    }, {
    }, {
    }
]) // tab列表
const tabsChange = (index) => {
    // console.log('打印', tabs1.value);
    swiperCurrent.value = index;
}
const transition = (e) => {
    let dx = e.detail.dx;
    tabs1.value.setDx(dx);
}
const animationfinish = (e) => {
    let current = e.detail.current;
    tabs1.value.setFinishCurrent(current);
    swiperCurrent.value = current;
    tcurrent.value = current;
}
onLoad(async (query) => {
    uni.showLoading({
        title: '加载数据中'
    })
    const hero = query.name
    const res1 = await getHeroData(hero, 'qq')
    console.log('请求的数据', res1);
    tabs.value[0] = res1.data
    const res2 = await getHeroData(hero, 'wx')
    tabs.value[1] = res2.data
    uni.hideLoading()
    const res3 = await getHeroData(hero, 'iqq')
    tabs.value[2] = res3.data
    const res4 = await getHeroData(hero, 'iwx')
    tabs.value[3] = res4.data
})
</script>

<style scoped lang="scss">
.sw {
    height: 100vh;
    overflow: scroll;
}

.zhanwei {
    height: 30rpx;
}

.top-honor {
    width: 150rpx;
    height: 100rpx;
    border-radius: 60rpx 60rpx 90rpx 90rpx;
}

.heroTitle {
    font-family: 'Times New Roman', Times, serif;
    width: 100%;
    line-height: 100rpx;
    text-align: center;
    color: #ea614f;
    font-weight: 800;
    font-size: 45rpx;
    /* overflow: hidden; */
    white-space: nowrap;
}

.topHonor {
    width: 500rpx;
    display: flex;
    margin: 0rpx 30rpx 0rpx 30rpx;
}

.heroHoror {
    width: 60%;
    flex: 1;
    margin: 50rpx 0px 0px 60rpx;
}

.heroImage {
    flex: 1;
    /* width: 100rpx; */
    height: 100rpx;
    border-radius: 100rpx;
}

.head-container {
    background: linear-gradient(to right, #e5e9ee, #3966a2);
    display: flex;
    /* width: 100%; */
    height: 100rpx;
    border-radius: 50rpx;
    margin: 10rpx 0rpx 50rpx 0rpx;
}

.body-container {
    display: flex;
}

.three-column {
    flex: 1;
    margin-right: 20rpx;
    height: 800rpx;
    display: flex;
    flex-direction: column;
}

.title-one {
    text-align: center;
    background-color: #8d8d8d;
    border-radius: 15rpx;
    margin-left: 20rpx;
}

.title-two {
    text-align: center;
    background-color: #8d8d8d;
    border-radius: 15rpx;
}

.title-three {
    text-align: center;
    background-color: #8d8d8d;
    border-radius: 15rpx;
}

/* 分段区域 */
.score {
    flex: 1;
    margin: 50rpx 20rpx 0rpx 0rpx;
    font-size: 60rpx;
    text-align: center;
    line-height: 200rpx;
    color: #b6150b;
    background-color: #f0f0f0;
}

/* 地区区域 */
.area {
    flex: 1;
    margin: 50rpx 20rpx 0rpx 20rpx;
    text-align: center;
    line-height: 200rpx;
    color: #b6150b;
    font-size: 40rpx;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 600;
    overflow: hidden;
    background-color: #f0f0f0;
}

/* 时间区域 */
.foot-container {
    margin: 30rpx 0rpx 0rpx 20rpx;
    font-size: 45rpx;
    color: #ff5151;
}
</style>
