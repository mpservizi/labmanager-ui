<template>
    <div>
        <v-container>
            <h1>
                {{ taskAttivo.txtMacchina }} - {{ taskAttivo.txtCarico }} -
                {{ taskAttivo.txtWeek }}
            </h1>
            <ul>
                <li v-for="(task, index) in listaTasks" :key="index">
                    {{ task.msg }}
                    <ul>
                        <li
                            v-for="(item, index) in task.workloads"
                            :key="index"
                        >
                            {{ item.msg }}
                        </li>
                    </ul>
                </li>
            </ul>
        </v-container>
    </div>
</template>

<script>
import { EventBus } from '@/shared/event-bus.js';
export default {
    name: 'TaskDetail',
    components: {},
    props: ['id'],
    data() {
        return {
            taskAttivo: {},
            listaTasks: []
        };
    },
    created() {},
    mounted() {
        let task = this.$route.params.task;
        this.taskAttivo = task;
        this.listaTasks = creaListaTaskDetailUi(task);
    },
    computed: {
        titolo() {
            return this.taskAttivo.text;
        }
    }
};

function creaListaTaskDetailUi(task) {
    let result = [];
    let listaTasks = [];
    listaTasks.push(task);

    // console.log('Loop sub tasks');
    task.subTasks.forEach((item) => {
        listaTasks.push(item);
    });

    listaTasks.forEach((task) => {
        let label = task.txtMacchina + '-' + task.stallo;
        let totalDays = 0;
        let numTasks = 0;
        let workloads = [];

        task.details.workload.forEach((item) => {
            workloads.push({
                days: item.days,
                idRequest: item.idRequest,
                msg: `Test request : ${item.idRequest} - Durata ${item.days} giorni`
            });
            totalDays += item.days;
            numTasks++;
        });

        let msg = `${label} - occupato per ${totalDays} giorni:`;
        let obj = {
            msg: msg,
            totalDays: totalDays,
            numTasks: numTasks,
            label: label,
            workloads: workloads
        };

        result.push(obj);
    });
    return result;
}
</script>

<style scoped></style>
