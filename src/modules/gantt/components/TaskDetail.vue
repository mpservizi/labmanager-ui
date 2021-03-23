<template>
    <div>
        <v-container>
            <p class="text-h2 text-center mb-10">
                {{ taskAttivo.txtMacchina }} - {{ taskAttivo.txtCarico }} -
                {{ taskAttivo.txtWeek }}
            </p>
            <v-row>
                <v-col
                    cols="6"
                    v-for="(task, index) in listaTasks"
                    :key="index"
                >
                    <v-card class="py-4">
                        <p class="text-h4 text-center">{{ task.msg }}</p>
                        <v-list-item
                            v-for="(item, index) in task.workloads"
                            :key="index"
                            class="d-block"
                        >
                            <v-list-item-content class="text-left">
                                <v-list-item-title>{{
                                    item.msg
                                }}</v-list-item-title>
                            </v-list-item-content>
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { EventBus } from '@/shared/event-bus.js';
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
