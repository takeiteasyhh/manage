<template>
  <div class="allHeight">
    <div id="selectList">
      <label class="selectTile">註冊時間：</label>
      <el-select v-model="searchOption.releaseTime" placeholder="請選擇" @change="selectChange">
        <el-option
          v-for="item in getPublishTimeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button icon="el-icon-refresh" circle class="clearBtn" @click="clearSearch"></el-button>
      <div class="headSearch">
        <el-input placeholder="請輸入手機號查找" v-model="searchOption.uLoginid" class="headSearchInput">
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
    <DrawerMy :width="60" :showMyDrawer.sync="showDetail">
      <div slot="drawer-header" class="sysHeadInfo">
        App用戶
        <label>/</label>
        {{getUserInfo.name}}詳細信息
      </div>
      <div slot="drawer-content">
        <touristDetailInfo :getUserInfo="getUserInfo"></touristDetailInfo>
      </div>
    </DrawerMy>
  </div>
</template>
<script>
import ManageItem from "./manageItem.vue";
import touristDetailInfo from "./touristDetailInfo.vue";
import { getClientHeight } from "@/libs/common.js";
import config from "@/config/config.js";
import { mapGetters } from "vuex";
export default {
  components: { ManageItem, touristDetailInfo },
  data() {
    return {
      noDate:false,
      touristList: [],
      yearMonthSearch: new Date(),
      showStatistical: false,
      myConfig: {
        serverUrl: config.IMAGE_URL + "/uploadFile"
      },
      showHeadImage: "",
      currentPage: 1,
      pageTotal: 0,
      pageSize: 20,
     
      headImageList: [],
      getUserInfo: {}, //获取点击的用户信息
      touristInfo: {
        realname: ""
      },
      showDetail: false,
      i: -1, //当前点击得用户和列表下标（即index）相同的时候，给背景颜色
      active: { background: "rgba(212,232,253,0.6)" },
      searchOption: {
        releaseTime: "",
        uLoginid: ""
      },
      //用户列表
      userList: []
    };
  },
  activated() {
    this.gettouristList();
    this.searchOption.releaseTime = "";
    this.searchOption.uLoginid = "";
    let _this = this;
  },

  computed: {
    ...mapGetters(["getPublishTimeList"]),
    getMaxHeight() {
      return { height: getClientHeight() - 262 + "px" };
    },
  },
  methods: {
    checkUserInfo(item, index) {
      this.postAxios("webAppUser/viewAppUser", { uId: item.uid }).then(
        res => {
          if (res.success) {
            this.getUserInfo = res.data;
            this.showDetail = true;
            this.i = index;
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        }
      );
    },
    clearSearch(){
      this.searchOption.releaseTime = "";
      this.searchOption.uLoginid = "";
      this.gettouristList()
    },
    selectChange() {
      this.gettouristList();
    },
    gettouristList() {
      let json = {};
      json.limit = this.pageSize;
      json.offset = this.currentPage;
      for (let key in this.searchOption) {
        if (this.searchOption[key]) {
          json[key] = this.searchOption[key];
        }
      }
      this.postAxios("webAppUser/viewAppUserList", json).then(res => {
        if (res.success) this.userList = res.data.sysUserList;
        this.pageTotal = res.data.count;
      });
    },
    //分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      if (val < this.pageTotal) {
        this.gettouristList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.gettouristList();
    },
  }
};
</script>
<style lang="less" scoped src="../../assets/styles/manage.less">
</style>
<style lang="less" scoped>
.noDate{
  text-align: center;
  color: #606266;
}
.havePayed {
  color: #909399;
  font-size: 14px;
  float: right;
}
.statistical {
  float: right;
  margin-right: 16px;
}
.sysHeadInfo {
  color: #606266;
  font-size: 14px;
  label {
    margin: 0 10px;
  }
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
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
.clearBtn{
  float: right;
  margin-right: 20px;
}
div.headImageBox {
  width: 120px;
  height: 160px;
  float: left;
  margin-right: 30px;
  img {
    width: 100%;
  }
}
.dialog-footer {
  text-align: left;
}
label.worningInfo {
  margin-left: 20px;
}
.worningInfo {
  font-size: 14px;
  color: #c0c4cc;
}
.statisticalTitle {
  color: #3176c6;
  font-size: 16px;
  margin-left: 14px;
}
</style>

