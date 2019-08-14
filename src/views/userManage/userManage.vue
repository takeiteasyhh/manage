<template>
  <div class="userManage">
      <el-tabs type="border-card"  @tab-click="tabClick"  v-model="tabClickName">
        <el-tab-pane label="司機用戶" name="dirver">
            <DriverManage ref="driverManage"></DriverManage>
        </el-tab-pane>
        <el-tab-pane label="遊客用戶" name="user">
            <TouristManage ref="touristManage"></TouristManage>
        </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import TouristManage from "@/views/touristManage"
import DriverManage from '@/views/driverManage'
export default {
components: { TouristManage,DriverManage },
  name: 'userManage',
  data() { 
    return {
      tabClickName:"dirver"
    }
  },
  activated(){
    this.tabClickName = "dirver"
    let _this = this;
    document.onkeydown = function (event) {
      var e = event || window.event;
      if (e && e.keyCode == 13) { // enter 键
        _this.$refs.driverManage.getDriverList()
      }
    };
  },
  methods:{
    tabClick(e) {
      let _this = this;
      if(e.name==='dirver'){
        _this.$refs.driverManage.clearSearch()
        document.onkeydown = function (event) {
          var e = event || window.event;
          if (e && e.keyCode == 13) { // enter 键
            _this.$refs.driverManage.getDriverList()
          }
        };
      }else{
        _this.$refs.touristManage.clearSearch()
        document.onkeydown = function (event) {
          var e = event || window.event;
          if (e && e.keyCode == 13) { // enter 键
            _this.$refs.touristManage.gettouristList()
          }
        };
      }
    },
  },
  deactivated(){
    document.onkeydown = null;
  },
 }
</script>

<style lang='less' scoped>
/deep/.el-tabs--border-card>.el-tabs__content{
  padding: 0;
}
</style>