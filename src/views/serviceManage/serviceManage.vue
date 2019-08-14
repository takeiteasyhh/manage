<template>
  <div class="allHeight">

    <el-tabs type="border-card" @tab-click="tabClick" v-model="tabClickName">
          <el-button
      type="primary"
      round
      class="addNewPerson"
      @click="dialogFormVisible = true"
      v-if="userInfoGet.roleId==='1'"
    >新建系統人員</el-button>
      <el-tab-pane label="管理员" name="1">
        <div id="selectList">
          <label class="searchLabel">創建時間：</label>
          <el-select v-model="searchOption.releaseTime" @change="selectChange" placeholder="請選擇">
            <el-option
              v-for="item in getPublishTimeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button icon="el-icon-refresh" circle class="clearBtn" @click="clearSearch"></el-button>
          <div class="headSearch">
            <el-input placeholder="請輸入手機號查找" v-model="searchOption.phone" class="headSearchInput">
              <i slot="append" class="el-icon-search" @click="selectChange"></i>
            </el-input>
          </div>
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
      </el-tab-pane>
      <el-tab-pane label="客服人员" name="16">
        <div id="selectList">
          <label class="searchLabel">創建時間：</label>
          <el-select v-model="searchOption.releaseTime" @change="selectChange" placeholder="請選擇">
            <el-option
              v-for="item in getPublishTimeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button icon="el-icon-refresh" circle class="clearBtn" @click="clearSearch"></el-button>
          <div class="headSearch">
            <el-input placeholder="請輸入手機號查找" v-model="searchOption.phone" class="headSearchInput">
              <i slot="append" class="el-icon-search" @click="selectChange"></i>
            </el-input>
          </div>
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
      </el-tab-pane>
    </el-tabs>


    <DrawerMy :width="60" :showMyDrawer.sync="showDetail">
      <div slot="drawer-header" class="sysHeadInfo">
        系統人員
        <label>/</label>
        {{getUserInfo.name}}詳細信息
      </div>
      <div slot="drawer-content">
        <serviceDetailInfo :getUserInfo="getUserInfo"></serviceDetailInfo>
      </div>
    </DrawerMy>
    <el-dialog title="新建管理員賬號" :visible.sync="dialogFormVisible" top="30vh">
      <el-form
        :model="creatServiceForm"
        :rules="creatDriverRules"
        ref="creatServiceFormRef"
        label-width="90px"
      >
        <el-col :span="6">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="creatServiceForm.name" placeholder="請輸入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性別：" prop="sex">
            <el-select v-model="creatServiceForm.sex" placeholder="請選擇性別" style="width:140px">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="W"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="電話" prop="phone">
            <el-input v-model.number="creatServiceForm.phone" placeholder="請輸入聯繫電話"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="郵箱" prop="email">
            <el-input v-model="creatServiceForm.email" placeholder="請輸入聯繫郵箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登錄賬號" prop="account">
            <el-input v-model="creatServiceForm.account" placeholder="請輸入登錄賬號"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色類型" prop="roleId">
            <el-select v-model="creatServiceForm.roleId" placeholder="請選擇角色類型" style="width:100%">
              <el-option label="超级管理員" value="1"></el-option>
              <el-option label="管理员" value="16"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所屬類型" prop="deptId">
            <el-input v-model="creatServiceForm.deptId" placeholder="請輸入所屬類型"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="clearBoth"></div>
      <div slot="footer" class="dialog-footer" style="text-align:left;">
        <el-button type="primary" @click="savaBtn('creatServiceFormRef')">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ManageItem from "./manageItem.vue";
