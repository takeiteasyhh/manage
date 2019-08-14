
<template>
  <div>
    <el-scrollbar style="height:100%;">
    <el-menu
      :default-active="getNowPath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
      :unique-opened="true"
    >
      <el-menu-item index="/productManage"><i class="icon iconfont iconshouye"></i>商品管理</el-menu-item>
      <el-menu-item index="/serviceManage"> <i class="icon iconfont iconzuchedingdan"></i>客服管理</el-menu-item>
      <el-menu-item index="/carRentalOrder"> <i class="icon iconfont iconzuchedingdan"></i>訂單查看</el-menu-item>
        
       
    </el-menu>
    </el-scrollbar>
  </div>
</template>


<script>
import {mapGetters} from "vuex"
export default {
  name: "iMenu",
  data() {
    return {
      isCollapse: false
    };
  },
  computed:{
    getNowPath(){
      console.log(getPath);
      let getPath = typeof this.$store.getters.getNowMenu==="string"?this.$store.getters.getNowMenu:"/productManage";
      return getPath;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  mounted(){
  }
};
</script>
<style lang="less" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-menu-item-group__title{
  padding: 0;
}
/deep/.el-scrollbar{
  width: 190px;
  overflow-x: hidden;
}
.eleMenuIcon{
  width: 16px;
  margin-right: 12px;
  font-size: 18px;
}
.elMenuList:not(.el-menu--collapse) {
  width: 190px;
  overflow-x: hidden;
}
.elMenuList {
  .iconfont{
    margin: 0 10px 0 4px;
    font-weight: 600;
  }
}
</style>
