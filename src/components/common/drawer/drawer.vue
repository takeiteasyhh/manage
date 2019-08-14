<template>
  <div class="drawer">
    <div :class="showMyDrawer?'mask':''" @click="close"/>
    <transition name="drawer">
      <!-- <div :class="showMyDrawer?'open':'close'"  :style="showMyDrawer?drawerOpenStyle:drawerCloseStyle"> -->
      <div class="open" v-show="showMyDrawer" :style="showMyDrawer?drawerOpenStyle:drawerCloseStyle">
        <div class="header" v-if="showHeader" name="header">
          <el-button icon="el-icon-arrow-left" circle  class="closeButton" @click="close"></el-button>
          <div class="drawer-header"><slot name="drawer-header"></slot></div>
        </div>
        <div class="drawer-body">
          <slot name="drawer-content"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name:"DrawerMy",
  props:{
    width:{
      type:Number
    },
    drawerData:{
      type:Object
    },
    showMyDrawer:{
      type:Boolean,
      default:false
    },
    //是否显示头消息
    showHeader:{
      type:Boolean,
      default:true
    },
  },
  mounted(){
  },
  data() {
    return {
      drawerCloseStyle:{
        width:this.width+"%",
        right: "-"+this.width+"%",
      },
      drawerOpenStyle:{
        width:this.width+"%",
        right:0
      }
    };
  },
  methods: {
    close() {
      this.$emit('update:showMyDrawer',false)
    }
  }
};
</script>
<style lang="less" scoped>
.drawer-leave-active{
  transition: all linear 0.3s;
}
.drawer-enter-active{
  transition: all linear 0.2s;
}
.drawer-enter, .drawer-leave-to {
  opacity: 0;
  transform: translateX(100px)
}
.drawer {
  .el-button--small.is-circle{
    padding: 4px;
  }
  .closeButton{
    margin-right: 10px;
  }
  .closetBtn{
    color: #333;
    font-size: 1.8rem;
    position: absolute;
    right: 30px;
    cursor: pointer;
    transition:all 0.6s;
  }
  .closetBtn:hover{
    transform:rotate(90deg);
  }
  .drawer-header{display: inline-block;}
  .mask {
    position: fixed;
    z-index: 10;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .close {
    position: fixed;
    z-index: 10;
    top: 0;
    height: 100%;
    background: #fff;
  }
  .open {
    position: fixed;
    z-index: 10;
    // right: 0;
    top: 0;
    height: 100%;
    background: #fff;
    // transition: right linear 0.4s;
  }
  .header {
    margin: 0 20px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    align-items: center;
    min-height: 56px;
    p {
      margin-top: 18px;
    }
  }
  .drawer-body{
    padding: 20px;
  }
}
</style>

