<template>
    <div>
        <div>
            <v-btn @click="raggruppa">Raggruppa</v-btn>
        </div>
        <div id="gantt_here" style="width: 100%; height: 800px"></div>
    </div>
</template>

<script>
import MyGantt from 'Moduli/gantt/js/my-gantt.js';
import { parseWorload } from 'Moduli/gantt/js/parse-worload.js';
import {getWorloadDati} from './workload.js';
export default {
    name: 'TestGantt',
    components: {},
    data: () => ({}),
    mounted() {
        init();
    },
    methods: {
        raggruppa() {
            MyGantt.raggruppa(1);
            MyGantt.render();
        }
    }
};

function init() {
    MyGantt.init('gantt_here');
    let workloadDati = getWorloadDati();
    let dati = parseWorload(workloadDati);
    MyGantt.parseDati(dati);
}
</script>
<style>
@import "~Moduli/gantt/libs/gantt/dhtmlxgantt.css";
@import '~Moduli/gantt/css/my-style.css';
</style>
