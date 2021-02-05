<!--
 * @Author: xuhao
 * @Date: 2020-12-17 14:44:24
 * @LastEditTime: 2020-12-18 17:11:03
 * @LastEditors: Please set LastEditors
 * @Description: 图片管理
 * @FilePath: \background\src\pages\videoManage\index.vue
-->
<template>
  <div class="videoManage">
    <h1>图片管理</h1>
    <el-table :data="imgList" stripe style="width: 100%" border>
      <el-table-column prop="name" label="文件名"></el-table-column>
      <el-table-column prop="birthtime" label="创建时间"></el-table-column>
      <el-table-column prop="mtime" label="修改时间"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        // {
        //   name: '', //文件名
        //   birthtime: '', //创建时间
        //   mtime: '', //修改时间
        // },
      ],
    }
  },
  created() {
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
  padding: 0 20px;
}
</style>
