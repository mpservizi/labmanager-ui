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
// import { getDatiTestRequests } from '@/data/db-test-plans.js';
import { TestRequetService } from '@/api/TestRequetService.js';

export default {
    name: 'TestPlannerView',
    components: { TestPlanner, FormRichieste, FormProve, Scala, Filtro },
    data: () => ({
        dialog: false,
        listaPlannnig: [], //lista per test request dialog
        gruppoProve: [],
        aggiornareConteggio: false,
        provaAttiva: null,
        scalaAttiva: 1,
        filtro: 'all',
        needSave: false,
        datiRichieste: {} //dati test request da server
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
        },
        hasRichieste() {
            return this.numRichieste > 0;
        },
        //Conversione lista richieste server in lista ui form
        listaUiRichieste() {
            let lista = this.datiRichieste.plans;
            return lista;
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
            // this.listaPlannnig = await TestRequetService.getRichieste();
            this.datiRichieste = this.prova();
            this.listaPlannnig = this.datiRichieste.plans;
            // this.numRichieste = this.listaPlannnig.length;
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
        //Segnare gruppo prove come pianificato
        gruppoPlanned(result) {
            this.listaPlannnig = this.listaPlannnig.filter(
                (item) => item.id != result.id
            );
            this.dialog = false;
        },
        //mostra dialog per richieste da pianificare
        handleMostraRichieste() {
            if (numRichieste > 0) {
                this.dialog = true;
            } else {
            }
        },
        //Esempio dati test request e test plans
        prova() {
            let result = {
                richieste: [
                    {
                        id: 1,
                        codiceProgetto: 'PR-03488',
                        titoloProgetto: 'Universal range',
                        descrizione: 'Switch gallery schema 1 testato a 16A',
                        dataInizio: '04/03/2021',
                        dataFine: '28/03/2021',
                        weekInizio: 8,
                        weekFine: 12,
                        tecnico: 'Malkit',
                        cliente: 'Andrea Barbero',
                        stato: 4,
                        c1: 6,
                        c2: 6,
                        c3: 6
                    },
                    {
                        id: 2,
                        codiceProgetto: 'PR-03488',
                        titoloProgetto: 'Universal range',
                        descrizione: 'Switch gallery schema 6 testato a 16A',
                        dataInizio: '04/03/2021',
                        dataFine: '28/03/2021',
                        weekInizio: 8,
                        weekFine: 12,
                        tecnico: 'Malkit',
                        cliente: 'Andrea Barbero',
                        stato: 4,
                        c1: 6,
                        c2: 6,
                        c3: 6
                    },
                    {
                        id: 3,
                        codiceProgetto: 'PR-00017',
                        titoloProgetto: 'Makel',
                        descrizione:
                            'Verificare conformità prodotti Makel con IEC-606691-ED.4',
                        dataInizio: '05/04/2021',
                        dataFine: '28/04/2021',
                        weekInizio: 14,
                        weekFine: 17,
                        tecnico: 'Malkit',
                        cliente: 'Matteo Roncalli',
                        stato: 1,
                        c1: 30,
                        c2: 0,
                        c3: 24
                    }
                ],
                plans: [
                    {
                        id: 1,
                        idRequest: 1,
                        titoloProgetto: 'Universal range',
                        titolo: 'Schema 1',
                        stato: 4,
                        c1: 6,
                        c2: 6,
                        c3: 6
                    },
                    {
                        id: 2,
                        idRequest: 2,
                        titoloProgetto: 'Universal range',
                        titolo: 'Schema 6',
                        stato: 4,
                        c1: 6,
                        c2: 6,
                        c3: 6
                    },
                    {
                        id: 3,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0010 - 19.1',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    },
                    {
                        id: 4,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0030 - 19.1',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    },
                    {
                        id: 5,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0220 - 19.1',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    },
                    {
                        id: 6,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0410 - 19.1-PB',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 0
                    },
                    {
                        id: 7,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0240 - 19.1',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    },
                    {
                        id: 8,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0210 - 19.1',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    },
                    {
                        id: 9,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0040 - 19.1',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    },
                    {
                        id: 10,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0110 - 19.1-PB',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 0
                    },
                    {
                        id: 11,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0020 - 19.3',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    },
                    {
                        id: 12,
                        idRequest: 3,
                        titoloProgetto: 'Makel',
                        titolo: 'WL0310 - 19.3',
                        stato: 1,
                        c1: 3,
                        c2: 0,
                        c3: 3
                    }
                ]
            };
            console.log(JSON.stringify(result));
            return result;
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