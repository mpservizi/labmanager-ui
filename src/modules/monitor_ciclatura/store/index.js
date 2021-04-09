import { NOME_MODULO } from '../costanti.js';
import { CiclaturaService } from '../api/index.js';
import { parseDatiServer } from './../js/data-parser.js';

export default {
    namespaced: true,
    state: {
        dati: []
    },
    getters: {},
    mutations: {
        SET_DATI(state, dati) {
            state.dati = dati;
        }
    },
    actions: {
        /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
        async init({ dispatch }) {
            console.info('Installazione modulo : ' + NOME_MODULO);
            setInterval(() => {
                dispatch('loadDati');
            }, 5000);
            return true; //Risultato funzione RegistraModulo
        },
        /** Richiede nuovi dati*/
        async loadDati({ commit }) {
            let result = await CiclaturaService.getDatiCiclatura();
            let parsedData = parseDatiServer(result);
            commit('SET_DATI', parsedData);
        }
    }
};
