<template>
  <div class="personDetailInfo">
    <div class="headInfo">
      <div slot="drawer-header" class="detailInfoHead">
        <img :src="userImg" class="headerImage">
        <P class="driverName">{{getUserInfo.uNickname?getUserInfo.uNickname:getUserInfo.uLoginid}}</P>
        <p class="driverInfo">
          註冊時間：{{getUserInfo.createDate}}
        </p>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <table border="1" width="100%" cellspacing="0" class="infoTable">
          <tr align="left">
            <td rowspan="4" width="140px" align="center">個人信息</td>
            <td width="40%">暱稱：<span>{{getUserInfo.uNickname}}</span></td>
            <td>註冊時間：<span>{{getUserInfo.createDate}}</span></td>
          </tr>
          <tr align="left">
            <td>聯繫電話：<span>+{{getUserInfo.uLoginCode}} {{getUserInfo.uLoginid}}</span></td>
            <td>聯繫郵箱：<span>{{getUserInfo.uEmail}}</span></td>
          </tr>
          <tr align="left">
            <td>最近登陸：<span>{{getUserInfo.lastLandingTime}}</span></td>
            <td>註冊平台：<span>{{getUserInfo.source?getUserInfo.source:"PC"}}</span></td>
          </tr>
        </table>
        <table border="1" width="100%" cellspacing="0" class="infoTable" v-if="getUserInfo.map">
          <tr align="left">
            <td rowspan="3" width="140px" align="center">訂單信息</td>
            <td width="40%">累計訂單：<span>{{getUserInfo.map.allorder}}</span></td>
            <td>已完成：<span>{{getUserInfo.map.endorder}}</span></td>
          </tr>
          <tr align="left">
            <td>待接單：<span>{{getUserInfo.map.pendingorder}}</span></td>
            <td>待出行：<span>{{getUserInfo.map.waitrun}}</span></td>
          </tr>
          <tr align="left">
            <td>取消/退款：<span>{{getUserInfo.map.cancelorder}}</span></td>
            <td></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <div class="footerBtn"> 
      <el-button type="primary" @click="logoutCount">註銷賬號</el-button>
      <el-button type="primary" @click="resetPassword">重置密碼</el-button>
      <label>* 默認密碼為1234ab</label>
    </div>
  </div>
</template>

<script>
import config from "@/config/config.js";
import manImg from "@/assets/img/man.png"
export default {
  name: "driverDetailInfo",
  props:{
    getUserInfo:{}
  },
  data() {
    return {
      userImg:manImg,
      imgUrl:config.IMAGE_URL,
    };
  },
  computed:{
  },
  methods: {
    logoutCount(){
      let _this = this;
       this.$confirm("確定註銷賬號？", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.postAxios("webAppUser/cancellationAccounts",{ uId: _this.getUserInfo.uId }).then(res=>{
            if(res.success){
              _this.$message({ message: "註銷成功", type: "success" });
              _this.$parent.$parent.showDetail = false;
              _this.$parent.$parent.gettouristList();
            }else{
              _this.$message({ message: res.message, type: "warning" });
            }
          })
        })
        .catch(() => {});
    },
    resetPassword(){
      let _this = this
       this.$confirm("確定重置密碼？", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.postAxios("webAppUser/resetPassword",{ uId: _this.getUserInfo.uId }).then(res=>{
          if(res.success){
            this.$message({ message: "重置成功", type: "success" });
          }
        })
      })
      .catch(() => {});
    }
  }
};
</script>

<style lang='less' scoped>
div.forHeight {
  height: 10px;
  clear: both;
}
div.contentBox {
  font-size: 1rem;
  color: #555;
}
div.userInfoContent {
  color: #666;
  font-size: 0.8rem;
  height: 26px;
}
div.orderStatisticsContent {
  color: #6588b7;
  margin-top: 2px;
  height: 26px;
  .orderStatistics {
    font-size: 0.8rem;
  }
  .orderStatisticsNum {
    margin-top: 5px;
    font-weight: 600;
  }
}
table.infoTable {
  border: none;
  font-size: 14px;
  color: #606266;
  margin-top: 10px;
}
table.infoTable td {
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  padding: 8px 10px;
  span{
    float: right;
  }
}
.detailInfoHead {
  height: 90px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  p{
    position: relative;
    
    label{
        margin: 0 10px;
    }
  }
  .driverName{
      font-size: 18px;
      color: #303133;
      top: 20px;
  }
  .driverInfo{
      font-size: 14px;
      color: #909399;    
      top: 24px;  
  }
}
.headerImage {
  float: left;
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 50%;
}
.footerBtn{
  position: absolute;
  bottom: 20px;
  label{
    font-size: 14px;
    color: #909399;
    margin-left:20px;
  }
}
</style>