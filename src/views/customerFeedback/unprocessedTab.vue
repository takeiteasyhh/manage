<template>
  <div class="whiteBac">
    <div class="cardBox">
      <div class="searchBar">
        <el-form :inline="true">
          <el-form-item label="發佈時間" style="margin-right:20px;">
            <el-select
              v-model="unprocessed.releaseDate"
              @change="releaseDateFun"
              placeholder="請選擇"
              style="width:120px"
            >
              <el-option
                v-for="(item,index) in getPublishTimeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div id="feedbackDataTable">
        <el-table :data="feedbackDataTable" style="width: 100%"  :max-height="getMaxHeight" :height="getMaxHeight">
          <el-table-column prop="content" label="反饋摘要" width="280" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="反饋種類" width="100">
            <template slot-scope="scope">{{scope.row.type==="0"?"用戶反饋":"群舉報"}}</template>
          </el-table-column>
          <el-table-column prop="submitby" label="提交人" width="140"></el-table-column>
          <el-table-column prop="addtime" label="提交時間" width="160"></el-table-column>
          <el-table-column prop="mode" label="聯繫電話" width="160"></el-table-column>
          <el-table-column prop="submitPEmail" label="聯繫郵箱" width="180"></el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button @click="detailClick(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="paginationBottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="pageTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getClientHeight } from "@/libs/common.js";
import { mapGetters } from "vuex";
export default {
  name: "UnprocessedTab",
  data() {
    return {
      currentPage: 1,
      pageTotal: 0,
      pageSize: 20,
      feedbackDataTable: [],
      unprocessed: {
        releaseDate: ""
      },
    };
  },
  activated() {
    this.getUnprocessedList();
  },
  mounted() {},
  computed: {
    getMaxHeight() {
      return getClientHeight() - 250;
    },
    ...mapGetters(["getPublishTimeList","userLimitGet"])
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      if (val < this.pageTotal) {
        this.getUnprocessedList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUnprocessedList();
    },
    getUnprocessedList(time = "", type = "") {
      let json = { limit: this.pageSize, offset: this.currentPage, state: "0" };
      if (time) {
        json.releaseTime = time;
      }
      if (type) {
        json.type = type;
      }
      this.postAxios("webSysUser/problemFeedbackList", json).then(res => {
        if (res.success) {
          this.feedbackDataTable = res.data.YhUserAdvicetable;
          this.pageTotal = res.data.count;
        }
      });
    },
    detailClick(index, data) {
      this.$router.push({
        name: "unprocessedFeedBackDetail",
        params: { id: data.id,uid:data.uid,submitby:data.submitby }
      });
    },
    releaseDateFun(val) {
      this.unprocessed.releaseDate = val;
      this.getUnprocessedList(val);
    },
  }
};
</script>

<style lang='less' scoped>
/deep/.titleTable > div {
  cursor: pointer;
}
/deep/.titleTable > div:hover {
  text-decoration: underline;
}
</style>