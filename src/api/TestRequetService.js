import HttpRequest from '@/shared/http_request';

const URL_RICHIESTE = 'planner/richieste';

class TestRequestProvider extends HttpRequest {
    async getRichieste() {
        let response = await this.getRequest(URL_RICHIESTE);
        return response.data;
    }
    async saveDatiRichieste(payload) {
        let response = await this.create(URL_RICHIESTE, payload);
        return response.data;
    }
}

export const TestRequetService = new TestRequestProvider('TestRequestProvider');
