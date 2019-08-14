<template>
  <div class="jobPublish">
    <el-scrollbar :style="getMaxHeight">
    <el-form :model="publishForm" :rules="publishRules" ref="publishForm" label-width="100px">
      <el-form-item label="發布字體：" class="publishFormItem">
        <el-radio-group v-model="publishForm.languagetypes">
          <el-radio label="tn" border size="medium">繁體</el-radio>
          <el-radio label="cn" border size="medium">簡體</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="職位名稱：" prop="jobName" class="publishFormItem">
        <el-input v-model="publishForm.jobName"></el-input>
      </el-form-item>
      <el-form-item label="職位描述：" prop="jobDescription" class="publishFormItem">
        <vue-ueditor-wrap :config="myConfig" @ready="ready"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item label="職位誘惑：" prop="jobHighlights" class="publishFormItem">
        <el-input v-model="publishForm.jobHighlights"></el-input>
      </el-form-item>
      <el-form-item label="工作性質：" class="publishFormItem" prop="jobNature">
        <el-radio-group v-model="publishForm.jobNature">
          <el-radio label="全職" border size="medium"></el-radio>
          <el-radio label="兼職" border size="medium"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工作經驗：" prop="jobExperience" class="publishFormItem">
        <el-select v-model="publishForm.jobExperience" placeholder="請選擇">
          <el-option
            v-for="item in jobExperienceArr"
            :key="item.key"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="學歷要求：" prop="jobEducationalRequirements" class="publishFormItem">
        <el-select v-model="publishForm.jobEducationalRequirements" placeholder="請選擇">
          <el-option
            v-for="item in jobEducationalRequirementsArr"
            :key="item.key"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月薪範圍：" class="publishFormItem" >
        <i class="publishFormStar">*</i>
        <el-col :span="6" style="width:216px">
          <el-form-item  prop="jobMinWages" style="margin-bottom:0">
           <el-input  v-model.number="publishForm.jobMinWages" style="width: 100%;"><label slot="suffix" class="publishFormItemLabel">元</label></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="width: 14px;margin-left: 10px;">-</el-col>
        <el-col :span="6" style="width:216px">
          <el-form-item  prop="jobMaxWages" style="margin-bottom:0">
            <el-input  v-model.number="publishForm.jobMaxWages" style="width: 100%;"><label slot="suffix" class="publishFormItemLabel">元</label></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="工作地址：" class="publishFormItem publishFormStarItem">
        <i class="publishFormStar">*</i>
        <el-col :span="6">
          <el-form-item  prop="jobProvinces" style="margin-bottom:0">
            <el-cascader
              separator = " "
              v-model="publishForm.jobProvinces"
              :options="jobProvincesOptions"
              @change="jobProvincesChange"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="width: 14px;">-</el-col>
        <el-col :span="11">
          <el-form-item  prop="jobDetailedAddress" style="margin-bottom:0">
            <el-input  v-model="publishForm.jobDetailedAddress" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="publish('publishForm')">發布職位</el-button>
    </el-scrollbar>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import { getClientHeight } from "@/libs/common.js";
import city from "@/libs/city"
export default {
  components: { VueUeditorWrap },
  name: "jobPublish",
  data() {
    return {
      jobProvincesOptions:city.city,
      getId:null,
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        initialFrameHeight: 300,
        // 初始容器宽度
        initialFrameWidth:"100%",
        // UEditor 资源文件的存放路径
        UEDITOR_HOME_URL: process.env.BASE_URL + "uEditor/"
      },
      jobExperienceArr: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "1-3年",
          key: "2"
        },
        {
          value: "3-5年",
          key: "3"
        },
        {
          value: "5-10年",
          key: "4"
        }
      ],
      jobEducationalRequirementsArr: [
        {
          value: "不限",
          key: "1"
        },
        {
          value: "高中",
          key: "2"
        },
        {
          value: "专科",
          key: "3"
        },
        {
          value: "本科",
          key: "4"
        },
        {
          value: "硕士",
          key: "5"
        },
        {
          value: "博士",
          key: "6"
        }
      ],
      publishForm: {
        jobName: "",
        jobDescription: "",
        jobHighlights: "",
        jobNature: "全職",
        jobExperience: "不限",
        jobEducationalRequirements: "不限",
        jobMinWages:"",
        jobMaxWages:"",
        jobProvinces:[],
        jobDetailedAddress:"",
        languagetypes:"tn"
      },
      publishRules: {
        jobName: [
          { required: true, message: '請輸入職位名稱', trigger: 'blur' },
        ],
        jobDescription: [
          { required: true, message: ' ', trigger: 'blur' },
        ],
        jobHighlights: [
          { required: true, message: '請輸入職位特色', trigger: 'blur' },
        ],
        jobNature: [
          { required: true, message: '請選擇工作性質', trigger: 'blur' },
        ],
        jobExperience: [
          { required: true, message: '請選擇工作經驗要求', trigger: 'blur' },
        ],
        jobEducationalRequirements: [
          { required: true, message: '請選擇學歷要求', trigger: 'blur' },
        ],
        jobMinWages: [
          { required: true, message: '請輸入月薪範圍', trigger: 'blur' },
        ],
        jobMaxWages: [
          { required: true, message: '請輸入月薪範圍', trigger: 'blur' },
        ],
        jobProvinces: [
          { required: true, message: '請輸入工作地點', trigger: 'blur' },
        ],
        jobDetailedAddress:[
          { required: true, message: '請輸入工作地點', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {
    getMaxHeight() {
      return { height: getClientHeight() - 150 + "px" };
    },
  },
  activated(){
    for(let key in this.publishForm){
      if(key==="jobNature"){
        this.publishForm[key] = "全職"
      }else if(key==="jobExperience"||key==="jobEducationalRequirements"){
        this.publishForm[key] = "不限"
      }else if(key==="jobProvinces"){
        this.publishForm[key] = []
      }else if(key==="languagetypes"){
        this.publishForm[key] = "tn";
      }else{
        this.publishForm[key] = "";
      }
    }
  },
  methods: {
    jobProvincesChange(value){

    },
    ready(editorInstance) {
      this.getId = editorInstance.key;
    },
    publish(formName){
      this.$refs[formName].validate(valid => {
        let content = UE.getEditor(this.getId).getContent();
        if (content.length === 0) {
          this.$message({
            message: "請添加文本內容",
            type: "warning"
          });
          return;
        }
        let json = {};
        for(let key in this.publishForm){
          json[key] = this.publishForm[key];
        }
        if(json.languagetypes==="tn"){
          json.jobNature = json.jobNature=="全職"?"全職":"兼職"
        }else{
          json.jobNature = json.jobNature=="全職"?"全职":"兼职"
        }
        json.jobProvinces = this.publishForm.jobProvinces.join(" ");
        json.jobDescription = content;
        this.postAxios("webJob/insertJobOfflineRelease",json).then(res=>{
          if(res.success){
            this.$message({
              message: "職位發布成功",
              type: "success"
            });
            this.$router.push({ path: "/jobManage" });
          }else{
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        })
      })
    }
  },
};
</script>

<style lang='less' scoped>
.jobPublish {
  background: #fff;
  padding: 16px 0 16px 30px;
  .jobPublishHead {
    color: #000;
    font-size: 18px;
    font-weight: 500;
  }
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.edui-default .edui-toolbar{
  line-height: 20px !important;
  height: 26px  !important;
}
.publishFormStar{
  position: absolute;
  left: -93px;
  color: #F56C6C;
  font-style: normal;
}
.publishFormItem{
  position: relative;
  width: 60%;
}
</style>