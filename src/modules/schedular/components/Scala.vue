<template>
    <div class="boxScala">
        <v-radio-group mandatory @change="aggiorna">
            <v-radio label="Settimanale" value="2"></v-radio>
            <v-radio label="Mensile" value="1"></v-radio>
        </v-radio-group>
    </div>
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
    mounted: function () {}
};
</script>
<style scoped>
/* .boxScala {
    border: 1px solid blue;
} */
</style>