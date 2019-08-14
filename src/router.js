import Vue from 'vue'
import Router from 'vue-router'
import Main from "@/components/main"
import store from "@/store"
Vue.use(Router)


const detailRouter = [
    {
      // 登录
      path: '/login',
      name: 'login',
      component: (resolve) => require(["@/views/login"],resolve)
    },

    {
      // 登录
      path: '/signUp',
      name: 'signUp',
      component: ()=>import("@/views/signUp"),
    },

    {
      path: '/',
      name:"Main",
      component:Main,
      redirect:"/login",
      children:[
        //主页
        {
        path:'/home',
        name:'home',
        component:()=>import("@/views/home"),
        }
      ]
     }
    // {
    //   path: '/',
    //   component:Main,
    //   redirect:"/home",
    //   children:[
    //     //主页
    //     {
    //       path:'productManage',
    //       name:'productManage',
    //       component:()=>import("@/views/productManage"),
    //     }
    //   ]
    // }
    
]

// const detailRouter = [
//   {
//     // 登录
//     path: '/login',
//     name: 'login',
//     component: (resolve) => require(["@/views/login"],resolve)
//   },
//   {
//     path: '/',
//     name:"Main",
//     component:Main,
//     redirect:"/login",
//     children:[
//       //主页
//       {
//       path:'/home',
//       name:'home',
//       component:()=>import("@/views/home"),
//       },
//       //个人中心
//       {
//         path:'userInfoCenter',
//         name:'userInfoCenter',
//         component:()=>import("@/views/userInfo"),
//       }
//     ]
//   },
//   {
//     path:"/",
//     component:Main,
//     redirect:"/home",
//     children:[
//         //司机管理
//         {
//           path:'userManage',
//           name:'userManage',
//           component:()=>import("@/views/userManage"),
//         },
//         //客服管理
//         {
//           path:'serviceManage',
//           name:'serviceManage',
//           component:()=>import("@/views/serviceManage"),
//         },
//         //租车订单列表
//         {
//           path:'carRentalOrder',
//           name:'carRentalOrder',
//           component:()=>import("@/views/carRentalOrder"),
//         },
//         //新建租车订单
//         {
//           path:'creatOrderList',
//           name:'creatOrderList',
//           component:()=>import("@/views/carRentalOrder/creatOrderList.vue"),
//         },
//         //租车订单详情
//         {
//           path:"carRentalOrderDetail/:id",
//           name:"carRentalOrderDetail",
//           component:()=>import("@/views/carRentalOrder/orderDetail.vue")
//         },
//         //打包租车订单详情列表
//         {
//           path:"carRentalOrderPageDetail/:id",
//           name:"carRentalOrderPageDetail",
//           component:()=>import("@/views/carRentalOrder/orderPageList.vue")
//         },
//         //酒店管理
//         {
//           path:'hotelOrder',
//           name:'hotelOrder',
//           component:()=>import("@/views/hotelOrder"),
//         },
//         //景点管理 
//         {
//           path:'viewpointOrder',
//           name:'viewpointOrder',
//           component:()=>import("@/views/viewpointOrder"),
//         },
//         //美食管理 
//         {
//           path:'foodOrder',
//           name:'foodOrder',
//           component:()=>import("@/views/foodOrder"),
//         },
//         //邮件信息
//         {
//           path:'mailMessage',
//           name:'mailMessage',
//           component:()=>import("@/views/mailMessage"),
//         },
//         //职位发布
//         {
//           path:'jobPublish',
//           name:'jobPublish',
//           component:()=>import("@/views/jobPublish"),
//         },
//         //职位查询
//         {
//           path:'jobManage',
//           name:'jobManage',
//           component:()=>import("@/views/jobManage"),
//         },
//         //职位信息修改
//         {
//           path:'jobEdit/:id',
//           name:'jobEdit',
//           component:()=>import("@/views/jobManage/editJop.vue"),
//         },
//         //费用管理
//         {
//           path: 'costManagement',
//           name: 'costManagement',
//           component: () => import("@/views/costManagement"),
//         },
//       ]
//     },
//      //用户反馈
//      {
//       path: '/',
//       component: Main,
//       children: [{
//         path: 'customerFeedback',
//         name: 'customerFeedback',
//         component: (resolve) => require(["@/views/customerFeedback"],resolve),
//         children: [{
//           path: '/customerFeedback/unprocessedTab',
//           name: 'unprocessedTab',
//           component: (resolve) => require(["@/views/customerFeedback/unprocessedTab.vue"],resolve),
//         }, {
//           path: '/customerFeedback/processedTab',
//           name: 'processedTab',
//           component: (resolve) => require(["@/views/customerFeedback/processedTab.vue"],resolve),
//         }]
//       }]
//     },
//     //未处理详情
//     {
//       path: '/',
//       component: Main,
//       children: [{
//         path: 'unprocessedFeedBackDetail/:id:/:uid:submitby',
//         name: 'unprocessedFeedBackDetail',
//         component: (resolve) => require(["@/views/customerFeedback/unprocessedFeedBackDetail.vue"],resolve),
//       }]
//     },
//     //已处理详情
//     {
//       path: '/',
//       component: Main,
//       children: [{
//         path: 'processedFeedBackDetail/:id:/:uid:submitby',
//         name: 'processedFeedBackDetail',
//         component: (resolve) => require(["@/views/customerFeedback/processedFeedBackDetail.vue"],resolve),
//       }]
//     },
// ]
const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: detailRouter
})
router.beforeEach(async(to,from,next)=>{
    next();
})
export default router