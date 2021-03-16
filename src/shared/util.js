/**
 * Risolve il promise dopo il numero dei millisecondi indicato
 * @param {*} ms
 */
async function pausa(ms) {
  return new Promise(function(resolve) {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
