<template>
    <div>
        <!-- Dialog test plans -->
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

        <!-- riga Toolbar -->
        <div class="ms_toolbar">
            <v-row no-gutters>
                <!-- scala -->
                <v-col cols="2">
                    <scala @cambio="cambiaScala"></scala>
                </v-col>
                <!-- Filtreo -->
                <v-col cols="4">
                    <filtro @cambio="filtra" @save="save"></filtro>
                </v-col>
                <!-- Test request -->
                <v-col cols="4">
                    <div class="toPlan">
                        <div class="text-left pl-1 d-flex ml-2">
                            <form-prove
                                :numRichieste="numRichieste"
                                :needUpdate="aggiornareConteggio"
                                :itemProva="gruppoProve"
                                @provaChanged="changeProvaAttiva"
                            ></form-prove>
                            <div></div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="2" class="text-right pa-3">
                    <v-btn @click.stop="dialog = true" color="success"
                        >Mostra richieste</v-btn
                    ></v-col
                >
            </v-row>
        </div>
        <!-- riga planner -->
        <v-row>
            <v-col cols="12">
                <TestPlanner
                    class="px-5"
                    :scala="scalaAttiva"
                    :filtro="filtro"
                    :needSave="needSave"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Scala from '../components/Scala.vue';
import Filtro from '../components/Filtro.vue';
import TestPlanner from 'Moduli/schedular/components/Scheduler.vue';
import FormProve from '../components/FormProve.vue';
import FormRichieste from '../components/FormRichieste.vue';
import { creaTaskPerProva } from '../js/TaskMaker.js';
import { EventBus } from '@/shared/event-bus.js';
import { getDatiTestRequests } from '@/data/db-test-plans.js';

export default {
    name: 'TestPlannerView',
    components: { TestPlanner, FormRichieste, FormProve, Scala, Filtro },
    data: () => ({
        dialog: false,
        listaPlannnig: [],
        gruppoProve: [],
        aggiornareConteggio: false,
        provaAttiva: null,
        numRichieste: 0,
        scalaAttiva: 1,
        filtro: 'all',
        needSave: false
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
        //Cambio scala
        cambiaScala(valore) {
            this.scalaAttiva = valore;
        },
        //Filtro macchina
        filtra(valore) {
            this.filtro = valore;
        },
        save() {
            this.needSave = !this.needSave;
        }
    }
};
</script>
<style scoped>
/* @import './../css/my-style.css'; */
@import './../css/planner.css';
@import './../css/ciclatura.css';
.toPlan {
    /* border: 1px solid red; */
}
.planner {
    border: 1px solid red;
}
.ms_toolbar {
    border: 1px solid pink;
    height: 100px;
    margin-bottom: 10px;
}
</style>