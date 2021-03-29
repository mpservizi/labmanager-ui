<template>
    <div class="boxFiltro">
        <v-select
            :items="items"
            label="Filtra macchine"
            outlined
            dense
            item-text="text"
            item-value="key"
            @change="filtraRisorse"
        ></v-select>
        <v-btn @click="save">Salva dati</v-btn>
    </div>
</template>
<script>
import { LISTA_FILTRO_RISORSE } from './../js/costanti.js';
export default {
    name: 'Filtro',
    data() {
        return {
            items: LISTA_FILTRO_RISORSE
        };
    },
    methods: {
        filtraRisorse(valore) {
            this.$emit('cambio', valore);
        },
        save() {
            this.$emit('save');
        }
    },
    mounted: function () {}
};
</script>
<style scoped>
.boxFiltro {
    border: 1px solid green;
}
</style>