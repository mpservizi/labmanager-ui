import { importaAndRegistra } from '@/services/installer';
import { NOME_MODULO } from './../costanti.js';
import { LISTA_MODULI } from '@/shared/info-moduli';
export default {
    namespaced: true,

    state: {},

    getters: {},

    mutations: {},

    actions: {
        async init() {
            console.log('Installazione modulo : ' + NOME_MODULO);
            await registraModuliGlobali();
            return true;
        }
    }
};

/**
 * Registra i moduli presenti nella lista globale, che devono essere installi al avvio
 * @returns
 */
async function registraModuliGlobali() {
    LISTA_MODULI.forEach(async item => {
        if (item.registrareOnAvvio) {
            //Registro moduli con parametro root true. Non so ancora cosa cambia mettendo a false
            await importaAndRegistra(item.cartella, true);
        }
    });
    return true;
}
