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
                <div class="planner">
                    <TestPlanner @ready="init" />
                </div>
            </v-col>
            <v-col cols="3">
                <div class="toPlan">
                    <div class="text-left pl-1">
                        <p>
                            {{ msgRichieste }}
                            <span>
                                <v-btn
                                    @click.stop="dialog = true"
                                    color="success"
                                    class="ma-1"
                                    >Mostra</v-btn
                                >
                            </span>
                        </p>
                    </div>
                    <div id="samples_box" class="text-left pl-1">
                        <p>Prova Attiva : {{ provaSelezionata }}</p>
                        <v-badge
                            overlap
                            v-for="(item, index) in samples"
                            :key="index"
                            :content="item.campioni"
                        >
                            <v-chip class="ma-1" @click="provaClick(item)">{{
                                item.label
                            }}</v-chip>
                        </v-badge>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
// import TestPlanner from 'Moduli/schedular/components/TestPlanner.vue';
import TestPlanner from 'Moduli/schedular/components/Scheduler.vue';
import FormRichieste from './FormRichieste.vue';
// import { MyPlanner } from './MyPlanner.js';
import { creaTaskPlanner } from './TaskMaker.js';
import { EventBus } from '@/shared/event-bus.js';
import { getDatiTestRequests } from '@/data/db-test-plans.js';

export default {
    name: 'TestPlannerView',
    components: { TestPlanner, FormRichieste },
    data: () => ({
        dialog: false,
        listaPlannnig: [],
        samples: [],
        provaAttiva: null,
        numRichieste: 0
    }),
    created() {
        EventBus.on('cell_click', this.handleCellDblClick);
        this.loadDati();
    },
    mounted() {},
    computed: {
        provaSelezionata() {
            return this.provaAttiva ? this.provaAttiva.label : 'Nessuna';
        },
        msgRichieste() {
            let msg = 'Nessuna richiesta da pianificare';
            if (this.numRichieste > 0) {
                msg = 'Richieste da pianificare : ' + this.numRichieste;
            }
            return msg;
        }
    },
    methods: {
        init(containerId) {
            // MyPlanner.init(containerId);
        },
        provaClick(item) {
            this.provaAttiva = item;
        },
        handleCellDblClick(params) {
            let prova = this.provaAttiva ? { ...this.provaAttiva } : null;
            if (prova) {
                let obj = { ...params, ...prova };
                // let result = MyPlanner.creaTaskProva(obj);
                let result = creaTaskPlanner(obj);
                if (result) {
                    let cont = this.provaAttiva.campioni - 1;
                    if (cont > 0) {
                        this.provaAttiva.campioni = cont;
                    } else {
                        let id = prova.id;
                        let resto = this.samples.filter(
                            (item) => item.id != id
                        );
                        this.samples = resto;
                        this.provaAttiva = null;
                    }
                }
            } else {
                console.log('nessuna prova');
            }
        },
        handleSaveForm(result) {
            console.log(result);
            let lista = [];
            let cont = 1;
            for (let i = 1; i < 4; i++) {
                let carico = '19.' + i;
                let numCampioni = result[carico];
                if (numCampioni > 0) {
                    lista.push({
                        id: cont,
                        carico: i,
                        durata: 2,
                        label: carico + '-10A',
                        campioni: numCampioni
                    });

                    cont++;
                }
            }

            this.dialog = false;
            this.samples = lista;
        },
        handleCloseForm() {
            this.dialog = false;
        },
        listaPronta(numItems) {
            this.numRichieste = numItems;
        },
        loadDati() {
            this.listaPlannnig = getDatiTestRequests();
            this.numRichieste = this.listaPlannnig.length;
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