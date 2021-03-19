<template>
    <gantt></gantt>
</template>

<script>
import Gantt from '../components/Gantt.vue';
export default {
    name: 'GanttView',
    components: { Gantt },
    data() {
        return {};
    },
    props: {},
    mounted() {
        this.$store.dispatch('GanttModule/loadTasks');
    },
    methods: {},
    computed: {}
};
</script>

<style scoped>
</style>
