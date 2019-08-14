<template>
<div class="userInfo">
    <div class="rightUserInfo">
        <img :src="headImage">
    </div>
    <div class="leftUserInfo">
        <i class="icon iconconfig"></i>
        <span class="line">退出</span>
        <span> {{userInfoGet.name}}</span>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import config from "@/config/config.js";
export default {
    name: "UserInfo",
    data() {
        const man = require("../../../assets/img/man.png");
        const woman = require("../../../assets/img/woman.png");
        return {
            manImg: man,
            womanImg: woman,
            //控制个人信息得显隐
            userPoper: false
        };
    },
    computed: {
        ...mapGetters(["userInfoGet"]),
        headImage() {
            let url = "";
            if (this.userInfoGet.avatar) {
                url = config.IMAGE_URL + this.userInfoGet.avatar
            } else {
                url = this.userInfoGet.sex === "M" ? this.manImg : this.womanImg
            }
            return url
        }
    },
    methods: {
        //退出登录
        signOut() {
            localStorage.clear();
            this.$router.push({
                path: "/login"
            });
            this.userPoper = false;
        },
        showDown() {},
        //进入个人中心
        goUserCenter() {
            // this.$router.push({
            //     path: "/userInfoCenter"
            // });
            // this.userPoper = false;
        }
    }
};
</script>

<style lang="less" scoped>
.userInfo {
    position: relative;
    padding: 10px 0 0;
}

.leftUserInfo {
    margin: 10px;
    font-size: 14px;
    .line {
        display: inline-block;
        padding-right: 15px;
        margin-right: 10px;
        border-right: 1px solid #fff;
    }

}

.leftUserInfo,
.rightUserInfo {
    float: right;
    text-align: right;
}

.rightUserInfo img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
