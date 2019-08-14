<template>
  <div class="whiteBac">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span><i class="icon iconfont iconshujutongji"></i>{{infoData.headerTitle}}</span>
        <el-button
          v-if="infoData.showMoreInfo"
          style="float: right; padding: 3px 0"
          type="text"
          @click="drawerClick"
        >
          {{infoData.headerButton}}
          <i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
      <circle-div :background="background" :cirleData="cirleData"></circle-div>
      <div class="statisticsInfo">
        <p class="statisticsInfoTitle">{{infoData.statisticsInfoTitle}}</p>
        <el-row>
          <el-col
            :span="8"
            class="statisticsInfoDtail"
            v-for="(item,index) in infoData.statistiscsData"
            :key="index"
            :style="item.colorStyle"
          >
            <p class="detailTitle">{{item.detailTitle}}</p>
            <p class="detailNumber">{{item.detailNumber}}</p>
          </el-col>
        </el-row>
        <p class="detailInfo" v-if="infoData.detailInfo" :style="infoData.detailInfoColor">
          <i class="little-point" :style="infoData.pointColor"></i>
          訂單總體增長{{infoData.detailNumber}}%
        </p>
      </div>
    </el-card>
    <DrawerMy :width="50" :showMyDrawer.sync="showDetail" :drawerData="infoData">
      <div slot="drawer-header">{{infoData.headerTitle}}</div>
      <div slot="drawer-content">
        <div class="statisticsBox">
          <div class="statisticsSearchBox">
            <el-date-picker
              v-model="yearMonthSearch"
              type="month"
              placeholder="選擇日期"
              style="width:160px"
              :clearable="false"
              @change="yearMonthSearchChange"
            ></el-date-picker>
          </div>
          <el-row>
            <el-col
              :span="4"
              class="statisticsInfoDtail"
              v-for="(item,index) in yearMonthSearchData.dataList"
              :key="index"
              :style="item.colorStyle"
            >
              <p class="detailTitle">{{item.detailTitle}}</p>
              <p class="detailNumber">{{item.detailNumber}}</p>
            </el-col>
          </el-row>
          <p class="detailInfo" style="color:#7E67f5;font-size:12px">
            <i class="little-point" style="background:#7E67f5;"></i>
            訂單總體增長{{yearMonthSearchData.growthRate}}%
          </p>
          <div class="clearBoth"></div>
        </div>
        <div class="statisticsBox statisticsBoxBottom">
          <div class="statisticsSearchBox">
            <el-date-picker
              v-model="yearSearch"
              type="year"
              placeholder="選擇日期"
              style="width:160px"
              :clearable="false"
              @change="yearSearchChange"
            ></el-date-picker>
          </div>
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr class="headTable">
              <th>月份</th>
              <th>全部訂單</th>
              <th>已完成</th>
              <th>取消/退款</th>
            </tr>
            <tr class="bodyTable" v-for="(item,index) in MonthNoMapData" :key="index">
              <td>{{item.monthNo}}月</td>
              <td class="tableNumber">{{item.commonNum}}</td>
              <td class="centerNum tableNumber">{{item.completed}}</td>
              <td class="tableNumber">{{item.cancelled}}</td>
            </tr>
          </table>
        </div>
      </div>
    </DrawerMy>
  </div>
</template>
<script>
import circleDiv from "./circle.vue";
export default {
  components: { circleDiv },
  name: "HomeStatistics",
  props: {
    infoData: {
      type: Object
    },
    background: {
      type: Object
    }
  },
  computed: {
    cirleData() {
      return {
        num: this.infoData.circleNumber,
        circleTitle: this.infoData.circleTitle
      };
    }
  },
  mounted() {
    this.getTodayDate();
    this.getStatisticsDetail();
  },
  data() {
    return {
      showDetail: false,
      yearMonthSearch: "",
      yearSearch: "",
      MonthNoMapData: [],
      yearMonthSearchData: {
        dataList: [
          {
            detailTitle: "全部訂單",
            detailNumber: 0,
            colorStyle: { color: "#3674bc" }
          },
          {
            detailTitle: "進行中",
            detailNumber: 0,
            colorStyle: { color: "#3674bc" }
          },
          {
            detailTitle: "已完成",
            detailNumber: 0,
            colorStyle: { color: "#5aae59" }
          },
          {
            detailTitle: "取消/退款",
            detailNumber: 0,
            colorStyle: { color: "#f87412" }
          }
        ]
      },
      growthRate: 0
    };
  },
  methods: {
    drawerClick() {
      this.showDetail = true;
    },
    getTodayDate() {
      let getDate = new Date();
      let getYear = getDate.getFullYear();
      let getMonth = getDate.getMonth() + 1;
      getMonth = getMonth > 10 ? getMonth : "0" + getMonth;
      this.yearMonthSearch = getYear + "-" + getMonth;
      this.yearSearch = getYear + "";
    },
    getStatisticsDetail() {
      this.postAxios("carManagement/monthlyStatistics", {
        myYear: this.yearSearch,
        date: this.yearMonthSearch
      }).then(res => {
        if (res.success) {
          this.yearMonthSearchData.dataList[0].detailNumber =
            res.data.monthly.count;
          this.yearMonthSearchData.dataList[1].detailNumber =
            res.data.monthly.count0;
          this.yearMonthSearchData.dataList[2].detailNumber =
            res.data.monthly.count1;
          this.yearMonthSearchData.dataList[3].detailNumber =
            res.data.monthly.count2;
          this.yearMonthSearchData.growthRate = res.data.monthly.growthRate.toFixed(2);
          this.MonthNoMapData = res.data.MonthNoMap;
        }
      });
    },
    yearMonthSearchChange(value) {
      let getYear = value.getFullYear();
      let getMonth = value.getMonth() + 1;
      getMonth = getMonth > 10 ? getMonth : "0" + getMonth;
      this.yearMonthSearch = getYear + "-" + getMonth;
      this.getStatisticsDetail();
    },
    yearSearchChange(value) {
      let getYear = value.getFullYear();
      this.yearSearch = getYear + "";
      this.getStatisticsDetail();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.el-card__body{
  min-height: 170px;
}
.tableNumber {
  font-size: 16px;
  color: #3176c6;
}
.centerNum {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.bodyTable {
  background: #fff;
  height: 36px;
  text-align: center;
  font-size: 14px;
  color: #333;
  border-bottom: 4px solid #f1f5fa;
}
.headTable {
  background: #e2e6eb;
  font-size: 12px;
  color: #a4a4a4;
  height: 30px;
}
.statisticsBox {
  padding: 20px;
  background: #f1f5fa;
}
.statisticsSearchBox {
  margin-bottom: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
.statisticsBoxBottom {
  margin-top: 20px;
}
.el-icon-d-arrow-right {
  margin-left: 4px;
}
.el-card {
  border: none;
}
/deep/.el-card__body {
  padding: 0 0 0 4%;
}
.statisticsInfo {
  padding-left: 9.2rem;
  padding-top: 2.2rem;
  .statisticsInfoTitle {
    color: #3175c6;
    font-size: 15px;
    font-weight: 600;
    padding-bottom: 1em;
  }
  .detailTitle {
    font-size: 12px;
    margin-block-end: 0em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detailNumber {
    font-size: 1.6rem;
    font-weight: 600;
  }
  .detailInfo {
    padding-top: 4%;
    font-size: 0.8rem;
  }
}
</style>