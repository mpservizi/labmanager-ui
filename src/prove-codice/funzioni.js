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

function test_getDurataProva() {
    //19.1
    console.log(getDurataProva(1, 10) == 2);
    console.log(getDurataProva(1, 16) == 4);
    //19.2
    console.log(getDurataProva(2, 10) == 1);
    console.log(getDurataProva(2, 16) == 1);
    //19.2
    console.log(getDurataProva(3, 10) == 2);
    console.log(getDurataProva(4, 16) == 4);
}

function test_calcolaDurataTotale() {
    //19.2
    console.log(calcolaDurataTotale(1, 1) == 1);
    console.log(calcolaDurataTotale(1, 2) == 1);
    //19.1 o 19.3
    console.log(calcolaDurataTotale(2, 1) == 2);
    console.log(calcolaDurataTotale(2, 2) == 2);
    //19.1 o 19.3 + campioni
    console.log(calcolaDurataTotale(2, 3) == 4);
    console.log(calcolaDurataTotale(2, 4) == 4);
}

function avvia_test(){
    console.log('Test durata carico');
    test_getDurataProva();
    console.log('Test durata totale');
    test_calcolaDurataTotale();
    
}

/**
 * Genera i tasks con durata totale per ciascun gruppo di prove
 * @param {Array} testPlan : array con i gruppi i prova
 * @returns {Array} : array con i tasks
 */
function generaTasks(testPlan){
    let tasks = [];
    testPlan.forEach(item=>{
        let durataProva = getDurataProva(item.carico,item.corrente);
        let durataTotale = calcolaDurataTotale(durataProva,item.campioni);
    
        let task = {
            durataTotale:durataTotale,
            durataProva:durataProva,
            ...item
        }
        tasks.push(task);
    
    })
    return tasks;
}

function test_generaTasks(){
    let testPlan = [
        {carico:1,corrente:10,campioni:3},
        {carico:2,corrente:10,campioni:3},
        {carico:3,corrente:10,campioni:3},
    ];

    let tasks = generaTasks(testPlan);
    console.log( tasks);
}
test_generaTasks();