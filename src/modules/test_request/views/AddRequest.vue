<template>
    <div>
        <div>
            <v-dialog v-model="dialog" max-width="750" persistent>
                <v-card class="pa-5">
                    <form-testplan @salva="handleSaveTestPlan"></form-testplan>
                </v-card>
            </v-dialog>
        </div>
        <!--  -->
        <div>
            <v-form v-model="valid">
                <v-container>
                    <!--  -->
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="codiceprogetto"
                                label="Codice Progetto"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="progetto"
                                label="Titolo Progetto"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea
                                v-model="descrizione"
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
                            ></DataPicker>
                        </v-col>
                        <v-col cols="6">
                            <DataPicker
                                @cambio="handleFine"
                                :label="'Data Fine'"
                            ></DataPicker>
                        </v-col>
                    </v-row>
                    <!--  -->
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                v-model="richiedente"
                                label="Richiedente"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="tecnico"
                                label="Tecnico"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="priority"
                                label="Priorità"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <!-- riga totale prove carichi -->
                    <v-row>
                        <v-col cols="4">
                            <p>Samples for 19.1 = {{ c1 }}</p>
                        </v-col>
                        <v-col cols="4"
                            ><p>Samples for 19.2 = {{ c2 }}</p>
                        </v-col>
                        <v-col cols="4">
                            <p>Samples for 19.3 = {{ c3 }}</p>
                        </v-col>
                    </v-row>
                    <!-- Riga crea test plan -->
                    <v-row>
                        <v-col cols="12">
                            <v-btn @click="dialog = true"
                                >Crea test program
                            </v-btn>
                        </v-col>
                    </v-row>
                    <!--  -->
                    <v-row>
                        <v-col cols="2">
                            <v-btn @click="salva" class="success"
                                >Salva richiesta</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
import DataPicker from '@/components/DataPicker.vue';
import FormTestplan from '../components/FormTestplan.vue';
export default {
    name: 'AddRequest',
    components: { DataPicker, FormTestplan },
    data() {
        return {
            richiedente: '',
            tecnico: '',
            priority: '',
            c1: 0,
            c2: 0,
            c3: 0,
            codiceprogetto: '',
            progetto: '',
            descrizione: '',
            inizio: '',
            fine: '',
            testPlan: {},
            dialog: false,
            valid: true
        };
    },
    methods: {
        salva() {
            let modello = {
                codiceProgetto: this.codiceprogetto,
                titoloProgetto: this.progetto,
                descrizione: this.descrizione,
                dataInizio: this.inizio,
                dataFine: this.fine,
                weekInizio: '',
                weekFine: '',
                tecnico: this.tecnico,
                cliente: this.richiedente,
                priority: this.priority,
                stato: 1,
                testPlan: this.testPlan,
                c1: this.c1,
                c2: this.c2,
                c3: this.c3
            };

            //Ricostruisco nuovo oggetto eliminado i campi reattivi di vue. Forse non serve
            this.$store.dispatch(
                'TestRequestModule/saveRichiesta',
                modello
            );

            this.$router.push({ name: 'test_requests' });
        },
        handleInizio(valore) {
            this.inizio = valore;
        },
        handleFine(valore) {
            this.fine = valore;
        },
        //Click save su dialog test plan
        handleSaveTestPlan(result) {
            this.c1 = result.totProveCarichi.c1;
            this.c2 = result.totProveCarichi.c2;
            this.c3 = result.totProveCarichi.c3;
            this.testPlan = result.gruppi.slice();
            this.dialog = false;
        }
    }
};
</script>

<style scoped></style>
