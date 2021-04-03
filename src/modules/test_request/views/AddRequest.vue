<template>
    <div>
        <v-container>
            <form-request :richiesta="objRequest" @save="handleSaveForm">
                <template v-slot:dialogBtn> Imposta prove </template>
                <template v-slot:saveBtn> Salva</template>
            </form-request>
        </v-container>
    </div>
</template>

<script>
import FormRequest from './../components/FormRequest.vue';
export default {
    name: 'AddRequest',
    components: { FormRequest },
    data() {
        return {
            richiedente: '',
            tecnico: '',
            priority: '',
            c1: 0,
            c2: 0,
            c3: 0,
            codiceprogetto: '',
            progetto: '',
            descrizione: '',
            inizio: '',
            fine: '',
            testProgram: {},
            dialog: false,
            valid: true,
            objRequest: {}
        };
    },
    methods: {
        salva() {
            let modello = {
                codiceProgetto: this.codiceprogetto,
                titoloProgetto: this.progetto,
                descrizione: this.descrizione,
                dataInizio: this.inizio,
                dataFine: this.fine,
                weekInizio: '',
                weekFine: '',
                tecnico: this.tecnico,
                cliente: this.richiedente,
                priority: this.priority,
                stato: 1,
                testProgram: this.testProgram,
                c1: this.c1,
                c2: this.c2,
                c3: this.c3
            };

            this.$store.dispatch('TestRequestModule/saveRichiesta', modello);

            this.$router.push({ name: 'test_requests' });
        },
        handleInizio(valore) {
            this.inizio = valore;
        },
        handleFine(valore) {
            this.fine = valore;
        },
        //Click save su dialog test plan
        handleSaveTestPlan(result) {
            console.log(result);
        },
        //Save form con dati
        handleSaveForm(result) {
            console.log(result);
        }
    },
    computed: {}
};
</script>

<style scoped></style>
