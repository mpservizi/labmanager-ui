import { getLabelStatoById, TIPI_PRODOTTO } from '../costanti.js';
/**
 * Esegue il parsing dei dati da Api
 * @param {Array} dati : Array con dati della ciclatura
 * @returns {Object}  :Oggetto che ha come chiave il nome della macchina
 */
export function parseDatiServer(dati) {
    if (dati == null) {
        //alert('Dati ciclatura non validi');
        console.log('Dati ciclatura non validi');
        return null;
    }
    let result = {
        L180: [],
        L232: [],
        L2020: []
    };
    Object.keys(dati).forEach(key => {
        let macchina = dati[key];
        macchina.forEach(item => {
            let stallo = parseStallo(item);
            result[stallo.macchina].push(stallo);
        });
        macchina.sort(ordinaStalli);
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
 * 
 * Nuovo formato dati
*     "Macchina": "L232",
      "Stallo": 3,
      "Stato": 4,
      "DataInizio": "18/05/2021 08:37:18",
      "DataFine": "19/05/2021 14:06:57",
      "LocalCol": "2021-05-20T07:15:00Z"
 * }
 */
function parseStallo(stallo) {
    return {
        macchina: stallo.Macchina,
        nome: ' ' + stallo.Stallo,
        tecnico: stallo.Tecnico || '-',
        prova: stallo.Prova || '-',
        stato: getLabelStatoById(stallo.Stato),
        start: stallo.DataInizio,
        end: stallo.DataFine,
        timestamp: stallo.LocalCol,
        tipo: getTipoStallo(stallo.Macchina, stallo.Stallo)
    };
}

//  Restituisce il tipo di stallo in base alla macchina e nome stallo
function getTipoStallo(macchina, stallo) {
    let result;
    let strStallo = stallo.toString();
    switch (macchina.toUpperCase()) {
        case 'L2020':
            result = TIPI_PRODOTTO.SWITCH;
            break;
        case 'L2021':
            result = TIPI_PRODOTTO.SOCKET;
            break;
        case 'L180':
            //Stalli prese da 1 a 4
            result = ['1', '2', '3', '4'].includes(strStallo)
                ? TIPI_PRODOTTO.SOCKET
                : TIPI_PRODOTTO.SWITCH;
            break;
        case 'L232':
            //Stalli prese
            result = ['3', '4'].includes(strStallo)
                ? TIPI_PRODOTTO.SOCKET
                : TIPI_PRODOTTO.SWITCH;
            break;
    }
    return result;
}

function ordinaStalliMacchina(macchina) {
    macchina.forEach(item => {
        let stallo = parseStallo(item);
        result[stallo.macchina].push(stallo);
    });
}
function ordinaStalli(a, b) {
    if (a.Stallo < b.Stallo) {
        return -1;
    }
    if (a.Stallo > b.Stallo) {
        return 1;
    }
    return 0;
}
