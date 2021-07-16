/**
 * Fornisce tutti i dati riguardanti la ciclatura
 */
import { HttpRequest } from '@/shared/http_request';
import { isFake } from '@/shared/ambiente';
import { fake_getDatiCiclatura } from '../fake/ciclatura';
import { checkTempo } from 'Moduli/monitor_ciclatura/js/util.js';
import { DURATA_CACHE_SECONDS } from 'Moduli/monitor_ciclatura/costanti.js';
export const Endpoints = {
    GET_DATI: 'monitor'
};

const TEMPO_CACHE_DATI = DURATA_CACHE_SECONDS * 1000; //SECONDI * 1000
let lastUpdate;
let datiCache = null;
export class CiclaturaApi extends HttpRequest {
    /**
     * Restiuisce i dati di tutte le macchine di cicaltura
     */
    async getDatiCiclatura() {
        let dati = null;
        try {
            //Se sono presenti dati nella cache e non è trascorso il tempo
            if (datiCache && !checkTempo(lastUpdate, TEMPO_CACHE_DATI)) {
                console.log('From cache monitor ciclatura');
                return datiCache;
            }

            //Carico i dati da Api
            if (isFake()) {
                dati = await fake_getDatiCiclatura();
            } else {
                let response = await this.getRequest(Endpoints.GET_DATI);
                dati = response.data;
            }
        } catch (error) {
            console.log('Errore api call');
            return null;
        }
        console.log('From api monitor ciclatura');
        lastUpdate = new Date();
        datiCache = dati;
        return dati;
    }
}
