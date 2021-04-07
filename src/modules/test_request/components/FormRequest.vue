<template>
    <v-form>
        <div>
            <DialogTestPlan
                :listaProvePlan="listaProve"
                :mostra="dialog"
                @chiudi="handleSaveTestPlan"
            ></DialogTestPlan>
        </div>
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
        </v-row>
        <!--  -->
        <v-row>
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
            <v-col cols="2">
                <v-combobox
                    label="Priorità"
                    :items="listaPrio"
                    return-object
                    v-model="prioForm"
                >
                </v-combobox>
            </v-col>
            <v-col cols="2">
                <v-combobox
                    label="Stato"
                    :items="listaStati"
                    return-object
                    v-model="statoForm"
                >
                </v-combobox>
            </v-col>
        </v-row>
        <!-- riga totale prove carichi -->
        <v-row>
            <v-col cols="3">
                <p>Samples for 19.1 = {{ campi.c1 }}</p>
            </v-col>
            <v-col cols="3"
                ><p>Samples for 19.2 = {{ campi.c2 }}</p>
            </v-col>
            <v-col cols="3">
                <p>Samples for 19.3 = {{ campi.c3 }}</p>
            </v-col>
            <v-col cols="3">
                <p>Total samples = {{ campi.samples }}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-btn @click="dialog = true" class="info"
                    ><slot name="dialogBtn"></slot
                ></v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">
                <v-btn @click="salva" class="success"
                    ><slot name="saveBtn"></slot
                ></v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import DataPicker from '@/components/DataPicker.vue';
import DialogTestPlan from '../components/DialogTestPlan.vue';
import {
    LISTA_LABEL_PRIO,
    LISTA_LABEL_STATI,
    getStatoIdByLabel,
    getPrioIdBylabel,
    getStatoById,
    getPrioById
} from '@/data/front-db.js';
export default {
    name: 'FormRequest',
    components: { DataPicker, DialogTestPlan },
    data() {
        return {
            campi: {
                codiceProgetto: '',
                titoloProgetto: '',
                descrizione: '',
                cliente: '',
                tecnico: '',
                priority: 3,
                stato: 1,
                c1: 0,
                c2: 0,
                c3: 0,
                samples: 0,
                dataInizio: '',
                dataFine: '',
                testProgram: []
            },
            prioForm: '',
            statoForm: '',
            listaPrio: LISTA_LABEL_PRIO,
            listaStati: LISTA_LABEL_STATI,
            dialog: false
        };
    },
    props: ['richiesta'],
    methods: {
        handleInizio(valore) {
            this.campi.dataInizio = valore;
        },
        handleFine(valore) {
            this.campi.dataFine = valore;
        },
        salva() {
            this.campi.priority = getPrioIdBylabel(this.prioForm);
            this.campi.stato = getStatoIdByLabel(this.statoForm);
            this.$emit('save', this.campi);
        },
        //Click save su dialog test plan
        handleSaveTestPlan(result) {
            this.campi.c1 = result.c1;
            this.campi.c2 = result.c2;
            this.campi.c3 = result.c3;
            this.campi.samples = result.samples;
            this.campi.testProgram = result.testProgram;
            this.dialog = false;
        }
    },
    mounted() {
        // this.campi = this.richiesta;
    },
    computed: {
        listaProve() {
            if (!this.campi.testProgram) {
                return [];
            }
            return this.campi.testProgram;
        }
    },
    watch: {
        richiesta: function (newVal) {
            this.campi = { ...newVal };
            this.prioForm = getPrioById(newVal.priority * 1);
            this.statoForm = getStatoById(newVal.stato * 1);
        }
    }
};
</script>

<style scoped></style>
