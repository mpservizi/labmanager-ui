export class MyConfig {
    constructor(myGantt) {
        this.gantt = myGantt;
    }

    init() {
        initConfig(this.gantt)
    }
}

function initConfig(myGantt) {
    myGantt.plugins({
        drag_timeline: true,
        grouping: true
    });
    myGantt.config.task_height = 30;
    myGantt.config.row_height = 40;

    //Mostrare progress bar in task
    myGantt.config.show_progress = false;
    myGantt.config.autoscroll = true;
    myGantt.config.autosize = false;
    myGantt.config.show_tasks_outside_timescale = true

    /** Setting scala */
    myGantt.config.min_column_width = 10;
    myGantt.config.scale_height = 90;

    myGantt.config.scales = [
        { unit: 'month', step: 1, format: '%F, %Y' },
        { unit: 'week', step: 1, format: 'WK %W' },
        // { unit: 'day', step: 1, format: '%d' }
    ];
    /** Fine setting scala */

    myGantt.config.columns = [
        { name: 'text', label: 'Risorsa', width: '*', tree: true },
        { name: 'start_date', label: 'Start time', align: 'center' },
        { name: 'duration', label: 'Duration', align: 'center' }
    ];

    /**
     * Lightbox per selezionare la risorsa
     */
    myGantt.config.lightbox.sections = [
        {
            name: 'parent', height: 30, type: 'parent', allow_root: 'false', focus: true,
            filter: function (id, task) {
                if (task.isRisorsa) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        { name: 'dati', height: 40, map_to: 'tmp_dati', type: 'template' },
    ];
    gantt.locale.labels['section_parent'] = 'Gruppo ciclatura';
    gantt.locale.labels['section_dati'] = 'Dati task';
    // gantt.config.xml_date = '%Y-%m-%d';
    myGantt.config.xml_date = '%d/%m/%Y';
}