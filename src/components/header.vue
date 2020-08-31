<template>
  <div class="header">
    <div class="caidanIco">
      <el-popover placement="bottom" width="150" trigger="click">
        <div @click="tuichuFun" style="padding-left: 10px;cursor: pointer;">
          <i class="iconfont icon-ijian"></i> 关于我们
        </div>
        <span slot="reference">
          <i class="iconfont icon-caidan caidan"></i> 菜单
        </span>
      </el-popover>
    </div>
    <div class="headerRight">
      <span>
        <i @click="tuichuFun" title="退出" class="iconfont icon-084tuichu tuichu"></i>
      </span>
      <span>|</span>
      <span>
        <i class="iconfont icon-gerenzhongxin gerenzhongxin"></i> 系统管理员
      </span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    //退出函数
    tuichuFun() {
      this.$confirm("确定要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 50px;
  .caidanIco {
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    user-select: none;
    i.caidan {
      font-size: 18px;
    }
  }
  .headerRight {
    float: right;
    span {
      padding-left: 7px;
    }
    i.tuichu {
      color: rgb(255, 83, 83);
      cursor: pointer;
    }
    i.gerenzhongxin {
      font-weight: bold;
    }
  }
}
</style>