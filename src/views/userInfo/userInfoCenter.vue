<template>
  <div class="UserInfoCenter">
    <div class="headInfo">
      <div slot="drawer-header" class="detailInfoHead">
        <img :src="headImage" class="headerImage" />
        <P class="userName">{{userInfoGet.name}}</P>
        <p class="userInfo">
          客服编号：{{userInfoGet.userId}}
          <label>|</label>
          创建时间：{{userInfoGet.createTime}}
        </p>
        <div class="uploadImage">
          <el-upload
            :show-file-list="false"
            class="upload-demo"
            :action="myConfig.serverUrl"
            :limit="1"
            accept=".jpg,.jpeg,.png"
            :on-success="succeccUpload"
            list-type="picture"
            :on-exceed="exceedFun"
            :file-list="headImageList"
            :data="upLoadData"
          >
            <el-button size="small" type="primary">上传头像</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="grid-content userInfoDetail">
      <p class="user-title">个人信息</p>
      <el-form ref="userForm" :model="userForm" size="mini" :rules="userFormRules" label-width="100px;">
        <div class="userInfo">
          <el-col :span="6">
            <el-form-item label="姓名：" prop="name" class="infoLeft">
              <el-input v-model="userForm.name" :disabled="nameDisabled" style="width:220px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别："  class="infoLeft">
              <el-radio-group
                v-model="userForm.sex"
                size="medium"
                :disabled="sexDisabled"
                style="width:230px"
              >
                <el-radio label="M">男</el-radio>
                <el-radio label="W">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <div class="clearBoth"></div>
          <el-col :span="6">
            <el-form-item label="电话：" prop="phone">
              <el-input
                v-model.number="userForm.phone"
                :disabled="phoneDisabled"
                maxlength="11"
                minlength="6"
                style="width:220px"
              ></el-input>
              <el-button type="text" @click="modify('phoneDisabled')" style="margin-left:10px">修改</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="userForm.email" :disabled="emailDisabled" style="width:220px"></el-input>
              <el-button type="text" @click="modify('emailDisabled')" style="margin-left:10px">修改</el-button>
            </el-form-item>
          </el-col>

          <div class="clearBoth"></div>
          <el-button type="primary" @click="basisSubmitForm('userForm')">保存更改</el-button>
        </div>
      </el-form>
    </div>
    <div class="grid-content userInfoDetail">
      <el-form
        ref="passwordFormFrom"
        :model="passwordForm"
        size="mini"
        :rules="passwordRules"
        label-width="100px"
      >
        <div class="numberInfo">
          <p class="user-title">账号信息</p>
          <el-form-item label="账号：" prop=" ">
            <el-col :span="6">
              <el-input v-model="userInfoGet.account" :disabled="accountNumberDisabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-col :span="6">
              <el-input
                v-model="passwordForm.password"
                :disabled="passwordDisabled"
                :show-password="true"
              ></el-input>
            </el-col>
            <el-col class="line" :span="1">
              <el-button type="text" @click="modify('passwordDisabled')" style="margin-left:10px">修改</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码：" prop="passwordSure">
            <el-col :span="6">
              <el-input v-model="passwordForm.passwordSure" :show-password="true"></el-input>
            </el-col>
          </el-form-item>
        </div>
        <el-button type="primary" @click="passwordSubmitForm('passwordFormFrom')">保存更改</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import config from "@/config/config.js";
