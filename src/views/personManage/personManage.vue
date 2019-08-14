<template>
  <div class="allHeight">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>
    </el-card>
    <div id="selectList">
        <el-select v-model="optionsAreaValue" placeholder="请选择">
            <el-option
            v-for="item in optionsArea"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="optionsOrdersValue" placeholder="请选择">
            <el-option
            v-for="item in optionsOrders"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="optionsNewValue" placeholder="请选择" size="small">
            <el-option
            v-for="item in optionsNew"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
    <el-scrollbar :style="getMaxHeight">
    <el-row :gutter="20" id="manageBox" style=" margin-left: 0px;margin-right: 0px;">
        <el-col :span="6" class="manageBoxItemHeight" v-for="(item,index) in userList" :key="item.id" @click.native="checkUserInfo(item,index)">
            <manage-item :userData="item" :setStyle="index===i?active:''"></manage-item>
        </el-col>
    </el-row>
    </el-scrollbar>
     <DrawerMy
      :width=60 
      :showMyDrawer.sync="showDetail" 
      :drawerData="getUserInfo">
          <div slot="drawer-header" class="detailInfoHead">
            <img :src="getUserInfo.userHead" class="headerImage"/>
            <P>{{getUserInfo.userName}}</P>
          </div>
          <div slot="drawer-content">
            <personDetailInfo></personDetailInfo>
          </div>
      </DrawerMy>
  </div>
</template>
<script>
import ManageItem from "./manageItem.vue"
import personDetailInfo from './personDetailInfo.vue'
import { getClientHeight } from "@/libs/common.js";
export default {
  components: { ManageItem,personDetailInfo },
  data() {
    return {
        getUserInfo:{},//获取点击的用户信息
        showDetail:false,
        i:-1,//当前点击得用户和列表下标（即index）相同的时候，给背景颜色
        active:{background:"rgba(212,232,253,0.6)"},
        optionsArea: [{
          value: '内地用户',
          label: '内地用户'
        }],
        optionsOrders: [{
          value: '累计订单最高',
          label: '累计订单最高'
        }],
        optionsNew: [{
          value: '本月新注册',
          label: '本月新注册'
        }],
        optionsAreaValue:'',
        optionsOrdersValue:'',
        optionsNewValue: '',
        //用户列表
        userList:[
        ]
      }
  },
  methods:{
    checkUserInfo(item,index){
      this.showDetail = true;
      this.getUserInfo = item;
      this.i=index;
    }
  },
  computed: {
    getMaxHeight() {
      return { height: getClientHeight() - 220 + "px" };
    },
  },  
};
</script>
<style lang="less" scoped src="../../assets/styles/manage.less">
</style>
<style lang="less" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
