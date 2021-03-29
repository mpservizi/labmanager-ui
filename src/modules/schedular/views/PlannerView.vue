<template>
    <div>
        <v-dialog
            v-model="dialog"
            fullscreen
            scrollable
            hide-overlay
            transition="dialog-top-transition"
        >
            <v-card>
                <FormRichieste
                    :lista-richieste="listaPlannnig"
                    @save="handleSaveForm"
                    @close="dialog = false"
                />
            </v-card>
        </v-dialog>
        <v-row>
            <v-col cols="9">
                <div><scala @cambio="cambiaScala"></scala></div>
                <div class="planner">
                    <TestPlanner :scala="scalaAttiva" />
                </div>
            </v-col>
            <v-col cols="3">
                <div class="toPlan">
                    <div class="text-left pl-1">
                        <p>
                            <v-btn
                                @click.stop="dialog = true"
                                color="success"
                                class="ma-1"
                                >Mostra richieste</v-btn
                            >
                        </p>
                    </div>
                    <div>
                        <form-prove
                            :numRichieste="numRichieste"
                            :needUpdate="aggiornareConteggio"
                            :itemProva="gruppoProve"
                            @provaChanged="changeProvaAttiva"
                        ></form-prove>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Scala from '../components/Scala.vue';
import TestPlanner from 'Moduli/schedular/components/Scheduler.vue';
import FormProve from '../components/FormProve.vue';
import FormRichieste from '../components/FormRichieste.vue';
import { creaTaskPerProva } from '../js/TaskMaker.js';
import { EventBus } from '@/shared/event-bus.js';
import { getDatiTestRequests } from '@/data/db-test-plans.js';

export default {
    name: 'TestPlannerView',
    components: { TestPlanner, FormRichieste, FormProve, Scala },
    data: () => ({
        dialog: false,
        listaPlannnig: [],
        gruppoProve: [],
        aggiornareConteggio: false,
        provaAttiva: null,
        numRichieste: 0,
        scalaAttiva: 1
    }),
    created() {
        EventBus.on('cell_click', this.handleCellDblClick);
        this.loadDati();
    },
    mounted() {},
    computed: {},
    methods: {
        //Doppio click sulla cella schedular
        handleCellDblClick(params) {
            //Se è selezionata una prova
            if (this.provaAttiva) {
                let obj = { ...params, ...this.provaAttiva };
                //Creo in task in schedular
                let result = creaTaskPerProva(obj);
                if (result) {
                    //Tolgo la prova dalla lista da pianificare
                    //Inverto la variabile ad ogni cambiamento, il componente ha il watch su questa prop
                    this.aggiornareConteggio = !this.aggiornareConteggio;
                }
            }
        },

        //Save button dialog
        handleSaveForm(result) {
            this.gruppoProve = result;
            this.dialog = false;
        },
        //Close button dialog
        handleCloseForm() {
            this.dialog = false;
        },
        //Carica la lista delle preove da pianificare
        loadDati() {
            this.listaPlannnig = getDatiTestRequests();
            this.numRichieste = this.listaPlannnig.length;
        },
        //Quando cambia la prova da pianificare nel form prove
        changeProvaAttiva(payload) {
            console.log('prova cambiata');
            this.provaAttiva = payload;
        },

        cambiaScala(valore) {
            this.scalaAttiva = valore;
        }
    }
};
</script>
<style scoped>
.toPlan {
    border: 1px solid red;
}
.planner {
    border: 1px solid red;
}
</style>