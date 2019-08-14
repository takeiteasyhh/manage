<template>
   <div class="whiteBac">
        <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
            <span><i class="icon iconfont iconyoujianxiaoxi"></i>{{infoData.headerTitle}}</span>
            <el-button v-if="infoData.showMoreInfo" style="float: right; padding: 3px 0" type="text" @click="drawerClick">{{infoData.headerButton}}<i class="el-icon-d-arrow-right"></i></el-button>
        </div>
        <div class="noData" v-if="feedbackDataList.length===0">暂无数据</div>
        <div class="mailFeedbackList" v-else v-for="(item,index) in feedbackDataList" :key="index">
            <i class="el-icon-info mailIcon"></i><label class="mailFeedbackInfo">{{item.content}}</label><label class="mailFeedbackTime">{{item.addtime}}</label>
        </div>
        </el-card>
   </div>
</template>
<script>
export default {
    name:"MailFeedback",
    props:{
    infoData:{
      type:Object,
    }
  },
  data(){
    return{
      showDetail:false,
      feedbackDataList:[]
    }
  },
  mounted(){
    this.getFeedBackList();
  },
  methods:{
    drawerClick(){
      this.$router.push({path:"/customerFeedback/unprocessedTab"}); 
    },
    getFeedBackList(){
      let json = {
        limit: 3,
        offset: 1,
        state: "0" 
      }
      this.postAxios("webSysUser/problemFeedbackList", json).then(res => {
        if (res.success) {
          this.feedbackDataList = res.data.YhUserAdvicetable;
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
.el-icon-d-arrow-right{margin-left: 4px}
.el-card{border:none;height: 100%;}
/deep/.el-card__body{padding:1% 4%;height: 75%;}
/deep/.el-card__body{
  min-height: 158px;
}
.mailFeedbackList{
    background: #e8eff9;
    height: 38px;
    display: flex;
    align-items: center;
    margin: 10px 0;
    border-radius: 6px;
    padding: 0 10px;
    position: relative;
    .mailIcon{
        font-size: 1.2rem;
        position: relative;
        margin-right: 10px;
    }
    .mailFeedbackInfo{
        font-size: 0.8rem;
        overflow: hidden;    
        text-overflow: ellipsis;      //超出部分以省略号显示
        white-space: nowrap;
        display: inline-block;
        width:64%;
    }
    .mailFeedbackTime{
        position: absolute;
        right: 30px;
        font-size: 0.6rem;
        color: #666;
    }
}
.noData{
  text-align: center;
  color: #999;
  padding-top: 30px;
}
</style>