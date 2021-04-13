<template>
    <div>
        <v-container>
            <form-request :richiesta="objRequest" @save="handleSaveForm">
                <template v-slot:dialogBtn> Modifica prove </template>
                <template v-slot:saveBtn> Aggiorna</template>
            </form-request>
            <div class="mt-5">
                <v-btn class="error" @click="deleteTask">Delete task</v-btn>
            </div>
        </v-container>
    </div>
</template>
<script>
import FormRequest from './../components/FormRequest.vue';
export default {
    name: 'DetailView',
    components: { FormRequest },
    data() {
        return {
            objRequest: {}
        };
    },
    created() {},
    props: ['testRequest'],
    mounted() {
        this.objRequest = this.testRequest;
    },
    methods: {
        //Click save su dialog test plan
        handleSaveForm(result) {
            // this.objRequest.testProgram = result.gruppi;
            // this.objRequest.c1 = result.totProveCarichi.c1;
            // this.objRequest.c2 = result.totProveCarichi.c2;
            // this.objRequest.c3 = result.totProveCarichi.c3;
            // console.log(result);
            this.$store.dispatch('TestRequestModule/aggiornaRichiesta', result);
            this.$router.push({ name: 'test_requests' });
        },
        deleteTask() {
            this.$store.dispatch(
                'TestRequestModule/eliminaRichiesta',
                this.objRequest
            );
            this.$router.push({ name: 'test_requests' });
        }
    },
    computed: {
        listaProvePlan() {
            return this.objRequest.testProgram;
        }
    }
};
</script>

<style scoped></style>
