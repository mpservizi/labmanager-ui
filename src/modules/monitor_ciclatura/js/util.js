/**
 * Indica se è trascorso il tempo per eseguire una nuova richiesta dati
 *
 */
/**
 * Indica se sono passi il numero dei secondo indicati rispetto alla data
 * @param {Date} lastUpdate : Data rispetto alla quale calcolare la differenza
 * @param {Number} secondi : numero dei secondi da verificare
 * @returns {Boolean}
 */
export function checkTempo(lastUpdate, secondi) {
    //  primo avvio
    if (lastUpdate == undefined) return true;

    // minore di secondi di pausa
    let diff = new Date() - lastUpdate;
    //  Aggiungo la tolleranza di 500ms sul tempo. Il tempo di loop interval è sempre minore di qualche ms rispetto alla pausa impostata
    if (diff < secondi - 500) return false;

    // maggiore di tempo di pausa
    return true;
}
