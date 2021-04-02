import { pausa } from '@/shared/util.js';
import { TestRequetService } from '@/api/TestRequetService.js';
import MyDate from '@/shared/my-date.js';
async function getAll() {
    let dati = await TestRequetService.getRichieste();
    let lista = dati.richieste;
    await pausa(100);
    return lista;
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

    // TestRequetService.saveDatiRichieste();
    payload.id=new Date().getTime();
    await pausa(100);
    return payload;
}
export default {
    getAll,
    save
};
