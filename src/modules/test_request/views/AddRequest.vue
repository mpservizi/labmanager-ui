<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="progetto"
                        label="Progetto"
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        v-model="descrizione"
                        label="Descrizione"
                        required
                    ></v-text-field>
                </v-col>
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
                <v-col cols="12">
                    <v-btn @click="salva">Salva</v-btn>
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
            progetto: '',
            descrizione: '',
            inizio: '',
            fine: '',
            prova: '',
            valid: true
        };
    },
    methods: {
        salva() {
            let obj = {
                progetto: this.progetto,
                descrizione: this.descrizione,
                inizio: this.inizio,
                fine: this.fine
            };
            console.log(obj);
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
