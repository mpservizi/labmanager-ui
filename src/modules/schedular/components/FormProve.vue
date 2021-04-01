<template>
    <div class="py-5">
        <v-badge
            overlap
            v-for="(item, index) in samples"
            :key="index"
            :content="item.campioni"
        >
            <v-chip class="ml-4" @click="provaClick(item)">{{
                item.label
            }}</v-chip>
        </v-badge>
    </div>
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
    computed: {},
    methods: {
        provaClick(item) {
            this.provaAttiva = item;
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
                        carico: i,
                        durata: 2,
                        label: carico + '-10A',
                        campioni: numCampioni,
                        idRequest: result.IdRequest,
                        titolo: result.Titolo
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
</style>