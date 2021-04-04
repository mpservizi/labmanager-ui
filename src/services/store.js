import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoading:false
    },
    getters:{},
    mutations:{
        SHOW_LOADING(state) {
            state.isLoading = true;
        },
        HIDE_LOADING(state) {
            state.isLoading = false;
        },
    },
    actions:{}
});
