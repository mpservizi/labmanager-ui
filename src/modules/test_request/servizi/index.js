import { pausa } from '@/shared/util.js';
import { TestRequetService } from '@/api/TestRequetService.js';
import MyDate from '@/shared/my-date.js';
async function getAll() {
    let dati = await TestRequetService.getRichieste();
    await pausa(100);
    return dati;
}
/**
 * Salva la nuova richiesta di prova nel db
 * @param {Object} payload : oggetto creato con i campi del form
 * @returns {Object} Restituisce oggetto test request dopo l'insermento nel db
 */
async function save(payload) {
    //Ricavo il numero di settimana in base alle date
    let di = MyDate.strToDate(payload.dataInizio);
    let df = MyDate.strToDate(payload.dataFine);

    payload.weekInizio = MyDate.getWeekNumber(di);
    payload.weekFine =  MyDate.getWeekNumber(df);

    let result = await TestRequetService.saveTestRequest(payload);
    await pausa(100);
    return result;
}
async function aggiorna(payload){
    console.log(payload);
    let idRequest = payload.id;
    console.log('Aggiornare test request id : ' + idRequest);
    await pausa(200);
    return payload;
}
export default {
    getAll,
    save,
    aggiorna
};
