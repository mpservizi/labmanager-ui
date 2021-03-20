<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components: {},
  data() {
    return {
      msg: 'Loading'
    };
  },
  props: {}
};
</script>

<style scoped></style>
