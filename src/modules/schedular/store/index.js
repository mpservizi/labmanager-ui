import { NOME_MODULO } from "./../costanti.js";
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
    async init() {
      console.info("Installazione modulo : " + NOME_MODULO);
      return true; //Risultato funzione RegistraModulo
    }
  }
};
