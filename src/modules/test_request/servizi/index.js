// import { pausa } from '@/shared/util.js';
import { TestRequetService } from '@/api/TestRequetService.js';
import MyDate from '@/shared/my-date.js';
async function getAll() {
    let dati = await TestRequetService.getRichieste();
    return dati;
}
/**
 * Salva la nuova richiesta di prova nel db
 * @param {Object} payload : oggetto creato con i campi del form
 * @returns {Object} Restituisce oggetto test request dopo l'insermento nel db
 */
async function save(payload) {
    //Ricavo il numero di settimana in base alle date
    calcolaWeekNumber(payload);
    let result = await TestRequetService.saveTestRequest(payload);
    return result;
}
async function aggiorna(payload) {
    calcolaWeekNumber(payload);
    let result = await TestRequetService.updateTestRequest(payload);
    return result;
}

async function elimina(payload) {
    let result = await TestRequetService.deleteTestRequest(payload);
    return result;
}
function calcolaWeekNumber(payload) {
    let di = MyDate.strToDate(payload.dataInizio);
    let df = MyDate.strToDate(payload.dataFine);

    payload.weekInizio = MyDate.getWeekNumber(di);
    payload.weekFine = MyDate.getWeekNumber(df);
}
export default {
    getAll,
    save,
    aggiorna,
    elimina
};
