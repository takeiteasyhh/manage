<template>
  <div class="orderDetail">
    <el-breadcrumb separator="/" class="breadcrumb" id="breadcrumb">
      <el-breadcrumb-item @click.native="goBack" class="goBackList">
        <i class="el-icon-arrow-left"></i>訂單列表
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{detailInfo.orderId}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="orderDetailInfoBox">
      <div class="orderTitle">
        <i class="el-icon-tickets"></i>
        訂單{{detailInfo.orderId}}
        <span class="typesNameSpan">{{detailInfo.orderstatuscopy}}</span>
      </div>
      <div class="orderTimeInfo">
        下單時間：{{detailInfo.addtime}}
        <span v-if="detailInfo.orderstatus===4">|</span>
        <span v-if="detailInfo.orderstatus===4">訂單完結時間：{{detailInfo.overtime}}</span>
      </div>
      <div class="orderDetailInfo">
        <el-row :gutter="10" style="margin-bottom:10px">
          <el-col :span="2" style="text-align:center">
            <div class="title-content">訂單詳情</div>
          </el-col>
          <el-col :span="22">
            <div class="info-content">
              <el-col :span="8">
                <div>
                  類型：{{typesName}}
                  <span v-if="detailInfo.sendTime">(含返程送機)</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  用車時間時間：{{detailInfo.useStartTime}}
                  <span v-if="detailInfo.types===1">至{{detailInfo.useEndTime}}</span>
                  <span class="infoSpan" v-if="detailInfo.types===1">{{detailInfo.useDateSum}}小時</span>
                </div>
              </el-col>
              <div class="clearBoth"></div>
              <el-col :span="8">
                <div>
                  狀態：
                  <i class="status">{{detailInfo.orderstatuscopy}}</i>
                </div>
              </el-col>
              <el-col :span="8" v-if="detailInfo.types===3">
                <div>
                  航班：{{detailInfo.flight}}
                  <span class="infoSpan">{{detailInfo.startAddress}}</span>
                </div>
              </el-col>
              <el-col
                :span="8"
                v-if="detailInfo.types===1||detailInfo.types===2||detailInfo.types===4||detailInfo.types===6"
              >
                <div>出發地：{{detailInfo.startAddress}}</div>
              </el-col>
              <div class="clearBoth"></div>
              <el-col :span="8">
                <div>
                  共計：
                  <b>MOP$&nbsp;{{detailInfo.price}}</b>線下付款
                </div>
              </el-col>
              <el-col :span="8">
                <div>目的地：{{detailInfo.endAddress}}</div>
              </el-col>
              <el-col :span="24">
                <div>备注：{{detailInfo.messages}}</div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          style="margin-bottom:10px"
          v-if="detailInfo.types===3&&detailInfo.sendTime"
        >
          <el-col :span="2" style="text-align:center">
            <div class="title-content">返程送機</div>
          </el-col>
          <el-col :span="22">
            <div class="info-content">
              <el-col :span="8">
                <div>
                  類型：{{typesName}}
                  <span v-if="detailInfo.sendTime">(含返程送機)</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div>用車時間時間：{{detailInfo.sendTime}}</div>
              </el-col>
              <div class="clearBoth"></div>
              <el-col :span="8">
                <div>出發地：{{detailInfo.sendStartAddress}}</div>
              </el-col>
              <el-col :span="8">
                <div>目的地：{{detailInfo.sendEndAddress}}</div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom:10px">
          <el-col :span="2" style="text-align:center">
            <div class="title-content">用戶信息</div>
          </el-col>
          <el-col :span="22">
            <div class="info-content">
              <el-col :span="8">
                <div>姓名：{{detailInfo.contacts}}</div>
              </el-col>
              <el-col :span="8">
                <div>出行人數：{{totalNum}}人（{{detailInfo.adultTravelSum}}個成人+{{detailInfo.childrenTravelSum}}個兒童）</div>
              </el-col>
              <div class="clearBoth"></div>
              <el-col :span="8">
                <div>聯繫電話：{{detailInfo.tel}}</div>
              </el-col>
              <el-col :span="8">
                <div>聯繫郵箱：{{detailInfo.mailbox}}</div>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          v-if="detailInfo.orderstatus===2||detailInfo.orderstatus===3||detailInfo.orderstatus===4||detailInfo.orderstatus===6||detailInfo.orderstatus===7"
        >
          <el-col :span="2" style="text-align:center">
            <div class="title-content">接單信息</div>
          </el-col>
          <el-col :span="22">
            <div class="info-content">
              <el-col :span="24">
                <div>接單司機：{{detailInfo.yhCarDriveruser.realname}}</div>
              </el-col>
              <el-col :span="24">
                <div>員工編號：{{detailInfo.yhCarDriveruser.name}}</div>
              </el-col>
              <el-col :span="24">
                <div>聯繫電話：{{detailInfo.yhCarDriveruser.phone}}</div>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="orderDetailInfoBox fineRecording" v-if="detailInfo.orderstatus===4&&detailInfo.yhCarFine&&detailInfo.yhCarFine.length>0">
      <el-row :gutter="10">
        <el-col :span="2" style="text-align:center">
          <div class="title-content">罰款記錄</div>
        </el-col>
        <el-col :span="22">
          <div class="info-content">
            <el-col :span="24" v-for="(item,index) in detailInfo.yhCarFine" :key="index">
              <div><span style="margin-right:20px">{{item.addtime}}</span>{{item.content}}</div>
              <div>罰款金額：MOP${{item.fineprice}}</div>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- <div class="orderDetailInfoBox"  v-if="detailInfo.orderstatus===4">
      <el-row :gutter="10">
        <el-col :span="2" style="text-align:center">
          <div class="title-content">用户评价</div>
        </el-col>
        <el-col :span="22">
          <div class="info-content">
            <el-col :span="24">
              <div>虽然师傅没有按时到达，迟到了30分钟，但是师傅态度很好，对地方路线很熟悉，还介绍了沿路的好玩的和好吃的的地方给我们，超级好吃，给五分评价</div>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </div>-->
    <el-dialog title="新建罰款記錄" :visible.sync="dialogVisible" width="50%" id="creatNewFineBox" top="30vh">
      <el-form :model="fineForm" ref="fineForm" label-width="90px"  :rules="fineFormRules">
        <el-form-item label="內容:" prop="content">
          <el-input type="textarea" v-model="fineForm.content" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="罰款金額:" prop="fineprice">
          <el-input v-model.number="fineForm.fineprice"><template slot="prepend">MOP$</template></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFine('fineForm')">確 定</el-button>
      </span>
    </el-dialog>
    <div class="footBtn"  v-if="detailInfo.orderstatus===4">
      <el-button type="primary" plain @click="creatNewFine">新建罰款記錄</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "OrderDetail",
  data() {
    return {
      typesName: "",
      detailInfo: {},
      dialogVisible: false,
      fineForm: {
        content: "",
        fineprice:"",
      },
      fineFormRules:{
         content: [
            { required: true, message: '請輸入罰款記錄內容', trigger: 'blur' },
          ],
          fineprice: [
            { required: true, message: '請輸入罰款金額', trigger: 'blur' },
            { type: 'number', message: '罰款金額為數字', trigger: 'blur' },
          ]
      }
    };
  },
  computed: {
    totalNum() {
      return (
        parseInt(this.detailInfo.adultTravelSum) +
        parseInt(this.detailInfo.childrenTravelSum)
      );
    },
    ...mapGetters(["userInfoGet"]),
  },
  activated() {
    this.getDetailInfo();
  },
  methods: {
    creatNewFine(){
      this.dialogVisible = true; 
    },
    getDetailInfo() {
      this.postAxios("carManagement/YhCarUserordersView", {
        orderId: this.$route.params.id
      }).then(res => {
        if (res.success) {
          this.detailInfo = res.data;
          if (res.data.types === 1) {
            this.typesName = "澳門包車";
          } else if (res.data.types === 2) {
            this.typesName = "約車-港澳來往";
          } else if (res.data.types === 3) {
            this.typesName = "接機";
          } else if (res.data.types === 4) {
            this.typesName = "送機";
          } else if (res.data.types === 6) {
            this.typesName = "約車-澳門本地";
          }
        }
      });
    },
    goBack() {
      this.$router.back(-1);
    },
    submitFine(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fineForm.orderId = this.detailInfo.orderId
          this.fineForm.did = this.detailInfo.yhCarDriveruser.did
          this.fineForm.handleby = this.userInfoGet.userId
          this.postAxios("webSysUser/updateCarFine",this.fineForm).then(res=>{
            if(res.success){
              this.$message({ message: "添加成功", type: "success" });
              this.dialogVisible = false; 
            }else{
              this.$message({ message: res.message, type: "warning" });
            }
          }).then(()=>{
            this.getDetailInfo();
          })
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.orderDetail {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.orderDetailInfo {
  padding: 10px 0px;
}
.typesNameSpan {
  color: #3399fb;
  padding: 2px 10px;
  font-size: 12px;
  margin-left: 10px;
  border-radius: 6px;
  background: rgba(208, 230, 255, 0.6);
}
#breadcrumb.breadcrumb {
  background: #fff;
  padding: 16px;
  margin-bottom: 10px;
  line-height: 20px;
}
.orderDetailInfo,
.orderDetailInfoBox {
  background: #fff;
}
.orderDetailInfoBox {
  margin: 10px 0px;
  padding: 10px 20px 10px 20px;
}
div.fineRecording {
  .info-content {
    color: #ff7301;
  }
  .title-content {
    color: #ff7301;
  }
}
.info-content i {
  font-style: normal;
}
.info-content {
  line-height: 26px;
  font-size: 0.8rem;
  color: #444;
  b {
    color: #ff7301;
    margin-right: 10px;
  }
  .status {
    color: #3399fb;
  }
}
.title-content {
  margin-top: 2px;
  font-weight: 600;
  color: #555;
}
.orderTimeInfo {
  color: #666;
  font-size: 0.6rem;
  padding: 10px 10px 20px 30px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  span {
    margin: 0 20px;
  }
}
.orderTitle {
  color: #3399fb;
  font-size: 1.2rem;
  margin-top: 10px;
  i {
    margin-right: 10px;
  }
}
.goBackList {
  cursor: pointer;
  i {
    border: 1px solid #ddd;
    border-radius: 50%;
    margin-right: 5px;
    padding: 2px;
  }
}
.infoSpan {
  margin-left: 10px;
}
.footBtn{
  position: absolute;
  bottom: 10px;
}
#creatNewFineBox{
  /deep/.el-dialog__title{
    color: #3176C6;
    font-size: 16px;
  }
  /deep/.el-dialog__header{
    border-bottom: 1px solid #ddd;
  }
  /deep/.el-dialog__footer{
    text-align: left;
  }
}
</style>