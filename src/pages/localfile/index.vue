<template>
  <div class="localfile">
    <div class="breadCrumbs">
      <el-button-group>
        <el-button disabled size="mini" icon="el-icon-back" @click="back"></el-button>
        <el-button disabled size="mini" icon="el-icon-right"></el-button>
        <el-button
          size="mini"
          icon="el-icon-top"
          circle
          @click="upward"
          :disabled="path.slice(0, 11) !== '/localfile/'"
        ></el-button>
      </el-button-group>
      <el-input v-model="path" placeholder="文件目录" size="mini" style="width: calc(60% - 135px)">
        <el-button
          title="转到"
          slot="append"
          icon="el-icon-d-arrow-right" @click="getDirectory"
          :disabled="path.slice(0, 10) !== '/localfile'"
        ></el-button>
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
        @dblclick="fileItemDblclick(item.pathName, item.pathType)"
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
      <span>{{ directory.length }} 个项目</span>
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
      stagingPath: '', // 暂存的path >上一次的访问地址
    }
  },
  created() {
    this.getDirectory()
  },
  methods: {
    // 文件类型判断
    pathTypeFun(pathType) {
      if (pathType === 'Directory') { // 文件夹
        return '#icon-wenjianjia'
      } else if (['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].includes(pathType)) { // 图片文件
        return '#icon-huaban21'
      } else if (['audio/mp4a-latm', 'audio/x-mpeg', 'audio/x-wav', 'audio/mpeg', 'audio/mp4'].includes(pathType)) { // 音频文件
        return '#icon-yinlewenjian'
      } else if (['text/plain'].includes(pathType)) {
        return '#icon-wenbenwenjian'
      } else if (['text/html'].includes(pathType)) {
        return '#icon-htmlwenjian'
      } else if (['application/xml'].includes(pathType)) {
        return '#icon-xmlwenjian'
      } else if (['application/json'].includes(pathType)) {
        return '#icon-jsonwenjian'
      } else if (['application/zip'].includes(pathType)) {
        return '#icon-yasuobao'
      } else if (['text/css'].includes(pathType)) {
        return '#icon-css'
      } else if (['application/javascript'].includes(pathType)) {
        return '#icon-js'
      } else {
        return '#icon-weizhiwenjian'
      }
    },
    // 获取文件目录
    getDirectory(pathType = 'Directory') {
      let axiosObj = {
        url: this.path,
        method: 'get'
      }
      if (pathType !== 'Directory') {
        axiosObj.responseType = 'blob'
      }
      this.$axios(axiosObj).then((res) => {
        console.log('localfile', res)
        if (res.headers.isdirectory === 'true') {
          this.directory = res.data.data
        } else {
          this.path = this.stagingPath
          let fileType = res.headers['content-type'].split(';')[0]
          console.log('下载查看文件类型', fileType)
          // blob 转成 base64 时，会出现乱码，转成 blobUrl 不会乱码
          const blob = new Blob([res.data], {type: res.headers['content-type']})
          const blobUrl = window.URL.createObjectURL(blob)
          const iframe = document.createElement('iframe')
          iframe.src = blobUrl
          let style = ` position: fixed;
                        top: 0;
                        left: 0;
                        width: 50%;
                        height: 50%;
                        background-color: #fff;
                        z-index: 2021;`
          iframe.style = style
          document.body.appendChild(iframe)
          window.open(blobUrl, 'new', 'location=no, toolbar=no')

        }
      }).catch((err) => {
        console.error('localfile 错误', err)
      })
    },
    // 双击目录/文件
    fileItemDblclick(pathName, pathType) {
      this.stagingPath = this.path
      let pathItem = this.path[this.path.length - 1] === '/' ? pathName : '/' + pathName
      this.path += pathItem
      this.getDirectory(pathType)
    },
    // 后退
    back() {
    },
    // 向上
    upward() {
      // console.log('向上')
      let pathArr = this.path.split('/')
      pathArr.pop()
      this.path = pathArr.join('/')
      this.getDirectory()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "localfile";
</style>
