import MacchinaPage from '../views/Ciclatura/MacchinaView.vue';
import StalloDetailPage from '../views/Ciclatura/StalloDetail.vue';
export default [
    { path: '/', name: 'macchina', component: MacchinaPage },
    {
      path: '/detail',
      name: 'detail',
      component: StalloDetailPage,
      props: true
    }
];
