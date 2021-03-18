<template>
    <gantt :tasks="tasks"></gantt>
</template>

<script>
import Gantt from '../components/Gantt.vue';
export default {
    name: 'GanttView',
    components: { Gantt },
    data() {
        return {
            tasks: {
                data: [
                    {
                        id: 1,
                        text: 'Task #1',
                        start_date: '2020-01-17',
                        duration: 3,
                        progress: 0.6
                    },
                    {
                        id: 2,
                        text: 'Task #2',
                        start_date: '2020-01-20',
                        duration: 3,
                        progress: 0.4
                    }
                ],
                links: [{ id: 1, source: 1, target: 2, type: '0' }]
            }
        };
    },
    props: {},
    mounted() {
        this.$store.dispatch('GanttModule/loadRichieste');
    },
    methods: {},
    computed: {
        dati() {
            return this.$store.getters['GanttModule/listaRichieste'];
        }
    }
};
</script>

<style scoped>
</style>
