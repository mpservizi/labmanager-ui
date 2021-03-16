<template>
  <div>
    <p>Cambia scala</p>
    <select ref="scala" @change="aggiorna()"></select>
  </div>
</template>
<script>
export default {
  name: 'Filtro',
  props: {},

  methods: {
    aggiorna() {
      this.$emit('cambio', this.$refs.scala.value);
    },
  },
  mounted: function () {
    const elLista = this.$refs.scala;
    const types = [
      { value: '2', label: 'Settimanale' },
      { value: '1', label: 'Mensile' },
    ];
    const typeElements = [];
    types.forEach(function (type) {
      typeElements.push(
        "<option value='" + type.value + "'>" + type.label + '</option>'
      );
    });
    elLista.innerHTML = typeElements.join('');
  },
};
</script>