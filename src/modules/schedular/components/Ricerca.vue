<template>
    <div class="">
        <v-text-field
            prepend-icon="mdi-text-search"
            clearable
            single-line
            label="Ricerca tasks"
            @change="cambioValore"
            @click:clear="clearValore"
        ></v-text-field>
    </div>
</template>
<script>
export default {
    name: 'Ricerca',
    data() {
        return {};
    },
    methods: {
        cambioValore(valore) {
            if (valore == '') {
                valore = null;
            }
            this.$emit('cambio', valore);
        },
        clearValore() {
            this.cambioValore(null);
        }
    },
    mounted: function () {}
};
</script>
<style scoped>
</style>