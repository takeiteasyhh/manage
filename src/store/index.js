import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user"
import storeMap from "./store"
import listInfo from "./listInfo"
Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
  },
  mutations: {
    
  },
  actions: {

  },
  modules:{
      user,
      storeMap,
      listInfo
  }
})
export default store
