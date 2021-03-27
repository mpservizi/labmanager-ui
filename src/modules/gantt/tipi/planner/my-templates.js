export class MyTemplates {
    constructor(myGantt) {
        this.gantt = myGantt;
    }

    init() {
        initTemplates(this.gantt);
    }
}

function initTemplates(myGantt) {
    myGantt.templates.grid_row_class = myGantt.templates.task_row_class = function(
        start,
        end,
        task
    ) {
        if (task.$virtual) return 'summary-row';
    };
    myGantt.templates.task_class = function(start, end, task) {
        //Task gruppo creato da gantt
        if (task.$virtual) {
            return 'summary-bar';
        }

        if (task.fromServer) {
            if (task.carico == '19.1') {
                return 'carico_1';
            }
            if (task.carico == '19.2') {
                return 'carico_2';
            }
            if (task.carico == '19.3') {
                return 'carico_3';
            }
            //Se il task non ha crico
            return 'server-task';
        }

        //task creato in gantt ui
        return 'normal-task';
    };
}
