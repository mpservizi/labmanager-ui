import MacchinaPage from '../views/Ciclatura/MacchinaView.vue';
import StalloDetailPage from '../views/Ciclatura/StalloDetail.vue';
export default [
    {
        path: '/monitor_ciclatura',
        name: 'monitor_ciclatura',
        component: MacchinaPage,
        meta: {
            breadcrumb: [
                { name: 'Homepage', link: 'home' },
                { name: 'Monitor ciclatura' }
            ]
        }
    },
    {
        path: '/detail',
        name: 'detail',
        component: StalloDetailPage,
        props: true
    }
];
