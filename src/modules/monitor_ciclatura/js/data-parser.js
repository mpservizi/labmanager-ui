import { getLabelStatoById, TIPI_PRODOTTO } from '../costanti.js';
/**
 * Esegue il parsing dei dati da Api
 * @param {Array} dati : Array con dati della ciclatura
 * @returns {Object}  :Oggetto che ha come chiave il nome della macchina
 */
export function parseDatiServer(dati) {
    if (dati == null) {
        alert('Dati ciclatura non validi');
        return;
    }
    let result = {
        L180: [],
        L232: [],
        L2020: []
    };
    dati.forEach(item => {
        let stallo = parseStallo(item);
        result[stallo.macchina].push(stallo);
    });
    return result;
}

/**
 * Converto ogetto ricevuto dal server in ogetto stallo da usare in gui
 * @param {*} stallo : ricevuto da server
 * {
 * "Macchina":"L180",
 * "Stallo":"1",
 * "Tecnico":"Max",
 * "Prova":"20-0463",
 * "Start":"17/08/2020 07:50",
 * "End":"17/08/2020 07:50",
 * "Stato":"In progress",
 * "Export time":"17/08/2020 07:50"
 * }
 */
function parseStallo(stallo) {
    return {
        macchina: stallo.Macchina,
        nome: ' ' + stallo.Stallo,
        tecnico: stallo.Tecnico,
        prova: stallo.Prova,
        stato: getLabelStatoById(stallo.Stato),
        start: stallo.Start,
        end: stallo.End,
        timestamp: stallo['Export time'],
        tipo: getTipoStallo(stallo.Macchina, stallo.Stallo)
    };
}

//  Restituisce il tipo di stallo in base alla macchina e nome stallo
function getTipoStallo(macchina, stallo) {
    let result;
    switch (macchina.toUpperCase()) {
        case 'L2020':
            result = TIPI_PRODOTTO.SWITCH;
            break;
        case 'L2021':
            result = TIPI_PRODOTTO.SOCKET;
            break;
        case 'L180':
            //Stalli prese da 1 a 4
            result = ['1', '2', '3', '4'].includes(stallo)
                ? TIPI_PRODOTTO.SOCKET
                : TIPI_PRODOTTO.SWITCH;
            break;
        case 'L232':
            //Stalli prese
            result = ['3', '4'].includes(stallo)
                ? TIPI_PRODOTTO.SOCKET
                : TIPI_PRODOTTO.SWITCH;
            break;
    }
    return result;
}
