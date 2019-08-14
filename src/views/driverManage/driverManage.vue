<template>
  <div class="allHeight">
    <div id="selectList">
      <label class="selectTile">註冊時間：</label>
      <el-select v-model="searchOption.releaseTime" placeholder="請選擇" @change="selectChange">
        <el-option
          v-for="item in getPublishTimeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" round class="addNewDriver" @click="dialogFormVisible = true">新建司機用戶</el-button>
      <el-button icon="el-icon-refresh" circle class="clearBtn" @click="clearSearch"></el-button>
      <div class="headSearch">
        <el-input placeholder="請輸入手機號查找" v-model="searchOption.phone" class="headSearchInput">
          <i slot="append" class="el-icon-search" @click="selectChange"></i>
        </el-input>
      </div>
      <el-button type="primary" class="statistical" @click="statisticalClick">统计结算</el-button>
    </div>
    <el-scrollbar :style="getMaxHeight">
      <el-row :gutter="20" id="manageBox" style=" margin-left: 0px;margin-right: 0px;">
        <el-col
          :span="6"
          class="manageBoxItemHeight"
          v-for="(item,index) in userList"
          :key="item.id"
          @click.native="checkUserInfo(item,index)"
        >
          <manage-item :userData="item" :setStyle="index===i?active:''"></manage-item>
        </el-col>
      </el-row>
    </el-scrollbar>
    <div class="paginationBottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20,50,100]"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="pageTotal"
      ></el-pagination>
    </div>
    <DrawerMy :width="60" :showMyDrawer.sync="showDetail">
      <div slot="drawer-header" class="sysHeadInfo">
        系統人員
        <label>/</label>
        {{getUserInfo.name}}詳細信息
      </div>
      <div slot="drawer-content">
        <driverDetailInfo :getUserInfo="getUserInfo"></driverDetailInfo>
      </div>
    </DrawerMy>
    <el-dialog title="新建司機賬號" :visible.sync="dialogFormVisible">
      <el-form
        :model="creatDriverForm"
        :rules="creatDriverRules"
        ref="creatDriverForm"
        label-width="90px"
      >
        <el-col :span="6">
          <el-form-item label="姓名：" prop="realname">
            <el-input v-model="creatDriverForm.realname" placeholder="請輸入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="creatDriverForm.sex" placeholder="請選擇性別" style="width:140px">
              <el-option label="男" value="2"></el-option>
              <el-option label="女" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份證" prop="sfznumber">
            <el-input v-model="creatDriverForm.sfznumber" placeholder="請輸入身份證號" maxlength="18"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="聯繫電話" prop="phone">
            <el-input v-model.number="creatDriverForm.phone" placeholder="請輸入聯繫電話" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行駛證" prop="drivinglicense">
            <el-input v-model="creatDriverForm.drivinglicense" placeholder="請輸入行駛證號"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="聯繫郵箱" prop="email">
            <el-input v-model="creatDriverForm.email" placeholder="請輸入聯繫郵箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登錄賬號" prop="name">
            <el-input v-model="creatDriverForm.name" placeholder="請輸入登錄賬號"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="照片：">
            <div class="headImageBox" v-if="creatDriverForm.img">
              <img :src="showHeadImage">
            </div>
            <el-upload
              class="upload-demo"
              :action="myConfig.serverUrl"
              :limit="1"
              :on-success="succeccUpload"
              list-type="picture"
              :before-remove="removeUpload"
              :on-exceed="exceedFun"
              :file-list="headImageList"
            >
              <div class="upLoadImgBox">
                <el-button size="small" type="primary">上傳照片</el-button>
              </div>
              <div slot="tip" class="worningInfo">只能上傳jpg/png文件，且不超過5M</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savaBtn('creatDriverForm')">確定</el-button>
      </div>
    </el-dialog>
    <DrawerMy :width="60" :showMyDrawer.sync="showStatistical">
      <div slot="drawer-header">
        <el-date-picker
          v-model="yearMonthSearch"
          type="month"
          placeholder="選擇日期"
          style="width:160px"
          :clearable="false"
          @change="yearMonthSearchChange"
        ></el-date-picker>
        <span class="statisticalTitle">收入統計結算</span>
      </div>
      <div slot="drawer-content">
        <el-scrollbar :style="getMaxHeightDriverList">
          <div class="noDate" v-if="noDate">暂无数据</div>
          <div class="driverListItem" v-for="(item,index) in driverList" :key="index">
            <img :src="item.yhCarDriveruser.img?configImgUrl+item.yhCarDriveruser.img:'@/assets/img/man.jpg'" class="driverListItemImg">
            <span class="driverListItemName">{{item.yhCarDriveruser.name}}</span>
            <span class="driverListItemInOut">
              本月收入
              <span class="driverListItemMoney">MOP${{item.accumulatedIncome}}</span>
            </span>
            <span class="driverListItemInOut">
              本月支出
              <span
                class="driverListItemOutMoney"
              >MOP${{item.cumulativeExpenditure?item.cumulativeExpenditure:0}}</span>
            </span>
            <span class="driverListItemInOut">
              實際結算
              <span class="driverListItemMoney">MOP${{item.realIncome}}</span>
            </span>
            <el-button
              type="primary"
              class="statisticalItem"
              v-if="item.state==='0'"
              @click="statisticalItem(item,index)"
            >結算</el-button>
            <span class="havePayed" v-else>已結算</span>
          </div>
          <div class="clearBoth"></div>
        </el-scrollbar>
        <div class="driverListItemFooter">
          <el-button type="primary" @click="statisticalAll" v-if="showAllBtn">全部结算</el-button>
        </div>
      </div>
    </DrawerMy>
  </div>
