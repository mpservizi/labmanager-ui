import { gantt } from '../libs/gantt/dhtmlxgantt.js';
import { LISTA_CARICHI, NOME_LISTA_CARICHI } from '../costanti.js';
import { parseDatiServer } from './data-parser.js';
import { MyGruppi } from './gruppi.js';

let myGruppi;
function init(divContainer) {
    myGruppi = new MyGruppi(gantt);

    gantt.plugins({
        drag_timeline: true,
        grouping: true
    });
    gantt.config.task_height = 30;
    gantt.config.row_height = 40;

    //Mostrare progress bar in task
    gantt.config.show_progress = false;
    gantt.config.autoscroll = true;
    gantt.config.autosize = false;
    gantt.config.show_tasks_outside_timescale = true

    /** Setting scala */
    gantt.config.min_column_width = 10;
    gantt.config.scale_height = 90;

    gantt.config.scales = [
        { unit: 'month', step: 1, format: '%F, %Y' },
        { unit: 'week', step: 1, format: 'WK %W' },
        // { unit: 'day', step: 1, format: '%d' }
    ];

    /** Fine setting scala */

gantt.config.columns = [
    {name:"text",       label:"Risorsa",  width:"*", tree:true },
    {name:"start_date", label:"Start time", align:"center" },
    {name:"duration",   label:"Duration",   align:"center" }
];

    //Prima di mostrare task
    gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
        //Task gruppo creato in automatico
        // if(task.subTasks){
        //     task.text = task.subTasks.length
        // }else{
        //     task.text = '-';
        // }
        if (task.$virtual) {
            if (task.type == 'project') {
                task.render = 'split';
            }
            return gantt.hasChild(id); // hide groups without subtasks
        }


        return true;
    });

    gantt.serverList(NOME_LISTA_CARICHI, LISTA_CARICHI);

    gantt.templates.grid_row_class = gantt.templates.task_row_class = function (
        start,
        end,
        task
    ) {
        if (task.$virtual) return 'summary-row';
    };
    gantt.templates.task_class = function (start, end, task) {
        if (task.$virtual) {
            return 'summary-bar';
        }
        if (task.fromServer) {
            return 'server-task'
        }
        return 'normal-task'
    };

    // gantt.config.xml_date = '%Y-%m-%d';
    gantt.config.xml_date = '%d/%m/%Y';

    gantt.init(divContainer);
}

function raggruppa() {
    // myGruppi.groupByRisorse();
    myGruppi.groupByCarico();
}

function raggruppa1(gruppoAttivo) {
    if (gruppoAttivo) {
        gantt.groupBy(false);
    } else {
        gantt.groupBy({
            groups: gantt.serverList(LISTA_CARICHI),
            relation_property: 'idCarico',
            group_id: 'key',
            group_text: 'label'
        });
        // gantt.sort('start_date');
    }

    gantt.render();
}

function parseDati(dati) {
    let dataParsed = parseDatiServer(dati);
    gantt.parse(dataParsed);
}
function render() {
    gantt.render();
}
export default {
    init,
    raggruppa,
    parseDati,
    render
};
