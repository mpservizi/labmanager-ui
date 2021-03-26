/**
 * Crea tasks da caricare nel gantt per mostrare il workload delle ciclature
 */
import { getGruppiCiclatura } from '@/shared/liste/risorse-ciclatura.js';
const TIPI_CARICHI = ['19.1', '19.2', '19.3'];

/**
 * Crea i task per caricare nel gant con metodo parse
 * @param {*} risorse : dati del schedular formattati da workload-parser
 * @returns {Array} : array di tasks
 */
export function creaTasksGanttWorkload(risorse) {
    //I gruppi di ciclatiura sono rappresentati come task di tipo progetto
    let tasksRisorse = creaTaskProgetto();
    //Ragruppo i task workload risorse in gruppi di ciclatura
    let datiGruppo = raggruppaRisorseInGruppiCiclatura(risorse);
    //Creo i task del gantt in base ai dati raggruppati
    let tasksWorkload = creaTasksWorload(datiGruppo);
    //Unisco tutti i task in un array
    let tasks = [...tasksRisorse, ...tasksWorkload];
    return tasks;
}

/**
 * Raggruppa i dati delle risorse in vari gruppi di ciclatura
 * @param {*} risorse : dati delle risorse
 * @returns {Object} : Oggetto che ha come chiave id gruppo e contiene i dati delle risorse
 */
function raggruppaRisorseInGruppiCiclatura(risorse) {
    let result = {};
    //Ogni key del oggetto rappresenta id della risorsa
    let keysRisorse = Object.keys(risorse);
    //Loop risorse
    keysRisorse.forEach(idRisorsa => {
        //Gli stalli di ciclatura sono divisi in 7 gruppi
        let gruppo = getGruppoByIdRisorsa(idRisorsa);
        let datiRisorsa = risorse[idRisorsa];
        //Inizializzo key gruppo se non esiste
        if (!result[gruppo]) {
            result[gruppo] = {
                dati: [],
                prove: {}
            };
        }
        //Recupero oggetto
        let objGruppo = result[gruppo];
        //Copio il workload per ogni tipo di carico
        TIPI_CARICHI.forEach(tipo => {
            // console.log(idRisorsa);
            let caricoRisorsa = datiRisorsa.loadCarichi[tipo];
            //Se la risorsa contiene questo tipo di carico, copio il workload del carico
            if (caricoRisorsa) {
                //se la risorsa contiene già questo tipo di carico, viene sovrascritto con nuovo valore.
                //Esempio se i due stalli del gruppo hanno durata diversa bisogna scegliere quella che dura di più
                //TODO:
                let caricoEsistente = objGruppo[tipo];
                if (caricoEsistente) {
                    try {
                        //Per verificare il carico che dura di più
                        //Creo un array con elenco del numero di settimana ci ciascuna risorsa
                        let weeksEsitente = Object.keys(caricoEsistente);
                        let weeksRisorsa = Object.keys(caricoRisorsa);
                        //Confronto quale array ha l'ultimo valore maggiore.
                        let a = parseInt(
                            weeksEsitente[weeksEsitente.length - 1]
                        );
                        let b = parseInt(weeksRisorsa[weeksRisorsa.length - 1]);
                        if (a > b) {
                            objGruppo[tipo] = caricoEsistente;
                        }
                    } catch (error) {
                        console.log('Errore Ricerca settimana massima');
                        console.log(error);
                    }
                } else {
                    objGruppo[tipo] = caricoRisorsa;
                }
            }
        });

        //Imposto i parametri del oggetto da aggiungere nel risultato
        objGruppo.gruppo = gruppo; //il gruppo viene usato come parametro parent del task
        objGruppo.prove[idRisorsa] = datiRisorsa.prove; //dati dei singoli task schedular
        objGruppo.macchina = datiRisorsa.macchina; //nome della macchina
        objGruppo.dati.push(datiRisorsa);
    });
    return result;
}

function getGruppoByIdRisorsa(idRisorsa) {
    let gruppiCiclatura = getGruppiCiclatura();
    let idRisorsaInt = parseInt(idRisorsa);
    for (let i = 0; i < gruppiCiclatura.length; i++) {
        const item = gruppiCiclatura[i];
        if (item.idsRisorse.includes(idRisorsaInt)) {
            return item.id;
        }
    }
}

/**
 * Crea i task progetto che rappresentano le varie postazion di cilatura
 */
function creaTaskProgetto() {
    let result = [];
    let gruppi = getGruppiCiclatura();
    gruppi.forEach(item => {
        let task = buildTaskProgetto(item.id, item.label);
        result.push(task);
    });
    return result;
}

/**
 * Crea i task che rappresentano il worload delle varie postazioni
 */
function creaTasksWorload(risorse) {
    let tasks = [];

    for (const [idRisorsa, risorsa] of Object.entries(risorse)) {
        TIPI_CARICHI.forEach(tipoCarico => {
            let loadCarichi = risorsa[tipoCarico];
            if (loadCarichi) {
                let tasksCarico = creaTasksWorkloadCarico(
                    tipoCarico,
                    loadCarichi,
                    risorsa
                );
                tasks.push(...tasksCarico);
            }
        });
    }
    return tasks;
}

/**
 * Crea i task per cui in carico indicato è occupato
 * @param {*} keyCarico : key per carico 19.1
 * @param {*} valoriCarico : dati di workload per ogni settimana
 * @param {*} risorsa : oggetto con tutti i valori
 */
function creaTasksWorkloadCarico(keyCarico, valoriCarico, risorsa) {
    let tasks = [];
    Object.keys(valoriCarico).forEach(keyWeek => {
        let valori = valoriCarico[keyWeek];
        let task = buildTaskProva(valori);
        task.week = keyWeek;
        task.carico = keyCarico;
        task.text = keyCarico;
        task.parent = risorsa.gruppo;
        task.prove = risorsa.prove;
        // task.stallo = risorsa.stallo;
        task.macchina = risorsa.macchina;
        tasks.push(task);
    });
    return tasks;
}

/**
 * Crea il task progetto
 * @param {*} id
 * @param {*} label
 */
function buildTaskProgetto(id, label) {
    let result = {
        id: id,
        text: label,
        type: 'project',
        render: 'split',
        parent: 0
    };
    return result;
}

/**
 * Crea il task che rappresenta il worload del carico nel gantt
 * @param {*} workload : dati su workload
 */
function buildTaskProva(workload) {
    //Se utilizzo end date il task finisce un giorni prima graficamente
    //Il valore di durata viene incrementato di 1 nel workload parser
    let modello = {
        start_date: workload.start_date,
        duration: workload.durata,
        // end_date: workload.end_date,
        numProve: workload.numProve
    };
    return modello;
}
