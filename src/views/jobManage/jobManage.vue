<template>
  <div class="allHeight">

    <el-tabs type="border-card" @tab-click="tabClick" v-model="tabClickName">
      <el-tab-pane label="在線" name="0">
        <el-scrollbar :style="getMaxHeight">
          <div class="manageItemBox">
            <div class="noDate" v-if="chargeDate">暫無數據</div>
            <manage-item v-for="(item,index) in userList" :key="item.id" :infoItem="item" :index="index"></manage-item>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="已下線" name="1">
        <el-scrollbar :style="getMaxHeight">
          <div class="manageItemBox">
            <div class="noDate" v-if="chargeDate">暫無數據</div>
            <manage-item v-for="(item,index) in userList" :key="item.id" :infoItem="item" :index="index"></manage-item>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ManageItem from "./manageItem.vue";
import detailInfo from "./detailInfo.vue";
import { getClientHeight } from "@/libs/common.js";
export default {
  components: { ManageItem, detailInfo },
  data() {
    return {
      currentPage: 1,
      pageTotal: 0,
      pageSize: 20,
      tabClickName:"0",
      chargeDate:false,
      //用户列表
      userList: [
      ]
    };
  },
  computed: {
    ...mapGetters(["userInfoGet", "getPublishTimeList"]),
    getMaxHeight() {
      return { height: getClientHeight() - 180 + "px" };
    }
  },
  activated() {
    this.tabClickName = "0";
    this.getMagageList(this.tabClickName);
  },
  methods: {
    tabClick(e) {
      this.getMagageList(e.name);
    },
    checkUserInfo(item, index) {
    },
    deleteList(index){
      this.userList.splice(index,1);
      this.userList.length===0?this.chargeDate = true:this.chargeDate = false
    },
    getMagageList(state) {
      let json = {};
      json.limit = this.pageSize;
      json.offset = this.currentPage;
      json.state = state;
      this.postAxios("webJob/viewJobList", json).then(
        res => {
          if (res.success) {
            this.pageTotal = res.data.count;
            this.userList = res.data.list;
            this.userList.length===0?this.chargeDate = true:this.chargeDate = false
          }
        }
      );
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      if (val < this.pageTotal) {
        this.getMagageList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMagageList();
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.manageItemBox{
  padding: 10px 30px;
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
.noDate{
  text-align: center;
  font-size: 24px;
  color: #666;
  padding-top: 20px;
}
.allHeight {
  background: #fff;
}
.paginationBottom {
  position: absolute;
  bottom: 10px;
}
</style>
