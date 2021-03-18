import { NOME_MODULO } from '../costanti.js';
import TasksService from '../servizi/index.js';
export default {
    namespaced: true,
    state: {
        lista: { data: [], links: [] }
    },
    getters: {
        listaTasks: function(state) {
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
        async loadTasks({ commit }) {
            let dati = await TasksService.getAll();
            commit('SET_DATI', dati);
        }
    }
};
