import { NOME_MODULO } from './../costanti.js';
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
    async init() {
      console.info('Installazione modulo : ' + NOME_MODULO);
      return true; //Risultato funzione RegistraModulo
    },
    async aggiornaRichiesta({commit},payload){
      // commit('SHOW_LOADING', null, { root: true });
      let result = await datiProvider.aggiorna(payload);
      commit('AGGIORNA_REQUEST', result);
      // commit('HIDE_LOADING', null, { root: true });
  }
  }
};
