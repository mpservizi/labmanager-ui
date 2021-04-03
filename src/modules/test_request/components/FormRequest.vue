<template>
    <div>
        <div>
            <v-form v-model="valid">
                <v-container>
                    <!--  -->
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="campi.codiceProgetto"
                                label="Codice Progetto"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="campi.titoloProgetto"
                                label="Titolo Progetto"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea
                                v-model="campi.descrizione"
                                label="Descrizione"
                                auto-grow
                                counter
                                clearable
                                rows="1"
                                row-height="15"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <!--  -->
                    <v-row>
                        <v-col cols="6">
                            <DataPicker
                                @cambio="handleInizio"
                                :label="'Data inizio'"
                                :dataAvvio="campi.dataInizio"
                            ></DataPicker>
                        </v-col>
                        <v-col cols="6">
                            <DataPicker
                                @cambio="handleFine"
                                :label="'Data Fine'"
                                :dataAvvio="campi.dataFine"
                            ></DataPicker>
                        </v-col>
                    </v-row>
                    <!--  -->
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                v-model="campi.cliente"
                                label="Richiedente"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="campi.tecnico"
                                label="Tecnico"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="campi.priority"
                                label="Priorità"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <!-- riga totale prove carichi -->
                    <v-row>
                        <v-col cols="4">
                            <p>Samples for 19.1 = {{ campi.c1 }}</p>
                        </v-col>
                        <v-col cols="4"
                            ><p>Samples for 19.2 = {{ campi.c2 }}</p>
                        </v-col>
                        <v-col cols="4">
                            <p>Samples for 19.3 = {{ campi.c3 }}</p>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
import DataPicker from '@/components/DataPicker.vue';
export default {
    name: 'HelloWorld',
    components: { DataPicker },
    data() {
        return {
            campi: {
                codiceProgetto: '',
                titoloProgetto: '',
                descrizione: '',
                cliente: '',
                tecnico: '',
                priority: '',
                c1: 0,
                c2: 0,
                c3: 0,
                dataInizio: '',
                dataFine: ''
            },
            valid: true
        };
    },
    props: ['richiesta'],
    methods: {
        handleInizio(valore) {
            this.dataInizio = valore;
        },
        handleFine(valore) {
            this.dataFine = valore;
        }
    },
    watch: {
        richiesta: function (newVal) {
            this.campi = {...newVal}
        }
    }
};
</script>

<style scoped></style>
