<template>
  <div class="darkBackground">
    <el-row :gutter="20" style="height:100%;margin:0">
      <el-col :span="8" class="darkBackground height-30">
        <home-statistics :infoData="orderInfoData" :background="backgroundBlue"></home-statistics>
      </el-col>
      <el-col :span="6" class="darkBackground height-30">
        <home-statistics :infoData="userInfoData" :background="backgroundPink"></home-statistics>
      </el-col>
      <el-col :span="10" class="darkBackground height-30">
        <mail-feedback :infoData="mailFeedbackData"></mail-feedback>
      </el-col>
      <el-col :span="24" class="darkBackground " style="padding-top:20px">
        <new-order :infoData="newOrderData"></new-order>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HomeStatistics from "./homeStatistics.vue";
import MailFeedback from "./mailFeedback.vue";
import NewOrder from "./newOrder.vue";
export default {
  components: { HomeStatistics, MailFeedback, NewOrder },
  data() {
    return {
      backgroundBlue:{
        background: "linear-gradient(#a7d3fb,#488bda)",
        border: "4px solid rgba(129,179,238,0.8)"
      },
      backgroundPink:{
        background: "linear-gradient(#D3B0FF,#B280EF)",
        border: "4px solid rgba(233,218,252,0.8)"
      },
      orderInfoData: {
        statistiscsData: [
          {
            detailTitle: "進行中",
            detailNumber: 0,
            colorStyle: { color: "#3674bc" }
          },
          {
            detailTitle: "已完成",
            detailNumber: 0,
            colorStyle: { color: "#5aae59" }
          },
          {
            detailTitle: "取消/退款",
            detailNumber: 0,
            colorStyle: { color: "#f87412" }
          }
        ],
        headerTitle: "訂單數據統計",
        headerButton: "查看數據",
        circleTitle:"全部訂單",
        circleNumber:"0",
        statisticsInfoTitle: "",
        detailInfo: true,
        detailNumber: 0,
        showMoreInfo: true,
        detailInfoColor: { color: "#7E67f5" },
        pointColor: { background: "#7E67f5" }
      },
      userInfoData: {
        statistiscsData: [
          {
            detailTitle: "新用戶",
            detailNumber: 0,
            colorStyle: { color: "#3674bc" }
          }
        ],
        headerTitle: "用戶統計",
        headerButton: "",
        circleTitle:"全部用戶",
        circleNumber:"0",
        statisticsInfoTitle: "",
        showMoreInfo: false,
        detailInfo: false
      },
      mailFeedbackData: {
        headerTitle: "用戶反饋郵件",
        headerButton: "查看更多",
        showMoreInfo: true
      },
      newOrderData: {
        headerTitle: "最新訂單",
        headerButton: "查看更多",
        showMoreInfo: true
      }
    };
  },
  mounted(){
    this.getNowMonth()
    this.getStatistics()
  },
  methods: {
    getStatistics(){
      this.postAxios("carManagement/IndexStatistics",{}).then(res=>{
        if(res.success){
          this.orderInfoData.statistiscsData[0].detailNumber = res.data.count0;
          this.orderInfoData.statistiscsData[1].detailNumber = res.data.count1;
          this.orderInfoData.statistiscsData[2].detailNumber = res.data.count2;
          this.orderInfoData.circleNumber = res.data.count;
          this.orderInfoData.detailNumber = res.data.growthRate.toFixed(2);
        }
      })
    },
    getNowMonth(){
      let month = (new Date()).getMonth()+1;
      this.orderInfoData.statisticsInfoTitle = month+"月份訂單統計";
      this.userInfoData.statisticsInfoTitle = month+"月份用戶增加";

    }
  }
};
</script>
<style lang="less" scope>
.whiteBac {
  height: 100%;
  border-radius: 0.4rem;
  padding: 0;
}
.darkBackground {
  height: 100%;
}
.clearfix span{
  font-weight: 600;
  color: #3a8ee6;
}
</style>

