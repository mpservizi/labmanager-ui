<template>
  <div>
    <v-row>
      <v-col v-for="app in apps" :key="app.id">
        <div>
          <h1>{{ app.nome }}</h1>
          <router-link :to="app.link">Open</router-link>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Apps",
  components: {},
  data() {
    return {
      apps: [
        {
          id: 1,
          nome: "Schedular ciclature",
          link: "/schedular"
        },
        {
          id: 2,
          nome: "App 1",
          link: "/app2"
        },
        {
          id: 3,
          nome: "App 1",
          link: "/app3"
        }
      ]
    };
  },
  props: {}
};
</script>

<style scoped></style>
