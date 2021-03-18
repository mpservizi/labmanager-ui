/**
 * Risolve il promise dopo il numero dei millisecondi indicato
 * @param {*} ms
 */
export function pausa(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}
