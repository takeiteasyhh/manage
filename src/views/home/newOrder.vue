<template>
  <div class="whiteBac">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span><i class="icon iconfont icondingdan"></i>{{infoData.headerTitle}}</span>
        <el-button
          v-if="infoData.showMoreInfo"
          style="float: right; padding: 3px 0"
          type="text"
          @click="drawerClick"
        >
          {{infoData.headerButton}}
          <i class="el-icon-d-arrow-right"></i>
        </el-button>
        <el-button icon="el-icon-refresh"  @click="getOrderList"></el-button>
      </div>
      <div id="tableBox">
        <el-table :data="getOrderTotleList" :max-height="getMaxHeight" :height="getMaxHeight">
          <el-table-column
            v-for="itemInfo in tableColumns"
            :key="itemInfo.prop"
            :prop="itemInfo.prop"
            :label="itemInfo.label"
            :width="itemInfo.width"
          >
            <template slot-scope="scope">
              <div v-if="scope.column.property==='types'">
                <span v-if="scope.row.types===1">澳门包车</span>
                <span v-if="scope.row.types===2">约车-港澳来往</span>
                <span v-if="scope.row.types===3">接机</span>
                <span v-if="scope.row.types===4">送机</span>
                <span v-if="scope.row.types===5">打包订单</span>
                <span v-if="scope.row.types===6">约车-澳门本地</span>
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
              <el-button
                size="mini"
                @click="linkDetail(scope.$index, scope.row)"
                icon="el-icon-edit"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getClientHeight } from "@/libs/common.js";
import { mapGetters } from "vuex";
export default {
  name: "NewOrder",
  props: {
    infoData: {
      type: Object
    }
  },
  computed:{
    ...mapGetters(["getOrderTotleList"]),
    getMaxHeight() {
      return getClientHeight() - 420;
    }
  },
  data() {
    return {
      orderShow: "carRentalOrder",
      iconRefund: "el-icon-circle-check-outline",
      iconCancle: "el-icon-circle-close-outline",
      //表单头部
      tableColumns: [
        { prop: "orderId", label: "订单号", width: "180" },
        { prop: "types", label: "订单类型", width: "120" },
        { prop: "orderstatus", label: "订单状态", width: "120" },
        { prop: "contacts", label: "联系人", width: "160" },
        { prop: "tel", label: "联系电话", width: "180" },
        { prop: "price", label: "金額(MOP$)", width: "100" },
        { prop: "addtime", label: "下单时间", width: "160" }
      ],
      tableData: []
    };
  },
  mounted() {
    this.$store.dispatch("setOrderTotleList");
  },
  methods: {
    drawerClick() {
      this.$router.push({ path: "/carRentalOrder" });
    },
    getOrderList() {
      this.$store.dispatch("setOrderTotleList");
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
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.el-card__body {
  padding: 0;
}
div.el-card {
  border: none;
  height: 100%;
  overflow: auto;
}
</style>