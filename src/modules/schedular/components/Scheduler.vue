<template>
    <!-- <div style="width: 100%; height: 800px; border: 1px solid black"> -->
    <div class="box_planner" ref="scheduler_here" id="scheduler_here">
        <div class="box_data">
            <div class="dhx_cal_navline">
                <div class="dhx_cal_prev_button">&nbsp;</div>
                <div class="dhx_cal_next_button">&nbsp;</div>
                <div class="dhx_cal_today_button"></div>
                <div class="dhx_cal_date"></div>
            </div>
            <div class="dhx_cal_header"></div>
            <div class="dhx_cal_data"></div>
        </div>
    </div>
</template>

<script>
import Filtro from './Filtro.vue';
import { MyPlanner } from './../js/my-planner.js';
export default {
    name: 'Scheduler',
    props: ['scala', 'filtro', 'needSave'],
    data() {
        return {
            pronto: false
        };
    },
    components: { Filtro },
    methods: {
        filtra(valore) {
            MyPlanner.filtraRisorse(valore);
        },
        cambiaScala(valore) {
            if (!this.pronto) {
                return;
            }
            MyPlanner.cambiaScala(valore);
        },
        async save() {
            let result = await MyPlanner.saveDati();
            console.log(result);
        },
        async load() {
            await MyPlanner.loadDati();
            this.pronto = true;
        }
    },
    mounted: function () {
        MyPlanner.init(this.$refs.scheduler_here);
        this.load();
    },
    watch: {
        scala: function (valore) {
            this.cambiaScala(valore);
        },
        filtro: function (valore) {
            console.log(valore);
            this.filtra(valore);
        },
        needSave: function () {
            this.save();
        }
    }
};
</script>

<style scoped>
@import './../libs/schedular/dhtmlxscheduler.css';
/* @import './../css/my-style.css'; */
</style>
<style scoped>
.box_planner {
    position: relative;
    width: 100%;
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    overflow: hidden;
    background-color: #fff;
    font-family: Arial, san-serif;
}
.box_data {
    display: grid;
}
</style>