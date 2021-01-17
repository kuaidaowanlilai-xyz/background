<template>
  <div class="music">
    <div class="left">
      <div class="searchDiv">
        <el-input placeholder="想听的音乐" v-model="musicName" @keyup.enter.native="searchFun">
          <el-select style="width:120px;" v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="QQ音乐" value="1"></el-option>
            <el-option label="网易云音乐" value="2"></el-option>
          </el-select>
          <el-button @click="searchFun" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table
        :data="listData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="songname"
          label="歌曲名称">
        </el-table-column>
        <el-table-column
          prop="albumname"
          label="专辑名称">
        </el-table-column>
        <el-table-column
          label="作者">
          <template slot-scope="scope">
            <span>{{ scope.row.singer[0].name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="singleFun(scope.row)" size="mini">播放</el-button>
            <el-button @click="downloadFun(scope.row)" size="mini">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <div class="lyricDiv">
        <ul>
          <li v-for="(item,index) in lyric" :key="index">{{ item ? item.str : '!' }}</li>
        </ul>
      </div>
      <video v-if="videoDivOff" class="videoDiv" controls="" autoplay="" name="media">
        <source :src="videoSrc" type="audio/mp4">
      </video>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoDivOff: false,//控制播放的显示于重新加载
      videoSrc: 'http://ws.stream.qqmusic.qq.com/amobile.music.tc.qq.com/',//播放地址
      select: '1',//播放源选择
      musicName: '',//要搜索的音乐名
      listData: [
        // {
        //     songname: '',//歌曲名称
        //     albumname: '',//专辑名称
        //     singer: [
        //         {
        //             name: '',//作者
        //         }
        //     ]
        // }
      ],
      //qq音乐请求时需要的参数
      req: {
        req: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: {
            guid: '514653892',
            songmid: [],
            songtype: [0],
            uin: '',
            loginflag: 1,
            platform: '20'
          }
        }
      },
      lyric: [],
    }
  },
  methods: {
    //下载函数
    downloadFun(row) {
      console.log('点击了下载', row)
      //下载的单曲信息查询
      this.req.req.param.songmid[0] = row.songmid
      let data = JSON.stringify(this.req)
      this.$axios({
        url: '/music/singleInfo',
        method: 'get',
        params: {
          data: data
        }
      }).then(res => {
        console.log('下载的单曲信息查询', res)
        this.videoSrc += res.data.req.data.midurlinfo[0].purl
          var downloadElement = document.createElement('a');
          downloadElement.href = this.videoSrc;
          downloadElement.download = row.songname //下载的文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
        // //下载
        // this.$axios({
        //   url: `/music/musicDownload/${res.data.req.data.midurlinfo[0].purl}`,
        //   method: 'get',
        //   responseType: 'blob',//告诉服务器我们需要的响应格式
        // }).then(res => {
        //   console.log('下载', res)
        //   let blob = new Blob([res.data], {
        //     type: 'audio/mp4',      //将会被放入到blob中的数组内容的MIME类型
        //   });
        //   let objectUrl = URL.createObjectURL(blob);  //生成一个url
        //   var downloadElement = document.createElement('a');
        //   downloadElement.href = objectUrl;
        //   downloadElement.download = row.songname //下载的文件名
        //   document.body.appendChild(downloadElement);
        //   downloadElement.click(); //点击下载
        // }).catch(err => {
        //   console.log('下载失败', err);
        //   this.$message({
        //     type: 'error',
        //     message: '下载失败,请重试'
        //   });
        // })
      }).catch(err => {
        console.log('下载的单曲信息查询', err);
      })
    },
    //搜索函数
    searchFun() {
      this.$axios({
        url: '/music/queryList',
        method: 'get',
        params: {
          w: this.musicName
        }
      }).then(res => {
        // console.log('qqMusic搜索结果', res)
        //备注：返回的数据是一个类似于方法包裹的字符串，需要截取再解析
        let data = JSON.parse(res.data.slice(9, -1))
        this.listData = data.data.song.list
      }).catch(err => {
        console.log('qqMusic搜索结果失败', err);
      })
    },
    //单曲数据查询 播放
    singleFun(row) {
      this.req.req.param.songmid[0] = row.songmid
      this.videoDivOff = false
      this.videoSrc = 'http://ws.stream.qqmusic.qq.com/amobile.music.tc.qq.com/'
      let data = JSON.stringify(this.req)
      console.log('kkkk', row, data)
      this.$axios({
        url: '/music/singleInfo',
        method: 'get',
        params: {
          data: data
        }
      }).then(res => {
        console.log('qqMusic单曲数据查询', res)
        this.videoSrc += res.data.req.data.midurlinfo[0].purl
        this.videoDivOff = true
        //调用获取歌词的函数 //备注：只有 video 标签渲染完毕后才能获取歌词再操作dom
        this.lyricFun(row.songmid)
      }).catch(err => {
        console.log('qqMusic单曲数据查询失败', err);
      })
    },
    //获取歌词的函数
    lyricFun(songmid) {
      this.$axios({
        /*
            备注：此处不是用的普通代理 ，
            此接口对 referer 做了限制，
            所以在 webpack.dev.conf.js 文件里做了个转发伪造 referer
        */
        url: '/api/getDiscList',
        method: 'get',
        params: {
          songmid: songmid,
          format: 'json',//以json数据格式返回数据的标识（是不是其他需要截取数据的接口也可以带着个参数？有待验证）
          nobase64: 1,//返回的数据是否base64转码，不带的话默认返回base64数据，带1返回正常数据
        }
      }).then(res => {
        console.log('获取歌词', res)
        //调用歌词滚动函数
        this.$nextTick(() => {
          this.scrollFun(res.data.lyric)
        })
      }).catch(err => {
        console.log('获取歌词失败', err);
      })
    },
    //歌词滚动函数
    scrollFun(lyricStr) {
      //处理歌词数据
      this.lyric = []//初始化清空歌词
      let reg = /^\[(\d{2}:\d{2})\.\d{2}\](.*)$/
      lyricStr.split('\n').map(item => {
        if (reg.exec(item.trim())) {
          return {
            time: reg.exec(item.trim())[1],
            str: reg.exec(item.trim())[2]
          }
        }
      }).forEach(item => {
        if (item) {
          this.lyric.push(item)
        }
      })
      // console.log(this.lyric)

      //渲染页面 //配合v-for
      let lyricDiv = document.querySelector('.lyricDiv')
      let ul = lyricDiv.querySelector('ul')
      this.$nextTick(() => {
        let lis = ul.querySelectorAll('li')
        lis[0].className = 'current'
        //同步歌词于播放进度
        let video = document.querySelector('.videoDiv')
        video.addEventListener('timeupdate', () => {
          let minutes = parseInt(video.currentTime / 60)
          let seconds = parseInt(video.currentTime % 60)
          if (minutes < 10) {
            minutes = '0' + minutes
          }
          if (seconds < 10) {
            seconds = '0' + seconds
          }
          let currentTime = minutes + ':' + seconds
          this.lyric.forEach((item, index) => {
            if (currentTime == item.time) {
              lis.forEach(item => {
                item.className = ''
              })
              lis[index].className = 'current'
              ul.style.top = `calc(50% - 15px - ${index * 30}px)`
            }
          })

        })
      })
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
@import "./music.scss";
</style>
