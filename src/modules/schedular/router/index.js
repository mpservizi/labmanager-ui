import Main from '../views/Main.vue';
// import TestRequestView from '../views/TestRequestView.vue';
import SchedularView from '../views/SchedularView.vue';
import { ROOT_PATH } from '../costanti.js';

const ENTRY_ROUTE = {
    name: 'schedular_module',
    linkLabel: 'Schedular',
    component: Main,
    isRoot: true
};

// const moduleRoutes = [
//     ENTRY_ROUTE,
//     {
//         name: 'TestRequestView',
//         linkLabel: 'Test request',
//         component: TestRequestView
//     },
//     {
//         name: 'SchedularView',
//         linkLabel: 'Test request',
//         component: SchedularView
//     }
// ];

const rawExport = [
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
        path: ROOT_PATH + '/p2',
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

function creaModuleRoutes(params) {
    let result = [];
    for (let index = 0; index < params.length; index++) {
        let item = params[index];
        let isRoot = item.isRoot != undefined ? true : false;
        item.isRoot = isRoot;

        let path = isRoot ? ROOT_PATH : ROOT_PATH + '/p' + index;
        let modello = {
            path: path,
            name: item.linkLabel,
            component: item.component,
            meta: creaLinksNavigazione(item)
        };
        result.push(modello);
        // console.log(modello);
    }
    return result;
}

function creaLinksNavigazione(item) {
    let homepageRoute = { name: 'Homepage', link: 'home' };
    let moduleEntryRoute = { name: ENTRY_ROUTE.linkLabel, link: ROOT_PATH };

    let lista = [];
    if (item.isRoot) {
        lista.push(homepageRoute);
        lista.push({ name: ENTRY_ROUTE.linkLabel });
    } else {
        lista.push(moduleEntryRoute);
        lista.push({ name: item.linkLabel });
    }

    return {
        breadcrumb: lista
    };
}

// const linkAuto = creaModuleRoutes(moduleRoutes);
export default rawExport;
