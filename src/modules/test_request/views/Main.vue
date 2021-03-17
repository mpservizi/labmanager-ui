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
    methods: {},
    computed: {
        listaRichieste() {
            let lista = [
                {
                    id: 1,
                    progetto: 'Universal range',
                    descrizione: 'Switch gallery schema 1 testati a 16A',
                    inizio: '04/03/2021',
                    fine: '28/03/2021'
                },
                {
                    id: 2,
                    progetto: 'Universal range',
                    descrizione: 'Switch gallery schema 6 testati a 16A',
                    inizio: '04/03/2021',
                    fine: '28/03/2021'
                }
            ];
            return lista;
        }
    }
};
</script>

<style scoped></style>
