import Vue from "vue"

import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state:{
        menuList:[]
    },
    mutations:{
        changeMenuList(state,newmenuList) {
            state.menuList = newmenuList
        }

    }
})

export default store
