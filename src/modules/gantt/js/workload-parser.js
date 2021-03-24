/**
 * Prepara di dati exportati dal schedular, per essere importati in gantt per mostrare il workload generale delle macchine di ciclatura
 */
import MyDate from '@/shared/my-date.js';
import { getRisorsaById } from '@/shared/liste/risorse-ciclatura.js';

export function parseDatiCiclatura(dati) {
    let risorse = groupByRisorsa(dati);
    calcolaDurataCarichi(risorse);
    console.log(risorse);
}

// console.log(dati);
/**
 * Raggruppa le prove dei task per risorsa
 * @param {*} dati : dati esportati dal schedular
 * @returns {object} : Oggetto che ha come chiave id delle risorse, chiave prove contiene le informazioni per ogni prova
 * {
 * idRisorsa:1,
 * macchina:L180,
 * stallo:6,
 * prove:[{taskobj}]
 * }
 */
function groupByRisorsa(dati) {
    let result = {};
    dati.forEach(item => {
        let idRisorsa = item.idRisorsa;
        let itemRisorsa = getRisorsaById(idRisorsa);
        // console.log(itemRisorsa);
        if (!result[idRisorsa]) {
            result[idRisorsa] = {
                idRisorsa: idRisorsa,
                macchina: itemRisorsa.nome_macchina,
                stallo: itemRisorsa.stallo,
                prove: []
            };
        }

        result[idRisorsa].prove.push(creaObjTask(item));
    });

    return result;
}

/**
 * Per ogni risorsa calcola i giorni in cui sono occupati i vari carichi
 * @param {Object} risorse : Oggetto con dati di tutte le risorse
 * @returns : Aggiunge chaive loadCarichi al oggetto risorse, con i dati del workload del carico
 */
function calcolaDurataCarichi(risorse) {
    for (const [idRisorsa, risorsa] of Object.entries(risorse)) {
        let prove = risorsa.prove;
        let loadCarichi = sommaDurataProveCarichi(prove);
        risorsa.loadCarichi = loadCarichi;
    }
}

/**
 * Calcola la durata totale del carico in base alle prove
 * Per ogni prova dello stesso carico vado a sommare la durata
 * Come data di inizio del carico prendo la data  minima delle prove
 * @param {*} prove : array con elenco dei task con i dati delle prove
 * @returns {Object} : Oggetto ha come chiave il tipo di carico e sottochiavi come numero di settimana
 * {
 *   19.1:{
 *         WK10:{durata:4numProve:3,start_date:data}
 *        },
 *   19.2.....
 * }
 */
function sommaDurataProveCarichi(prove) {
    let loadCarichi = {};
    prove.forEach(prova => {
        let carico = prova.carico;

        if (!loadCarichi[carico]) {
            loadCarichi[carico] = {};
        }

        let keyWeek = prova.start_week;
        let obj = loadCarichi[carico];

        if (!obj[keyWeek]) {
            obj[keyWeek] = {
                start_date: null,
                durata: 0,
                numProve: 0
            };
        }
        obj[keyWeek].durata += prova.durata;
        obj[keyWeek].numProve += 1;

        //Seleziono la data minima tra tutti i task dello stesso carico
        let oldDate = obj[keyWeek].start_date;
        let taskDate = prova.start_date;
        let minDate = taskDate;
        if (oldDate && taskDate.getTime() > oldDate.getTime()) {
            minDate = oldDate;
        }
        //Aggiorno la data nel oggetto
        obj[keyWeek].start_date = minDate;
    });
    return loadCarichi;
}

/**
 * Crea oggetto con tutti i dati relative alle prove
 * @param {*} item : task edel schedular
 * @returns
 */
function creaObjTask(item) {
    let data_inizio = parseDate(item.start_date);
    let data_fine = parseDate(item.end_date);

    let result = {
        id: item.id,
        carico: item.carico,
        corrente: item.corrente,
        idRequest: item.idRequest,
        idRisorsa: item.idRisorsa,
        sample: item.text,
        start_date: data_inizio,
        end_date: data_fine,
        start_week: calcolaWeek(data_inizio),
        end_week: calcolaWeek(data_fine),
        durata: calcolaDurataGiorni(data_inizio, data_fine)
    };

    return result;
}

function parseDate(str) {
    return MyDate.strToDate(str);
}

function calcolaWeek(data) {
    return MyDate.getWeekNumber(data);
}

function calcolaDurataGiorni(inizio, fine) {
    let giorni = MyDate.calcolaDifferenzaDateInGiorni(inizio, fine);
    return giorni + 1;
}
