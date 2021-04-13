import { NOME_MODULO } from './../costanti.js';
import datiProvider from './../servizi/index.js';
export default {
    namespaced: true,
    state: {
        lista: [],
        detail: null
    },
    getters: {
        listaRichieste: function(state) {
            return state.lista;
        },
        detailRequest: function(state) {
            return state.detail;
        }
    },
    mutations: {
        SET_DATI(state, payload) {
            state.lista = payload;
        },
        ADD_RICHIESTA(state, payload) {
            state.lista.push(payload);
        },
        DETAIL_REQUEST(state, payload) {
            state.detail = payload;
        },
        AGGIORNA_REQUEST(state, payload) {
            const index = state.lista.map(o => o._id).indexOf(payload._id);
            state.lista.splice(index, 1, payload);
        }
    },
    actions: {
        /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
        async init() {
            console.info('Installazione modulo : ' + NOME_MODULO);
            return true; //Risultato funzione RegistraModulo
        },
        async loadRichieste({ commit }) {
            let dati = await datiProvider.getAll();
            commit('SET_DATI', dati);
        },
        async saveRichiesta({ commit }, payload) {
            // commit('SHOW_LOADING', null, { root: true });
            let result = await datiProvider.save(payload);
            commit('ADD_RICHIESTA', result);
            // commit('HIDE_LOADING', null, { root: true });
        },
        async aggiornaRichiesta({ commit }, payload) {
            // commit('SHOW_LOADING', null, { root: true });
            let result = await datiProvider.aggiorna(payload);
            commit('AGGIORNA_REQUEST', result);
            // commit('HIDE_LOADING', null, { root: true });
        },
        async eliminaRichiesta({ commit, dispatch }, payload) {
            let result = await datiProvider.elimina(payload);
            dispatch('loadRichieste');
        }
    }
};