import serviceDetailInfo from "./serviceDetailInfo.vue";
import { getClientHeight } from "@/libs/common.js";
export default {
  components: { ManageItem, serviceDetailInfo },
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
      dialogFormVisible: false,
      getUserInfo: {}, //获取点击的用户信息
      showDetail: false,
      i: -1, //当前点击得用户和列表下标（即index）相同的时候，给背景颜色
      active: { background: "rgba(212,232,253,0.6)" },
      creatDriverRules: {
        name: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "請選擇性別", trigger: "change" }],
        phone: [
          { required: true, message: "請輸入聯繫電話", trigger: "blur" },
          { type: "number", message: "請輸入正確聯繫電話" }
        ],
        deptId: [
          { required: true, message: "請輸入所屬類型", trigger: "blur" }
        ],
        roleId: [{ required: true, message: "請選擇角色", trigger: "blur" }],
        email: [
          { required: true, message: "請輸入聯繫郵箱", trigger: "blur" },
          {
            type: "email",
            message: "請輸入正確的郵箱地址",
            trigger: ["blur"]
          }
        ],
        account: [
          { required: true, message: "請輸入登錄賬號", trigger: "blur" },
          { validator: chargeName, trigger: "blur" }
        ]
      },
      creatServiceForm: {
        name: "",
        sex: "M",
        phone: "",
        email: "",
        account: "",
        roleId: "",
        deptId: ""
      },
      searchOption: {
        roleId: "",
        releaseTime: "",
        phone: ""
      },
      tabClickName:"1",
      //用户列表
      userList: []
    };
  },
  computed: {
    ...mapGetters(["userInfoGet", "getPublishTimeList"]),
    getMaxHeight() {
      return { height: getClientHeight() - 230 + "px" };
    }
  },
  activated() {
    this.searchOption.roleId = "1";
    this.searchOption.releaseTime = "";
    this.searchOption.phone = "";
    this.tabClickName = "1";
    this.getMagageList();
    let _this = this;
    document.onkeydown = function (event) {
      var e = event || window.event;
      if (e && e.keyCode == 13) { // enter 键
        _this.getMagageList()
      }
    };
  },
  deactivated(){
    document.onkeydown = null;
  },
  methods: {
    tabClick(e) {
      this.searchOption.roleId = e.name;
      this.searchOption.releaseTime = "";
      this.searchOption.phone = "";
      this.getMagageList();
    },
    selectChange() {
      this.getMagageList();
    },
    checkUserInfo(item, index) {
      this.showDetail = true;
      this.getUserInfo = item;
      this.i = index;
      this.postAxios("webSysUser/viewSysUser", { userId: item.userId }).then(
        res => {
          if (res.success) {
            this.getUserInfo = res.data;
          }
        }
      );
    },
    getMagageList() {
      let json = {};
      json.limit = 100;
      json.offset = 1;
      for (let key in this.searchOption) {
        if (this.searchOption[key]) {
          json[key] = this.searchOption[key];
        }
      }
      this.postAxios("webSysUser/viewSysUserList", json).then(res => {
        if (res.success) {
          this.userList = res.data.sysUserList;
          this.showDetail = false;
        }
      });
    },
    clearSearch(){
      this.searchOption.releaseTime = "";
      this.searchOption.phone = "";
      this.getMagageList()
    },
    savaBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [];
          arr.push(this.creatServiceForm);
          this.postAxios("webSysUser/register", arr).then(res => {
            if (res.code === "200") {
              this.getMagageList();
              this.$message({ message: "添加成功", type: "success" });
              this.dialogFormVisible = false;
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
    }
  }
};
</script>
<style lang="less" scoped src="../../assets/styles/manage.less">
</style>

<style lang="less" scoped>
/deep/.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
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
.searchLabel {
  color: #909399;
  font-size: 14px;
}
.sysHeadInfo {
  color: #606266;
  font-size: 14px;
  label {
    margin: 0 10px;
  }
}
.allHeight {
  background: #fff;
}
.addNewPerson {
    float: right;
    margin-top: 5px;
    top: 73px;
    right: 20px;
    position: fixed;
}
.headInfoManage {
  background: #e0e5ed;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 0px 20px;
  height: 42px;
  line-height: 42px;
  font-size: 14px;
}
</style>
