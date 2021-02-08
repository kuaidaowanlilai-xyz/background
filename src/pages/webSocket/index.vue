<template>
  <div class="webSocket">
    <div class="chatroom" id="chatroom"></div>
    <div class="shurukuang">
      <el-input
        type="textarea"
        placeholder="请输入内容, >> Ctrl + Enter 发送消息"
        v-model="sendObj.msg"
        maxlength="200"
        rows="3"
        show-word-limit
        @keydown.native.13="sendKeyFun($event)"
      >
      </el-input>
      <div class="buttonDiv">
        <el-button type="primary" size="mini" @click="sendFun()"
        >发送
        </el-button
        >
      </div>
    </div>
    <!-- 视频 -->
    <div class="videoDiv">
      <video id="video" class="video"></video>
      <el-button type="primary" size="mini" @click="realTime">
        发起视频
      </el-button>
    </div>
    <!-- 视频 end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // client: new WebSocket("ws://localhost:23003"), //WebSocket
      client: new WebSocket("ws://123.56.54.241:23003"), //WebSocket
      sendObj: {
        user: sessionStorage.getItem('userIP') ? sessionStorage.getItem('userIP') : Date.now(),
        msg: "", //文本域内容
      },
      MediaRecorder: "", //视频api
    };
  },
  methods: {
    //发送消息的函数
    sendFun(sendObj) {
      if (sendObj) {
        this.client.send(JSON.stringify(sendObj));
      } else if (this.sendObj.msg.trim()) {
        console.log('llllskskss', this.sendObj.msg)
        this.client.send(JSON.stringify(this.sendObj));
        this.sendObj.msg = "";
      }
    },
    //按键的监听
    sendKeyFun(event) {
      if (event.ctrlKey) {
        this.sendFun();
      }
    },
    //发起视频
    realTime() {
      console.log("发起视频");
      this.MediaRecorder.start();
      setInterval(() => {
        this.MediaRecorder.stop();
        this.MediaRecorder.start();
      }, 5000);
    },
    //blob 转 Base64
    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
        // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
          reject(new Error("blobToBase64 error"));
        };
      });
    },
    //录制结束触发
    dataavailable(videoObj) {
      // let url = window.URL.createObjectURL(videoObj.data)
      console.log("录制结束触发", videoObj);
      this.blobToBase64(videoObj.data).then((res) => {
        // console.log('base64', res)
        this.sendObj.msg = '录制结束触发'
        this.sendObj.videoBase64 = res
        this.sendFun(this.sendObj);
      });
    },
  },
  created() {
    let curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
      this.client = new WebSocket("wss://123.56.54.241:23004")
    } else {
      this.client = new WebSocket("ws://123.56.54.241:23003")
    }
  },
  mounted() {
    this.client.onopen = () => {
      this.client.send(JSON.stringify(this.sendObj))
    };

    this.client.onmessage = (socketData) => {
      console.log('接收到的新消息', socketData)
      let data = JSON.parse(socketData.data)
      let chatroom = document.querySelector("#chatroom")
      chatroom.innerHTML += `${data.user}：${data.msg}</br>`
      chatroom.scrollTop = chatroom.scrollHeight
    };

    this.client.onclose = () => {
      alert("服务器已关闭(closed)");
    };

    this.client.onerror = () => {
      alert("服务器错误(error)");
    };

    //视频
    let constraints = {
      video: {
        width: 80,
        height: 128,
      },
      audio: false,
    };
    let video = document.getElementById("video");
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise
      .then((MediaStream) => {
        video.srcObject = MediaStream;
        video.play();
        this.MediaRecorder = new MediaRecorder(MediaStream);
        this.MediaRecorder.ondataavailable = this.dataavailable;
      })
      .catch((err) => {
        alert("您的浏览器不支持调用摄像头或者无权调用");
      });
  },
};
</script>
<style lang="scss" scoped>
.webSocket {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 15px;
  position: relative;

  .chatroom {
    width: 500px;
    height: 300px;
    border: 1px solid #c0c4cc;
    overflow: auto;
  }

  .shurukuang {
    width: 500px;
    margin-top: 5px;

    .buttonDiv {
      text-align: right;
      margin-top: 10px;
    }
  }

  .videoDiv {
    position: absolute;
    top: 20px;
    right: 20px;

    .video {
      width: 80px;
      height: 128px;
      display: block;
      margin-bottom: 5px;
    }
  }
}
</style>
