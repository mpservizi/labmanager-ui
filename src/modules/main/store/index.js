import { RegistraModulo } from '@/services/installer';
import SchedularModule from '@/modules/schedular/module';
import MonitorCiclaturaModule from '@/modules/monitor_ciclatura/module';
import { NOME_MODULO } from './../costanti.js';
export default {
    namespaced: true,

    state: {},

    getters: {},

    mutations: {},

    actions: {
        async init() {
            console.log('Installazione modulo : ' + NOME_MODULO);
            await RegistraModulo(SchedularModule, true);
            await RegistraModulo(MonitorCiclaturaModule, true);

            return true;
        }
    }
};
