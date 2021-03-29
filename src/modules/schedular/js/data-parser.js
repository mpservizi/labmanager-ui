import { ricavaNomeCaricoDaId, ricavaIdCarico } from './my-func.js';
import MyDate from '@/shared/my-date.js';

// import { calcolaCaricoRisorse } from './my-worload.js';
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
            // let data_fine = dateToStr(item.end_date);
            // let data_inizio = dateToStr(item.start_date);
            let data_fine = MyDate.dateToStr(item.end_date);
            let data_inizio = MyDate.dateToStr(item.start_date);
            let nomeCarico = ricavaNomeCaricoDaId(item.idCarico);

            let modello = {
                id: item.id,
                idRisorsa: parseInt(item.idRisorsa),
                text: item.text,
                corrente: parseInt(item.corrente),
                carico: nomeCarico,
                sampleCode: item.sampleCode,
                titolo: item.titolo,
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
            // let s_d = strToDate(item.start_date);
            // let e_d = strToDate(item.end_date);
            let s_d = MyDate.strToDate(item.start_date);
            let e_d = MyDate.strToDate(item.end_date);
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
                sampleCode: item.sampleCode,
                titolo: item.titolo,
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
 * Converte il workload delle risorse in json per salvare sul server
 */
// function workloadToJson(myScheduler, eventi) {
//     let json = '[]';
//     let workloadRisorse = calcolaCaricoRisorse(myScheduler, eventi);
//     try {
//         json = JSON.stringify(workloadRisorse);
//     } catch (error) {
//         console.log(error);
//     }
//     return json;
// }
