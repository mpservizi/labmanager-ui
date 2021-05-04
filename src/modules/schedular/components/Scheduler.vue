<template>
    <!-- <div style="width: 100%; height: 800px; border: 1px solid black"> -->
    <div class="box_planner" ref="scheduler_here" id="scheduler_here">
        <div class="box_data">
            <div class="dhx_cal_navline">
                <div>
                    <v-btn
                        text
                        small
                        class="mr-1"
                        :class="{ secondary: scalaAttiva == 2 }"
                        @click="handleScalaSettimanale"
                        >Settimanale</v-btn
                    >
                    <v-btn
                        text
                        small
                        :class="{ secondary: scalaAttiva == 1 }"
                        @click="handleScalaMensile"
                        >Mensile</v-btn
                    >
                </div>
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
    props: ['filtro', 'needSave', 'ricerca'],
    data() {
        return {
            pronto: false,
            scalaAttiva: 2 //deafult settimanale
        };
    },
    components: { Filtro },
    created() {},
    methods: {
        filtra(valore) {
            MyPlanner.filtraRisorse(valore);
        },
        ricercaTasks(valore) {
            MyPlanner.filtraTasks(valore);
        },
        cambiaScala(valore) {
            if (!this.pronto) {
                return;
            }
            MyPlanner.cambiaScala(valore);
        },
        async save() {
            let result = await MyPlanner.saveDati();
        },
        async load() {
            await MyPlanner.loadDati();
            this.pronto = true;
        },
        handleScalaMensile() {
            this.scalaAttiva = 1;
        },
        handleScalaSettimanale() {
            this.scalaAttiva = 2;
        }
    },
    mounted: function () {
        this.scalaAttiva = MyPlanner.getScalaAttiva();
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
        ricerca: function (valore) {
            this.ricercaTasks(valore);
        },
        needSave: function () {
            this.save();
        },
        scalaAttiva: function (newVal) {
            this.cambiaScala(newVal);
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