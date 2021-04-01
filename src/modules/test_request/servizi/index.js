import { pausa } from '@/shared/util.js';
import { TestRequetService } from '@/api/TestRequetService.js';
import MyDate from '@/shared/my-date.js';
async function getAll() {
    let dati = await TestRequetService.getRichieste();
    let lista = dati.richieste;
    await pausa(100);
    return lista;
}
async function save(payload) {
    let payload1 = {
        c1: '30',
        c2: '18',
        c3: '24',
        cliente: 'Matteo Roncalli',
        codiceProgetto: 'PR-00345',
        dataInizio: '05/04/2021',
        dataFine: '30/04/2021',
        descrizione: 'Gallery switch testato a 16A',
        priority: '1',
        stato: 1,
        tecnico: 'Malkit Sandhu',
        titoloProgetto: 'Universal range',
        weekFine: '',
        weekInizio: ''
    };

    //Ricavo il numero di settimana in base alle date
    let di = MyDate.strToDate(payload.dataInizio);
    let df = MyDate.strToDate(payload.dataFine);
    let wkInizio = MyDate.getWeekNumber(di);
    let wkFine = MyDate.getWeekNumber(df);

    payload.weekInizio = wkInizio;
    payload.weekFine = wkFine;

    console.log(payload);
    await pausa(100);
    return true;
}
export default {
    getAll,
    save
};
