<template>
        <div>
            <div>
                <v-btn @click="raggruppa">Raggruppa</v-btn>
            </div>
        <div id="gantt_here" style="width: 100%; height: 500px;"></div>
        </div>
</template>

<script>
import {dati} from  "./dati.js";
import MyGantt from 'Moduli/gantt/js/my-gantt.js'
export default {
    name: 'TestGantt',
    components: { },
    data: () => ({}),
    mounted(){
        init();
    },
    methods:{
        raggruppa(){
            MyGantt.raggruppa(1);
        }
    }
};

function init(){
    MyGantt.init('gantt_here');
    MyGantt.parseDati(dati);
}
</script>
<style>
@import "~Moduli/gantt/libs/gantt/dhtmlxgantt.css";
@import "~Moduli/gantt/css/my-style.css"
</style>
