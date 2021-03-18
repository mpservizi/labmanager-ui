<template>
    <div>
        <h1>Gantt module</h1>
    </div>
</template>

<script>
export default {
    name: 'Gantt',
    components: {},
    data() {
        return {};
    },
    props: {},
    mounted() {
        this.$store.dispatch('GanttModule/loadRichieste');
    },
    methods: {},
    computed: {
        dati() {
            return this.$store.getters['GanttModule/listaRichieste'];
        }
    }
};
</script>

<style scoped></style>
