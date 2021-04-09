import { NOME_MODULO } from '../costanti.js';
import { CiclaturaService } from '../api/index.js';
import CiclaturaConfig from '../configs/ciclatura.js';
import { parseDatiServer } from './../js/data-parser.js';
//  Ogni quanti secondi è possibile fare nuova richiesta al server per i dati
const PAUSA_DATI = parseInt(CiclaturaConfig.INTERVALLO_CHECK);

export default {
    namespaced: true,
    state: {
        dati: []
    },
    getters: {
        getDati(state) {
            return state.dati;
        },
        getL180(state) {
            return state.dati['L180'];
        },
        getL232(state) {
            return state.dati['L232'];
        },
        getL2020(state) {
            return state.dati['L2020'];
        }
    },
    mutations: {
        SET_DATI(state, dati) {
            state.dati = dati;
            lastUpdate = new Date();
        }
    },
    actions: {
        /** Metodo per inizializzare il modulo. Chiamato dopo la registrazione */
        async init() {
            console.info('Installazione modulo : ' + NOME_MODULO);
            return true; //Risultato funzione RegistraModulo
        },
        async loadDati({ commit, state }, data) {
            // Verifico se è intercorso il tempo stabilito dalla ultima richiesta
            // Questo evita la chiamata al server quando viene caricata la apgina dei stalli, dopo il tasto back nella schermata detail stallo
            if (checkTempo()) {
                let result = await CiclaturaService.getDatiCiclatura();
                let parsedData = parseDatiServer(result);
                commit('SET_DATI', parsedData);
            } else {
                // console.log('Dati da cache');
                return;
            }
        }
    }
};

let lastUpdate;
/**
 * Indica se è trascorso il tempo per eseguire una nuova richiesta dati
 */
function checkTempo() {
    //  primo avvio
    if (lastUpdate == undefined) return true;

    // minore di secondi di pausa
    let diff = new Date() - lastUpdate;
    //  Aggiungo la tolleranza di 500ms sul tempo. Il tempo di loop interval è sempre minore di qualche ms rispetto alla pausa impostata
    if (diff < PAUSA_DATI - 500) return false;

    // maggiore di tempo di pausa
    return true;
}
