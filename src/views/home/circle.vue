<template>
    <div class="circleBox">
        <div class="circle" :style="background">
            <p class="info-data-title">{{cirleData.circleTitle}}</p>
            <p class="info-data">{{cirleData.num}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"circleDiv",
    props:{
        background:{},
        cirleData:{}
    }
}
</script>
<style lang="less" scoped>
div.circle{
    position: absolute;
    width: 0;
    top: 32%;
    padding:4em;
    border-radius: 50%;
    margin: 0 auto;
    color: #fff;
    p{
        width: 100%;
        text-align: center;
        left: 0;
        position: absolute;
    }
    .info-data-title{
        top: 30%;
        font-size:16px;
    }
    .info-data{
        top: 46%;
        font-size: 32px;
        font-weight: 600;
    }
}
</style>