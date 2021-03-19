import { NOME_MODULO } from '../costanti.js';
import PersonModule from './person_module';
import MessageModule from './message_module';
import { CiclaturaModule } from './ciclatura_module';

const modules = {
  Person: PersonModule,
  Message: MessageModule,
  Ciclatura: CiclaturaModule
};

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  modules,
  actions: {
    /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
    async init() {
      console.info('Installazione modulo : ' + NOME_MODULO);
      return true; //Risultato funzione RegistraModulo
    },
  },
};
