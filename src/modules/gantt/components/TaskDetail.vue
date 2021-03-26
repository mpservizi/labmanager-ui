<template>
    <div>
        <v-container>
            <p class="text-h2 text-center mb-10">
                {{ taskAttivo.macchina }} - {{ taskAttivo.carico }} - WK{{
                    taskAttivo.week
                }}
            </p>
            <p>Carico è occupato per : {{ taskAttivo.duration }} giorni</p>
            <v-row>
                <v-col
                    cols="6"
                    v-for="(task, index) in listaTasks"
                    :key="index"
                >
                    <v-card class="py-4 px-2">
                        <p class="text-h4 text-center">
                            {{ task.titolo }}
                        </p>
                        <p>Numero prove : {{ task.numProve }}</p>
                        <ul>
                            <li v-for="(prova, k) in task.prove" :key="k">
                                {{ prova.msg }}
                            </li>
                        </ul>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { creaListaTaskDetailUi } from '../js/my-ui.js';
export default {
    name: 'TaskDetail',
    components: {},
    props: ['id'],
    data() {
        return {
            taskAttivo: {},
            listaTasks: []
        };
    },
    created() {},
    mounted() {
        let task = this.$route.params.task;
        this.taskAttivo = task;
        this.listaTasks = creaListaTaskDetailUi(task);
    },
    computed: {
        titolo() {
            return this.taskAttivo.text;
        }
    }
};
</script>

<style scoped></style>
