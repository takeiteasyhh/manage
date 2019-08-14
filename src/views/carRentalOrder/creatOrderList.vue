<template>
  <div class="whiteBac">
    <div class="orderContact">
      <h3 class="headerTitle">訂單聯繫人</h3>
      <el-form :inline="true" :model="contactInfo" ref="contactInfoRef" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="聯繫人"
              prop="contacts"
              :rules="[
                { required: true, message: '請輸入聯繫人', trigger: 'blur' },
              ]"
            >
              <el-input v-model="contactInfo.contacts" placeholder="請輸入姓名" style="width: 180px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col  :span="10">
            <label for="tel" class="el-form-item__label itemLabel">電話</label>
            <el-select v-model="codeValue" class="phoneCodeBox" @change="codeValueChange">
              <el-option label="+86" value="86"></el-option>
              <el-option label="+852" value="852"></el-option>
              <el-option label="+853" value="853"></el-option>
            </el-select>
            <el-form-item
              prop="tel"
              :rules="[
                { required: true, message: '請輸入聯繫電話', trigger: 'blur' },
                 {type: 'number', message: '請輸入正確聯繫電話'}
              ]"
            >
              <el-input v-model.number="contactInfo.tel" :maxlength="phoneMaxLength" placeholder="請輸入聯繫電話"></el-input>
            </el-form-item>
          </el-col>
          <div style="clear:both"></div>
          <el-col :span="8">
            <el-form-item
              label="郵箱"
              prop="mailbox"
              :rules="[
                { required: true, message: '請輸入聯繫郵箱', trigger: 'blur' },
                { type: 'email', message: '請輸入正確的郵箱地址', trigger: ['blur'] }
              ]"
            >
              <el-input v-model="contactInfo.mailbox" placeholder="請輸入聯繫郵箱" style="width: 180px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="出行人数">
              <el-input-number size="small" :min="1" v-model="contactInfo.adultTravelSum" :max="adultMax" @change="adultMaxChange"></el-input-number>
              <label class="sumClass">成人</label>
              <el-input-number size="small" :min="0" v-model="contactInfo.childrenTravelSum" :max="childrenMax" @change="childrenMaxChange"></el-input-number>
              <label class="sumClass">兒童</label>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-scrollbar :style="getMaxHeight">
      <el-form :model="creatOrder" label-width="130px" ref="creatOrderRef">
        <div class="orderList">
          <el-row
            v-for="(item,index) in creatOrder.creatOrderList"
            :key="index"
            class="orderListItem"
          >
            <h3 class="headerTitle">
              新建訂單-{{index+1}}
              <el-button
                @click="deleteItem(index)"
                v-if="isDelete"
                style="margin-left:20px;margin-left:30%"
                icon="el-icon-delete"
              >刪除訂單</el-button>
            </h3>
            <el-form-item label="類型：">
              <el-col :span="4">
                <el-select
                  v-model="item.types"
                  style="width: 100%;"
                  @change="typeChange(item,index)"
                >
                  <el-option label="澳門包車" value="1"></el-option>
                  <el-option label="約車-港澳來往" value="2"></el-option>
                  <el-option label="約車-澳門本地" value="6"></el-option>
                  <el-option label="接機" value="3"></el-option>
                  <el-option label="送機" value="4"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <div style="clear:both" v-if="item.types==='2'||item.types==='4'||item.types==='6'">
              <el-form-item
                label="用車時間 ："
                :prop="'creatOrderList.'+index+'.useStartTime'"
                :rules="[
                { required: true, message: '請選擇用車時間', trigger: 'blur' },
              ]"
              >
                <el-col :span="4">
                  <el-date-picker
                    style="width: 100%;"
                    type="datetime"
                    placeholder="選擇日期時間"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    v-model="item.useStartTime"
                    :picker-options="pickerDisableDate"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
            </div>
            <div style="clear:both" v-if="item.types==='1'">
              <el-col :span="4">
                <el-form-item label="用車日期：" style="min-width: 106px;">
                  <el-select
                    v-model="item.useDateSum"
                    class="useDateSum"
                    @change="getBackTime(item,index)"
                  >
                    <el-option label="用車4小時" value="4"></el-option>
                    <el-option label="用車8小時" value="8"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="chooseTimeBox">
                <el-col class="line" :span="11">
                  <el-form-item
                    :prop="'creatOrderList.'+index+'.useStartTime'"
                    :rules="[
                { required: true, message: '請選擇開始時間', trigger: 'blur' },
              ]"
                  >
                    <el-date-picker
                      @change="changeuseStartTime(item,index)"
                      v-model="item.useStartTime"
                      type="datetime"
                      placeholder="選擇日期時間"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      :picker-options="pickerDisableDate"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1" style="text-align:center">-</el-col>
                <el-col class="line" :span="11">
                  <el-form-item :prop="'creatOrderList.'+index+'.useEndTime'">
                    <el-date-picker
                      type="datetime"
                      placeholder="結束時間"
                      v-model="item.useEndTime"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      readonly
                      style="width: 100%;"
                      clear-icon
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
            </div>

            <div style="clear:both" v-if="item.types==='3'">
              <el-col :span="5">
                <el-form-item
                  label="航班號："
                  :prop="'creatOrderList.'+index+'.flight'"
                  :rules="[
                { required: true, message: '請輸入航班號', trigger: 'blur' },
              ]"
                >
                  <el-input v-model="item.flight" placeholder="請輸入航班號"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item
                  label="預計到達時間："
                  :prop="'creatOrderList.'+index+'.useStartTime'"
                  :rules="[
                { required: true, message: '請選擇預計到達時間：', trigger: 'blur' },
              ]"
                >
                  <el-date-picker
                    type="datetime"
                    placeholder="預計到達時間"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    v-model="item.useStartTime"
                    :picker-options="pickerDisableDate"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <div style="clear:both">
                <el-form-item label="機場：">{{aiportInfo.name}}</el-form-item>
              </div>
            </div>
            <div style="clear:both" v-if="item.types==='4'">
              <el-col :span="10">
                <el-form-item
                  label="機場："
                  :prop="'creatOrderList.'+index+'.endAddress'"
                  :rules="[
                  { required: true, message: '請輸入機場地點', trigger: 'blur' },
                ]"
                >
                  <el-input v-model="item.endAddress" placeholder="请输入机场地点"></el-input>
                </el-form-item>
              </el-col>
            </div>
            <div>
              <div
                style="clear:both"
                v-if="item.types==='1'||item.types==='2'||item.types==='4'||item.types==='6'"
              >
                <el-col :span="10">
                  <el-form-item
                    label="出發地："
                    :prop="'creatOrderList.'+index+'.startAddress'"
                    :rules="[
              { required: true, message: '請輸入出發地', trigger: 'blur' },
            ]"
                  >
                    <el-input v-model="item.startAddress" placeholder="請輸入出發地"></el-input>
                  </el-form-item>
                </el-col>
                <el-button
                  v-if="item.types==='2'"
                  type="primary"
                  icon="el-icon-sort"
                  circle
                  class="changePlaceBtn"
                  @click="changePlaceBtn(item,index)"
                ></el-button>
              </div>

              <div
                style="clear:both"
                v-if="item.types==='1'||item.types==='2'||item.types==='3'||item.types==='6'"
              >
                <el-col :span="10">
                  <el-form-item
                    label="目的地："
                    :prop="'creatOrderList.'+index+'.endAddress'"
                    :rules="[
                    { required: true, message: '請輸入目的地', trigger: 'blur' },
                  ]"
                  >
                    <el-input v-model="item.endAddress" placeholder="請輸入目的地"></el-input>
                  </el-form-item>
                </el-col>
              </div>
              <div style="clear:both"></div>
              <el-col :span="10">
                <div class="addBackAireportBtn" v-if="item.types==='3'&&!item.checkBackAirport">
                  <el-button @click="addBackAireport(item,index)">
                    <i class="el-icon-plus"></i>添加返程送機
                  </el-button>
                </div>
              </el-col>
              <div style="clear:both"></div>
              <el-col :span="10">
                <div class="addBackAireportBtn" v-if="item.checkBackAirport">
                  <el-button @click="addBackAireportClose(item,index)">
                    <i class="el-icon-minus"></i>取消返程送機
                  </el-button>
                </div>
              </el-col>
              <div style="clear:both"></div>
              <el-col :span="10">
                <div style="clear:both" v-if="item.checkBackAirport" class="addBackAireport">
                  <el-col :span="8">
                    <label class="addBackAireportLable">返程送機</label>
                  </el-col>
                  <div style="clear:both"></div>
                  <el-col :span="24">
                    <el-form-item
                      label="出發地："
                      :prop="'creatOrderList.'+index+'.sendStartAddress'"
                      :rules="[
                    { required: true, message: '請輸入出發地', trigger: 'blur' },
                  ]"
                    >
                      <el-input v-model="item.sendStartAddress" placeholder="請輸入出發地"></el-input>
                    </el-form-item>
                  </el-col>
                  <div style="clear:both"></div>
                  <el-col :span="24">
                    <el-form-item
                      label="用車時間："
                      :prop="'creatOrderList.'+index+'.sendTime'"
                      :rules="[
                { required: true, message: '請選擇用車時間', trigger: 'blur' },
              ]"
                    >
                      <el-col :span="12">
                        <el-date-picker
                          style="width: 100%;"
                          type="datetime"
                          placeholder="選擇日期時間"
                          value-format="yyyy-MM-dd HH:mm"
                          format="yyyy-MM-dd HH:mm"
                          v-model="item.sendTime"
                          :picker-options="pickerDisableDate"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="备注：" :prop="'creatOrderList.'+index+'.sendEndMessages'">
                      <el-input
                        type="textarea"
                        v-model="item.sendEndMessages"
                        placeholder="請輸入备注内容"
                        maxlength="300"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <div style="clear:both"></div>
                </div>
              </el-col>
            </div>
            <div style="clear:both">
              <el-col :span="6">
                <el-form-item
                  label="合計金額："
                  :prop="'creatOrderList.'+index+'.price'"
                  :rules="[
                    { required: true, message: '請輸入訂單金額', trigger: 'blur' },
                    {type: 'number', message: '請輸入正確金額'}
                  ]"
                >
                  <el-input v-model.number="item.price" placeholder="請輸入訂單金額">
                    <template slot="prepend">MOP$</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </div>

            <div style="clear:both">
              <el-col :span="10">
                <el-form-item label="备注：" :prop="'creatOrderList.'+index+'.messages'">
                  <el-input
                    type="textarea"
                    v-model="item.messages"
                    placeholder="請輸入备注内容"
                    maxlength="300"
                    :show-word-limit="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-row>
          <el-button @click="addNewAccount" icon="el-icon-plus">添加訂單</el-button>
        </div>
      </el-form>
    </el-scrollbar>
    <el-button
      @click="submitForm('creatOrderRef','contactInfoRef')"
      type="primary"
      class="submitBtn"
    >提交</el-button>
  </div>
