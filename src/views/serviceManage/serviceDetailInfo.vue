<template>
  <div class="personDetailInfo">
    <div class="headInfo">
      <div slot="drawer-header" class="detailInfoHead">
        <img :src="imgUrl+getUserInfo.img" class="headerImage">
        <P class="driverName">{{getUserInfo.name}}</P>
        <p class="driverInfo">
          客服編號：{{getUserInfo.userId}}
          <label>|</label>客服賬號：{{getUserInfo.account}}
          <label>|</label>創建時間：{{getUserInfo.createTime}}
        </p>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="24">
        <table border="1" width="100%" cellspacing="0" class="infoTable">
          <tr align="left">
            <td rowspan="4" width="140px" align="center">個人信息</td>
            <td width="40%">姓名：<span>{{getUserInfo.name}}</span></td>
            <td>角色類型：<span>{{getUserInfo.roleName}}</span></td>
          </tr>
          <tr align="left">
            <td>聯繫電話：<span>{{getUserInfo.phone}}</span></td>
            <td>創建時間：<span>{{getUserInfo.createTime}}</span></td>
          </tr>
          <tr align="left">
            <td>聯繫郵箱：<span>{{getUserInfo.email}}</span></td>
            <td>所屬類型：<span>{{getUserInfo.deptId}}</span></td>
          </tr>
        </table>
        <table border="1" width="100%" cellspacing="0" class="infoTable">
          <tr align="left">
            <td rowspan="3" width="140px" align="center">訂單信息</td>
            <td width="40%">約車訂單：<span></span></td>
            <td>包車訂單：<span></span></td>
          </tr>
          <tr align="left">
            <td>接機訂單：<span></span></td>
            <td>送機訂單：<span></span></td>
          </tr>
          <tr align="left">
            <td>打包訂單：<span></span></td>
            <td>用戶反饋處理：<span></span></td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <div class="footerBtn"  v-if="userInfoGet.roleId==='1'"> 
      <el-button type="primary" @click="logoutCount">註銷賬號</el-button>
      <el-button type="primary" @click="resetPassword">重置密碼</el-button>
      <label>* 默認密碼為111111</label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import config from "@/config/config.js";
export default {
  name: "driverDetailInfo",
  props:{
    getUserInfo:{}
  },
  data() {
    return {
      imgUrl:config.IMAGE_URL,
    };
  },
  computed: {
    ...mapGetters(["userInfoGet"]),
  },
  methods: {
    logoutCount(){
      let _this = this;
       this.$confirm("確定註銷賬號？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.postAxios("webSysUser/deleteSysUser",{userId:this.getUserInfo.userId}).then(res=>{
            if(res.success){
              _this.$message({ message: "註銷成功", type: "success" });
              _this.$parent.$parent.getMagageList();
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
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.postAxios("webSysUser/ResetSysUserPassword",{ userId: this.getUserInfo.did }).then(res=>{
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