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
                <v-col cols="12" class="text-h1">Loading...</v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import Macchina from '../../components/Macchina';
import { NOME_MODULO } from './../../costanti.js';
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
        this.checkStore();
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
        checkStore() {
            //Se non esiste il modulo nello strore
            if (!self.$store) {
                let self = this;
                //Controllo ogni 100ms
                let timer = setInterval(function () {
                    if (self.$store?.state[NOME_MODULO]) {
                        clearInterval(timer);
                        self.storeReady = true;
                    }
                }, 100);
            } else {
                this.storeReady = true;
            }
        },
        async loadDati() {
            await this.$store.dispatch(NOME_MODULO + '/loadDati');
        }
    },
    watch: {
        storeReady: function (newval) {
            if (newval) {
                this.loadDati();
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
