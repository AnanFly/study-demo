<template>
  <div class="box">
    <u-notice-bar class="not" mode="horizontal" :list="list"></u-notice-bar>
    <u-search @change="serch" class="serch" input-align="left" height="90"></u-search>
    <div v-for="item in heroList" :key="item.ename" @click="goDetail(item.cname)" class="item">
      <u-image border-radius="10%" width="20vw" height="20vw" :src="item.iconUrl"></u-image>
      <p class="tx">{{ item.cname }}</p>
    </div>
  </div>
  <!-- <u-skeleton :loading="loading" :animation="true"></u-skeleton> -->
</template>

<script setup>
uni.showLoading({
  title: '加载中...'
})
import { ref, onMounted } from 'vue'
import { getAll } from '@/api/getAllHero'
const heroList = ref([])
const copyList = ref([])
const loading = ref(true)
let ad = null
const list = ref([
  '如有bug,请及时联系在线客服谢谢！',
])
const serch = (val) => {
  // console.log('搜索的值');
  if (val) {
    heroList.value = copyList.value.filter((item) => {
      return item.cname.includes(val)
    })
    if (heroList.value.length === 0) {
      heroList.value = copyList.value
    }
  } else {
    heroList.value = copyList.value
  }
}
const goDetail = (n) => {
  uni.showModal({
    title: '提示',
    content: '需要您先观看精彩的视频',
    success: (res) => {
      if (res.confirm) {
        ad.show()
        ad.onClose((data) => {
          uni.hideLoading()
          if (data && data.isEnded) {
            uni.navigateTo({
              url: `/subpackages/detail/index?name=${n}`
            })
            // console.log('激励广告全部加载完成')
          } else {
            uni.showToast({
              title: '未观看完视频',
              icon: 'none'
            })
          }
        })
        ad.onError((err) => {
          uni.hideLoading()
          switch (err.errCode) {
            case 1004:
              // uni.showToast({
              //   title: '您是大神，不需要看广告',
              //   icon: 'none'
              // })
              uni.navigateTo({
                url: `/subpackages/detail/index?name=${n}`
              })
            break
            default:
              uni.showToast({
                title: '加载广告失败',
                icon: 'none'
              })
          }
        })
      } else if (res.cancel) {
         uni.showToast({
           title: '取消观看视频',
           icon: 'none'
         })
      }
    }
  })
  // console.log('广告实例',ad);
  // uni.showModal({
  //   title: '提示',
  //   content: '需要您先观看精彩的视频',
  //   success: (res) => {
  //     if (res.confirm) {
  //       ad.load().then(() => { // 激励广告加载成功回调
  //         ad.show().then(() => {
  //           ad.onClose((res) => {
  //             if (res && res.isEnded) {
  //               uni.navigateTo({
  //                 url: `/subpackages/detail/index?name=${n}`
  //               })
  //               console.log('激励广告全部加载完成')
  //             } else {
  //               uni.showToast({
  //                 title: '取消观看视频',
  //                 icon: 'none'
  //               })
  //             }
  //           })
  //         }).catch((err) => {
  //           console.log('激励广告展示失败', err)
  //         })
  //       }).catch((err) => {
  //         console.log('激励广告加载失败', err)
  //       })
  //     } else if (res.cancel) {
  //        uni.showToast({
  //          title: '取消观看视频',
  //          icon: 'none'
  //        })
  //     }
  //   }
  // })
//   ad.onLoad(() => {
//     console.log('拉取激励广告成功')
//   })
  
//   ad.onError((err) => {
//     console.log('拉取激励广告失败')
//   })
//   ad.onClose((res) => {
//     if (res && res.isEnded) {
//       uni.navigateTo({
//         url: `/subpackages/detail/index?name=${n}`
//       })
//       console.log('激励广告全部加载完成')
//     } else {
//       console.log('激励广告中途强制关闭')
//     }
//   })
}
onMounted(async () => {
  // 创建广告
  ad = uni.createRewardedVideoAd({
    adUnitId: '2kkj9mdtsv5dou1lzy'
  })
  const res = await getAll()
  // console.log('请求的数据', res);
  heroList.value = res.data
  copyList.value = res.data
  uni.hideLoading()
  // loading.value = false
})
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .serch {
    width: 100vw;
  }

  .not {
    width: 100vw;
    margin: 20rpx 0;
  }

  .item {
    width: 27vw;
    height: 30vw;
    margin: 1vw 3.1vw;
    // background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tx {
      margin-top: 1vw;
    }
  }
}
</style>
