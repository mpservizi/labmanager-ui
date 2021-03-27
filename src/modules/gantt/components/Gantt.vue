<template>
    <div>
        <div>
            <v-btn @click="addTasks">Add tasks</v-btn>
            <v-btn @click="setMacchina">Set macchina</v-btn>
            </div>
        <div ref="gantt" class="ganttBox"></div>
    </div>
</template>
 
<script>
import { EventBus } from '@/shared/event-bus.js';
import MyGantt from '../js/my-gantt.js';
import { preConfig, parseDati } from '../tipi/planner/index.js';
import TaskGenerator from './../js/task-generator.js';
import { gantt } from '../libs/gantt/dhtmlxgantt.js';
export default {
    name: 'Gantt',
    props: {},
    data() {
        return {};
    },
    created() {
        EventBus.on('event-dblClick', (task) => {
            // this.taskAttivo = task;
            this.$router
                .push({
                    name: 'gantt_detail',
                    params: { id: task.id, task: task }
                })
                .catch((err) => {});
        });
    },
    mounted: function () {
        MyGantt.preconfig(preConfig);
        myConfig();
        MyGantt.init(this.$refs.gantt);
    },
    methods: {
        addTasks() {
            creaTaskTestPlan();
        },
        setMacchina(){
            setMacchinaTaskAttivo();
        }
    },
    computed: {
        // Estaggo i dati dal store
        dati() {
            return this.$store.getters['GanttModule/listaTasks'];
        }
    },
    watch: {
        //  Quando cambiano i dati nel store ricarico nel gantt
        dati(newVal) {
            parseDati(MyGantt, newVal);
        }
    }
};

function myConfig() {
    gantt.config.order_branch = true;
    gantt.config.order_branch_free = true;
    gantt.plugins({
        auto_scheduling: true
    });
    gantt.config.auto_scheduling = true;
}

function setMacchinaTaskAttivo(){
    let id= gantt.getSelectedId();
    let task = gantt.getTask(id);
    if(task && !task.readonly){
        console.log(task);
        gantt.showLightbox(id);
    }else{
        console.log('Già planned');
    }
}

function creaTaskTestPlan() {
    let testPlan = [
        { carico: 1, corrente: 10, campioni: 3 },
        { carico: 2, corrente: 10, campioni: 3 },
        { carico: 3, corrente: 10, campioni: 3 }
    ];

    let data_inizio = '26/03/2021';
    let tasks = TaskGenerator.generaTasks(testPlan);
    console.log(tasks);
    tasks.forEach((task) => {
        task.start_date = data_inizio;
        task.text = '19.' + task.carico;
        task.toPlan = true;
        MyGantt.creaTask(task);
    });
    MyGantt.render();
}
</script>
 
<style scoped>
@import '../libs/gantt/dhtmlxgantt.css';
@import '~Moduli/gantt/css/my-style.css';
.ganttBox {
    /* position: relative; */
    height: 400px;
    /* width: 800px; */
}
</style>