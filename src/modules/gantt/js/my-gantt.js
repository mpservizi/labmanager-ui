import { gantt } from '../libs/gantt/dhtmlxgantt.js';

/**
 * Funzione custom da chiamare prima di init gantt
 * @param {*} callback : funzione che riceve come parametro instanza di gantt
 */
function preconfig(callback) {
    callback(gantt);
}

/**
 * Inizializza il gantt nel contenitore indicato
 * @param {*} divContainer 
 */
function init(divContainer) {
    gantt.init(divContainer);
}

/**
 * Carica nel gantt i dati indicati
 * @param {*} dati 
 */
function parseDati(dati) {
    gantt.parse(dati);
}

/**
 * Esegue in render del gantt
 */
function render() {
    gantt.render();
}

/**
 * Crea il task nel gantt con i parametri ini
 * @param {Object} taskParams : Oggetto con i parametri del task 
 * @returns 
 */
function creaTask(taskParams) {
    let taskId = gantt.addTask(taskParams);
    return taskId;
}

export default {
    preconfig,
    init,
    parseDati,
    render,
    creaTask
};
