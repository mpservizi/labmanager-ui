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
            objRequest: {}
        };
    },
    methods: {
        //Save form con dati
        handleSaveForm(result) {
            this.$store.dispatch('TestRequestModule/saveRichiesta', result);
            this.$router.push({ name: 'test_requests' });
        }
    },
    computed: {}
};
</script>

<style scoped></style>
