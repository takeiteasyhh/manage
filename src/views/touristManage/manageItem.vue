<template>
    <div class="manageItem" :style="setStyle">
        <div class="headImage">
            <img :src="userImg"/>
        </div>
        <div class="userInfo">
            <ul>
                <li class="userinfoDetail userName">{{userData.unickname?userData.unickname:userData.uloginid}}</li>
                <li class="userinfoDetail"><label>Tel：</label>+{{userData.uloginCode}} {{userData.uloginid}}</li>
                <li class="userinfoDetail"><label>註冊時間:</label>{{userData.createDate}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import config from "@/config/config.js";
import manImg from "@/assets/img/man.png"
export default {
    name:"ManageItem",
    props:{
        userData:{},//传入得数据
        setStyle:""//传入样式
    },
    data(){
      return{
        userImg:manImg,
        headImage:config.IMAGE_URL,
      }
    },
    mounted(){
        // console.log(this.userData)
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
.manageItem{
    font-size: 0.8rem;
    padding: 15px 0;
    height: 100px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.headImage{
    min-width: 80px;
    position: absolute;
    width: 22%;
    padding: 0 0 0 4%;
    top: 18%;
}
.headImage img{width: 90px;height:90px;border-radius: 50%}
.userInfo{
    width: 78%;
    float: left;
    padding-left: 22%;
    ul{
        margin-top: 0;
        margin-bottom: 0;
    }
}
.userinfoDetail{
    font-size: 14px;
    color: #909399;
    height: 28px;
    line-height: 28px;
    label{
        display: inline-block;
        width: 70px;
    }
}
.userName{
    font-size: 18px;
    color: #303133;
    padding: 6px 0;
}
</style>
