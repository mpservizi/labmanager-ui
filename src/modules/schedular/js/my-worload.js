import {    calcolaDatiDurata} from './my-func.js';
/**
 * Calcola il carico per tutte le risorse in base ai task assegnati
 * @param {*} myScheduler 
 * @param {*} eventi 
 */
export function calcolaCaricoRisorse(myScheduler, eventi) {
    let filtri = eventi.filter(item => item.idRisorsa < 50);
    let matrice = [];
    filtri.forEach(item => {
        let caricoTask = ricavaCaricoRisorsaTask(myScheduler, item);
        matrice.push(caricoTask);
    });
    let caricoRisorse = sommaDatiRisorsa(matrice);
    // console.log(JSON.stringify(caricoRisorse));
    // console.log(caricoRisorse);    
    return caricoRisorse;
}

/**
 * Calcola la somma del workload per ogni carico su ciascuna risorsa
 * @param {*} matriceLoads : array con il workload dei singoli task per risorsa
 */
function sommaDatiRisorsa(matriceLoads) {
    let result = {}
    // console.log(matriceLoads);    
    let richiesteAnalizzate = {};
    matriceLoads.forEach(item => {
        //Record per la risorsa nel ogetto globale
        let objRisorsa = result[item.idRisorsa];
        //Inizializzo la chiave id risorsa nel oggetto globale
        if (!richiesteAnalizzate[item.idRisorsa]) {
            richiesteAnalizzate[item.idRisorsa] = {}
        }
        //Se l'ogetto globale non contiene i dati per questa risorsa
        if (!objRisorsa) {
            result[item.idRisorsa] = item.workLoad;
        } else {
            //Ricavo id dei carichi presenti nel array
            let idCarichiItem = Object.keys(item.workLoad);
            //Per ogni carico
            idCarichiItem.forEach(keyCarico => {
                //Estraggo il workload del carico dal item della matrice
                let caricoItem = item.workLoad[keyCarico];
                //Verifico se lo stesso tipo di carico esiste nel oggetto globale
                let caricoGlobale = objRisorsa[keyCarico];
                //Se esite già, vado ad integrare i dati
                if (caricoGlobale) {
                    sommaWorloadTaskInMatrice(caricoGlobale, caricoItem, richiesteAnalizzate, item.idRisorsa);
                } else {
                    //Se il carico non è presente nel oggetto globale
                    //Copio il carico
                    objRisorsa[keyCarico] = caricoItem;
                }
            })
        }
    })

    return result;
}

/**
 * Calcola il totale workload per un carico, integrando i dati del task e matrice carico risorse
 * @param {*} objGlobale : Oggetto con il workload del carico, preso dalla matrice delle risorse
 * @param {*} objLocale : Oggetto con il workload del tak
 * @param {*} richiesteAnalizzate : varibile che tiene traccia delle richieste già analizzate
 */
function sommaWorloadTaskInMatrice(objGlobale, objLocale, richiesteAnalizzate, idRisorsa) {
    //Creo un array con tutti i dati con tutt le chavi del oggetto locale e globale
    let tmpObj = { ...objGlobale, ...objLocale }
    let chiaviWeek = Object.keys(tmpObj);

    //Gli oggeti del workload hanno come chiave il numero della settiamana WK??
    chiaviWeek.forEach(keyWeek => {
        //Estraggo il workload in base alla settimana, valori sono {days:n,idRequest:n}
        let caricoGlobale = objGlobale[keyWeek];
        let caricoLocale = objLocale[keyWeek];

        if (caricoGlobale != undefined && caricoLocale == undefined) {
            // console.log('Wk globale diversa da week task');
            return;
        }
        //la settimana del Carico del task non è presente nel carico globale
        if (caricoGlobale == undefined && caricoLocale != undefined) {
            objGlobale[keyWeek] = caricoLocale;
            return;
        }

        //Loop per ogni valore in 2 array
        //Se entrambi i carichi hanno la stessa settimana
        if (caricoGlobale != undefined && caricoLocale != undefined) {
            caricoGlobale.forEach(objGlobale => {
                caricoLocale.forEach(objLocale => {
                    //Se due carichi appartengono alla stessa richiesta di prova
                    if (objGlobale.idRequest == objLocale.idRequest) {
                        //Sommo i giorni del carico locale in carico globale
                        objGlobale.days += objLocale.days;
                    } else {
                        // Stesso carico ma per una richiesta diversa
                        //Per evitare doppioni, Controllo se ho già analizzato questa test request
                        if (richiesteAnalizzate[idRisorsa][objLocale.idRequest] == undefined) {
                            richiesteAnalizzate[idRisorsa][objLocale.idRequest] = true;
                            caricoGlobale.push(objLocale);
                        }
                    }
                })
            });
        }
    });
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
function ricavaCaricoRisorsaTask(myScheduler, item) {
    let caricoRisorsa = {};
    let arrWorkload = creaArrayCaricoTask(item);
    caricoRisorsa.idRisorsa = item.idRisorsa;
    caricoRisorsa.idTask = item.id;
    caricoRisorsa.workLoad = {
        [item.idCarico]: arrWorkload
    }
    return caricoRisorsa;
}

/**
 * Crea un array indicando i giorni occupati dal task nelle varie settimane
 * @param {*} item : task del schedular
 * @returns {Array} : Array di oggetti. Ogni oggetto ha come chiave il numero di settimana
 */
function creaArrayCaricoTask(item) {
    //Aggiungo i dati della durata al oggetto task
    item.datiDurata = calcolaDatiDurata(item.start_date, item.end_date);
    let startWeek = item.datiDurata.startWeek;
    let endWeek = item.datiDurata.endWeek;
    let durata = item.datiDurata.durata;
    let start_offset = item.datiDurata.start_offset;

    let part1 = 7 - start_offset; //7 = numero di giorni nella settimana in cui inizia il task
    let part2 = durata - part1; // resto dal aggiungere nella settimana successiva


    let keyWeek = creaKeyWeek(startWeek);
    // let arrWorkload = [];

    //Se task è incluso nella stessa settimana
    let giorni = durata;
    if (startWeek != endWeek) {
        //task tra 2 settimane
        giorni = part1;
    }

    let result = {};

    result[keyWeek] = [];
    result[keyWeek].push(creaObjWeek(giorni, item));

    if (part2 > 0) {
        keyWeek = creaKeyWeek(startWeek + 1);
        result[keyWeek] = [];
        result[keyWeek].push(creaObjWeek(part2, item));
    }

    // return arrWorkload;
    return result;
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

/**
 * Crea ogetto dove memorizzare i dati del workload della risorsa
 */
function creaObjWeek(giorni, item) {
    return {
        days: giorni,
        idRequest: item.idRequest,
        start_date:item.datiDurata.weekStartDate
    }
}