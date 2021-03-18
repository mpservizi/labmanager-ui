import Main from '../views/Main.vue';
// import AddView from '../views/AddRequest.vue';

export default [
    {
        path: '/gantt',
        name: 'gantt',
        component: Main,
        meta: {
            breadcrumb: [
                { name: 'Homepage', link: 'home' },
                { name: 'Planner' }
            ]
        }
    }
    // {
    //     path: '/gantt/add',
    //     name: 'gantt_add_request',
    //     component: AddView,
    //     meta: {
    //         breadcrumb: [
    //             { name: 'Planner', link: 'gantt' },
    //             { name: 'New test request' }
    //         ]
    //     }
    // }
];
