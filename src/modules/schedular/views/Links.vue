<template>
  <div>
    <router-link v-for="link in links" :key="link.to" :to="{ name: link.to }">{{
      link.label
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: "Links",
  components: {},
  data() {
    return {
      links: [
        {
          to: "pag1",
          label: "Painifica prove"
        },
        {
          to: "pag2",
          label: "Test request"
        },
        {
          to: "root",
          label: "Back"
        }
      ]
    };
  },
  props: {}
};
</script>

<style scoped></style>
