<template>
  <div class="localfile">
    <div class="breadCrumbs">
      <el-input v-model="input" placeholder="文件目录" size="mini" style="width: 60%">
        <el-button slot="append" icon="el-icon-refresh-right"></el-button>
      </el-input>
      <el-input v-model="input" placeholder="搜索文件夹" size="mini" style="width: calc(40% - 4px)">
        <el-button slot="prepend" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="filelist">
      <div class="fileItem" v-for="item in 100" :key="item">
        <div class="svgDom">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weizhiwenjian"></use>
          </svg>
        </div>
        <div class="nameDom">未知文件</div>
      </div>
    </div>
    <div class="footinfo">
      <span>12个项目</span>
      <span style="margin-left: 20px">状态：已共享</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Localfile",
  data() {
    return {
      input: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "localfile";
</style>
