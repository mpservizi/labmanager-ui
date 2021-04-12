import { HttpRequest } from '@/shared/http_request';
import { ENUM_STATI_RICHIESTE } from '@/data/front-db.js';
// import { getDatiTestRequests } from '@/data/db-test-requests.js';
const URL_RICHIESTE = 'testrequest';

let richiste_cache;
class TestRequestProvider extends HttpRequest {
    async getRichieste() {
        if (richiste_cache) return richiste_cache;
        let response = await this.getRequest(URL_RICHIESTE);
        richiste_cache = response.data;
        return richiste_cache;
        // return getDatiTestRequests();
    }
    /**
     * Salva i dati di test request sul server
     * @param {*} item : oggetto test request
     * @returns
     */
    async saveTestRequest(item) {
        let response = await this.create(URL_RICHIESTE, item);
        richiste_cache = null;
        return response.data;
    }

    async updateTestRequest(payload) {
        let response = await this.update(URL_RICHIESTE, payload);
        richiste_cache = null;
        return response.data;
    }

    /**
     * Aggiorna lo stato del gruppo test program
     * @param {*} listaRichieste : lista con tutte le test request
     * @param {*} gruppoProve :Gruppo prove modificato
     * @returns
     */
    async aggiornaStatoGruppo(listaRichieste, gruppoProve) {
        //Cerco la test request in base al id
        let richiesta = listaRichieste.find(
            item => item._id == gruppoProve.idRequest
        );
        //Creo array con id dei gruppi e ricavo la posizione
        const indexProva = richiesta.testProgram
            .map(o => o.id)
            .indexOf(gruppoProve.id);
        //Sostituisco il valore nel array
        richiesta.testProgram[indexProva] = gruppoProve;

        //Calcolo in automatico lo stato del test request
        calcolaStatoTestRequst(richiesta);

        //Aggiorno la richista in db
        return this.updateTestRequest(richiesta);
    }
}

/**
 * Calcola lo stato del test request in base allo stato dei suoi test programs
 * @param {Object} richiesta : Test request con i dati dei test program
 */
function calcolaStatoTestRequst(richiesta) {
    //Aggiorno in automatico to_plan => planned
    if (richiesta.stato == ENUM_STATI_RICHIESTE.TO_PLAN) {
        // se tutti  i test program soono stati pianificati
        richiesta.stato = calcolaStatoMinimo(richiesta);
    }
}

/**
 * Calcola lo stato minimo di test program della richiesta indicata
 * @param {Object} richiesta : test request con i dati dei test program
 * @returns {Number} : Numero che corrisponde allo stato
 */
function calcolaStatoMinimo(richiesta) {
    //Ricavo lo stato minimo e massimo di tutti i test program
    let minimo = Number.POSITIVE_INFINITY;
    let tmp;
    richiesta.testProgram.forEach(prova => {
        tmp = prova.stato;
        if (tmp < minimo) minimo = tmp;
    });
    return minimo;
}
/**
 * Calcola lo stato massimo di test program della richiesta indicata
 * @param {Object} richiesta : test request con i dati dei test program
 * @returns {Number} : Numero che corrisponde allo stato
 */
function calcolaStatoMassimo(richiesta) {
    //Ricavo lo stato minimo e massimo di tutti i test program
    let massimo = Number.NEGATIVE_INFINITY;
    let tmp;
    richiesta.testProgram.forEach(prova => {
        tmp = prova.stato;
        if (tmp > massimo) massimo = tmp;
    });
    return massimo;
}
export const TestRequetService = new TestRequestProvider('TestRequestProvider');