</template>

<script>
import { getClientHeight, deepCopy,formatTime } from "@/libs/common.js";
export default {
  name: "creatOrderList",
  data() {
    return {
      adultMax:6,
      childrenMax:5,
      pickerDisableDate: {
        disabledDate(time) {
          return (
            time.getTime() < new Date(new Date().toLocaleDateString()).getTime()+48*60*60*1000
          );
        }
      },
      phoneMaxLength:11,
      codeValue:"86",
      aiportInfo: {
        name: "澳門機場"
      },
      contactInfo: {
        contacts: "",
        tel: "",
        mailbox: "",
        adultTravelSum: 1,
        childrenTravelSum: 0
      },
      creatOrderItem: {
        types: "1",
        useDateSum: "4",
        useStartTime: "",
        useEndTime: "",
        startAddress: "", //出发地
        endAddress: "", //目的地
        flight: "", //航班
        backFlightstartAddress: "", //返程送机出发地
        backFlightTime: "", //返程送机时间
        sendStartAddress: "",
        sendEndAddress: "",
        checkBackAirport: false, //添加返程送机，提交是删除
        price: "",
        sendTime: "",
        messages: ""
      },
      creatOrder: {
        creatOrderList: [
          {
            types: "1",
            useDateSum: "4",
            useStartTime: "",
            useEndTime: "",
            startAddress: "", //出发地
            endAddress: "", //目的地
            flight: "", //航班
            backFlightstartAddress: "", //返程送机出发地
            backFlightTime: "", //返程送机时间
            sendStartAddress: "",
            sendEndAddress: "",
            checkBackAirport: false, //添加返程送机，提交是删除
            price: "",
            sendTime: "",
            messages: ""
          }
        ]
      },
      minTime: {}
    };
  },
  computed: {
    getMaxHeight() {
      return { height: getClientHeight() - 290 + "px" };
    },
    isDelete() {
      return this.creatOrder.creatOrderList.length === 1 ? false : true;
    }
  },
  activated() {
    // for (let key in this.contactInfo) {
    //   this.contactInfo[key] = "";
    // }
    // this.creatOrder.creatOrderList = [];
    // this.creatOrder.creatOrderList.push(deepCopy(this.creatOrderItem));
  },
  methods: {
    codeValueChange(value){
      if(value==="86"){
        this.phoneMaxLength = 11;
      }else{
        this.phoneMaxLength = 8;
      }
    },
    changePlaceBtn(item, index) {
      if (!item.startAddress || !item.endAddress) {
        return false;
      }
      let startAddress = item.startAddress;
      this.creatOrder.creatOrderList[index].startAddress = item.endAddress;
      this.creatOrder.creatOrderList[index].endAddress = startAddress;
    },
    changeuseStartTime(item, index) {
      let getSetTime = item.useStartTime + ":00";
      let getTime = new Date(getSetTime).getTime();
      this.getBackTime(item, index);
    },
    adultMaxChange(){
      this.childrenMax = 6-this.contactInfo.adultTravelSum;
      if(this.contactInfo.childrenTravelSum>this.childrenMax){
        this.contactInfo.childrenTravelSum=this.childrenMax
      }
    },
    childrenMaxChange(){
      this.adultMax = 6-this.contactInfo.childrenTravelSum;
      if(this.contactInfo.adultTravelSum>this.adultMax){
        this.contactInfo.adultTravelSum=this.adultMax
      }
    },
    //根据选择得时间维度设置结束时间
    getBackTime(item, index) {
      if (item.useStartTime) {
        let getSetTime = item.useStartTime + ":00";
        let getTime = new Date(getSetTime).getTime();
        let getItemSecond = parseInt(item.useDateSum) * 60 * 60 * 1000;
        getItemSecond = getTime + getItemSecond;
        let getDateBack = new Date(getItemSecond);
        let dateYear = getDateBack.getFullYear() + "";
        let dateMonth = getDateBack.getMonth() + 1;
        let getDate = getDateBack.getDate() + "";
        this.creatOrder.creatOrderList[index].useEndTime =
          dateYear +
          "-" +
          dateMonth +
          "-" +
          getDate +
          " " +
          getDateBack.getHours() +
          ":" +
          getDateBack.getMinutes();
      } else {
        this.creatOrder.creatOrderList[index].useEndTime = "";
      }
    },
    addNewAccount() {
      let item = deepCopy(this.creatOrderItem);
      this.creatOrder.creatOrderList.push(item);
    },
    addBackAireport(item, index) {
      this.creatOrder.creatOrderList[index].checkBackAirport = true;
      this.creatOrder.creatOrderList[
        index
      ].sendEndAddress = this.aiportInfo.name;
    },
    addBackAireportClose(item, index) {
      this.creatOrder.creatOrderList[index].checkBackAirport = false;
      this.creatOrder.creatOrderList[index].endAddress = "";
      this.creatOrder.creatOrderList[index].startAddress = "";
      this.creatOrder.creatOrderList[index].sendEndAddress = "";
    },
    deleteItem(index) {
      this.creatOrder.creatOrderList.splice(index, 1);
    },
    typeChange(item, index) {
      this.creatOrder.creatOrderList[index].checkBackAirport = false;
      for (let key in this.creatOrderItem) {
        if (key !== "types") {
          if (key === "useDateSum") {
            item[key] = "4";
          } else if (key === "checkBackAirport") {
            item[key] = false;
          } else {
            item[key] = "";
          }
        }
      }
      if (item.types === "3") {
        item.startAddress = this.aiportInfo.name;
      }
    },
    submitForm(formName, formNameContact) {
      let formNameContactCharge = false;
      this.$refs[formNameContact].validate(valid => {
        if (valid) {
          formNameContactCharge = true;
        } else {
          return false;
        }
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formNameContactCharge) {
            this.creatOrder.creatOrderList.forEach(item => {
              item.mailbox = this.contactInfo.mailbox;
              item.tel = this.contactInfo.tel;
              item.contacts = this.contactInfo.contacts;
              item.adultTravelSum = this.contactInfo.adultTravelSum;
              item.childrenTravelSum = this.contactInfo.childrenTravelSum;
              item.useStartTime = new Date(item.useStartTime);
              item.useEndTime = new Date(item.useEndTime);
              item.backFlightTime = new Date(item.backFlightTime);
              item.sendTime = new Date(item.sendTime);
            });
            this.postAxios(
              "carManagement/AddYhCarUserorders",
              this.creatOrder.creatOrderList
            ).then(res => {
              if (res.success) {
                this.$message({ message: "創建訂單成功", type: "success" });
                this.$router.push({ path: "/carRentalOrder" });
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.phoneCodeBox{
  width: 60px;
  width: 76px;
  margin-right: 10px;
  top: -4px;
}
.orderList {
  padding-bottom: 10px;
}
.searchAirplan {
  margin-left: 20px;
}
.changePlaceBtn {
  position: relative;
  top: 26px;
  left: 20px;
}
.headerTitle {
  color: #3399fb;
}
.orderContact {
  border-bottom: 1px solid #ddd;
}
.chooseTimeBox {
  border: 1px solid #dcdfe6;
  border-left: none;
  border-radius: 0 4px 4px 0;
  margin-top: 1px;
  /deep/.el-form-item__content {
    margin-left: 20px !important;
  }
}
.backDiv {
  clear: both;
  position: absolute;
  height: 140px;
  top: 0;
  background: rgba(51, 153, 251, 0.1);
  border: 1px dashed #ddd;
}
.chooseTimeBox /deep/.el-input__inner {
  border: none;
  height: 26px;
  line-height: 26px;
}
.chooseTimeBox /deep/.line {
  height: 30px;
}
.useDateSum /deep/input.el-input__inner {
  border-radius: 4px 0 0 4px;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.itemLabel{
  position: relative;
  top: -4px;
  display: inline-block;
  width: 100px;
}
.itemLabel::before{
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
.addBackAireport {
  position: relative;
  padding: 10px 20px;
  background: rgba(51, 153, 251, 0.1);
  border: 1px dashed #ddd;
  .addBackAireportLable {
    color: #3399fb;
    margin-left: 24px;
    margin-bottom: 10px;
  }
}
.addBackAireportBtn {
  clear: both;
  .el-button {
    color: #3399fb;
    border: 1px dashed #ddd;
    padding: 14px 40px;
    width: 100%;
    i {
      padding: 2px;
      border: 1px solid #3399fb;
      border-radius: 4px;
      margin-right: 10px;
    }
  }
}
.closeCheckBackAirport {
  text-align: center;
}
.sumClass {
  font-size: 14px;
  color: #909399;
  margin: 0 10px;
}
.orderListItem {
  border-bottom: 1px dashed #ddd;
  margin-bottom: 10px;
}
.submitBtn {
  position: fixed;
  bottom: 10px;
}
.whiteBac {
  padding: 12px;
}
</style>