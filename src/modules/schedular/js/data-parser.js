import { parse } from 'date-and-time';
import {
    strToDate,
    dateToStr,
    ricavaNomeCaricoDaId,
    ricavaIdCarico,
    calcolaDatiDurata
} from './my-func.js';
/**
 * Converte gli eventi del schedular in json per salvare sul server
 * @param {*} eventi
 */
export function eventiToJson(eventi) {
    let json = '[]';
    //    Eventi è oggento composto da tutti gli eventi del schedular
    //    ogni voce del oggetto è uguale al id del evento

    try {
        let lista = [];
        let keys = Object.keys(eventi);
        //Per ogni evento
        keys.forEach(key => {
            let item = eventi[key];
            if (!item.idRisorsa) {
                console.log('Id risorsa non valido');
                return;
            }
            //campi modificati prima di salvare sul server
            let data_fine = dateToStr(item.end_date);
            let data_inizio = dateToStr(item.start_date);
            let nomeCarico = ricavaNomeCaricoDaId(item.idCarico);

            let modello = {
                id: item.id,
                idRisorsa: parseInt(item.idRisorsa),
                text: item.text,
                corrente: parseInt(item.corrente),
                carico: nomeCarico,
                idRequest: parseInt(item.idRequest),
                start_date: data_inizio,
                end_date: data_fine,
                time: {
                    end_date: data_fine,
                    start_date: data_inizio
                }
            };

            lista.push(modello);
        });

        json = JSON.stringify(lista);
    } catch (error) {
        console.log(error);
        console.log('Errore conversione eventi in Json');
    }

    return json;
}

/**
 * Convert gli eventi ricevuti dal server, in eventi per schedular
 * @param {*} json : dati restituiti dal server
 */
export function parseEventiServer(datiServer) {
    try {
        let dati = datiServer.map(item => {
            //campi modificati prima di caricare nel schedular
            let s_d = strToDate(item.start_date);
            let e_d = strToDate(item.end_date);
            //Imposto ora per evitare bug reszise on drag
            s_d.setHours(13);
            e_d.setHours(20);
            let idCarico = ricavaIdCarico(item.carico);

            return {
                id: item.id,
                idRisorsa: item.idRisorsa,
                text: item.text,
                corrente: item.corrente,
                idCarico: idCarico,
                idRequest: item.idRequest,
                start_date: s_d,
                end_date: e_d,
                time: {
                    start_date: s_d,
                    end_date: e_d
                }
            };
        });
        return dati;
    } catch (error) {
        console.log(error);
        console.log('Errore parsing dati server');
        return [];
    }
}

/**
 * Converte la lista delle risorse ricevute dal server in risorse schedular
 * @param {*} datiServer
 * @returns
 */
export async function parseRisorse(datiServer) {
    try {
        //Creo array rinominando i campi del array ricevuto
        let dati = datiServer.map(item => {
            return {
                key: item.id, //obbligatorio
                label: item.nome_macchina, //obbligatiorio
                // id_macchina: item.id_macchina,
                stallo: item.stallo
            };
        });

        // console.log(dati);
        return dati;
    } catch (error) {
        console.log(error);
        console.log('Errore parsing lista risorse dal server');
    }

    return [];
}

/**
 * Calcola il carico per tutte le risorse in base ai task assegnati
 * @param {*} myScheduler 
 * @param {*} eventi 
 */
export function calcolaCaricoRisorse(myScheduler, eventi) {
    let caricoRisorse = {};
    eventi.forEach(item => {
        let caricoTask=ricavaCaricoRisorsaTask(myScheduler, caricoRisorse, item);
        sommaCaricoTaskAlWorkloadRisorse(caricoRisorse,item.idRisorsa,caricoTask);
    });
    return caricoRisorse;
}

/**
 * Aggiunge il valore alla chiave del oggetto indicato
 * @param {*} obj : oggetto in cui inserire
 * @param {*} key : chiave dove sommare
 * @param {*} valore : valore da sommare al valore esistente nella chiave
 */
function addValoreInKey(obj, key, valore) {
    //Se il valore della chiave non esisto, imposto 0
    if (!obj[key]) {
        obj[key] = 0;
    }
    //Aggiungo il valore
    obj[key] += valore;
}

/**
 * Calcola il carico della risorsa per il task indicato
 * @param {*} myScheduler
 * @param {object} workLoad : Oggetto dove aggiornare i dati
 * @param {*} item : task del schedular
 * @returns
 * Risultato è un oggetto che per chiave ha id della risorsa
 * come valore un oggetto che ha come chiave il numero della settimana e come valore il giorno dei giorni occupati dal task
 */
function ricavaCaricoRisorsaTask(myScheduler, workLoad, item) {
    let caricoRisorsa = {};
    //Aggiungo i dati della durata al oggetto task
    item.datiDurata = calcolaDatiDurata(item.start_date, item.end_date);

    let startWeek = item.datiDurata.startWeek;
    let endWeek = item.datiDurata.endWeek;
    let durata = item.datiDurata.durata;
    let start_offset = item.datiDurata.start_offset;

    let part1 = 7 - start_offset; //7 = numero di giorni nella settimana in cui inizia il task
    let part2 = durata - part1; // resto dal aggiungere nella settimana successiva

    //Se task è incluso nella stessa settimana
    let keyWeek = creaKeyWeek(startWeek);
    let giorni = durata;
    if (startWeek != endWeek) {
        //task tra 2 settimane
        giorni = part1;
    }
    //Sommo il carico di lavoro
    addValoreInKey(caricoRisorsa, keyWeek, giorni);

    if (part2 > 0) {
        keyWeek = creaKeyWeek(startWeek + 1);
        addValoreInKey(caricoRisorsa, keyWeek, part2);
    }
    return caricoRisorsa;
}

/**
 * Somma il carico del task nella lista del carico di tutte le risorse
 * @param {*} workLoad : lista con carico di tutte le risorse
 * @param {*} idRisorsa : id della risorsa a cui sommare
 * @param {*} caricoRisorsa : carico da sommare
 */
function sommaCaricoTaskAlWorkloadRisorse(workLoad, idRisorsa, caricoRisorsa) {
    //aggiungere il carico della risorsa ai valori già presenti nella lista
    let objRisorsa = workLoad[idRisorsa];
    //Se oggetto non è presente nella lista assegno i carico calcolato
    if (!objRisorsa) {
        workLoad[idRisorsa] = caricoRisorsa;
    } else {
        //se è presente devo aggiornar ei singoli valori delle settimane
        Object.keys(caricoRisorsa).forEach(key => {
            addValoreInKey(objRisorsa, key, caricoRisorsa[key]);
        });
    }
}

/**
 * Crea la chiave da usare nell'oggetto per rappresentare il numero di settimana
 * @param {*} numWeek 
 */
function creaKeyWeek(numWeek) {
    let prefix = 'WK';
    if (numWeek < 10) {
        prefix = prefix + '0';
    }
    return prefix + numWeek;
}
