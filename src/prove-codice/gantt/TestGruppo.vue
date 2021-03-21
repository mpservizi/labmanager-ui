<template>
    <div>
        <div>
            <v-btn @click="raggruppa">Raggruppa</v-btn>
            <v-btn @click="reset">Reset</v-btn>
        </div>
        <div id="gantt_here" style="width: 100%; height: 800px"></div>
    </div>
</template>

<script>
import MyGantt from 'Moduli/gantt/js/my-gantt.js';

export default {
    name: 'TestGantt',
    components: {},
    data: () => ({}),
    mounted() {
        init();
    },
    methods: {
        raggruppa() {
            group('priority');
        },
        reset() {
            group();
        }
    }
};

function init() {
    let dati = getDati();
    gantt.plugins({
        grouping: true
    });

    function byId(list, id) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].key == id) return list[i].label || '';
        }
        return '';
    }
    gantt.config.columns = [
        { name: 'text', label: '', tree: true, width: 150, resize: true },
        { name: 'start_date', align: 'right', width: 80, resize: true },
        { name: 'path', label: 'Project', width: 80, align: 'center' },
        { name: 'add', width: 44, resize: true }
    ];

    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;

    gantt.config.open_tree_initially = true;

    MyGantt.init('gantt_here');
    gantt.parse(dati);
}

function generate_server_list() {
    var db_projects = [];
    gantt.eachTask(function (task) {
        db_projects.push(task.path);
    });
    debugger
    db_projects = [...new Set(db_projects)];

    var db_projects_collection = [];

    for (var i = 1; i < db_projects.length; i++) {
        db_projects_collection.push({
            key: db_projects[i],
            label: db_projects[i]
        });
    }

    gantt.serverList('db_projects_collection', db_projects_collection);
}
function group(type) {
    if (type) {
        generate_server_list();

        gantt.groupBy({
            groups: gantt.serverList('db_projects_collection'),
            relation_property: 'path',
            group_id: 'key',
            group_text: 'label'
        });
    } else gantt.groupBy(false);
}

function getDati() {
    let dati = {
        data: [
            {
                id: 'gt10',
                text: 'Grouping demo',
                status: 1,
                priority: 1,
                type: 'project',
                start_date: '26-03-2019',
                duration: 8,
                order: 10,
                progress: 0.4,
                open: true
            },
            {
                id: 'gt101',
                text: 'Task #1',
                path: '/opt/chrome',
                status: 1,
                priority: 1,
                start_date: '02-04-2019',
                duration: 1,
                order: 10,
                progress: 0.6,
                parent: 'gt10'
            },
            {
                id: 'gt102',
                text: 'Task #2',
                path: '/opt/firefox',
                status: 2,
                priority: 2,
                start_date: '01-04-2019',
                duration: 1,
                order: 20,
                progress: 0.6,
                parent: 'gt10'
            },
            {
                id: 'gt103',
                text: 'Task #3',
                path: '/opt/chrome',
                status: 3,
                priority: 3,
                start_date: '02-04-2019',
                duration: 1,
                order: 10,
                progress: 0.6,
                parent: 'gt10'
            },
            {
                id: 'gt104',
                text: 'Task #4',
                path: '/opt/firefox',
                status: 4,
                priority: 1,
                start_date: '03-04-2019',
                duration: 1,
                order: 20,
                progress: 0.6,
                parent: 'gt10'
            },
            {
                id: 'gt105',
                text: 'Task #5',
                path: '/opt/ie',
                status: 1,
                priority: 2,
                start_date: '03-04-2019',
                duration: 1,
                order: 20,
                progress: 0.6,
                parent: 'gt10'
            },
            {
                id: 'gt106',
                text: 'Task #6',
                path: '/opt/safari',
                status: 2,
                priority: 3,
                start_date: '03-04-2019',
                duration: 1,
                order: 20,
                progress: 0.6,
                parent: 'gt10'
            },
            {
                id: 'gt107',
                text: 'Task #7',
                path: '/opt/chrome',
                status: 3,
                priority: 1,
                start_date: '03-04-2019',
                duration: 1,
                order: 20,
                progress: 0.6,
                parent: 'gt10'
            },
            {
                id: 'gt108',
                text: 'Task #8',
                path: '/tmp/34ogk34ko3',
                status: 4,
                priority: 2,
                start_date: '03-04-2019',
                duration: 1,
                order: 20,
                progress: 0.6,
                parent: 'gt10'
            }
        ],
        links: []
    };

    return dati;
}
</script>
<style>
@import '~Moduli/gantt/libs/gantt/dhtmlxgantt.css';
@import '~Moduli/gantt/css/my-style.css';
</style>
