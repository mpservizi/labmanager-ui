<template>
    <div>
        <p>Test planner</p>
        <TestPlanner />
    </div>
</template>

<script>
import TestPlanner from 'Moduli/schedular/components/TestPlanner.vue'
import {MyPlanner} from './MyPlanner.js';
export default {
    name: 'TestPlannerView',
    components: {TestPlanner},
    data: () => ({
    }),
    mounted() {
        MyPlanner.init('scheduler_here');
    },
    methods: {
    }
};

function init() {
}
</script>
<style>
</style>