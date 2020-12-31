<!-- 视频管理 -->
<template>
  <div class="videoManage">
    <div class="butDiv">
      <button @click="videoStart">开始录制</button>
      <button @click="videoStop">结束录制</button>
      <button @click="realTime">边录边播</button>
    </div>
    <video id="video" class="video"></video>
    <video id="video0" class="videoNone video"></video>
    <video id="video1" class="videoNone video"></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      MediaRecorder: '',
      videoObj: {
        i: 0,//正在播放的序列号
        i_2: 0,//写入数据的序列号
        srcArr: [],//视频src数组
        video0: '',
        video1: '',
      },
    }
  },
  methods: {
    videoStart(){
      console.log('开始录制')
      this.MediaRecorder.start()
    },
    videoStop(){
      console.log('结束录制')
      this.MediaRecorder.stop()
    },
    dataavailable(videoObj){
      // console.log('录制结束触发', videoObj)
      let url = window.URL.createObjectURL(videoObj.data)
      this.videoObj.srcArr[this.videoObj.i_2] = url
      if(this.videoObj.i_2 == 1){
        this.videoObj.i_2 = 0
      }else {
        this.videoObj.i_2 += 1
      }
    },
    //边录边播
    realTime(){
      console.log('边录边播')
      this.MediaRecorder.start()
      setInterval(() => {
        this.MediaRecorder.stop()
        this.MediaRecorder.start()
      }, 500)
      setTimeout(() => {
        this.videoObj.video0.style.display = 'block'
        this.videoObj.video0.src = this.videoObj.srcArr[0]
        this.videoObj.video0.play()
        this.videoObj.video1.src = this.videoObj.srcArr[1]
        this.videoEnd()
      }, 1300)
    },
    //video播放结束的监听
    videoEnd(){
      console.log('打开video结束的监听')
      //0>1
      this.videoObj.video0.addEventListener('ended', () => {
        this.videoObj.video0.style.display = 'none'
        this.videoObj.video1.style.display = 'block'
        this.videoObj.video1.play()
        this.videoObj.video0.src = this.videoObj.srcArr[0]
      })
      //1>0
      this.videoObj.video1.addEventListener('ended', () => {
        this.videoObj.video1.style.display = 'none'
        this.videoObj.video0.style.display = 'block'
        this.videoObj.video0.play()
        this.videoObj.video1.src = this.videoObj.srcArr[1]
      })
    }
  },
  mounted() {
    let constraints = {
      video: {
        width: 72,
        height: 128
      },
      audio: false
    }
    let video = document.getElementById("video")
    let promise = navigator.mediaDevices.getUserMedia(constraints)
    promise.then(MediaStream => {
      video.srcObject = MediaStream
      video.play()
      this.MediaRecorder = new window.MediaRecorder(MediaStream)
      this.MediaRecorder.ondataavailable = this.dataavailable
    }).catch(err => {
      alert('您的浏览器不支持调用摄像头或者无权调用')
    })

    this.videoObj.video0 = document.getElementById("video0")
    this.videoObj.video1 = document.getElementById("video1")

  }
}
</script>
<style lang="scss" scoped>
.videoManage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .video {
    width: 72px;
    height: 128px;
    margin: 0 auto;
    display: block;
  }
  .videoNone{
    display: none;
  }
}
</style>
