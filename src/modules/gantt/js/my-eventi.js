import { EventBus } from '@/shared/event-bus.js';
export class MyEventi {
    constructor(myGantt) {
        this.gantt = myGantt;
    }

    init() {
        initEventi(this.gantt)
    }
}

function initEventi(myGantt) {
    //doppio click task
    myGantt.attachEvent('onTaskDblClick', function (id, e) {
        //any custom logic here
        let task = myGantt.getTask(id);
        let subTasks = task.subTasks;
        let workload = task.details.workload;
        workload.week = task.key_week.substr(-4);
        // console.log(task);
        // console.log(subTasks);
        // console.log(details);
        // console.log('Items workload : ' + workload.length);
        // console.log('Items subtasks : ' + subTasks.length);
        EventBus.$emit('event-dblClick',task);
        // subTasks.forEach(item => {
        //     let desc = `Macchina:${item.macchina} `
        //     console.log(item);            
        // });
        // console.log('Worload per settimana : ' + workload.week);

        // workload.forEach(item => {
        //     let durata = item.days;
        //     let progetto = item.idRequest;
        //     console.log(`Settimana ${workload.week} - Task di ${durata} giorni per progetto : ${progetto}`);            
        // });
        return false;
    });

    //Prima di mostrare task
    myGantt.attachEvent('onBeforeTaskDisplay', function (id, task) {
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
            return myGantt.hasChild(id); // hide groups without subtasks
        }


        return true;
    });
}