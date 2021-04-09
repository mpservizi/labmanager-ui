import AppsView from '../views/Apps.vue';
// import GanttView from 'Moduli/gantt/views/Main.vue';
import MacchinaPage from 'Moduli/monitor_ciclatura/views/Ciclatura/MacchinaView.vue';
// import { LISTA_MODULI } from '@/shared/info-moduli';

// LISTA_MODULI.forEach(item => {
//     console.log(item);
// });

export default [
    {
        path: '',
        component: MacchinaPage,
        name: 'home',
        meta: {
            breadcrumb: [{ name: 'Homepage' }]
        }
    },
    {
        path: '/apps',
        component: AppsView,
        name: 'apps',
        meta: {
            breadcrumb: [{ name: 'Homepage' }]
        }
    }
];
