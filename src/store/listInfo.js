import axios from "@/common/axiosApi"
export default {
    state:{
        publishTimeList:[{value:"",label:"全部"},{value:"7",label:"7天"},{value:"30",label:"30天"}],
        orderTotleList:[]
    },
    getters:{
        getPublishTimeList:state=>state.publishTimeList,
        getOrderTotleList:state=>state.orderTotleList
    },
    mutations:{
      ORDER_TOTLE_LIST(state,list){
          state.orderTotleList = list;
      },
    },
    actions:{
      setOrderTotleList:({commit})=>{
        axios.postAxios("carManagement/YhCarUserordersViewList",{limit:10,offset:1}).then(res=>{
            commit("ORDER_TOTLE_LIST",res.data.yhCarUserordersList)
        })
      },
    }
}