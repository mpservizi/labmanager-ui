import { NOME_MODULO } from './../costanti.js';
import TestRequestService from './../servizi/index.js';
export default {
    namespaced: true,
    state: {
        lista: [],
        saveEnd: true
    },
    getters: {
        listaRichieste: function(state) {
            return state.lista;
        }
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
    },
    actions: {
        /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
        async init() {
            console.info('Installazione modulo : ' + NOME_MODULO);
            return true; //Risultato funzione RegistraModulo
        },
        async loadRichieste({ commit,state }) {
            if(state.lista.length>0) return;
            let dati = await TestRequestService.getAll();
            commit('SET_DATI', dati);
        },
        async saveRichiesta({ commit }, payload) {
            commit('SET_SAVE', false);
            let result = await TestRequestService.save(payload);
            commit('ADD_RICHIESTA', result);
            commit('SET_SAVE', true);
        }
    }
};
