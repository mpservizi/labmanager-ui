<template>
  <v-row>
    <v-col>
      <v-radio-group mandatory @change="aggiorna" row>
        <span class="pr-2">Seleziona scala</span>
        <v-radio label="Settimanale" value="2"></v-radio>
        <v-radio label="Mensile" value="1"></v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Scala',
  props: {},
  data() {
    return {};
  },
  methods: {
    aggiorna(valore) {
      this.$emit('cambio', parseInt(valore));
    }
  },
  mounted: function() {}
};
</script>
