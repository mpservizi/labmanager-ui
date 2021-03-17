import Main from '../views/Main.vue';
import AddView from '../views/AddRequest.vue';

export default [
    {
        path: '/test_request',
        name: 'test_requests',
        component: Main,
        meta: {
            breadcrumb: [
                { name: 'Homepage', link: 'home' },
                { name: 'Test request' }
            ]
        }
    },
    {
        path: '/test_request/add',
        name: 'add_request',
        component: AddView,
        meta: {
            breadcrumb: [
                { name: 'Lista richieste', link: 'test_requests' },
                { name: 'New test request' }
            ]
        }
    }
];
