<template>
  <div>
    <p>Filtra macchine</p>
    <select ref="tipo" @change="showRooms"></select>
    <div class="separatore"><button @click="save">Salva dati</button></div>
  </div>
</template>
<script>
import { LISTA_FILTRO_RISORSE } from './../js/costanti.js';
export default {
  name: 'Filtro',
  props: {},

  methods: {
    showRooms() {
      this.$emit('cambio', this.$refs.tipo.value);
    },
    save() {
      this.$emit('save');
    },
  },
  mounted: function () {
    const roomSelect = this.$refs.tipo;
    const types = LISTA_FILTRO_RISORSE;
    const typeElements = [];
    types.forEach(function (type) {
      typeElements.push(
        "<option value='" + type.key + "'>" + type.text + '</option>'
      );
    });
    roomSelect.innerHTML = typeElements.join('');
  },
};
</script>