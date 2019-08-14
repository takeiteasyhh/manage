<template>
  <div class="costManagement">
    <div class="headTitle">
      <span class="leftHeadTitle">費用管理</span>
      <el-button type="primary" round size="mini" class="addcostManagementBtn" @click="addcostManagementBtnClick">添加費用管理</el-button>
    </div>
    <div class="costManagementList">
      <div class="costManagementListItem">
        <div class="costManagementListItemHead">
          約車【點到點接送】
        </div>
        <div class="costManagementListItemBox">
          <div class="costManagementListItemBoxItem" v-for="item in rentcarArr" :key="item.id">
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemDetailInfo">{{item.costtype}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-if="item.computationtype==='1'">HKD$/公里：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-else-if="item.computationtype==='2'">HKD$/單程：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-else-if="item.computationtype==='3'">HKD$/小時：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemBtnList">
              <el-button class="costManagementListItemBoxItemBtn" @click="costManagementEdite(item)">編輯</el-button>
              <el-button class="costManagementListItemBoxItemBtn" @click="costManagementDelete(item.id)">删除</el-button>
            </div>
          </div>
        </div>
      </div> <!-- costManagementListItemHead -->
      <div class="costManagementListItem">
        <div class="costManagementListItemHead">
          澳門包車
        </div>
        <div class="costManagementListItemBox">
          <div class="costManagementListItemBoxItem" v-for="item in charteredcarArr" :key="item.id">
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemDetailInfo">{{item.costtype}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-if="item.computationtype==='1'">HKD$/公里：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-else-if="item.computationtype==='2'">HKD$/單程：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-else-if="item.computationtype==='3'">HKD$/小時：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemBtnList">
              <el-button class="costManagementListItemBoxItemBtn" @click="costManagementEdite(item)">編輯</el-button>
              <el-button class="costManagementListItemBoxItemBtn" @click="costManagementDelete(item.id)">删除</el-button>
            </div>
          </div>
        </div>
      </div> <!-- costManagementListItemHead -->
      <div class="costManagementListItem">
        <div class="costManagementListItemHead">
          接送機
        </div>
        <div class="costManagementListItemBox">
          <div class="costManagementListItemBoxItem" v-for="item in transferArr" :key="item.id">
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemDetailInfo">{{item.costtype}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-if="item.computationtype==='1'">HKD$/公里：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-else-if="item.computationtype==='2'">HKD$/單程：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemMoneyInfo" v-else-if="item.computationtype==='3'">HKD$/小時：{{item.costmoney}}</div>
            <div class="costManagementListItemBoxItemDetail costManagementListItemBoxItemBtnList">
              <el-button class="costManagementListItemBoxItemBtn" @click="costManagementEdite(item)">編輯</el-button>
              <el-button class="costManagementListItemBoxItemBtn" @click="costManagementDelete(item.id)">删除</el-button>
            </div>
          </div>
        </div>
      </div> <!-- costManagementListItemHead -->
    </div>
    <el-dialog title="添加費用管理" :width="dialogFormVisibleWidth" :visible.sync="dialogFormVisible" top="30vh">
      <el-form
        :model="creatConstForm"
        :rules="creatConstFormRules"
        ref="creatConstFormFormRef"
        label-width="100px"
      >
        <el-form-item label="費用描述：" prop="costtype">
          <el-input v-model="creatConstForm.costtype" placeholder="請輸入費用描述,最多30個字" class="creatConstFormInput" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="費用價格：" prop="costmoney">
          <el-input placeholder="請輸入費用金額" v-model="creatConstForm.costmoney" class="creatConstFormInput">
            <template slot="prepend">HKD$</template>
          </el-input>
        </el-form-item>
        <el-form-item label="費用類型：" prop="type">
          <el-select v-model="creatConstForm.type" placeholder="請選擇" @change="typeChange">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="計算類型：" prop="computationtype">
          <el-select v-model="creatConstForm.computationtype" placeholder="請選擇">
            <el-option
              v-for="item in typeComputationtype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="計費時間：" prop="chargingtimetype" v-show="chargeType">
            <el-radio-group v-model="creatConstForm.chargingtimetype">
              <el-radio label="1">07：00-23：00</el-radio>
              <el-radio label="2">23：00-07：00</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="計費時間：" prop="usecartime" v-show="!chargeType">
            <el-radio-group v-model="creatConstForm.usecartime">
              <el-radio label="4">4小時</el-radio>
              <el-radio label="8">8小時</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="clearBoth"></div>
      <div slot="footer" class="dialog-footer" style="text-align:left;">
        <el-button type="primary" @click="savaBtn('creatConstFormFormRef')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'costManagement',
  data() { 
    return {
      dialogFormVisible:false,
      dialogFormVisibleWidth:"30%",
      charteredcarArr:[],
      isEdite:false,//判断是添加还是編輯
      rentcarArr:[],
      transferArr:[],
      chargeType:true,//判断费用类型，为约车或者接送机时是true
      getId : "",
      typeOptions:[
        {
          value: '6',
          label: '約車(點到點接送)'
        },
        {
          value: '1',
          label: '澳門包車'
        },
        {
          value: '34',
          label: '接送機'
        },
      ],
      typeComputationtype:[
        {
          value: '1',
          label: '按公里收費'
        },
        {
          value: '2',
          label: '固定收費'
        },
        {
          value: '3',
          label: '按小時收費'
        },
      ],
      creatConstForm:{
        costtype:"",
        costmoney:"",
        type:"6",
        computationtype:"1",
        chargingtimetype:"1",
        usecartime:"4",

      },
      creatConstFormRules:{
        costtype: [
          { required: true, message: "請輸入費用描述", trigger: "blur" },
        ],
        costmoney: [
          { required: true, message: "請輸入費用金額", trigger: "blur" },
        ],
      }
    }
  },
  activated(){
    this.getConstInfo()
  },
  methods:{
    typeChange(value){
      if(value==="6"||value==="34"){
        this.chargeType = true
      }else if(value==="1"){
        this.chargeType = false
      }
    },
    addcostManagementBtnClick(item){
      this.isEdite = false;
      this.dialogFormVisible = true;
      this.creatConstForm.costtype = "";
      this.creatConstForm.costmoney = null;
      this.creatConstForm.type = "6";
      this.creatConstForm.computationtype = "1";
      this.creatConstForm.chargingtimetype = "1";
      this.creatConstForm.usecartime = "4";
      this.typeChange(this.creatConstForm.type);
    },
    savaBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = this.isEdite?"carManagement/editYhArrangementChargingRules":"carManagement/insertYhArrangementChargingRules";
          let json = {}
          for(let key in this.creatConstForm){
            json[key] = this.creatConstForm[key];
          }
          if(this.isEdite){
            json.id = this.getId
          }
          if(json.type==="6"||json.type==="34"){
            delete json.usecartime
          }else if(json.type==="1"){
            delete json.chargingtimetype
          }
          this.postAxios(url, json).then(res => {
            if (res.code === "200") {
              this.$message({ message: this.isEdite?"修改成功":"添加成功", type: "success" });
              this.dialogFormVisible = false;
              this.getConstInfo();
            } else {
              this.$message({
                message: res.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    getConstInfo(){
      this.postAxios("carManagement/viewYhArrangementChargingRules",{}).then(res=>{
        if(res.success){
          this.charteredcarArr = res.data.charteredcar;
          this.rentcarArr = res.data.rentcar;
          this.transferArr = res.data.transfer;
        }
      })
    },
    costManagementEdite(item){
      this.dialogFormVisible = true;
      this.typeChange(item.type);
      this.isEdite = true;
      this.creatConstForm.costtype = item.costtype;
      this.creatConstForm.costmoney = item.costmoney;
      this.creatConstForm.type = item.type;
      this.creatConstForm.computationtype = item.computationtype;
      this.getId = item.id
    },
    costManagementDelete(itemId){
      this.$confirm("確定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.postAxios("carManagement/deleteYhArrangementChargingRules",{id:itemId}).then(res=>{
          if(res.success){
            this.$message({ message:"刪除成功", type: "success" });
            this.getConstInfo();
          }
        })
      })
      .catch(() => {});
    }
  }
 }
</script>

<style lang='less' scoped>
.creatConstFormInput{
  width: 60%;
  min-width: 240px;
}
/deep/.el-dialog{
  min-width: 400px;
}
.headTitle{
  background: #F5F7FA;
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  border: 1px solid #ddd;
  .leftHeadTitle{
    font-size: 16px;
    color: #303133;
  }
  .addcostManagementBtn{
    float: right;
    margin-top: 14px;
  }
}
.costManagementList{
  background: #fff;
  border:1px solid #ddd;
  border-top: none;
  padding: 20px;
  min-height: 600px;
}
.costManagementListItem{
  border: 1px solid #ddd;
  margin-top: 20px;
}
.costManagementListItemHead{
  color: #499DFC;
  background: #F5F7FA;
  height: 58px;
  line-height: 58px;
  padding: 0 20px;
}
.costManagementListItemBoxItem{
  padding: 0 20px;
  border-top: 1px solid #ddd;
}
.costManagementListItemBoxItemDetail{
  display: inline-block;
  color: #666666;
  font-size: 14px;
}
.costManagementListItemBoxItemDetailInfo{
  width: 40%;
}
.costManagementListItemBoxItemMoneyInfo{
  width: 20%;
}
.costManagementListItemBoxItemBtnList{
  width: 40%;
  text-align: right;
  height: 56px;
  line-height: 56px;
}
</style>