<template>
    <div>
        <v-btn class="mb-5" :to="{ name: 'add_request' }">Add new</v-btn>
        <v-data-table
            :headers="headers"
            :items="listaRichieste"
            @click:row="handleInfo"
            hide-default-footer
            class="elevation-1 mytab"
        >
            <template v-slot:[`item.stato`]="{ item }">
                {{ labelStato(item.stato) }}
            </template>
            <template v-slot:[`item.priority`]="{ item }">
                {{ labelPrio(item.priority) }}
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { getStatoById, getPrioById } from '@/data/front-db.js';
export default {
    name: 'TestRequet',
    components: {},
    data() {
        return {
            msg: 'Test request page in modulo',
            headers: [
                { text: 'Progetto', value: 'titoloProgetto' },
                { text: 'Descrizione', value: 'descrizione' },
                { text: 'WK Inizio', value: 'weekInizio' },
                { text: 'WK Fine', value: 'weekFine' },
                { text: 'Priorità', value: 'priority' },
                { text: 'Richiedente', value: 'cliente' },
                { text: 'Tecnico', value: 'tecnico' },
                { text: 'Stato', value: 'stato' },
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
            // this.$store.dispatch('TestRequestModule/setDetailRequest',item);
            this.$store.commit('TestRequestModule/DETAIL_REQUEST', item);
            this.$router.push({
                name: 'request_detail',
                params: { testRequest: item }
            });
        },
        labelStato(idStato) {
            let result = getStatoById(idStato);
            return result;
        },
        labelPrio(idPrio) {
            let result = getPrioById(idPrio);
            return result;
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
.mytab {
    cursor: pointer;
}
</style>
