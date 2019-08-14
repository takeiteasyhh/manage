<template>
  <div class="detailInfo">
    <div class="headInfo">
      <span class="jobName">{{infoItem.jobName}}</span>
      <span class="jobNature">[ {{infoItem.jobNature}} ]</span>
    </div>
    <div class="centerInfo">
      {{infoItem.jobMinWages}}-{{infoItem.jobMaxWages}}
      <label class="centerInfoLabel">|</label>
      經驗{{infoItem.jobExperience}}
      <label class="centerInfoLabel">|</label>
      學歷{{infoItem.jobEducationalRequirements}}
      <label class="centerInfoLabel">|</label>
      {{infoItem.jobProvinces}}
    </div>
    <div class="releaseTime">發佈時間：{{infoItem.addTime}}</div>
    <div class="jobDescriptionBox">
      <div class="jobDescriptionBoxHead">職位誘惑：</div>
      <div class="jobDescription">{{infoItem.jobHighlights}}</div>
      <div class="jobDescriptionBoxHead">職位描述：</div>
      <div class="jobDescription" v-html="infoItem.jobDescription"></div>
      <div class="jobDescriptionBoxHead">工作地址：</div>
      <div class="jobDescription">{{infoItem.jobProvinces}} {{infoItem.jobDetailedAddress}}</div>
    </div>
    <div class="footerBtn">
      <el-button type="primary" @click="editJop(infoItem.id)">編輯職位</el-button>
      <el-button type="primary" @click="unJop(infoItem.id,infoItem.state,index)">{{infoItem.state==="0"?"下線職位":"再發布職位"}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailInfo',
  data() { 
    return {

    }
  },
  methods:{
    editJop(id){
      this.$router.push({name:"jobEdit",params: { id: id }});
    },
    unJop(id,state,index){
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
            _this.$parent.$parent.$parent.$parent.$parent.$parent.deleteList(index);
          }else{
            _this.$message({ message: res.message, type: "warning" });
          }
        })
      })
      .catch(() => {});
    }
  },
  props:{
    infoItem:{},
    index:0
  }
 }
</script>

<style lang='less' scoped>
.headInfo {
  padding: 0 20px;
}
.jobName {
  font-size: 20px;
  color: #333;
  margin-right: 10px;
}
.jobNature {
  font-size: 20px;
  color: #3999fb;
}
.centerInfo {
  padding: 0 20px;
  font-size: 16px;
  color: #909399;
  height: 46px;
  line-height: 58px;
  .centerInfoLabel {
    margin: 0 10px;
  }
}
.footerBtn{
  position: absolute;
  bottom: 20px;
}
.jobDescriptionBoxHead {
  font-size: 18px;
  color: #333;
  margin: 10px 0;
}
.jobDescription {
  font-size: 16px;
  color: #666;
  line-height: 26px;
  padding: 0 10px;
}
.releaseTime {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  height: 40px;
  line-height: 40px;
  color: #909399;
  font-size: 14px;
  text-indent: 20px;
}
</style>