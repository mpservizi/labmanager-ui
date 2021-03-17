import store from './store';
import routes from './router';
import { NOME_MODULO } from './costanti.js';

export const Modulo = {
    name: NOME_MODULO,
    store: store,
    routes: routes
};
