/**
 * Restituisce al durata in giorni del carico di ciclatura
 * @param {Number} idCarico
 * @param {Number} corrente
 * @returns
 */
export function getDurataProva(idCarico, corrente) {
    if (idCarico == 2) return 1;
    if (corrente == 10) return 2;
    return 4;
}
/**
 * Calcoal la durata totale in base al numero dei campioni
 * @param {*} durata : durata prova
 * @param {*} campioni : numero dei campioni da testare
 * @returns
 */
export function calcolaDurataTotale(durata, campioni) {
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
