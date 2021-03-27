<template>
  <div style="width: 100%; height: 800px">
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
export default {
  name: 'Scheduler',
  props: {},
  data() {
    return {
      pronto: false
    };
  },
  components: {},
  methods: {
  },
  mounted: function() {
  }
};
</script>

<style>
@import "./../libs/schedular/dhtmlxscheduler.css";
@import "./../css/my-style.css";
</style>
