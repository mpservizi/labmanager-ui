<template>
    <v-card
        class="boxProve secondary text-center"
        flat
        :ripple="false"
        active-class=""
        v-if="hasItems"
        @click.stop="boxClick"
    >
        <v-row>
            <v-col v-for="(item, index) in samples" :key="index" cols="4">
                <v-badge overlap :content="item.campioni">
                    <v-chip
                        class="mt-2 accent"
                        @click.stop="provaClick(item)"
                        >{{ item.label }}</v-chip
                    >
                </v-badge>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: 'FormProve',
    components: {},
    data: () => ({
        samples: [],
        provaAttiva: null
    }),
    props: ['itemProva', 'needUpdate'],
    created() {},
    mounted() {},
    computed: {
        hasItems() {
            return this.samples.length > 0;
        }
    },
    methods: {
        provaClick(item) {
            this.provaAttiva = item;
        },
        boxClick() {
            this.provaAttiva = null;
        },
        handleSaveForm(result) {
            let lista = [];
            let cont = 1;
            for (let i = 1; i < 4; i++) {
                let carico = '19.' + i;
                let idCarico = 'c' + i;
                let numCampioni = result[idCarico];
                if (numCampioni > 0) {
                    lista.push({
                        id: cont,
                        idCarico: i,
                        label: `${carico}-${result.corrente}A`,
                        corrente: result.corrente,
                        campioni: numCampioni,
                        stato: result.stato, //id stato prova
                        titolo: result.titolo, //Gruppo prova
                        idRequest: result.idRequest, //id test request
                        titoloProgetto: result.titoloProgetto, //prfogetto test request
                        descrizione: result.descrizione //Descrione test request
                    });

                    cont++;
                }
            }
            this.samples = lista;
        },
        aggiornaCounterProve() {
            let cont = this.provaAttiva.campioni - 1;
            if (cont > 0) {
                this.provaAttiva.campioni = cont;
            } else {
                let id = this.provaAttiva.id;
                let resto = this.samples.filter((item) => item.id != id);
                this.samples = resto;
                this.provaAttiva = null;
            }
        }
    },
    watch: {
        itemProva: function (newVal, oldVal) {
            this.handleSaveForm(newVal);
        },
        provaAttiva: function (newVal, oldVal) {
            this.$emit('provaChanged', newVal);
        },
        needUpdate: function () {
            this.aggiornaCounterProve();
        }
    }
};
</script>
<style scoped>
.boxProve {
    display: flex;
    height: 100%;
    padding-left: 10px;
    padding-top: 20px;
    padding-right: 20px;
    /* padding-bottom: 10px; */
}
</style>