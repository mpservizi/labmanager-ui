<template>
    <div>
        <v-row dense>
            <v-spacer></v-spacer>
            <v-col cols="12">
                <div class="text-center">
                    <v-btn class="secondary" solo :to="{ name: 'add_request' }"
                        >Nuova richiesta di prova</v-btn
                    >
                </div>
            </v-col>
        </v-row>
        <!-- Riga ricerca -->
        <!-- <v-row dense>
            <v-spacer></v-spacer>
            <v-col cols="6">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
        </v-row> -->
        <!--  -->
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="listaRichieste"
                    :search="search"
                    @click:row="handleInfo"
                    hide-default-footer
                    class="elevation-1 mytab mt-5"
                >
                    <template v-slot:[`item.stato`]="{ item }">
                        {{ labelStato(item.stato) }}
                    </template>
                    <template v-slot:[`item.priority`]="{ item }">
                        <v-chip :color="getColor(item.priority)" dark>
                            {{ labelPrio(item.priority) }}
                        </v-chip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
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
            ],
            search: ''
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
        },
        getColor(prio) {
            if (prio == 1) return 'red';
            else if (prio == 2) return 'orange';
            else return 'green';
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
