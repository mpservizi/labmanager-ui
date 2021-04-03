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
     * @param {*} item : oggetto test request
     * @returns
     */
    async saveTestRequest(item) {
        // let response = await this.create(URL_RICHIESTE, payload);
        // return response.data;
        console.log('Salvare dati richieste su server');
        item.id = new Date().getTime();
        console.log(JSON.stringify(item));
        return item;
    }
}

export const TestRequetService = new TestRequestProvider('TestRequestProvider');
