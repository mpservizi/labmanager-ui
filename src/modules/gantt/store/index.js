import { NOME_MODULO } from '../costanti.js';
import TestRequestService from '../servizi/index.js';
export default {
    namespaced: true,
    state: {
        lista: []
    },
    getters: {
        listaRichieste: function(state) {
            return state.lista;
        }
    },
    mutations: {
        SET_DATI(state, payload) {
            state.lista = payload;
        }
    },
    actions: {
        /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
        async init() {
            console.info('Installazione modulo : ' + NOME_MODULO);
            return true; //Risultato funzione RegistraModulo
        },
        async loadRichieste({ commit }) {
            let dati = await TestRequestService.getAll();
            commit('SET_DATI', dati);
        }
    }
};
