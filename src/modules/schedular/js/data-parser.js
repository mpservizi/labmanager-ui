import { ricavaNomeCaricoDaId, ricavaIdCarico } from './my-func.js';
import MyDate from '@/shared/my-date.js';

// import { calcolaCaricoRisorse } from './my-worload.js';
/**
 * Prepara gli eventi del schedular per salvare sul server
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
            item.start_date.setHours(0);
            item.end_date.setHours(0);
            //Converto la data in millisecondi per fare le querry in base alle date
            let s_t = item.start_date.getTime();
            let e_t = item.end_date.getTime();

            // let data_fine = MyDate.dateToStr(item.end_date);
            // let data_inizio = MyDate.dateToStr(item.start_date);

            let nomeCarico = ricavaNomeCaricoDaId(item.idCarico);
            let modello = {
                id: item.id,
                idRisorsa: item.idRisorsa,
                text: item.text,
                corrente: item.corrente,
                idRequest: item.idRequest,
                progetto: item.progetto,
                stato: item.stato,
                descrizione: item.descrizione,
                gruppo:item.gruppo, //gruppo test program
                //Nel db salvo il titolo del carico
                carico: nomeCarico,
                s_t:s_t,//Data start in millisecondi
                e_t:e_t,//Data end in millisecondi
                //Date in formato testo è usata dal planner
                // start_date: data_inizio,
                // end_date: data_fine,
                // time: {
                //     end_date: data_fine,
                //     start_date: data_inizio
                // }
            };

            lista.push(modello);
        });

        // json = JSON.stringify(lista);
        json = lista;
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
            let s_d,e_d;
            //Se è memorizzato il tempo in millisecondi uso quello per creare la data
            if(item.s_t && item.e_t){
                s_d = new Date(item.s_t);
                e_d = new Date(item.e_t);
            }else{
                //Per mantenere la compatibilità con dati esistenti uso la data memorizzata
                s_d = MyDate.strToDate(item.start_date);
                e_d = MyDate.strToDate(item.end_date);    
            }
            //Imposto ora per evitare bug reszise on drag
            s_d.setHours(0);
            e_d.setHours(0);
            let idCarico = ricavaIdCarico(item.carico);

            return {
                id: item.id,
                idRisorsa: item.idRisorsa,
                text: item.text,
                corrente: item.corrente,
                idRequest: item.idRequest,
                progetto: item.progetto,
                stato: item.stato,
                descrizione: item.descrizione,
                gruppo:item.gruppo, //gruppo test program
                //nel task memorizzo id del carico
                idCarico: idCarico,
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
                key: item._id, //obbligatorio
                label: item.label //obbligatiorio
            };
        });

        return dati;
    } catch (error) {
        console.log(error);
        console.log('Errore parsing lista risorse dal server');
    }

    return [];
}