<template>
    <div>
        <!-- Dialog test plans -->
        <v-dialog v-model="dialog" max-width="750" scrollable persistent>
            <v-card class="my_dialog">
                <FormRichieste
                    :lista-richieste="listaPlannnig"
                    @save="handleSaveForm"
                    @close="dialog = false"
                    @completa="gruppoPlanned"
                />
            </v-card>
        </v-dialog>

        <!-- Contenitore per tollbar e schedular -->
        <div class="box_view">
            <!-- riga Toolbar -->
            <div class="ms_toolbar">
                <v-row no-gutters>
                    <!-- scala -->
                    <v-col cols="2" class="pt-0">
                        <scala @cambio="cambiaScala"></scala>
                    </v-col>
                    <!-- Filtreo -->
                    <v-col cols="2" class="pt-3">
                        <filtro @cambio="filtra" @save="save"></filtro>
                    </v-col>
                    <v-col cols="1" class="pt-3 text-center">
                        <v-btn @click="save" class="success">Salva dati</v-btn>
                    </v-col>
                    <!-- Test request -->
                    <v-col
                        cols="2"
                        class="text-left pt-3"
                        v-show="hasRichieste"
                    >
                        <p>{{ msgRichieste }}</p>
                        <p>Prova Attiva : {{ provaSelezionata }}</p>
                    </v-col>
                    <v-col cols="3" class="pt-3">
                        <form-prove
                            :needUpdate="aggiornareConteggio"
                            :itemProva="gruppoProve"
                            @provaChanged="changeProvaAttiva"
                        ></form-prove>
                    </v-col>
                    <v-col cols="2" class="text-center pt-3">
                        <v-btn
                            v-show="hasRichieste"
                            @click.stop="dialog = true"
                            color="info"
                            class=""
                            >Mostra richieste</v-btn
                        >
                    </v-col>
                </v-row>
            </div>
            <!-- riga planner -->
            <div class="box_planner_view">
                <v-row no-gutters>
                    <v-col cols="12" class="">
                        <TestPlanner
                            class="px-5"
                            :scala="scalaAttiva"
                            :filtro="filtro"
                            :needSave="needSave"
                        />
                    </v-col>
                </v-row>
            </div>
        </div>
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
import { TestRequetService } from '@/api/TestRequetService.js';
import { ENUM_STATI_RICHIESTE } from '@/data/front-db.js';
export default {
    name: 'TestPlannerView',
    components: { TestPlanner, FormRichieste, FormProve, Scala, Filtro },
    data: () => ({
        dialog: false,
        listaPlannnig: [], //lista per test request dialog
        gruppoProve: [], //Riga selezionata nel request dialog
        aggiornareConteggio: false, //per aggioranare il numero di prove da pianificare nel gruppo prove
        provaAttiva: null, //prova selezionat anel gruppo prove
        scalaAttiva: 1, //cambio scala schedular
        filtro: 'all', //cambio filtro macchine schedular
        needSave: false, //bottone save dati schedular
        datiRichieste: {}, //dati test request da server,
        numProveToPlan: 0, //Numero di prove ancora da pianificare,
        palnnedResult: null, //Valore riga passato da tasto pianificato nel dialog
        showPlanned: true //Se mostrare richieste già pianificate nella lista
    }),
    created() {
        EventBus.on('cell_click', this.handleCellDblClick);
        this.loadDati();
    },
    mounted() {},
    computed: {
        msgRichieste() {
            let msg = 'Nessuna richiesta da pianificare';
            if (this.numRichieste > 0) {
                msg = 'Richieste da pianificare : ' + this.numRichieste;
            }
            return msg;
        },
        provaSelezionata() {
            return this.provaAttiva ? this.provaAttiva.label : 'Nessuna';
        },
        numRichieste() {
            return this.listaPlannnig.length;
            // return this.numProveToPlan;
        },
        hasRichieste() {
            return this.numRichieste > 0;
        }
    },
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
        async loadDati() {
            this.datiRichieste = await TestRequetService.getRichieste();
            this.creaListaToPlan();
        },
        creaListaToPlan() {
            let lista = [];
            let cont = 0;
            //Creo al lista da passare al dialog richieste da pianificare solo con richieste
            //che contengono prove
            this.datiRichieste.forEach((item) => {
                if (item.testProgram && item.testProgram.length > 0) {
                    // cont += item.testProgram.length;
                    //Aggiuongo id rechiesta ad ogni valore della item test program
                    //
                    item.testProgram.forEach((prova, index) => {
                        if (
                            this.showPlanned ||
                            prova.stato == ENUM_STATI_RICHIESTE.TO_PLAN
                        ) {
                            //Aggiungere id request nel form di creazione della richiesta
                            prova.id = index;
                            prova.idRequest = item._id;
                            prova.titoloProgetto = item.titoloProgetto;
                            lista.push(prova);
                            cont++;
                        }
                    });
                }
            });
            this.numProveToPlan = cont;
            this.listaPlannnig = lista;
            return lista;
        },
        //Quando cambia la prova da pianificare nel form prove
        changeProvaAttiva(payload) {
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
        //Salvataggio dati
        save() {
            this.needSave = !this.needSave;
        },
        filtraListaProve() {
            let result = this.palnnedResult;
            this.listaPlannnig = this.listaPlannnig.filter((item) => {
                let key1 = item.idRequest + '-' + item.id;
                let key2 = result.idRequest + '-' + result.id;
                return key1 != key2;
            });
        },
        //Segnare gruppo prove come pianificato
        async gruppoPlanned(result) {
            this.palnnedResult = result;
            //Aggiornare lo stato nella matrice originale dei dati
            result.stato = ENUM_STATI_RICHIESTE.PLANNED;
            TestRequetService.aggiornaStatoGruppo(this.datiRichieste, result);
            this.dialog = false;
        },
        //mostra dialog per richieste da pianificare
        handleMostraRichieste() {
            if (numRichieste > 0) {
                this.dialog = true;
            } else {
            }
        }
    },
    watch:{
        palnnedResult:function(){
            this.filtraListaProve();
        }
    }
};
</script>
<style scoped>
/* @import './../css/my-style.css'; */
@import './../css/planner.css';
@import './../css/ciclatura.css';

.my_dialog {
    overflow: hidden !important;
}
.box_view {
    display: grid;
    min-height: 100%;
    grid-template-rows: 100px 1fr;
    /* padding: 10px; */
}
.ms_toolbar {
    /* border: 1px solid pink; */
    display: grid;
    height: 100px;
    /* background-color: rgb(250, 153, 229); */
}
.box_planner_view {
    display: grid;
    /* background-color: green; */
    margin-top: 20px;
}
</style>