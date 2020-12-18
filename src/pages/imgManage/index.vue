<!--
 * @Author: xuhao
 * @Date: 2020-12-17 14:44:24
 * @LastEditTime: 2020-12-18 11:02:28
 * @LastEditors: Please set LastEditors
 * @Description: 图片管理
 * @FilePath: \background\src\pages\videoManage\index.vue
-->
<template>
  <div class="videoManage">
    <h1>图片管理</h1>
    <div v-for="(item,index) in imgList" :key="index">
      <span>{{index+1}}、{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: []
    }
  },
  mounted() {
    this.$axios({
      url: '/imgList',
      method: 'post',
      data: {
        textarea: this.textarea,
      },
    })
      .then((res) => {
        console.log('imgList', res)
        this.imgList = res.data
      })
      .catch((err) => {
        console.log('imgList 错误', err)
      })
  },
}
</script>
<style lang="scss" scoped>
.videoManage {
  background-color: #fff;
  min-height: 100%;
}
</style>