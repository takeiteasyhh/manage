<template>
  <div class="orderPageList whiteBac">
    <el-scrollbar :style="getMaxHeight">
      <div id="selectList">
          <div class="headTitle"><i class="el-icon-tickets"></i>總訂單號{{getDetailId}}</div>
          <div class="totleOrderNum">共{{detailInfoNum}}個訂單</div>
          <div class="orderListBox">
              <div class="orderListItem" @click="getDetailInfoClick(item.sOrderId,item.typesName)" v-for="item in getDetailList" :key="item.sOrderId">
                  <div class="itemOrderTitle">訂單{{item.sOrderId}}</div>
                  <div class="itemOrderTime">下單時間：{{item.addtime}}</div>
                  <div class="itemOrderInfo">訂單類型：{{item.typesName}}<label class="cutLabel">|</label>用車時間：{{item.useStartTime}}<label class="cutLabel">|</label>訂單共計：<span class="moneyContent">MOP$&nbsp;{{item.price}}</span></div>
              </div>
          </div>
      </div>
    </el-scrollbar>    
    <DrawerMy :width="60" :showMyDrawer.sync="showDetail">
      <div slot="drawer-header">訂單列表<label>/</label>{{getDetailInfo.sOrderId}}</div>
      <div slot="drawer-content">
        <orderPageDetail :detailInfo="getDetailInfo"></orderPageDetail>
      </div>
    </DrawerMy>
    <el-button @click="goBack" type="primary" class="footerBtn">返回</el-button>
  </div>
</template>

<script>
import orderPageDetail from "./orderPageDetail.vue";
import { getClientHeight } from "@/libs/common.js";

export default {
  components: { orderPageDetail },
  name: "OrderPageList",
  data() {
    return {
      showDetail: false,
      getDetailId: "",
      getDetailList: [],
      detailInfoNum: 0,
      getDetailInfo:{}
    };
  },
  computed:{
    getMaxHeight() {
      return { height: getClientHeight() - 180 + "px" };
    }
  },
  activated() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.postAxios("carManagement/GetSonUserordersViewList", {
        pid: this.$route.params.id
      }).then(res => {
        if (res.success) {
          this.getDetailList = res.data;
          this.detailInfoNum = res.data.length;
          this.getDetailId = res.data[0].pid;
          for(let i=0;i<res.data.length;i++){
            if (res.data[i].types === 1) {
                this.getDetailList[i].typesName = "澳門包車";
            } else if (res.data[i].types === 2) {
                this.getDetailList[i].typesName  = "約車-港澳來往";
            } else if (res.data[i].types === 3) {
                this.getDetailList[i].typesName  = "接機";
            } else if (res.data[i].types === 4) {
                this.getDetailList[i].typesName  = "送機";
            } else if (res.data[i].types === 6) {
                this.getDetailList[i].typesName  = "約車-澳門本地";
            }else if (res.data[i].types === 5) {
                this.getDetailList[i].typesName  = "打包訂單";
            }
          }

        }
      });
    },
    getDetailInfoClick(sOrderId,typesName) {
    this.postAxios("carManagement/YhCarUserordersSonView", {
        sOrderId: sOrderId
        }).then(res => {
            if(res.success){
                this.getDetailInfo = res.data;
                this.getDetailInfo.typesName = typesName;
                this.showDetail = true;
            }
        })
    },
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.sysHeadInfo{
  color: #606266;
  font-size: 14px;
  label{
    margin: 0 10px;
  }
}
.footerBtn{
  position: absolute;
  bottom: 10px;
}
.headTitle {
  i {
    margin-right: 10px;
  }
  color: #3176c6;
  font-size: 18px;
}
.totleOrderNum {
  color: #909399;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
}
.cutLabel {
  margin: 0 10px;
  color: #909399;
}
.moneyContent {
  color: #ff7301;
}
.typesNameSpan {
  color: #3399fb;
  padding: 2px 10px;
  font-size: 12px;
  margin-left: 10px;
  border-radius: 6px;
  background: rgba(208, 230, 255, 0.6);
}
.orderListItem:hover {
  box-shadow: 5px 5px 10px #ddd;
}
.orderListItem {
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 14px;
  .itemOrderTitle {
    color: #3176c6;
    font-size: 16px;
    font-weight: 500;
  }
  .itemOrderTime {
    color: #909399;
    font-size: 14px;
  }
  .itemOrderInfo {
    color: #606266;
    font-size: 14px;
  }
  div {
    height: 30px;
    line-height: 30px;
  }
}
</style>