<template>
    <div>
        <v-dialog v-model="dialog" max-width="850" persistent>
            <v-card class="pa-5">
                <form-testplan
                    @salva="handleSaveTestPlan"
                    :listaProve="listaProvePlan"
                ></form-testplan>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import FormTestplan from '../components/FormTestplan.vue';
export default {
    name: 'DialogTestPlan',
    components: { FormTestplan },
    data() {
        return {
            msg: 'Componente modello',
            dialog: false,
            obj: {}
        };
    },
    props: ['listaProvePlan', 'mostra'],
    methods: {
        //Click save su dialog test plan
        handleSaveTestPlan(result) {
            this.obj.c1 = result.totProveCarichi.c1;
            this.obj.c2 = result.totProveCarichi.c2;
            this.obj.c3 = result.totProveCarichi.c3;
            this.obj.samples = result.totSamples;
            this.obj.testProgram = result.prove.slice();
            this.dialog = false;
            this.$emit('chiudi', this.obj);
        }
    },
    computed: {},
    watch: {
        mostra: function (valore) {
            this.dialog = valore;
        }
    }
};
</script>

<style scoped></style>
