import Router from "./router";
import Store from "./store";

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
  return await Store.dispatch(modulo.name + "/init", null, { root: isRoot });
}
