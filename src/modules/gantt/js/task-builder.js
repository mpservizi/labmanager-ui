/**
 * Crea tasks da caricare nel gantt per mostrare il workload delle ciclature
 */
import { getGruppiCiclatura } from '@/shared/liste/risorse-ciclatura.js'

export function creaTasksGanttWorkload(risorse) {
    let tasksRisorse = creaTaskProgetto();
    let tasksWorkload = creaTasksWorload(risorse);
    let tasks = [...tasksRisorse,...tasksWorkload];
    return tasks;
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
    /**
     * idRisorsa: 1
        loadCarichi: {19.3: {…}}
        macchina: "L180"
        prove: (4) [{…}, {…}, {…}, {…}]
        stallo: 6
     */

    /**
     * loadCarichi:
       19.3:
       10: {start_date: Tue Mar 09 2021, durata: 4, numProve: 2}
       11: {start_date: Wed Mar 17 2021, durata: 2, numProve: 2}
     */

     let tasks = [];
    for (const [, risorsa] of Object.entries(risorse)) {
        let loadCarichi = risorsa.loadCarichi;        
        Object.keys(loadCarichi).forEach(keyCarico => {
            let valori = loadCarichi[keyCarico];
            let tasksCarico =creaTasksWorkloadCarico(keyCarico, valori,risorsa);
            tasks.push(...tasksCarico);
        })
    }
    return tasks;
}

/**
 * Crea i task per cui in carico indicato è occupato
 * @param {*} keyCarico : key per carico 19.1
 * @param {*} valoriCarico : dati di workload per ogni settimana
 * @param {*} risorsa : oggetto con tutti i valori
 */
function creaTasksWorkloadCarico(keyCarico, valoriCarico,risorsa) {
    let tasks = [];
    Object.keys(valoriCarico).forEach(keyWeek => {
        let valori = valoriCarico[keyWeek];
        let task = buildTaskProva(valori);
        task.week = keyWeek;
        task.carico = keyCarico;
        task.text = keyCarico;
        task.parent = risorsa.idRisorsa;
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
    }
    return modello;
}
