<template>
  <div id="contentBox">
    <i-head></i-head>
    <div id="main-container">
      <i-menu class="menu-side"></i-menu>
      <el-scrollbar :style="getMaxHeight" style="border-right:1px solid #ddd ">
        <div class="page-content" :style="pageWidth">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import iMenu from "../common/iMenu";
import iHead from "../common/iHead";
import { mapMutations,mapGetters } from "vuex";
import config from "@/config/config.js";


export default {
  data() {
    return {
      setWidth: "",
      getMaxHeight:""
    };
  },
  created() {
    let _this = this;
    // this.setWidth = _this.getWidth() - 220;
    let getNowHeight = _this.getHeight()-50;
    _this.getMaxHeight = { height: getNowHeight + "px" };
    window.onresize = function() {
      _this.setWidth = _this.getWidth() - 220;
      let getNowHeight = _this.getHeight()-50;
      _this.getMaxHeight = { height: getNowHeight + "px" };
    };   
  },
  
  components: {
    iMenu,
    iHead
  },
  methods: {
    ...mapMutations(["changeNowMenu"]),
    getWidth() {
      if (window.innerWidth) return window.innerWidth;
      else if (document.body && document.body.clientWidth)
        return document.body.clientWidth;
    },
    getHeight() {
      if (window.innerHeight) return window.innerHeight;
      else if (document.body && document.body.clientHeigh)
        return document.body.clientHeigh;
    },

    messageClick(){
      this.$router.push({path:"carRentalOrder",query:{setId:(new Date).getTime()}});
    }
  },
  computed: {
    ...mapGetters(["userInfoGet"]),
    pageWidth() {
      return { width: this.setWidth + "px" };
    }
  },
  watch: {
    //监听路由的变化
    $route: {
      handler: function(newRoute, oldNewRoute) {
        this.changeNowMenu(newRoute.path);
      },
      deep: true
    }
  },
  mounted() {
    this.changeNowMenu(this.$route.path);
  }
};
</script>
<style scoped lang="less">
#main-container {
  display: flex;
  min-height: 600px;
  height: 100%;
  .page-content {
    width: 100%;
    height: 94%;
    min-width: 1150px;
    background: #f5f5f5;
    padding: 14px 14px;
  }
}
/deep/.el-scrollbar__bar.is-horizontal>div{
  display: none;
}
#contentBox {
  height: 100%;
}
</style>