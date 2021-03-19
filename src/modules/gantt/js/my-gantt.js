import { gantt } from '../libs/gantt/dhtmlxgantt.js';

function init(divContainer) {
    gantt.plugins({
        grouping: true
    });

    // gantt.config.task_height = 16;
    // gantt.config.row_height = 40;

    gantt.serverList('carichi', [
        { key: 1, label: '19.1' },
        { key: 2, label: '19.2' },
        { key: 3, label: '19.3' }
    ]);

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
            groups: gantt.serverList('carichi'),
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
