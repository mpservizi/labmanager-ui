<template>
    <div>
        <h1>{{ titolo }}</h1>
        <p>Workload items</p>
        <ul>
            <li v-for="(item,index) in items" :key="index">Durata : {{item.days}} giorni; Test request : {{item.idRequest}}</li>
        </ul>
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
            subtasks:[],
            items:[]
        };
    },
    created() {
    },
    mounted() {
        let task = this.$route.params.task;
        this.taskAttivo = task;
        this.subtasks = task.subTasks;
        this.items = task.details.workload;
    },
    computed: {
        titolo() {
            return this.taskAttivo.text;
        }
    }
};
</script>

<style scoped></style>
