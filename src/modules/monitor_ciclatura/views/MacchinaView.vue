<template>
    <div>
        <div class="container">
            <v-row v-if="pronto">
                <v-col
                    :cols="sizeCols"
                    v-for="(macchina, pos) in macchine"
                    :key="pos"
                >
                    <macchina
                        :config="macchina.config"
                        :titolo="macchina.titolo"
                    ></macchina>
                </v-col>
            </v-row>
            <v-row v-else>
                <!-- <v-col cols="12" class="text-h1">Loading...</v-col> -->
            </v-row>
        </div>
    </div>
</template>

<script>
import Macchina from '../components/Macchina.vue';
import { NOME_MODULO, UPDATE_UI_SECONDS } from '../costanti.js';
let pingTimer;
export default {
    name: 'MacchinaView',
    components: {
        macchina: Macchina
    },
    data() {
        return {
            storeReady: false
        };
    },
    mounted() {
        clearInterval(pingTimer);
        this.checkStore();
    },
    destroyed() {
        clearInterval(pingTimer);
    },
    computed: {
        pronto() {
            return this.storeReady;
        },
        //  Size della colonna Macchina
        sizeCols: function () {
            let result = 6;
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                    result = 12;
                    break;
                case 'sm':
                    result = 6;
                    break;
                case 'md':
                    result = 6;
                    break;
                case 'lg':
                    result = 4;
                    break;
                case 'xl':
                    result = 4;
                    break;
            }
            return result;
        },
        macchine() {
            if (!this.pronto) return [];
            let dati = this.$store.state[NOME_MODULO].dati;
            if (!dati) {
                return [];
            }
            return [
                {
                    config: dati['L180'],
                    titolo: 'L180'
                },
                {
                    config: dati['L232'],
                    titolo: 'L232'
                },
                {
                    config: dati['L2020'],
                    titolo: 'L2020'
                }
                // {
                //     config: dati['L2021'],
                //     titolo: 'L2021'
                // }
            ];
        }
    },
    methods: {
        //Verifica se lo store è pronto prima di richiedere i dati
        checkStore() {
            //Se non esiste lo store gelobale
            if (!self.$store) {
                let self = this;
                //Controllo ogni 100ms
                let timer = setInterval(function () {
                    //Verifico se è presente lo stato del modulo nel store globale
                    if (self.$store?.state[NOME_MODULO]) {
                        clearInterval(timer);
                        self.storeReady = true;
                    }
                }, 100); //Ripeto check ogni 100ms
            } else {
                this.storeReady = true;
            }
            //Al cambiamento di storeReady in true watcher chiama il metodo loadDati
        },
        async loadDati() {
            await this.$store.dispatch(NOME_MODULO + '/loadDati');
        },
        //Loop per richiedere dati al store
        pingDati() {
            let self = this;
            clearInterval(pingTimer);
            pingTimer = setInterval(() => {
                if (self.storeReady) {
                    self.loadDati();
                }
            }, UPDATE_UI_SECONDS * 1000);
        }
    },
    watch: {
        storeReady: function (newval) {
            if (newval) {
                this.loadDati();
                this.pingDati();
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-macchine {
    display: grid;
    /* width: 880px; */
    /* height: 540px; */
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(2, 1fr); */
    gap: 20px;
}
</style>
