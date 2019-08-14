<template>
  <div class="personDetailInfo">
    <el-row :gutter="20">
        <el-col :span="2"><div class="contentBox">用户信息</div></el-col>
        <el-col :span="22">
            <div>
                <el-row :gutter="20">
                    <el-col :span="8"><div class="userInfoContent">姓名：潘小黑</div></el-col>
                    <el-col :span="10"><div class="userInfoContent">用户生日：暂未填写</div></el-col>
                    <el-col :span="8"><div class="userInfoContent">联系电话：123456789012</div></el-col>
                    <el-col :span="10"><div class="userInfoContent">注册日期：2018.01.03</div></el-col>
                    <el-col :span="8"><div class="userInfoContent">联系邮箱：sdjflskfjids@88.com</div></el-col>
                    <el-col :span="10"><div class="userInfoContent">最近登录：2019.02.06</div></el-col>
                </el-row>
            </div>
        </el-col>
        <div class="forHeight"></div>
        <el-col :span="2"><div class="contentBox">订单统计</div></el-col>
        <el-col :span="22">
            <div class="orderStatisticsContent">
                <el-row :gutter="20">
                    <el-col :span="4"><div class="orderStatistics">累计下单</div><div class="orderStatisticsNum">154</div></el-col>
                    <el-col :span="4"><div class="orderStatistics">进行中</div><div class="orderStatisticsNum">154</div></el-col>
                    <el-col :span="4"><div class="orderStatistics">已完成</div><div class="orderStatisticsNum">154</div></el-col>
                    <el-col :span="4"><div class="orderStatistics">取消/退款</div><div class="orderStatisticsNum">154</div></el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'personDetailInfo',
  data() { 
    return {

    }
  }
 }
</script>

<style lang='less' scoped>
div.forHeight{
    height: 10px;
    clear: both;
}
div.contentBox{
    font-size: 1rem;
    color: #555;
}
div.userInfoContent{color: #666;font-size: 0.8rem;height: 26px;}
div.orderStatisticsContent{
    color: #6588B7;
    margin-top: 2px;
    height: 26px;
    .orderStatistics{
        font-size: 0.8rem;
    }
    .orderStatisticsNum{
        margin-top: 5px;
        font-weight: 600;
    }
}

</style>