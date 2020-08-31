<template>
  <div class="leftMenu">
    <div class="logo">
      <div>XXX后台管理系统</div>
    </div>
    <div class="menu">
      <el-menu
        :default-active="this.$route.meta.tabsName || 'home'"
        class="el-menu-vertical-demo"
        background-color="#04152b"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item @click="menuItemFun({menuName: '首页', route: 'home'})" index="home">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-gongju"></i>
            <span>系统工具</span>
          </template>
          <el-menu-item @click="menuItemFun({menuName: '表单构建', route: 'formBuild'})" index="formBuild">
            <i class="iconfont icon-biaodangoujian"></i>
            <span>表单构建</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //菜单渲染数据
      menuData: [
        {
          menuName: "权限管理"
        }
      ]
    };
  },
  methods: {
    //请求数据
    requestFun() {
      this.$axios({
        url: "/menu",
        method: "get"
      })
        .then(res => {
          // console.log("菜单栏请求数据", res);
          this.menuData = res.data.data.list;
        })
        .catch(err => {
          console.log("菜单栏请求数据 失败", err);
        });
    },
    //菜单列表点击
    menuItemFun(item) {
      // console.log("菜单列表点击", item);
      this.$bus.$emit("busFun", item);
      if (item.route == this.$route.name) return;
      this.$router.push(`/${item.route}`);
    }
  },
  created() {
    //请求数据
    // this.requestFun();
  }
};
</script>
<style lang="scss" scoped>
.leftMenu {
  width: 100%;
  height: 100%;
  background-color: #04152b;
  .logo {
    width: 100%;
    height: 70px;
    background-color: #183863;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    padding: 15px;
    box-sizing: border-box;
    .logoImg {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .menu {
    height: calc(100% - 70px);
    overflow: auto;
    .el-menu {
      user-select: none;
      border-right: 0;
      //字体图标设置
      i {
        display: inline-block;
        min-width: 24px;
      }
    }
  }
  //滚动条样式(仅在谷歌浏览器中生效)
  .menu::-webkit-scrollbar {
    width: 6px;
  }
  .menu::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
  }
  .menu::-webkit-scrollbar-track {
    background-color: #04152b;
  }
}
</style>