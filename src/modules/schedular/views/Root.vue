<template>
  <div>
    <h1>{{ msg }}</h1>
    <Links></Links>
  </div>
</template>

<script>
import Links from "./Links.vue";
export default {
  name: "Root",
  components: { Links },
  data() {
    return {
      msg: "Root page"
    };
  },
  props: {}
};
</script>

<style scoped></style>
