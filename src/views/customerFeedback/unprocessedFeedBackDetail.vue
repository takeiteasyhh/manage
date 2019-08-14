<template>
  <div class="feedbackDetail whiteBac">
    <div class="feedbackDetailHead">
      <h3 class="feedbackDetailTitle">用戶反饋查看</h3>
      <div class="feedbackDetailSpan">
        <span>提交人：{{detailInfo.submitby}}</span>
        <span>提交時間：{{detailInfo.addtime}}</span>
        <span>聯繫電話：{{detailInfo.submitPhone}}</span>
        <span>聯繫郵箱：{{detailInfo.submitPEmail}}</span>
      </div>
    </div>
    <div class="feedbackDetailBox">{{detailInfo.content}}</div>
    <div id="btnSubmitBox">
      <el-button
        type="primary"
        @click="dealClick"
        class="submitBtn"
        v-if="userLimitGet.feedbackCheck.indexOf(2)>=0"
      >已處理</el-button>
      <el-button type="primary" plain @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "feedbackDetail",
  data() {
    return {
      isGroup: false,
      detailInfo: {}
    };
  },
  activated() {
    this.getDetailInfo();
  },
  computed: {
    ...mapGetters(["userLimitGet"])
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    dealClick() {
      this.postAxios("webSysUser/updateProblemFeedback", {
        id: this.$route.params.id,
        uid: this.$route.params.uid,
        submitby: this.$route.params.submitby
      }).then(res => {
        if (res.success) {
          this.$message({ message: "處理成功", type: "success" });
          this.$router.go(-1);
        }
      });
    },
    getDetailInfo() {
      this.postAxios("webSysUser/viewProblemFeedback", {
        id: this.$route.params.id,
        uid: this.$route.params.uid,
        submitby: this.$route.params.submitby
      }).then(res => {
        if (res.success) {
          this.detailInfo = res.data;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.footBtn{
  position: fixed;
  bottom: 10px;
}
.feedbackDetailTitle {
  color: #333;
}
.groupDetailBoxList span {
  margin-right: 20px;
}
.feedbackPersonList span {
  margin-right: 20px;
}
#btnSubmitBox {
  position: absolute;
  bottom: 20px;
  left: 40px;
}
.feedbackPerson {
  padding: 30px 40px;
  font-size: 14px;
  line-height: 30px;
  color: #909399;
  border-bottom: 1px solid #ddd;
}
.groupDetailBox {
  padding: 20px 40px;
  border-bottom: 1px solid #ddd;
  color: #606266;
  font-size: 14px;
  line-height: 30px;
}
.feedbackDetail {
  position: relative;
}
.feedbackDetailHead {
  padding: 10px 0 20px 40px;
  border-bottom: 1px solid #ddd;
}
.feedbackDetailSpan {
  color: #909399;
  font-size: 14px;
  margin-bottom: 18px;
  span {
    margin-right: 20px;
  }
}
.feedbackDetailBox {
  padding: 20px 40px;
  min-height: 400px;
}
</style>