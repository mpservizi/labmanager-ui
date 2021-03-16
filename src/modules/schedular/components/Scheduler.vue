<template>
  <div style="width: 100%; height: 800px">
    <v-row>
      <v-col cols="4">
        <scala @cambio="cambiaScala"></scala>
      </v-col>
      <v-col cols="6">
        <filtro @cambio="filtra" @save="save"></filtro>
      </v-col>
    </v-row>
    <div
      ref="scheduler_here"
      id="scheduler_here"
      class="dhx_cal_container"
      style="width: 100%; height: 100%"
    >
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
import Filtro from "./Filtro.vue";
import Scala from "./Scala.vue";
import { MyPlanner } from "./../js/my-planner.js";
export default {
  name: "Scheduler",
  props: {},
  data() {
    return {
      pronto: false,
    };
  },
  components: { Filtro, Scala },
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
    },
  },
  mounted: function () {
    MyPlanner.init(this.$refs.scheduler_here);
    this.load();
  },
};
</script>
 
<style>
@import "./../libs/schedular/dhtmlxscheduler.css";
@import "./../css/my-style.css";
</style>