</template>
<script>
import ManageItem from "./manageItem.vue";
import driverDetailInfo from "./driverDetailInfo.vue";
import { getClientHeight } from "@/libs/common.js";
import config from "@/config/config.js";
import { mapGetters } from "vuex";
export default {
  components: { ManageItem, driverDetailInfo },
  data() {
    let reg = /^[0-9a-zA-Z]+$/;
    let chargeName = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error("用户名只能包含数字或字母!"));
      } else {
        callback();
      }
    };
    return {
      noDate:false,
      configImgUrl:config.IMAGE_URL,
      driverList: [],
      yearMonthSearch: new Date(),
      showStatistical: false,
      myConfig: {
        serverUrl: config.IMAGE_URL + "/uploadFile"
      },
      showHeadImage: "",
      dialogFormVisible: false,
      currentPage: 1,
      pageTotal: 0,
      pageSize: 20,
      creatDriverForm: {
        realname: "",
        sex: "",
        sfznumber: "",
        phone: "",
        drivinglicense: "",
        email: "",
        name: "",
        img: ""
      },
      creatDriverRules: {
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        sfznumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { type: "number", message: "请输入正确联系电话" }
        ],
        drivinglicense: [
          { required: true, message: "请输入行驶证号", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入联系邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          { validator: chargeName, trigger: "blur" }
        ]
      },
      headImageList: [],
      getUserInfo: {}, //获取点击的用户信息
      driverInfo: {
        realname: ""
      },
      showDetail: false,
      i: -1, //当前点击得用户和列表下标（即index）相同的时候，给背景颜色
      active: { background: "rgba(212,232,253,0.6)" },
      searchOption: {
        releaseTime: "",
        phone: ""
      },
      //用户列表
      userList: []
    };
  },
  activated() {
    this.getDriverList();
    this.dialogFormVisible = false;
    this.getSettlementStatistics(new Date());
  },
  computed: {
    ...mapGetters(["getPublishTimeList"]),
    getMaxHeight() {
      return { height: getClientHeight() - 262 + "px" };
    },
    getMaxHeightDriverList() {
      return { height: getClientHeight() - 140 + "px" };
    },
    showAllBtn(){
      if(this.driverList.length===0){
        return false;
      }else{
        for(let i=0;i<this.driverList.length;i++){
          if(this.driverList[i].state==="1"){
          }
        }
        return true;
      }
    }
  },
  methods: {
    checkUserInfo(item, index) {
      this.postAxios("carDriverUser/ViewCarDriverUser", { did: item.did }).then(
        res => {
          if (res.success) {
            this.getUserInfo = res.data;
            this.showDetail = true;
            this.i = index;
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        }
      );
    },
    selectChange() {
      this.getDriverList();
    },
    exceedFun(files, fileList) {
      this.$message({
        message: "只能添加一张图片",
        type: "warning"
      });
    },
    succeccUpload(response, file, fileList) {
      if (response[0].state === "SUCCESS") {
        this.showHeadImage = config.IMAGE_URL + response[0].url;
        this.creatDriverForm.img = response[0].url;
      }
    },
    getDriverList() {
      let json = {};
      json.limit = this.pageSize;
      json.offset = this.currentPage;
      for (let key in this.searchOption) {
        if (this.searchOption[key]) {
          json[key] = this.searchOption[key];
        }
      }
      this.postAxios("carDriverUser/ViewCarDriverUserList", json).then(res => {
        if (res.success) this.userList = res.data;
        this.pageTotal = res.data.length;
      });
    },
    //统计结算
    getSettlementStatistics(date) {
      this.postAxios("carManagement/SettlementStatistics", {
        wageMonth: date
      }).then(res => {
        if (res.success) {
          this.driverList = res.data;
          this.noDate = false;
          if(this.driverList.length===0){
            this.noDate = true;
          }
        }else{
          this.noDate = true;
        }
      });
    },
    clearSearch(){
      this.searchOption.releaseTime = "";
      this.searchOption.phone = "";
      this.getDriverList()
    },
    removeUpload(file, fileLis) {
      this.creatDriverForm.img = "";
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      if (val < this.pageTotal) {
        this.getDriverList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDriverList();
    },
    savaBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.creatDriverForm.img) {
            this.$message({
              message: "请上传头像",
              type: "warning"
            });
          } else {
            this.postAxios(
              "carDriverUser/AddCarDriverUser",
              this.creatDriverForm
            ).then(res => {
              if (res.success) {
                this.getDriverList();
                this.$message({ message: "添加成功", type: "success" });
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  message: res.message,
                  type: "warning"
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    statisticalClick() {
      this.showStatistical = true;
    },
    statisticalItem(item, index) {
      this.$confirm("確定結算？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.postAxios("carManagement/Settlement", { id: item.id }).then(
            res => {
              if (res.success) {
                this.driverList[index].state = "1";
                this.$message({ message: "修改結算狀態成功", type: "success" });
              } else {
                this.$message({
                  message: res.message,
                  type: "warning"
                });
              }
            }
          );
        })
        .catch(() => {});
    },
    statisticalAll() {
      this.$confirm("確定結算？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.postAxios("carManagement/SettlementALL", { }).then(
            res => {
              if (res.success) {
                for(let i=0;i<this.driverList.length;i++){
                  this.driverList[i].state = "1";
                }
                this.$message({ message: "修改結算狀態成功", type: "success" });
              } else {
                this.$message({
                  message: res.message,
                  type: "warning"
                });
              }
            }
          );
        })
        .catch(() => {});
    },
    yearMonthSearchChange(value) {
      let getYear = value.getFullYear();
      let getMonth = value.getMonth() + 1;
      getMonth = getMonth > 10 ? getMonth : "0" + getMonth;
      this.yearMonthSearch = getYear + "-" + getMonth;
      this.getSettlementStatistics(new Date(this.yearMonthSearch));
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/styles/manage.less">
</style>
<style lang="less" scoped>
.noDate{
  text-align: center;
  color: #606266;
}
.havePayed {
  color: #909399;
  font-size: 14px;
  float: right;
}
.statistical {
  float: right;
  margin-right: 16px;
}
.sysHeadInfo {
  color: #606266;
  font-size: 14px;
  label {
    margin: 0 10px;
  }
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.selectTile {
  font-size: 14px;
  color: #909399;
}
.headSearch {
  float: right;
  margin-right: 20px;
  /deep/.el-input-group__append {
    padding: 0 10px;
    i {
      font-size: 24px;
      cursor: pointer;
    }
  }
}
.clearBtn{
  float: right;
  margin-right: 20px;
}
.addNewDriver {
  position: fixed;
  right: 20px;
  top: 78px;
}
div.headImageBox {
  width: 120px;
  height: 160px;
  float: left;
  margin-right: 30px;
  img {
    width: 100%;
  }
}
.dialog-footer {
  text-align: left;
}
label.worningInfo {
  margin-left: 20px;
}
.worningInfo {
  font-size: 14px;
  color: #c0c4cc;
}
.statisticalTitle {
  color: #3176c6;
  font-size: 16px;
  margin-left: 14px;
}
.driverListItem {
  height: 64px;
  line-height: 64px;
  padding-right: 20px;
  padding-left: 20px;
  text-indent: 18px;
  border-bottom: 1px solid #ddd;
  .statisticalItem {
    margin-top: 16px;
    float: right;
  }
}
.driverListItemImg {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  float: left;
  margin-top: 5px;
}
.driverListItemInOut {
  font-size: 16px;
  color: #606266;
  margin-left: 30px;
  .driverListItemMoney {
    color: #ec6311;
    margin-left: 8px;
  }
  .driverListItemOutMoney {
    color: #f4b58f;
    margin-left: 8px;
  }
}
.driverListItemFooter {
  height: 46px;
  line-height: 46px;
  padding-left: 30px;
  border-top: 1px solid #ddd;
}
</style>

