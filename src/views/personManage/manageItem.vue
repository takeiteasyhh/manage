<template>
    <div class="manageItem" :style="setStyle">
        <div class="headImage">
            <img :src="userData.userHead"/>
        </div>
        <div class="userInfo">
            <ul>
                <li class="userinfoDetail userName">{{userData.userName}}<span class="userArea">{{userData.userArea}}</span></li>
                <li class="userinfoDetail">運行中訂單：{{userData.orderNumber}}單</li>
                <li class="userinfoDetail">最後使用日期:{{userData.lastUseTime}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"ManageItem",
    props:{
        userData:{},//传入得数据
        setStyle:""//传入样式
    },
    data(){
        return{
            
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
}
.userName{
    font-size: 1rem;
    color: #6588B7;
    padding: 6px 0;
    .userArea{
        font-size: 0.6rem;
        background: #CCE5F6;
        padding: 2px 6px;
        border-radius: 6px;
        margin-left: 10px;
    }
}
</style>
