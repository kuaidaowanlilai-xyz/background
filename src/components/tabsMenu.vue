<template>
  <div class="tabsMenu">
    <div
      class="tabsTitle"
      style="padding-right: 7px;"
      @click="tabsSwitch({menuName: '首页', route: 'home'})"
      :class="actionFun('home')"
    >
      <span title="首页">首页</span>
    </div>
    <div
      class="tabsTitle"
      v-for="(item,index) in tabsData"
      :key="index"
      :class="actionFun(item.route)"
      @click="tabsSwitch(item)"
    >
      <span :title="item.menuName">{{item.menuName}}</span>
      <span class="down">
        <i @click.stop="downFun(index, item.route)" class="el-icon-close"></i>
      </span>
    </div>
    <div class="tianchong"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsData: [
        // {
        //   menuName: "个人中心"
        // }
      ]
    };
  },
  methods: {
    //判断样式是否 action
    actionFun(route){
      if(this.$route.name == route){
        return 'action'
      }
      return false
    },
    //关闭tabs窗口
    downFun(index, route) {
      if (route == this.$route.name) {
        this.$router.push(`/home`);
      }
      // console.log("关闭tabs窗口", index);
      let tabsData = this.tabsData;
      let qiandata = tabsData.slice(0, index);
      let houdata = tabsData.splice(index + 1);
      this.tabsData = qiandata.concat(houdata);
      //本地更新一下菜单栏数据
      sessionStorage.setItem("tabsData", JSON.stringify(this.tabsData));
    },
    //tabs切换
    tabsSwitch(item) {
      // console.log("tabs切换", item);
      if (item.route == this.$route.name) return;
      this.$router.push(`/${item.route}`);
    },
    //tabs渲染的数据控制
    tabsDrawing(){
      //从本地先取一下tabs数据
      if (sessionStorage.getItem("tabsData")) {
        this.tabsData = JSON.parse(sessionStorage.getItem("tabsData"));
      }
      //监听左侧菜单栏点击事件
      this.$bus.$on("busFun", tabsItem => {
        // console.log("监听左侧菜单栏点击事件", tabsItem);
        let itemOff = true;
        this.tabsData.forEach(item => {
          if (item.route == tabsItem.route) {
            itemOff = false;
          }
        });
        if(tabsItem.route == "home"){
          itemOff = false
        }
        if (itemOff) {
          this.tabsData.push(tabsItem);
          //本地存一下tabs菜单栏数据
          sessionStorage.setItem("tabsData", JSON.stringify(this.tabsData));
        } else {
          // console.log("tabs菜单已存在此选项卡");
        }
      });
    }
  },
  created() {
    //tabs渲染的数据控制
    this.tabsDrawing()
  },
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
.tabsMenu {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  margin-top: 2px;
  padding-left: 2px;
  user-select: none;
  box-sizing: border-box;
  .tabsTitle {
    color: rgb(80, 80, 80);
    box-sizing: border-box;
    border: 2px solid #e2e2e2;
    border-top: 0;
    border-radius: 3px;
    background-color: rgb(255, 255, 255);
    padding-left: 7px;
    padding-right: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    .down {
      display: inline-block;
      height: 100%;
      position: absolute;
      top: 0;
      right: 4px;
      i {
        color: #999;
        cursor: pointer;
      }
      i:hover {
        color: rgb(255, 139, 139);
      }
    }
  }
  .action {
    color: #fff;
    background-color: #409eff;
    i{
      color: #fff!important;
    }
    i:hover {
      color: rgb(255, 139, 139)!important;
    }
  }
  .tianchong {
    background-color: #fff;
    height: 100%;
    flex: 1;
    margin-left: 2px;
    border-bottom: 2px solid #e2e2e2;
    box-sizing: border-box;
  }
}
</style>