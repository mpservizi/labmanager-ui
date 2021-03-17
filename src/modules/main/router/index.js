// import Main from "../views/Main.vue";
import Main from '../views/Apps.vue';
import { LISTA_MODULI } from '@/shared/info-moduli';

LISTA_MODULI.forEach(item => {
    console.log(item);
});

export default [
    { path: '', component: Main }
    // { path: '', component: Main }
];
