<template>
    <div>
        <div ref="gantt" class="ganttBox"></div>
    </div>
</template>
 
<script>
import { EventBus } from '@/shared/event-bus.js';
import MyGantt from '../js/my-gantt.js';

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
        MyGantt.init(this.$refs.gantt);
    },
    methods: {},
    computed: {
        // Estaggo i dati dal store
        dati() {
            return this.$store.getters['GanttModule/listaTasks'];
        }
    },
    watch: {
        //  Quando cambiano i dati nel store ricarico nel gantt
        dati(newVal) {
            MyGantt.parseDati(newVal);
        }
    }
};
</script>
 
<style scoped>
@import '../libs/gantt/dhtmlxgantt.css';
@import '~Moduli/gantt/css/my-style.css';
.ganttBox {
    /* position: relative; */
    height: 800px;
}
</style>