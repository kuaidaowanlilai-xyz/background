<template>
  <div id="app">
    <div class="leftDiv">
      <leftMenu></leftMenu>
    </div>
    <div class="rightDiv">
      <headerDiv></headerDiv>
      <tabsMenu></tabsMenu>
      <div class="contentDiv">
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>
<script>
import leftMenu from "./components/leftMenu";
import headerDiv from "./components/header";
import tabsMenu from "./components/tabsMenu";
export default {
  components: {
    leftMenu,
    headerDiv,
    tabsMenu
  }
};
</script>
<style lang="scss">
#app {
  .leftDiv {
    width: 220px;
    height: 100%;
    float: left;
  }
  .rightDiv {
    float: right;
    width: calc(100% - 220px);
    height: 100%;
    .contentDiv {
      width: 100%;
      height: calc(100% - 82px);
      overflow-x: hidden;
      overflow-y: auto;
      // padding-left: 10px;
      box-sizing: border-box;
    }
    //滚动条样式
    .contentDiv::-webkit-scrollbar {
      width: 6px;
    }
    .contentDiv::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
    .contentDiv::-webkit-scrollbar-track {
      background-color: #e2e2e2;
    }
  }
}
</style>
