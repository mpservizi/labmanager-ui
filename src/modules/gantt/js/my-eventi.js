export class MyEventi {
    constructor(myGantt) {
        this.gantt = myGantt;
    }
    
    init(){
        initEventi(this.gantt)
    }
}

function initEventi(myGantt){
     //doppio click task
    myGantt.attachEvent('onTaskDblClick', function (id, e) {
        //any custom logic here
        let task = myGantt.getTask(id);
        console.log(task);
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