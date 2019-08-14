<template>
  <div class="nav-time">
    <i class="el-icon-date" style="margin-right:10px"></i>{{todayTime}}
  </div>
</template>
<script>
export default {
  name:"Time",
  data() {
    return {
      todayTime:""
    };
  },
  created() {
    let date = new Date();
    let getMonth = date.getMonth()+1;
    this.todayTime = date.getFullYear()+"."+getMonth+"."+date.getDate();
  },
};
</script>
<style lang="less" scoped>
  .nav-time{
    width: 160px;
    line-height: 60px; 
    float: left; 
    font-size: 18px;
    padding-left: 20px;
    .ivu-icon-md-calendar{
      margin-right: 4px;
      margin-top: -2px;
    }
  }
</style>