export default {
  name: "UserInfoCenter",
  data() {
    const man = require("@/assets/img/man.png");
    const woman = require("@/assets/img/woman.png");
    //输入密码验证
    let passwordValidate = (rule, value, callback) => {
      if (value !== "") {
        this.$refs.passwordFormFrom.validateField("passwordSure");
      }
      callback();
    };
    //再次输入密码得验证
    let passwordSureValidate = (rule, value, callback) => {
      if (value !== this.passwordForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      myConfig: {
        serverUrl: config.IMAGE_URL + "/YHuploaduheadportrait"
      },
      headImageList: [],
      manImg: man,
      womanImg: woman,
      userForm: {phone:"",email:""},
      passwordForm: {
        password: "",
        passwordSure: ""
      },
      nameDisabled: true,
      phoneDisabled: true,
      emailDisabled: true,
      sexDisabled: true,
      accountNumberDisabled: true,
      passwordDisabled: true,

      userFormRules: {
        phone: [
          { required: true, message: "输入电话号码", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确邮箱格式", trigger: "blur" }
        ]
      },
      passwordRules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: passwordValidate, trigger: "blur" }
        ],
        passwordSure: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: passwordSureValidate, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfoGet"]),
    upLoadData() {
      return { userId: this.userInfoGet.userId };
    },
    headImage() {
      let url = "";
      if (this.userInfoGet.avatar) {
        url = config.IMAGE_URL + this.userInfoGet.avatar;
      } else {
        url = this.userInfoGet.sex === "M" ? this.manImg : this.womanImg;
      }
      return url;
    }
  },
  activated() {
    this.setInfo()
  },
  methods: {
    setInfo(){
      this.userForm.phone = this.userInfoGet.phone;
      this.userForm.email = this.userInfoGet.email;
      this.userForm.name = this.userInfoGet.name;
      this.userForm.sex = this.userInfoGet.sex;
    },
    modify(type) {
      this[type] = false;
    },
    basisSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let json = {};
          json.email = this.userForm.email;
          json.phone = this.userForm.phone;
          json.userId = this.userInfoGet.userId;
          this.postAxios("webSysUser/updateSysUser", json).then(res => {
            if (res.success) {
              let j = this.userInfoGet;
              j.email = json.email;
              j.phone = json.phone;
              this.$store.dispatch("setUserInfo", j);
              this.$message({ message: "保存成功", type: "success" });
            }
          });
        } else {
          return false;
        }
      });
    },
    passwordSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let j = {};
          j.userId = this.userInfoGet.userId;
          j.oldPassWord = this.personalAccountForm.loginPassword;
          j.newPassWord = this.personalAccountForm.pass;
          this.postAxios("webSysUser/updatePassword", j).then(res => {
            if (res.success) {
              this.$message({ message: "修改成功", type: "success" });
              for (let key in this.personalAccountForm) {
                this.personalAccountForm[key] = "";
                this.isChangePassword = !this.isChangePassword;
              }
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    exceedFun(files, fileList) {
      this.$message({
        message: "只能添加一张图片",
        type: "warning"
      });
    },
    succeccUpload(response, file, fileList) {
      let _this = this;
      if (response.data.state === "SUCCESS") {
        let j = this.userInfoGet;
        j.avatar = response.data.url;
        this.$store.dispatch("setUserInfo", j);
        this.$message({ message: "头像上传成功", type: "success" });
      }
    }
  }
};
</script>

<style lang='less' scoped>
.infoLeft{
  margin-left: 10px;
}
/deep/.el-upload-list__item-actions {
  display: none;
}
/deep/.el-upload--picture-card {
  border: none;
  width: auto;
  height: auto;
  line-height: normal;
}
.uploadImage {
  display: inline-block;
  position: relative;
  top: -22px;
  left: 420px;
}
.userInfo {
  padding-bottom: 10px;
}
.numberInfo {
  padding-top: 10px;
}
p.user-title {
  font-size: 1rem;
  color: #3175c6;
  font-weight: 600;
  margin-bottom: 10px;
}
.userInfoShow {
  font-size: 0.6rem;
  color: #666;
}
.userInfoDetail {
  margin-bottom: 20px;
}
#headerImage {
  width: 40%;
  border-radius: 50%;
  margin: 30px 0 20px 0;
}
.UserInfoCenter {
  background: #f5f5f5;
  height: 100%;
  padding: 10px;
}
.grid-content {
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px;
}
.headInfo {
  background: #fff;
  padding: 16px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.detailInfoHead {
  .headerImage {
    width: 80px;
    height: 80px;
    float: left;
    margin: 4px 14px 0 10px;
    border-radius: 50%;
  }
  height: 90px;
  align-items: center;
  p {
    position: relative;

    label {
      margin: 0 10px;
    }
  }
  .userName {
    font-size: 18px;
    color: #303133;
    top: 20px;
  }
  .userInfo {
    font-size: 14px;
    color: #909399;
    top: 24px;
  }
}
</style>