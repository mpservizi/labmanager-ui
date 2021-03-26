import { EventBus } from '@/shared/event-bus.js';
export class MyEventi {
    constructor(myGantt) {
        this.gantt = myGantt;
    }

    init() {
        initEventi(this.gantt);
    }
}

function initEventi(myGantt) {
    //doppio click task
    myGantt.attachEvent('onTaskDblClick', function(id, e) {
        let task = myGantt.getTask(id);
        // console.log(task);
        EventBus.$emit('event-dblClick', task);
        return false; //blocco il lightbox
    });

    //Prima di mostrare task
    myGantt.attachEvent('onBeforeTaskDisplay', function(id, task) {
        //Task gruppo creato in automatico
        if (task.$virtual) {
            // if (task.type == 'project') {
            //     task.render = 'split';
            // }
            return myGantt.hasChild(id); // hide groups without subtasks
        }

        return true;
    });
}
