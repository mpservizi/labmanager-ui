<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="codiceprogetto"
                        label="Codice Progetto"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="progetto"
                        label="Titolo Progetto"
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-textarea
                        v-model="descrizione"
                        label="Descrizione"
                        auto-grow
                        counter
                        clearable
                        rows="1"
                        row-height="15"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <DataPicker
                        @cambio="handleInizio"
                        :label="'Data inizio'"
                    ></DataPicker>
                </v-col>
                <v-col cols="6">
                    <DataPicker
                        @cambio="handleFine"
                        :label="'Data Fine'"
                    ></DataPicker>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                        v-model="richiedente"
                        label="Richiedente"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="tecnico"
                        label="Tecnico"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="priority"
                        label="Priorità"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                        v-model="c1"
                        label="Samples for 19.1"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="c2"
                        label="Samples for 19.2"
                        required
                    ></v-text-field
                ></v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="c3"
                        label="Samples for 19.3"
                        required
                    ></v-text-field
                ></v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn @click="salva" class="success">Salva</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import DataPicker from '@/components/DataPicker.vue';
export default {
    name: 'AddRequest',
    components: { DataPicker },
    data() {
        return {
            richiedente: '',
            tecnico: '',
            priority: '',
            c1: '',
            c2: '',
            c3: '',
            codiceprogetto: '',
            progetto: '',
            descrizione: '',
            inizio: '',
            fine: '',
            valid: true
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
                c1: this.c1,
                c2: this.c2,
                c3: this.c3
            };
            this.$store.dispatch('TestRequestModule/saveRichiesta', modello);
        },
        handleInizio(valore) {
            this.inizio = valore;
        },
        handleFine(valore) {
            this.fine = valore;
        }
    }
};
</script>

<style scoped></style>
