/**
 * Genera i tasks con durata totale per ciascun gruppo di prove
 * @param {Array} testPlan : array con i gruppi i prova
 * @returns {Array} : array con i tasks
 */
 function generaTasks(testPlan,data_inizio){
    let tasks = [];
    testPlan.forEach(item=>{
        let durataProva = getDurataProva(item.carico,item.corrente);
        let durataTotale = calcolaDurataTotale(durataProva,item.campioni);
    
        let task = {
            durataProva:durataProva,
            duration:durataTotale,
            text: '19.' + item.carico,
            start_date : data_inizio,
            ...item
        }
        tasks.push(task);
    
    })
    return tasks;
}
/**
 * Restituisce al durata in giorni del carico di ciclatura
 * @param {*} carico
 * @param {*} corrente
 * @returns
 */
 function getDurataProva(carico, corrente) {
    if (carico == 2) return 1;
    if (corrente == 10) return 2;
    return 4;
}

/**
 * Calcoal la durata totale in base al numero dei campioni
 * @param {*} durata : durata prova
 * @param {*} campioni : numero dei campioni da testare
 * @returns
 */
function calcolaDurataTotale(durata, campioni) {
    //Nessun campione
    if (campioni < 1) return 0;

    //Se 1 campione ha la stessa durata di 2 campioni
    if (campioni == 1) {
        campioni = 2;
    }

    //Se campioni sono dispari arrototndo al successivo pari
    if (campioni % 2) {
        campioni++;
    }
    //2 campioni possono lavorare in // quindi è come se la qty fosse la metà
    return durata * (campioni / 2);
}

export default {
    generaTasks
}