<template>
    <div>
        <v-row>
            <v-col cols="9">
                <div class="planner">
                    <TestPlanner @ready="init" />
                </div>
            </v-col>
            <v-col cols="3">
                <div class="toPlan">
                    <div id="samples_box">
                        <p>Prova Attiva : {{provaSelezionata}}</p>
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
import TestPlanner from 'Moduli/schedular/components/TestPlanner.vue';
import { MyPlanner } from './MyPlanner.js';
import { EventBus } from '@/shared/event-bus.js';

export default {
    name: 'TestPlannerView',
    components: { TestPlanner },
    data: () => ({
        samples: [
            {id:1, carico: 1, durata: 2, label: '19.1-10A', campioni: 3 },
            {id:2, carico: 2, durata: 1, label: '19.2-10A', campioni: 3 },
            {id:3, carico: 3, durata: 2, label: '19.3-10A', campioni: 3 }
        ],
        provaAttiva: null
    }),
    created() {
        EventBus.on('cell_click', this.handleCellDblClick);
    },
    mounted() {},
    computed:{
        provaSelezionata(){
            return this.provaAttiva?this.provaAttiva.label:'Nessuna';
        }
    },
    methods: {
        init(containerId) {
            MyPlanner.init(containerId);
            init();
        },
        provaClick(item) {
            this.provaAttiva = item;
        },
        handleCellDblClick(params) {
            let prova = this.provaAttiva?{...this.provaAttiva}:null;
            if(prova){
                let obj = {...params,...prova}
                let result = MyPlanner.creaTaskProva(obj);
                if(result){
                    let cont = this.provaAttiva.campioni-1;
                    if(cont>0){
                        this.provaAttiva.campioni = cont; 
                    }else{
                        let id = prova.id;
                        let resto = this.samples.filter(item=>item.id!=id);
                        this.samples = resto;
                        this.provaAttiva=null;
                    }
                }
            }else{
                console.log('nessuna prova');
            }
        },
    }
};

function init() {
    const box = document.getElementById('samples_box');
}
</script>
<style scoped>
.toPlan {
    border: 1px solid red;
}
.toPlan div {
    border: 1px solid red;
    margin: 5px;
}
.planner {
    border: 1px solid red;
}
</style>