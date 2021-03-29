import { CAMPO_RISORSA, CAMPO_STATO } from './costanti.js';
import { myScheduler } from 'Moduli/schedular/js/my-lib.js';

export function creaTaskPerProva(payload) {
    let data_inizio = payload.data_inzio;
    let durata = payload.durata;
    let dataFine = calcolaDataFine(data_inizio, durata);

    let task = {
        start_date: data_inizio,
        end_date: dataFine,
        [CAMPO_RISORSA]: payload.risorsa.key,
        [CAMPO_STATO]: 1,
        idCarico: payload.carico,
        text: payload.label
    };
    myScheduler.addEvent(task);
    return task;
}

function calcolaDataFine(data_inizio, durata) {
    let dataFine = myScheduler.date.add(data_inizio, durata, 'day');
    return dataFine;
}
