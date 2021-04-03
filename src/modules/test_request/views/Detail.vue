<template>
    <div>
        <v-container>
            <div>
                <v-dialog v-model="dialog" max-width="750" persistent>
                    <v-card class="pa-5">
                        <form-testplan
                            @salva="handleSaveTestPlan"
                            :listaProve="listaProvePlan"
                        ></form-testplan>
                    </v-card>
                </v-dialog>
            </div>
            <form-request :richiesta="objRequest"></form-request>
            <!-- riga totale prove carichi -->
            <v-row>
                <v-col cols="4">
                    <p>Samples for 19.1 = {{ objRequest.c1 }}</p>
                </v-col>
                <v-col cols="4"
                    ><p>Samples for 19.2 = {{ objRequest.c2 }}</p>
                </v-col>
                <v-col cols="4">
                    <p>Samples for 19.3 = {{ objRequest.c3 }}</p>
                </v-col>
            </v-row>
            <!-- Riga crea test plan -->
            <v-row>
                <v-col cols="12">
                    <v-btn @click="dialog = true">Crea test program </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import FormRequest from './../components/FormRequest.vue';
import FormTestplan from '../components/FormTestplan.vue';
export default {
    name: 'DetailView',
    components: { FormRequest, FormTestplan },
    data() {
        return {
            dialog: false,
            objPlan: {},
            objRequest: {}
        };
    },
    created() {},
    props: ['testRequest'],
    mounted() {
        console.log(this.testRequest);
        this.objRequest = { ...this.testRequest };
    },
    methods: {
        //Click save su dialog test plan
        handleSaveTestPlan(result) {
            // this.objPlan = result;
            this.objRequest.testProgram = result.gruppi;
            this.objRequest.c1 = result.totProveCarichi.c1;
            this.objRequest.c2 = result.totProveCarichi.c2;
            this.objRequest.c3 = result.totProveCarichi.c3;
            this.dialog = false;
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
