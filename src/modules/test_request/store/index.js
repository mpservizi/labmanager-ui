import { NOME_MODULO } from './../costanti.js';
import datiProvider from './../servizi/index.js';
export default {
    namespaced: true,
    state: {
        lista: [],
        detail:null,
        saveEnd: true
    },
    getters: {
        listaRichieste: function(state) {
            return state.lista;
        },
        detailRequest: function(state) {
            return state.detail;
        },
    },
    mutations: {
        SET_DATI(state, payload) {
            state.lista = payload;
        },
        SET_SAVE(state, payload) {
            state.saveEnd = payload;
        },
        ADD_RICHIESTA(state, payload) {
            state.lista.push(payload);
        },
        DETAIL_REQUEST(state, payload) {
            state.detail=payload;
        },
    },
    actions: {
        /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
        async init() {
            console.info('Installazione modulo : ' + NOME_MODULO);
            return true; //Risultato funzione RegistraModulo
        },
        async loadRichieste({ commit,state }) {
            if(state.lista.length>0) return;
            let dati = await datiProvider.getAll();
            commit('SET_DATI', dati);
        },
        async saveRichiesta({ commit }, payload) {
            commit('SET_SAVE', false);
            let result = await datiProvider.save(payload);
            commit('ADD_RICHIESTA', result);
            commit('SET_SAVE', true);
        },
        setDetailRequest({commit},payload){
            commit('DETAIL_REQUEST', payload);

        }
    }
};
