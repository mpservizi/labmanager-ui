<template>
    <div>
        <v-btn class="mb-5" :to="{ name: 'add_request' }">Add new</v-btn>
        <v-data-table
            :headers="headers"
            :items="listaRichieste"
            hide-default-footer
            class="elevation-1"
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
                {
                    text: 'Id Richiesta',
                    align: 'start',
                    sortable: false,
                    value: 'id'
                },
                { text: 'Progetto', value: 'progetto' },
                { text: 'Descrizione', value: 'descrizione' },
                { text: 'Data Inizio', value: 'inizio' },
                { text: 'Data Fine', value: 'fine' }
            ]
        };
    },
    props: {},
    mounted() {
        this.$store.dispatch('TestRequestModule/loadRichieste');
    },
    methods: {},
    computed: {
        listaRichieste() {
            return this.$store.getters['TestRequestModule/listaRichieste'];
        }
    }
};
</script>

<style scoped></style>
