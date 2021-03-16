<template>
  <v-row>
    <v-col cols="6">
      <v-select
        :items="items"
        label="Filtra macchine"
        outlined
        dense
        item-text="text"
        item-value="key"
        @change="filtraRisorse"
      ></v-select>
    </v-col>
    <v-col cols="6">
      <v-btn @click="save">Salva dati</v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { LISTA_FILTRO_RISORSE } from "./../js/costanti.js";
export default {
  name: "Filtro",
  data() {
    return {
      items: LISTA_FILTRO_RISORSE
    };
  },
  methods: {
    filtraRisorse(valore) {
      this.$emit("cambio", valore);
    },
    save() {
      this.$emit("save");
    }
  },
  mounted: function() {}
};
</script>
