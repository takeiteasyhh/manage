<template>
  <div class="whiteBac">
    <div class="cardBox">
      <div class="searchBar">
        <el-form :inline="true">
          <el-form-item label="發佈時間" style="margin-right:20px;">
            <el-select v-model="unprocessed.releaseDate" placeholder="请选择" style="width:120px">
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
          <el-table-column  label="反饋種類" width="100">
            <template slot-scope="scope">
              {{scope.row.type==="0"?"用戶反饋":"群舉報"}}
            </template>
          </el-table-column>
          <el-table-column prop="submitby" label="提交人" width="140"></el-table-column>
          <el-table-column prop="addtime" label="提交時間" width="160"></el-table-column>
          <el-table-column prop="mode" label="聯繫電話" width="160"></el-table-column>
          <el-table-column prop="submitPEmail" label="聯繫郵箱" width="180"></el-table-column>
          <el-table-column prop="handleby" label="處理人" width="120"></el-table-column>
          <el-table-column prop="handleCompany" label="所屬公司" width="140"></el-table-column>
          <el-table-column prop="handletime" label="處理時間" width="160"></el-table-column>
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
import {mapGetters} from "vuex"
export default {
  name: "UnprocessedTab",
  data() {
    return {
      currentPage: 1,
      pageTotal:0,
      pageSize:20,
      feedbackDataTable: [
        {
        }
      ],
      unprocessed: {
        releaseDate: ""
      },
    };
  },
  activated(){
    this.getProcessedList()
  },
  mounted(){
    },
  computed: {
    getMaxHeight() {
      return getClientHeight() - 250;
    },
    ...mapGetters(["getPublishTimeList"])
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      if(val<this.pageTotal){
        this.getProcessedList() ;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProcessedList();
    },
    detailClick(index, data) {
      this.$router.push({ name: "processedFeedBackDetail", params: { id: data.id,uid:data.uid,submitby:data.submitby } });
    },
    getProcessedList() {
      this.postAxios("webSysUser/problemFeedbackList", { limit: this.pageSize, offset: this.currentPage,state:"1"}).then(
        res => {
          if (res.success) {
            this.feedbackDataTable = res.data.YhUserAdvicetable;
            this.pageTotal = res.data.count;
          }
        }
      );
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