<template>
  <div class="box-schedular">
    <scheduler></scheduler>
  </div>
</template>
 
<script>
import Scheduler from "./components/Scheduler.vue";

export default {
  name: "app",
  components: { Scheduler },
  data() {
    return {
      messages: [],
    };
  },
  methods: {},
};
</script>

<style>
.box-schedular {
  height: 100%;
  width: 100%;
}
</style>
