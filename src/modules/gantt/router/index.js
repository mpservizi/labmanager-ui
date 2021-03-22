import Main from '../views/Main.vue';
import Detail from '../views/Detail.vue';
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
    },
    {
        path: '/gantt/detail/:id',
        name: 'gantt_detail',
        component: Detail,
        props: true,
        meta: {
            breadcrumb: [
                { name: 'Planner', link: 'gantt' },
                { name: 'Task detail' }
            ]
        }
    }
];
