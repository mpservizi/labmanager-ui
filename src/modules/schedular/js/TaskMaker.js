import { EV_ID_RISORSA, CAMPO_STATO } from './costanti.js';
import { myScheduler } from 'Moduli/schedular/js/my-lib.js';
import { getDurataProva } from '@/shared/func-ciclatura.js';
export function creaTaskPerProva(payload) {
    let data_inizio = payload.data_inzio;
    //Calcolare la durata in base alla prova e corrente
    let durata = getDurataProva(payload.idCarico, payload.corrente);
    let dataFine = calcolaDataFine(data_inizio, durata);

    let task = {
        start_date: data_inizio,
        end_date: dataFine,
        [EV_ID_RISORSA]: payload.risorsa.key,
        [CAMPO_STATO]: 1,
        idCarico: payload.idCarico,
        text: payload.label,
        corrente: payload.corrente,
        idRequest: payload.idRequest, //id test request
        progetto: payload.titoloProgetto, //test request progetto
        descrizione: payload.descrizione //test request descrizione
    };
    myScheduler.addEvent(task);
    return task;
}

function calcolaDataFine(data_inizio, durata) {
    let dataFine = myScheduler.date.add(data_inizio, durata, 'day');
    return dataFine;
}
