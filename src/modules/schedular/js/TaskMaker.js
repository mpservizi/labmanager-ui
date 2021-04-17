import { EV_ID_RISORSA, CAMPO_STATO } from './costanti.js';
import { MyPlanner } from 'Moduli/schedular/js/my-planner.js';
import { getDurataProva } from '@/shared/func-ciclatura.js';
import { ENUM_STATI_RICHIESTE } from '@/data/front-db.js';
export function creaTaskPerProva(payload) {
    let data_inizio = payload.data_inzio;
    //Calcolare la durata in base alla prova e corrente
    let durata = getDurataProva(payload.idCarico, payload.corrente);
    let dataFine = calcolaDataFine(data_inizio, durata);

    let task = {
        start_date: data_inizio,
        end_date: dataFine,
        [EV_ID_RISORSA]: payload.risorsa.key,
        [CAMPO_STATO]: ENUM_STATI_RICHIESTE.PLANNED, //stato planned quando inserico nel schedular
        idCarico: payload.idCarico,
        text: payload.label, //salvare qui numero di campione, default carico-corrente
        corrente: payload.corrente,
        idRequest: payload.idRequest, //id test request
        progetto: payload.titoloProgetto, //test request progetto
        descrizione: payload.descrizione, //test request descrizione
        gruppo: payload.titolo //test request, titolo gruppo test program
    };
    MyPlanner.addTask(task);
    return task;
}

function calcolaDataFine(data_inizio, durata) {
    let dataFine = MyPlanner.date.add(data_inizio, durata, 'day');
    return dataFine;
}
