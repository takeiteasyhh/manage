<template>
  <div class="manageItem">
    <div class="headInfo">
      <span class="jobName">{{infoItem.jobName}}</span>
      <span class="jobNature">[ {{infoItem.jobNature}} ]</span>
    </div>
    <div class="centerInfo">
      {{infoItem.jobMinWages}}-{{infoItem.jobMaxWages}}
      <label class="centerInfoLabel">|</label>經驗{{infoItem.jobExperience}}
      <label class="centerInfoLabel">|</label>學歷{{infoItem.jobEducationalRequirements}}
      <label class="centerInfoLabel">|</label>{{infoItem.jobProvinces}} 
      <div class="btnList">
        <el-button plain @click="checkDetail">查看</el-button>
        <el-button type="primary" class="editBen" @click="editJop(infoItem.id)">編輯</el-button>
        <el-button type="warning" @click="offline(infoItem.id,infoItem.state,index)">{{infoItem.state==="0"?"下線":"再發布"}}</el-button>
      </div>
    </div>
    <div class="releaseTime">發佈時間：{{infoItem.addTime}}</div>
    <DrawerMy :width="60" :showMyDrawer.sync="showDetail">
      <div slot="drawer-header" class="sysHeadInfo">
        查看職位
      </div>
      <div slot="drawer-content">
        <detailInfo :infoItem="infoItem"  :index="index"></detailInfo>
      </div>
    </DrawerMy>
  </div>
</template>

<script>
import detailInfo from "./detailInfo.vue";
export default {
  components: { detailInfo },
  name: "manageItem",
  data() {
    return {
      showDetail: false,
    };
  },
  props:{
    infoItem:{
    },
    index:0,
  },
  methods:{
    editJop(id){
      this.$router.push({name:"jobEdit",params: { id: id }});
    },
    checkDetail(){
      this.showDetail = true;
    },
    offline(id,state,index){
      let json = {};
      json.id = id;
      json.state = state==="0"?"1":"0";
      let _this = this;
      let wornMessage = state==="0"?"確定下線該職位？":"確定再上線線該職位？"
      let onLineMessage = state==="0"?"下線成功":"再上線成功"
      this.$confirm(wornMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.postAxios("webJob/updatejobOfflineRelease",json).then(res=>{
          if(res.success){
            _this.$message({ message: onLineMessage, type: "success" });
            _this.$parent.$parent.$parent.$parent.deleteList(index);
            _this.showDetail =false;
          }else{
            _this.$message({ message: res.message, type: "warning" });
          }
        })
      })
      .catch(() => {});
    
    }
  }
};
</script>

<style lang='less' scoped>
.btnList{
  display: inline-block;
  float: right;
}
.editBen{
  margin-right: 20px;
}
.manageItem {
  border: 1px solid #ddd;
  padding-top: 10px;
  margin-bottom: 16px;
}
.headInfo {
  padding: 0 20px;
}
.jobName {
  font-size: 20px;
  color: #303133;
  margin-right: 10px;
}
.jobNature {
  font-size: 20px;
  color: #3999fb;
}
.footerBtn{
  position: absolute;
  bottom: 20px;
}
.centerInfo {
  padding: 0 20px;
  font-size: 16px;
  color: #909399;
  height: 58x;
  line-height: 58px;
  .centerInfoLabel {
    margin: 0 10px;
  }
}
.releaseTime {
  border-top: 1px solid #eee;
  background: #f5f7fa;
  height: 40px;
  line-height: 40px;
  color: #909399;
  font-size: 14px;
  text-indent: 20px;
}
</style>