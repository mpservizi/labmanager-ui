import { CAMPO_RISORSA, CAMPO_STATO } from './costanti.js';

export function creaTaskPerProva(ms, payload) {
    let data_inizio = payload.data_inzio;
    let durata = payload.durata;
    let idRisorsa = payload.risorsa.key;
    let testo = payload.label;
    let dataFine = calcolaDataFine(ms, data_inizio, durata);

    let task = {
        start_date: data_inizio,
        end_date: dataFine,
        [CAMPO_RISORSA]: idRisorsa,
        [CAMPO_STATO]: 1,
        text: testo
    };
    return task;
}

function calcolaDataFine(ms, data_inizio, durata) {
    let dataFine = ms.date.add(data_inizio, durata, 'day');
    return dataFine;
}
