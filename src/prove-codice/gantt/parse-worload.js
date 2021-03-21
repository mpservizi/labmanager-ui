import MyDate from '@/shared/my-date.js';
export function parseWorload(dati) {
    let result = {
        data: [],
        links: []
    }
    let tasksRisorse = loopRisorse(dati);
    result.data = tasksRisorse;
    return result;
}

/**
 * Crea i gantr task per ogni risorsa 
 * @param {*} dati : dati worload delle risorse
 */
function loopRisorse(dati) {
    let cont = 20;
    let tmpObj = {}; //Oggetto per scambio dati con nested loop
    let tasks = [];
    //Ogni key rappresenta id della risorsa
    let keys = Object.keys(dati);
    keys.forEach(idRisorsa => {
        // if (idRisorsa != 3) return;

        let datiRisorsa = dati[idRisorsa];
        tmpObj.idRisorsa = idRisorsa;
        //Crea i task per ogni carico
        let taskCarichi = loopCarichi(datiRisorsa, tmpObj);
        tasks = tasks.concat(taskCarichi);
    });

    return tasks;
}

/**
 * Genera gantt task per ogni carico della risorsa
 * @param {*} datiRisorsa : dati dei carichi della risorsa
 * @param {*} tmpObj : oggetto per scambiare i dati tra i nested loop
 * @returns {Array} : Array con i task 
 */
function loopCarichi(datiRisorsa, tmpObj) {
    let idCarichi = Object.keys(datiRisorsa);
    let result = [];
    idCarichi.forEach(idCarico => {
        let datiCarico = datiRisorsa[idCarico];
        tmpObj.idCarico = idCarico;
        //Genera i task per le varie settimane
        let tasks = loopWeeks(datiCarico, tmpObj);
        result = result.concat(tasks);
    });

    return result;
}

/**
 * Genera i gant task per ogni settimana di workload per del carico
 * @param {*} datiCarico : dati di workload del carico
 * @param {*} tmpObj : oggetto per scambiare i dati tra i nested loop
 * @returns {Array} : Array con i task
 */
function loopWeeks(datiCarico, tmpObj) {
    let tasks = [];
    let idWeeks = Object.keys(datiCarico);
    //Per ogni settimana crea un gant task
    idWeeks.forEach(numWeek => {
        let workload = datiCarico[numWeek];
        let taskWeek = creaTaskWeekWorkload(workload,numWeek, tmpObj);
        tasks.push(taskWeek);
    });

    return tasks;
}

/**
 * Crea il gantt task per il carico di lavoro settimanale del carico
 * In caso di più task per lo stesso carico perchè hanno test resquest diversa, vengono sommati i giorni
 * Oggetto Worload viene copiato sotto il campo details del task generato 
 * @param {*} workload : oggetto con dati del worload della settimana
 * @param {*} keyWeek : testo che indica il numero di settimana WK??
 * @param {*} tmpObj : oggetto con riferimenti a oggetti parent. le chiavi di questo sono copiate nel oggetto details del task
 * @returns {Object} : Task per il gantt
 */
function creaTaskWeekWorkload(workload, keyWeek,tmpObj) {
    // Workload contiene i dati per ogni test request. Fanno parte dello stesso carico
    //Creo un unico task per worload settimanale del carico
    //Memorrizzo le informazioni nel task
    let durata = 0;
    let data_inizio = null
    let details = [];

    workload.forEach(item => {
        durata += item.days;
        if (!data_inizio) {
            data_inizio = item.start_date;
        }
        details.push(item);
    });

    //Ricavo il numero di settimana da WK??
    let numWeek= parseInt(keyWeek.substr(-2));
    //Prendo ultime 4 cifre dal testo per estrarre anno
    let anno = parseInt(data_inizio.substr(-4));
    //Calcolo la data di inizio settimana
    let start_date = MyDate.getDateOfWeek(numWeek,anno);
    
    //Creo il task gantt con dati calcolati    
    let task = creaTask(start_date, durata);
    task.text = `R:${tmpObj.idRisorsa} C:${tmpObj.idCarico} ${keyWeek}`;
    //Salvo i dati addizionali nel task
    task.details = {...tmpObj,workload:workload};
    return task;
}

/**
 * Crea il task per gantt
 * @param {Date} start_date 
 * @param {int} durata 
 */
function creaTask(start_date, durata) {
    let task = {
        text: 'New task',
        start_date: start_date,
        duration: durata
    }
    return task;
}