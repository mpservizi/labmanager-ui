import Main from '../views/Main.vue';

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
    }
];
