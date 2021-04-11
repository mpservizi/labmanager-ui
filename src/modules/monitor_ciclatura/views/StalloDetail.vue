<template>
    <div>
        <v-row>
            <v-col cols="12" class="text-h3 text-center primary--text"
                >{{ dati.macchina }} - Stallo {{ dati.nome }}</v-col
            >
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-list color="msfondo">
                    <v-list-item>Tecnico : {{ dati.tecnico }}</v-list-item>
                    <v-list-item>Info prova : {{ dati.prova }}</v-list-item>
                    <v-list-item>Stato prova: {{ dati.stato }}</v-list-item>
                    <v-list-item>Tipo stallo: {{ dati.tipo }}</v-list-item>
                    <v-list-item>Inizio : {{ dati.start }}</v-list-item>
                    <v-list-item>Fine : {{ dati.end }}</v-list-item>
                    <v-list-item class="text-caption">Timestamp : {{ dati.timestamp }}</v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-btn @click="goBack" class="secondary">Torna indietro</v-btn>
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
</style>
