/**
 * Fornisce tutti i dati riguardanti la ciclatura
 */
import { HttpRequest } from '@/shared/http_request';
import { isFake } from '@/shared/ambiente';
import { fake_getDatiCiclatura } from '../fake/ciclatura';
import { checkTempo } from 'Moduli/monitor_ciclatura/js/util.js';
export const Endpoints = {
    GET_DATI: 'ciclatura'
};

let lastUpdate;
let datiCache = null;
export class CiclaturaApi extends HttpRequest {
    /**
     * Restiuisce i dati di tutte le macchine di cicaltura
     */
    async getDatiCiclatura() {
        let dati = {};
        try {
            if (datiCache && !checkTempo(lastUpdate, 5000)) {
                return datiCache;
            }

            if (isFake()) {
                dati = await fake_getDatiCiclatura();
            } else {
                let response = await this.getRequest(Endpoints.GET_DATI);
                dati = response.data;
            }
            // console.log(dati);
        } catch (error) {
            console.log('Errore api call');
        }
        lastUpdate = new Date();
        datiCache = dati;
        return dati;
    }
}
