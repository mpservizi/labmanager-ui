<template>
    <div>
        <v-btn class="mb-5" :to="{ name: 'add_request' }">Add new</v-btn>
        <v-data-table
            :headers="headers"
            :items="listaRichieste"
            @click:row="handleInfo"
            hide-default-footer            
            class="elevation-1 mytab"
        ></v-data-table>
    </div>
</template>

<script>
export default {
    name: 'TestRequet',
    components: {},
    data() {
        return {
            msg: 'Test request page in modulo',
            headers: [
                { text: 'Progetto', value: 'titoloProgetto' },
                { text: 'Descrizione', value: 'descrizione' },
                { text: 'Week Inizio', value: 'weekInizio' },
                { text: 'Week Fine', value: 'weekFine' },
                { text: 'Priorità', value: 'priority' },
                { text: 'Richiedente', value: 'cliente' },
                { text: 'Tecnico', value: 'tecnico' },
                { text: '19.1', value: 'c1' },
                { text: '19.2', value: 'c2' },
                { text: '19.3', value: 'c3' }
            ]
        };
    },
    props: {},
    mounted() {
        this.$store.dispatch('TestRequestModule/loadRichieste');
    },
    methods: {
        handleInfo(item) {
            this.$store.dispatch('TestRequestModule/setDetailRequest',item);
            this.$router.push({name:'request_detail'})
        }
    },
    computed: {
        listaRichieste() {
            return this.$store.getters['TestRequestModule/listaRichieste'];
        }
    }
};
</script>

<style scoped>
.mytab{
    cursor: pointer;
}
</style>
