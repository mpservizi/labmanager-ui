import {HttpRequest} from '@/shared/http_request';
// import { getDatiTestRequests } from '@/data/db-test-requests.js';
const URL_RICHIESTE = 'testrequest';

class TestRequestProvider extends HttpRequest {
    async getRichieste() {
        let response = await this.getRequest(URL_RICHIESTE);
        return response.data;
        // return getDatiTestRequests();
    }
    /**
     * Salva i dati di test request sul server
     * @param {*} item : oggetto test request
     * @returns
     */
    async saveTestRequest(item) {
        let response = await this.create(URL_RICHIESTE, item);
        return response.data;
    }
    async updateTestRequest(payload) {
        let response = await this.update(URL_RICHIESTE, payload);
        return response.data;
    }

    /**
     * Aggiorna lo stato del gruppo test program
     * @param {*} listaRichieste : lista con tutte le test request
     * @param {*} gruppoProve :Gruppo prove modificato
     * @returns 
     */
    async aggiornaStatoGruppo(listaRichieste,gruppoProve){
        //Cerco la test request in base al id
        let richiesta = listaRichieste.find(item=>item._id==gruppoProve.idRequest);
        //Creo array con id dei gruppi e ricavo la posizione
        const indexProva = richiesta.testProgram.map(o => o.id).indexOf(gruppoProve.id); 
        //Sostituisco il valore nel array
        richiesta.testProgram[indexProva] = gruppoProve;
        //Aggiorno la richista in db
        return this.updateTestRequest(richiesta);  
    }

}

export const TestRequetService = new TestRequestProvider('TestRequestProvider');
