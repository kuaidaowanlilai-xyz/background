<template>
  <div class="localfile">
    <div class="breadCrumbs">
      <el-button-group>
        <el-button size="mini" icon="el-icon-back" @click="back"></el-button>
        <el-button size="mini" icon="el-icon-right"></el-button>
        <el-button size="mini" icon="el-icon-top" circle @click="upward" :disabled="path === '/localfile'"></el-button>
      </el-button-group>
      <el-input v-model="path" placeholder="文件目录" size="mini" style="width: calc(60% - 135px)">
        <el-button title="转到" slot="append" icon="el-icon-d-arrow-right" @click="getDirectory"></el-button>
      </el-input>
      <el-input v-model="input" placeholder="搜索文件夹" size="mini" style="width: calc(40% - 5px)">
        <el-button slot="prepend" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="filelist">
      <div
        class="fileItem"
        v-for="(item,index) in directory"
        :key="index"
        @dblclick="fileItemDblclick(item.pathName, item.isDirectory)"
      >
        <div class="svgDom">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="pathTypeFun(item.pathType)"></use>
          </svg>
        </div>
        <div class="nameDom">{{ item.pathName }}</div>
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
      input: '',
      path: '/localfile',
      directory: [], // 目录数据
      historyPath: [], // 历史访问记录
    }
  },
  created() {
    this.getDirectory('')
  },
  methods: {
    // 文件类型判断
    pathTypeFun(pathType) {
      if (pathType === 'Directory') { // 文件夹
        return '#icon-wenjianjia'
      } else if (['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].includes(pathType)) { // 图片文件
        return '#icon-huaban21'
      } else if (['audio/mp4a-latm', 'audio/x-mpeg', 'audio/x-wav'].includes(pathType)) { // 音频文件
        return '#icon-yinlewenjian'
      } else {
        return '#icon-weizhiwenjian'
      }
    },
    // 获取文件目录
    getDirectory() {
      this.$axios({
        url: this.path,
        method: 'get'
      }).then((res) => {
        console.log('localfile', res)
        if (res.headers['content-type'] === 'application/json') {
          this.directory = res.data.data
        } else {
          window.open(`http://localhost:8080/localhost3000${this.path}`, 'new', 'location=no, toolbar=no');
          let pathArr = this.path.split('/')
          pathArr.pop()
          this.path = pathArr.join('/')
          console.log('pathArr', pathArr)
        }
      }).catch((err) => {
        console.error('localfile 错误', err)
      })
    },
    // 双击目录
    fileItemDblclick(pathName, isDirectory) {
      let pathItem = this.path[this.path.length - 1] === '/' ? pathName : '/' + pathName
      this.path += pathItem
      this.getDirectory()
    },
    // 后退
    back() {
    },
    // 向上
    upward() {
      console.log('后退')
      let pathArr = this.path.split('/')
      pathArr.pop()
      this.path = pathArr.join('/')
      console.log('pathArr', pathArr)
      this.getDirectory()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "localfile";
</style>
