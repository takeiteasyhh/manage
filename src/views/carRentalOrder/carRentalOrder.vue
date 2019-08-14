<template>
  <div class="orderList">
    <div id="selectList">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="訂單類型：" style="width:230px">
            <el-select
              v-model="searchOptions.types"
              @change="selectChange"
              placeholder="請選擇"
              style="width:140px"
            >
              <el-option
                v-for="item in typsArr"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
        </el-form-item>
      
        <el-form-item label="訂單狀態："  style="width:230px">
          <el-select
            v-model="searchOptions.orderstatus"
            @change="selectChange"
            placeholder="請選擇"
            style="width:140px"
          >
            <el-option
              v-for="item in stateArr"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="下單時間：">
            <el-date-picker
              v-model="searchOptions.releaseTime"
              @change="selectChange"
              type="daterange"
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="結束日期">
            </el-date-picker>
        </el-form-item>
          <div class="headSearch">
            <el-input
              placeholder="請輸入訂單號查找"
              v-model="searchOptions.orderId"
              class="headSearchInput"
            >
              <i slot="append" class="el-icon-search" @click="selectChange"></i>
            </el-input>
          </div>
          <el-button icon="el-icon-refresh" @click="getOrderList">刷新</el-button>
          <a :href="getHref" id="exportBox" @click="getParams" class="el-button el-button--small el-button--primary"><i class="el-icon-download"></i>導出</a>
          <div style="clear:both;">
            
          </div>
          <div v-show="false">{{changeId}}</div>
      </el-form>
    </div>
    <el-table :data="tableData" :max-height="getMaxHeight" :height="getMaxHeight">
      <el-table-column
        v-for="itemInfo in tableColumns"
        :key="itemInfo.prop"
        :prop="itemInfo.prop"
        :label="itemInfo.label"
        :width="itemInfo.width"
      >
        <template slot-scope="scope">
          <div v-if="scope.column.property==='types'">
            <span v-if="scope.row.types===1">澳門包車</span>
            <span v-if="scope.row.types===2">約車-港澳來往</span>
            <span v-if="scope.row.types===3">接機</span>
            <span v-if="scope.row.types===4">送機</span>
            <span v-if="scope.row.types===5">打包訂單</span>
            <span v-if="scope.row.types===6">約車-澳門本地</span>
          </div>
          <div v-else-if="scope.column.property==='orderstatus'">
            <span v-if="scope.row.orderstatus===0">待付款</span>
            <span v-if="scope.row.orderstatus===1">等待接單</span>
            <span v-if="scope.row.orderstatus===2">司機已接</span>
            <span v-if="scope.row.orderstatus===3">乘客上車</span>
            <span v-if="scope.row.orderstatus===4">已完成</span>
            <span v-if="scope.row.orderstatus===5">取消</span>
            <span v-if="scope.row.orderstatus===6">已付款</span>
            <span v-if="scope.row.orderstatus===7">司機收款</span>
          </div>
          <span v-else>{{scope.row[itemInfo.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="auto">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteOrder(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          <el-button size="mini" @click="linkDetail(scope.$index, scope.row)" icon="el-icon-edit">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { getClientHeight,formatDate } from "@/libs/common.js";
import config from "@/config/config.js";
import { mapGetters } from "vuex";
import { format } from 'path';
export default {
  name: "waitOrderList",
  data() {
    return {
      currentPage: 1,
      pageTotal: 0,
      pageSize: 20,
      searchOptions: {
        types: "",
        orderstatus: "",
        releaseTime: "",
        orderId: ""
      },
      getHref:config.IMAGE_URL+"/getUser",
      //表单头部
      tableColumns: [
        { prop: "orderId", label: "訂單號", width: "180" },
        { prop: "types", label: "訂單類型", width: "120" },
        { prop: "orderstatus", label: "訂單狀態", width: "120" },
        { prop: "contacts", label: "聯繫人", width: "160" },
        { prop: "tel", label: "聯繫電話", width: "180" },
        { prop: "price", label: "金額(MOP$)", width: "160" },
        { prop: "addtime", label: "下單時間", width: "200" }
      ],
      typsArr: [
        {
          value: '',
          name: "全部"
        },
        {
          value: 1,
          name: "澳門包車"
        },
        {
          value: 2,
          name: "約車-港澳來往"
        },
        {
          value: 3,
          name: "接機"
        },
        {
          value: 4,
          name: "送機"
        },
        {
          value: 5,
          name: "打包訂單"
        },
        {
          value: 6,
          name: "約車-澳門本地"
        }
      ],
      stateArr: [
        {
          value: "",
          name: "全部"
        },
        {
          value: "0",
          name: "待付款"
        },
        {
          value: 1,
          name: "等待接單"
        },
        {
          value: 2,
          name: "司機已接"
        },
        {
          value: 3,
          name: "乘客上車"
        },
        {
          value: 4,
          name: "已完成"
        },
        {
          value: 5,
          name: "取消"
        },
        {
          value: 6,
          name: "已付款"
        },
        {
          value: 7,
          name: "司機收款"
        }
      ],
      //表单数据
      tableData: []
    };
  },
  activated() {
    this.getOrderList();
    this.getHref=config.IMAGE_URL+"/getUser";
  },
  computed: {
    ...mapGetters(["getPublishTimeList"]),
    getMaxHeight() {
      return getClientHeight() - 220;
    },
    changeId(){
      this.getOrderList()
      return this.$route.query.setId;
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      this.tableColumns = this.tableAllColumns[tab.index].tableColumn;
    },

    linkDetail(index, row) {
      if (row.types === 5 || row.types === "5") {
        this.$router.push({
          name: "carRentalOrderPageDetail",
          params: { id: row.orderId }
        });
      } else {
        this.$router.push({
          name: "carRentalOrderDetail",
          params: { id: row.orderId }
        });
      }
    },
    selectChange() {
      this.getOrderList();
    },
    getParams(){
      let paramsArr = [];
       for (let key in this.searchOptions) {
         if (this.searchOptions[key]) {
          if(key==="releaseTime"){
            paramsArr.push("begintime="+formatDate(this.searchOptions[key][0])+" 00:00");
            paramsArr.push("lasttime="+formatDate(this.searchOptions[key][1])+" 23:59");
          }else{
            paramsArr.push(key+"="+this.searchOptions[key]);
          }
        }
       }
       let paramsStr = ""
       if(paramsArr.length>0){
        paramsStr = paramsArr.join("&");
          this.getHref=config.IMAGE_URL+"/getUser?"+paramsStr
       }
    },
    deleteOrder(index, row){
      let _this = this;
       this.$confirm("確定刪除訂單？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        _this.postAxios("carManagement/DeleteSonUserorders",{orderId:row.orderId}).then(res=>{
          if(res.success){
            _this.$message({ message: "刪除成功", type: "success" });
            _this.getOrderList();
          }else{
            _this.$message({ message: res.message, type: "warning" });
          }
        })
      })
      .catch(() => {});
    },
    getOrderList() {
      let json = {};
      for (let key in this.searchOptions) {
        if (this.searchOptions[key]) {
          if(key==="releaseTime"){
            json.begintime = formatDate(this.searchOptions[key][0])
            json.lasttime = formatDate(this.searchOptions[key][1])
          }else{
            json[key] = this.searchOptions[key];
          }
        }
      }
      json.limit = this.pageSize;
      json.offset = this.currentPage;
      this.postAxios("carManagement/YhCarUserordersViewList", json).then(
        res => {
          if (res.success) {
            this.pageTotal = res.data.count;
            this.tableData = res.data.yhCarUserordersList;
          }
        }
      );
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      if (val < this.pageTotal) {
        this.getOrderList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList();
    }
  }
};
</script>
<style lang='less' scoped>
#exportBox{
  text-decoration: none;
}
#selectList {
  background: #fff;
  padding: 20px 10px 10px 10px;
  border-bottom: 1px solid #ddd;
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
.paginationBottom {
  position: absolute;
  bottom: 10px;
}
</style>