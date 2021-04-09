import MacchinaPage from 'Moduli/monitor_ciclatura/views/MacchinaView.vue';
import StalloDetailPage from 'Moduli/monitor_ciclatura/views/StalloDetail.vue';
export default [
    {
        path: '/monitor_ciclatura',
        name: 'monitor_ciclatura',
        component: MacchinaPage
    },
    {
        path: '/detail',
        name: 'detail',
        component: StalloDetailPage,
        props: true
    }
];
