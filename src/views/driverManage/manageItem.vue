<template>
    <div class="manageItem" :style="setStyle">
        <div class="headImage">
            <img :src="headImage+userData.img"/>
        </div>
        <div class="userInfo">
            <ul>
                <li class="userinfoDetail userName">{{userData.realname}}</li>
                <li class="userinfoDetail"><label>Tel：</label>{{userData.phone}}</li>
                <li class="userinfoDetail"><label>Email:</label>{{userData.email}}</li>
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
        return{
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
    overflow:hidden;//隐藏文字
    text-overflow:ellipsis;//显示 ...
    white-space:nowrap;//不换行
    label{
        display: inline-block;
        width: 56px;
    }
}
.userName{
    font-size: 18px;
    color: #303133;
    padding: 6px 0;
}
</style>
