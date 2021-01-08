<!-- 语音合成 -->
<template>
  <div class="speechSynthesis">
    <div
      style="font-size:16px;"
    >
      <span>营销号文案生成器</span>
    </div>
    <div style="width:600px;">
      <div 
        style="margin-top:7px;"
      >
        <el-input
          placeholder="主体"
          v-model="mainBody"
          clearable>
        </el-input>
        <span>例如：卢本伟</span>
      </div>
      <div 
        style="margin-top:7px;"
      >
      <el-input
        placeholder="事件"
        v-model="event"
        clearable>
      </el-input>
      <span>例如：开挂</span>
      </div>
      <div 
        style="margin-top:7px;"
      >
      <!-- <el-input
        placeholder="后果"
        v-model="consequences"
        clearable>
      </el-input> -->
      </div>
      <div 
        style="margin-top:15px;"
      >
      <el-input
        type="textarea"
        :rows="8"
        placeholder="我曾经跨过山和大海，也穿过人山人海"
        v-model="textarea"
        maxlength="1024"
        show-word-limit
      >
      </el-input>
      <span>我曾经跨过山和大海，也穿过人山人海</span>
      </div>
    </div>
    <div style="margin-top:15px;">
      <el-button :disabled="!mainBody || !event" @click="generatedFun" size="small" type="primary">文案生成</el-button>
      <el-button :disabled="!textarea" @click="requestData" size="small" type="primary">语音合成</el-button>
    </div>
    <audio  controls autoplay name="media" class="myVideo" v-if="videoSrc">
      <source :src="videoSrc" type="audio/mpeg" />
    </audio >
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainBody: '',//主体
      event: '',//事件
      // consequences: '',//后果
      textarea: '',//文案生成结果 & 要合成语音的文本
      videoSrc: '',//合成的语音(base64)
    };
  },
  methods: {
    //文案生成
    generatedFun() {
      this.textarea = 
        `    ${this.mainBody}${this.event}是怎么回事呢？${this.mainBody}相信大家都很熟悉，但是${this.event}是怎么回事呢，下面就让小编带大家一起了解一下吧。\n`+
        `    ${this.mainBody}${this.event}，其实就是${this.mainBody}他${this.event}了，那么${this.mainBody}为什么会${this.event}，相信大家都很好奇是怎么回事。\n`+
        `    大家可能会感到很惊讶${this.mainBody}怎么会${this.event}呢？但事实就是这样，小编也感到非常惊讶。\n`+
        `    那么这就是关于${this.mainBody}${this.event}的事情了，大家有没有觉得很神奇呢？\n`+
        `    看了今天的内容，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！`
    },
    //语音合成请求
    requestData() {
      this.videoSrc = ''
      this.$axios({
        // url: "/speechSynthesis",
        url: "/voice/synthetic",
        method: "post",
        data: {
          textarea: this.textarea
        }
      })
        .then((res) => {
          console.log("语音合成请求", res);
          this.videoSrc = res.data
        })
        .catch((err) => {
          console.log("语音合成请求 错误", err);
        });
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.speechSynthesis {
  width: 100%;
  height: 100%;
  padding-bottom: 54px;
  background-color: #fff;
  position: relative;
  padding: 20px;
  color: #333;
  .myVideo {
    width: 100%;
    height: 54px;
    background: #f1f3f4;
    box-shadow: 0 0 5px #888888;
    position: absolute;
    bottom: 0;
    left: 0;
    outline: none;
  }
}
</style>