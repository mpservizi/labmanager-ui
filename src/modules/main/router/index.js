import AppsView from '../views/Apps.vue';
// import GanttView from 'Moduli/gantt/views/Main.vue';
import MacchinaPage from 'Moduli/monitor_ciclatura/views/MacchinaView.vue';
// import { LISTA_MODULI } from '@/shared/info-moduli';

// LISTA_MODULI.forEach(item => {
//     console.log(item);
// });

export default [
    {
        path: '',
        component: MacchinaPage,
        name: 'home'
    },
    {
        path: '/apps',
        component: AppsView,
        name: 'apps'
    }
];
