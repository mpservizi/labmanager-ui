import Main from '../views/Main.vue';
import TestRequestView from '../views/TestRequestView.vue';
import SchedularView from '../views/SchedularView.vue';
import { ROOT_PATH } from '../costanti.js';
export default [
    {
        path: ROOT_PATH,
        name: 'schedular_module',
        component: Main,
        meta: {
            breadcrumb: [
                { name: 'Homepage', link: 'home' },
                { name: 'Schedular' }
            ]
        }
    },

    {
        path: '/p1',
        name: 'TestRequestView',
        component: TestRequestView,
        meta: {
            breadcrumb: [
                { name: 'Schedular', link: 'schedular_module' },
                { name: 'Test request' }
            ]
        }
    },

    {
        path: '/p2',
        name: 'SchedularView',
        component: SchedularView,
        meta: {
            breadcrumb: [
                { name: 'Schedular', link: 'schedular_module' },
                { name: 'Schedular view' }
            ]
        }
    }
];
