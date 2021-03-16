<template>
  <div>
    <router-view></router-view>
    <!-- <div v-if="isReady">
    </div>
    <div v-else>
      <p>{{ msg }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
  data() {
    return {
      msg: "Loading",
      isReady: false
    };
  },
  created() {},
  mounted() {
    this.rootPage();
    // if (this.isReady) {
    // } else {
    //   let self = this;
    //   setTimeout(() => {
    //       self.isReady=true;
    //     self.rootPage();
    //   }, 2000);
    // }
  },
  watch: {
    //Forzo il ricaricamento del view dopo la navigazione da childer a root
    $route(to) {
      if (to.path == "/schedular") {
        this.rootPage();
      }
    }
  },
  methods: {
    rootPage() {
      this.$router.replace({ name: "root" });
    }
  },
  props: {}
};
</script>

<style scoped></style>
