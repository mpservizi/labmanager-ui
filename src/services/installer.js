import Router from './router';
import Store from './store';

/**
 * Registra il modulo nell'applicazione Vue principale
 * @param {object} modulo : modulo da registrare
 * @param {Boolean} isRoot : se deve essere registrato come globale
 */
export async function RegistraModulo(modulo, isRoot) {
    //Registra modulo in store globale
    Store.registerModule(modulo.name, modulo.store);
    //Aggiungo i routes nel routerr globale
    modulo.routes.forEach(item => {
        Router.addRoute(item);
    });
    //Lancio action per inizializzare il modulo
    if (!isRoot) {
        isRoot = false;
    } else {
        isRoot = true;
    }
    return await Store.dispatch(modulo.name + '/init', null, { root: isRoot });
}

/**
 * Importa e registra il modulo in base al nome della cartella in modules folder
 * @param {String} nomeCartella : nome della cartella che contiene il modulo
 * @param {Boolean} isRoot : se registrare modulo con frag root
 * @returns
 */
export async function importaAndRegistra(nomeCartella, isRoot) {
    //Import lo script dalla cartella moduli in base al nome della cartella
    //Moduli viene risolto da webpack alla cartella src/modules
    let script = await import(`Moduli/${nomeCartella}/module.js`);
    //Estraggo oggetto default esportato dallo script
    let modulo = script.default;
    await RegistraModulo(modulo, isRoot);
    return true;
}
