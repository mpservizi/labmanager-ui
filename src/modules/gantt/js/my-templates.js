export class MyTemplates {
    constructor(myGantt) {
        this.gantt = myGantt;
    }

    init() {
        initTemplates(this.gantt)
    }
}

function initTemplates(myGantt){
    myGantt.templates.grid_row_class = myGantt.templates.task_row_class = function (
        start,
        end,
        task
    ) {
        if (task.$virtual) return 'summary-row';
    };
    myGantt.templates.task_class = function (start, end, task) {
        if (task.$virtual) {
            return 'summary-bar';
        }
        if (task.fromServer) {
            return 'server-task'
        }
        return 'normal-task'
    };
}