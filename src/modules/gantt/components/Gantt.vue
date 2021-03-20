<template>
    <div>
        <div>
            <v-btn @click="raggruppa">Raggruppa</v-btn>
        </div>
        <div ref="gantt" class="ganttBox"></div>
    </div>
</template>
 
<script>
import MyGantt from '../js/my-gantt.js';

export default {
    name: 'gantt',
    props: {},
    data() {
        return {
            gruppoAttivo: false
        };
    },
    mounted: function () {
        MyGantt.init(this.$refs.gantt);
    },
    methods: {
        raggruppa() {
            MyGantt.raggruppa(this.gruppoAttivo);
            this.gruppoAttivo = !this.gruppoAttivo;
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
        dati(newVal, oldVal) {
            MyGantt.parseDati(newVal);
        }
    }
};
</script>
 
<style>
@import '../libs/gantt/dhtmlxgantt.css';
.ganttBox {
    /* position: relative; */
    height: 800px;
}

.summary-row,
.summary-row.odd {
    background-color: #eeeeee;
    font-weight: bold;
}

.gantt_grid div,
.gantt_data_area div {
    font-size: 12px;
}

.summary-bar {
    opacity: 0;
}
</style>