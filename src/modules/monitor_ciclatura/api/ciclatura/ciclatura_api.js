/**
 * Fornisce tutti i dati riguardanti la ciclatura
 */
import {HttpRequest} from '@/shared/http_request';
import { isFake } from '@/shared/ambiente';
import { fake_getDatiCiclatura } from '../fake/ciclatura';

export const Endpoints = {
    GET_DATI: 'ciclatura'
};

export class CiclaturaApi extends HttpRequest {
    /**
     * Restiuisce i dati di tutte le macchine di cicaltura
     */
    async getDatiCiclatura() {
        let dati = { msg: 'No data' };
        try {
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
        return dati;
    }
}
