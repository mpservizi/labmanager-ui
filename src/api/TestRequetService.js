import HttpRequest from '@/shared/http_request';
import { getDatiTestRequests } from '@/data/db-test-requests.js';
const URL_RICHIESTE = 'planner/richieste';

class TestRequestProvider extends HttpRequest {
    async getRichieste() {
        // let response = await this.getRequest(URL_RICHIESTE);
        // return response.data;
        return getDatiTestRequests();
    }
    /**
     * Salva i dati di test request sul server
     * @param {*} dati : Dati test request scaricati da server
     * @param {*} item : item con stato aggrionato
     * @returns
     */
    async saveDatiRichieste(dati, item) {
        // let response = await this.create(URL_RICHIESTE, payload);
        // return response.data;
        console.log('Salvare dati richieste su server');
        let result = dati.plans.find(riga => riga.id == item.id);
        if (result) {
            result.stato = item.stato;
        }
        console.log(JSON.stringify(dati));
        return { result: true };
    }
}

export const TestRequetService = new TestRequestProvider('TestRequestProvider');
