<template>
    <div>
        <v-row dense>
            <v-col cols="12" class="">
                <p class="text-h6 pa-2">
                    Seleziona il gruppo prove da pianificare
                </p>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12">
                <v-data-table
                    dense
                    :headers="headers"
                    :items="listaRichieste"
                    disable-pagination
                    hide-default-footer
                    show-select
                    v-model="selected"
                    single-select
                    item-key="id"
                    class="elevation-1"
                >
                    <template v-slot:[`item.stato`]="{ item }">
                        {{ labelStato(item.stato) }}
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12">
                <v-card flat>
                    <v-card-actions class="px-10">
                        <v-btn color="primary" @click.stop="cancel">
                            Cancel
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click.stop="completa">
                            Pianificato
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="info" @click.stop="save">
                            Seleziona
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { getStatoById } from '@/data/front-db.js';
export default {
    name: 'FormRichieste',
    components: {},
    props: {
        listaRichieste: Array
    },
    data() {
        return {
            singleSelect: false,
            selected: [],
            headers: [
                { text: 'Progetto', value: 'titoloProgetto' },
                { text: 'Gruppo prove', value: 'titolo' },
                { text: 'Stato', value: 'stato' },
                { text: '19.1', value: 'c1' },
                { text: '19.2', value: 'c2' },
                { text: '19.3', value: 'c3' }
            ]
        };
    },
    created() {},
    mounted() {},
    methods: {
        save() {
            let result = this.selected[0];
            if (!result) {
                alert('Nessun dato selezionato');
                return;
            }
            this.$emit('save', result);
        },
        cancel() {
            this.$emit('close');
        },
        completa() {
            let result = this.selected[0];
            if (result) {
                this.$emit('completa', result);
            }
        },
        labelStato(idStato) {
            let result = getStatoById(idStato);
            return result;
        }
    },
    computed: {}
};
</script>

<style scoped>
.tab_richieste {
    overflow: hidden;
}
</style>
