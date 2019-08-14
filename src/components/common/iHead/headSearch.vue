<template>
  <div class="headSearch">
     <el-input placeholder="请输入订单号/手机号查找" v-model="headSearch" class="headSearchInput">
      <i slot="prepend" class="el-icon-search"></i>
    </el-input>
  </div>
</template>
<script>
export default {
  name:"HeadSearch",
  data() {
    return {
      headSearch:""
    };
  }
};
</script>
<style lang="less" scoped>
  .headSearchInput{
    /deep/input{
      border-radius: 0 16px 16px 0;
      font-size: 12px;
    }
    /deep/.el-input-group__prepend{
    font-size: 20px;
    border-radius: 16px 0 0 16px;
    padding: 0 10px;
    }
  }
  .headSearch{
    width: 220px;
    float: left;
    padding-top: 14px;
  }
  .headSearch /deep/ .ivu-input-prefix{
    .ivu-icon-ios-search{
      font-size: 24px;
    }
    width: 40px;
  }
  .headSearch /deep/ .ivu-input-with-prefix{
    border-radius:16px;
    text-indent: 6px;
  }
</style>
