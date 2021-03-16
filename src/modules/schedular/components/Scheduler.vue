<template>
  <div style="width: 100%; height: 800px">
    <div class="tool_box">
      <scala @cambio="cambiaScala"></scala>
      <div class="separatore"></div>
      <filtro @cambio="filtra" @save="save"></filtro>
    </div>
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
  components: { Filtro, Scala },
  methods: {
    filtra(valore) {
      MyPlanner.filtraRisorse(valore);
    },
    cambiaScala(valore) {
      MyPlanner.cambiaScala(valore);
    },
    async save() {
      let result = await MyPlanner.saveDati();
      console.log(result);
    },
    async load() {
      await MyPlanner.loadDati();
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
