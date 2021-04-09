<template>
    <div>
        <v-row>
            <v-col cols="12" class="text-h3 text-center"
                >{{ dati.macchina }} - Stallo {{ dati.nome }}</v-col
            >
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="d-flex justify-center text-center">
                    <v-card class="pa-2 mr-4" height="200" width="200">
                        <p>Tecnico : {{ dati.tecnico }}</p>
                        <p>Info prova : {{ dati.prova }}</p>
                    </v-card>
                    <v-card class="pa-2 mr-4" height="200" width="200">
                        <p>Stato prova: {{ dati.stato }}</p>
                        <p>Tipo stallo: {{ dati.tipo }}</p>
                    </v-card>

                    <v-card class="pa-2" height="200" width="200">
                        <p>Inizio : {{ dati.start }}</p>
                        <p>Fine : {{ dati.end }}</p>
                    </v-card>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p class="text-caption text-center">
                    Timestamp : {{ dati.timestamp }}
                </p>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-btn @click="goBack" class="info">Torna indietro</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'StalloDetail',
    props: [],
    components: {},
    data() {
        return {};
    },
    mounted() {},
    computed: {
        dati(state) {
            return this.$route.params;
        }
    },
    methods: {
        goBack: function () {
            this.$router.push({ name: 'monitor_ciclatura' });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    list-style: none;
    text-align: start;
}
</style>
