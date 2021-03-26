/**
 * Crea tasks da caricare nel gantt per mostrare il workload delle ciclature
 */
import { getGruppiCiclatura } from '@/shared/liste/risorse-ciclatura.js';
const TIPI_CARICHI = ['19.1', '19.2', '19.3'];

export function creaTasksGanttWorkload(risorse) {
    let tasksRisorse = creaTaskProgetto();
    // debugger;
    let datiGruppo = raggruppaDati(risorse);
    //Come creare il task a video per il gruppo? da fare
    let tasksWorkload = creaTasksWorload(datiGruppo);
    let tasks = [...tasksRisorse, ...tasksWorkload];
    return tasks;
}

/**
 * Raggruppa i dati in base ai gruppi di ciclatura
 * @param {*} risorse : dati delle risorse
 */
function raggruppaDati(risorse) {
    let keysRisorse = Object.keys(risorse);
    let result = {};
    keysRisorse.forEach(idRisorsa => {
        let durataCarico = 0;
        let datiRisorsa = risorse[idRisorsa];

        let gruppo = getGruppoByIdRisorsa(idRisorsa);
        if (!result[gruppo]) {
            result[gruppo] = {
                dati: []
            };
        }

        let objGruppo = result[gruppo];
        TIPI_CARICHI.forEach(tipo => {
            if (datiRisorsa.loadCarichi[tipo]) {
                objGruppo[tipo] = datiRisorsa.loadCarichi[tipo];
            }
        });
        objGruppo.gruppo = gruppo;
        objGruppo.macchina = datiRisorsa.macchina;
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
        TIPI_CARICHI.forEach(tipo => {
            let loadCarichi = risorsa[tipo];
            if (loadCarichi) {
                let tasksCarico = creaTasksWorkloadCarico(
                    tipo,
                    loadCarichi,
                    risorsa
                );
                tasks.push(...tasksCarico);
            }
        });
    }
    // let tmp = [1, 2];
    // for (const [, risorsa] of Object.entries(risorse)) {
    //     let loadCarichi = risorsa.loadCarichi;
    //     if (!tmp.includes(risorsa.idRisorsa)) continue;
    //     Object.keys(loadCarichi).forEach(keyCarico => {
    //         let valori = loadCarichi[keyCarico];
    //         let tasksCarico = creaTasksWorkloadCarico(
    //             keyCarico,
    //             valori,
    //             risorsa
    //         );
    //         tasks.push(...tasksCarico);
    //     });
    // }
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
        // task.prove = risorsa.prove;
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
    let modello = {
        start_date: workload.start_date,
        duration: workload.durata,
        numProve: workload.numProve
    };
    return modello;
}
