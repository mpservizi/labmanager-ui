const homepageRoute = { name: 'Homepage', link: 'home' };

const moduleRoutes = {
    config: {
        moduleRootPath: '/schedular',
        moduleRouteName: 'schedular_module',
        moduleRouteLabel: 'Schedular',
        moduleRootView: 'Main.vue'
    },
    routes: [
        {
            routeName: 'TestRequestView',
            routeLabel: 'Test request',
            routeView: 'TestRequestView.vue'
        },
        {
            routeName: 'SchedularView',
            routeLabel: 'Schedular View',
            routeView: 'SchedularView.vue'
        }
    ]
};

function creaRoute(routePath, routeName, routeView) {
    //Caricare componente dinamicamente dall cartella view del modulo
    let route = {
        path: routePath,
        name: routeName,
        component: routeView,
        meta: {}
    };
    return route;
}

function creaLink(routeLabel, routeName) {
    let result = {
        name: routeLabel
    };
    if (routeName != undefined) {
        result.link = routeName;
    }
    return result;
}

function creaMetaObject(links) {
    return {
        breadcrumb: links
    };
}

function creaModuleRoutes(params) {
    let config = params.config;
    let routesParam = params.routes;

    let routes = [];
    let moduleLink = creaLink(config.moduleRouteLabel, config.moduleRouteName);
    routesParam.forEach((item, i) => {
        let path = '/p' + i;
        let route = creaRoute(path, item.routeName, item.routeView);
        let link = creaLink(item.routeLabel, item.routeName);
        route.link = link;
        routes.push(route);
    });

    console.log(routes);
}

creaModuleRoutes(moduleRoutes);
