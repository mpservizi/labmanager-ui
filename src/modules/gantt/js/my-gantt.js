import { gantt } from '../libs/gantt/dhtmlxgantt.js';
import { LISTA_CARICHI, NOME_LISTA_CARICHI } from '../costanti.js';

function init(divContainer) {
    gantt.plugins({
        grouping: true
    });

    // gantt.config.task_height = 16;
    // gantt.config.row_height = 40;

    //Mostrare progress bar in task
    gantt.config.show_progress = false;
    /** Setting scala */
    gantt.config.min_column_width = 10;
    gantt.config.scale_height = 90;

    gantt.config.scales = [
        { unit: 'month', step: 1, format: '%F, %Y' },
        { unit: 'week', step: 1, format: 'WK %W' }
    ];

    /** Fine setting scala */

    gantt.serverList(NOME_LISTA_CARICHI,LISTA_CARICHI);

    gantt.templates.grid_row_class = gantt.templates.task_row_class = function(
        start,
        end,
        task
    ) {
        if (task.$virtual) return 'summary-row';
    };
    gantt.templates.task_class = function(start, end, task) {
        if (task.$virtual) {
            // task.render = 'split';
            // task.open = false;
            return 'summary-bar';
        }
    };

    // gantt.config.xml_date = '%Y-%m-%d';
    gantt.config.xml_date = '%d-%m-%Y';

    gantt.init(divContainer);
}

function raggruppa(gruppoAttivo) {
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
    gantt.parse(dati);
}
export default {
    init,
    raggruppa,
    parseDati
};
