<template>
  <div class="whiteBac fullHeight">
    <el-tabs  type="border-card" v-model="activeName" @tab-click="handleClick" class="fullHeight">
      <el-tab-pane label="未处理" name="unprocessedTab">
      </el-tab-pane>
      <el-tab-pane label="已处理" name="processedTab">
      </el-tab-pane>
      <keep-alive>
          <router-view ></router-view>
      </keep-alive>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName:"unprocessedTab"
    };
  },
  computed:{
  },
  activated(){
    this.$router.push({ name:this.activeName})
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({ name:tab.name});
    }
  }
};
</script>
<style lang="less" scoped>
.whiteBac{
  padding: 0;
}
</style>