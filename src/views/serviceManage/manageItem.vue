<template>
    <div class="manageItem" :style="setStyle">
        <div class="headImage">
            <img :src="userImg"/>
        </div>
        <div class="userInfo">
            <ul>
                <li class="userinfoDetail userName">{{userData.name}}</li>
                <li class="userinfoDetail"><label>TEL</label>{{userData.phone}}</li>
                <li class="userinfoDetail"><label>Email</label>{{userData.email}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import config from "@/config/config.js";
export default {
    name:"ManageItem",
    props:{
        userData:{},//传入得数据
        setStyle:""//传入样式
    },
    data(){
        const man = require("@/assets/img/man.png");
        const woman = require("@/assets/img/woman.png");
        return{
            // url = config.IMAGE_URL+this.userInfoGet.avatar
            userImg:this.userData.avatar?config.IMAGE_URL+this.userData.avatar:this.userData.sex==='M'?man:woman
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
    padding: 6%  0;
    width: 90%;
    border:1px solid #ddd;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.headImage{
    min-width: 80px;
    position: absolute;
    width: 22%;
    padding: 0 0 0 4%;
    top: 18%;
}
.headImage img{width: 100%;border-radius: 50%}
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
    font-size: 12px;
    color: #666;
    height: 24px;
    line-height: 24px;
    label{
        display: inline-block;
        width: 50px;
    }
}
.userName{
    font-size: 1rem;
    color: #6588B7;
    padding: 6px 0;
}
</style>
