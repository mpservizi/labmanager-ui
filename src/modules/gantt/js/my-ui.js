import MyDate from '@/shared/my-date.js';

/**
 * Crea la lista dei tasks da mostrare per mostrare il dettaglio del task indicato
 * @param {Object} task : task di cui mostrare i dettagli
 * @returns {Array} : lista di array con task semplici da mostrare in ui
 */
export function creaListaTaskDetailUi(task) {
    let listaProve = [];
    let keys = Object.keys(task.prove);
    keys.forEach(idRisorsa => {
        let prove = task.prove[idRisorsa];
        let tasks = [];
        let stallo = '';
        let taskWeek = parseInt(task.week);
        //dettaglio dello stallo è memorizzato nel object prova
        //Visto che tutte le prove appartengono allo stesso idRisorsa, il numro dello dello è sempre uguale
        prove.forEach(prova => {
            if (task.carico == prova.carico) {
                if (
                    prova.start_week == taskWeek ||
                    prova.end_week == taskWeek
                ) {
                    tasks.push(creaObjTask(prova));
                }
            }
            stallo = prova.stallo;
        });

        listaProve.push({
            idRisorsa: idRisorsa,
            titolo: task.macchina + '-' + stallo,
            prove: tasks,
            numProve: tasks.length
        });
    });
    return listaProve;
}
/**
 * Crea campi del tesk disponibili in componente ui
 * @param {*} prova : dati della prova pianificata sulla macchina di ciclatura
 * @returns
 */
function creaObjTask(prova) {
    let result = {
        idRequest: prova.idRequest,
        progetto: prova.progetto,
        txtMacchina: prova.macchina + '-' + prova.stallo,
        desc: prova.sample,
        carico: prova.carico,
        corrente: prova.corrente,
        start_date: MyDate.dateToStr(prova.start_date),
        durata: prova.durata,
        start_week: prova.week,
        end_week: prova.end_week
    };
    //Testo default da mostrare in detail task view
    let msg = `${result.carico}-${result.corrente}A- ${result.durata} giorni -${result.desc}`;
    result.msg = msg;
    return result;
}
