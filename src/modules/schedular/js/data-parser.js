import { parse } from 'date-and-time';
import {
    strToDate,
    dateToStr,
    ricavaNomeCaricoDaId,
    ricavaIdCarico,
    calcolaDifferenzaDateInGiorni
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

export function calcolaCaricoRisorse(myScheduler, eventi) {
    let caricoRisorse = {};
    debugger;
    eventi.forEach(item => {
        ricavaCaricoRisorsaTask(myScheduler, caricoRisorse, item);
    });
    console.log(caricoRisorse);
    return;
    // console.log(eventi);
    // let taskWk = eventi.filter(item => item.startWeek == 9);
    // console.log(taskWk);

    console.log(tasksRisorsa);
    console.log(settimane);
}

function addDatiDurata(myScheduler, item) {
    item.startWeek = myScheduler.date.getISOWeek(item.start_date);
    item.endWeek = myScheduler.date.getISOWeek(item.end_date);
    item.durata =
        calcolaDifferenzaDateInGiorni(item.start_date, item.end_date) + 1;

    //Indica il numero dei giorni liberi tra inzio settimana e inizio task
    let weekStartDate = gantt.date.week_start(item.start_date);
    item.start_offset = calcolaDifferenzaDateInGiorni(
        weekStartDate,
        item.start_date
    );
}

function addValoreInKey(obj, key, valore) {
    if (!obj[key]) {
        obj[key] = 0;
    }
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
    addDatiDurata(myScheduler, item);
    //Se task è incluso nella stessa settimana
    if (item.startWeek == item.endWeek) {
        addValoreInKey(caricoRisorsa, item.startWeek, item.durata);
    } else {
        //task tra 2 settimane
        //nella prima settimana aggiungo i giorni disponibili
        let part1 = 7 - item.start_offset; //7 = numero di giorni nella settimana
        let part2 = item.durata - part1; // resto dal aggiungere nella settimana successiva

        //Ad oggin non è gestitito il task più lungo di 2 settimane perchè nessuna prova dura così tanto
        addValoreInKey(caricoRisorsa, item.startWeek, part1);
        //nella settimana successiva aggiungo i giorni rimanenti
        addValoreInKey(caricoRisorsa, item.startWeek + 1, part2);
    }

    //aggiungere il carico della risorsa ai valori già presenti nella lista
    let objRisorsa = workLoad[item.idRisorsa];
    //Se oggetto non è presente nella lista assegno i carico calcolato
    if (!objRisorsa) {
        workLoad[item.idRisorsa] = caricoRisorsa;
    } else {
        console.log(workLoad);
        console.log(objRisorsa);
        console.log(caricoRisorsa);
        //se è presente devo aggiornar ei singoli valori delle settimane
        // Object.keys(caricoRisorse).forEach(key => {
        //     let week = parseInt(key);
        //     let giorni = caricoRisorse[week];
        //     addValoreInKey(objRisorsa, key, caricoRisorsa[key]);
        // });

        //Aggiorno oggetto nella lista
        workLoad[item.idRisorsa] = objRisorsa;
    }
}
