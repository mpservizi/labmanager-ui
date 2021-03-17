<template>
    <div>
        <scheduler></scheduler>
    </div>
</template>

<script>
import Scheduler from '../components/Scheduler.vue';

export default {
    name: 'app',
    components: { Scheduler },
    data() {
        return {
            messages: []
        };
    },
    methods: {}
};
</script>

<style></style>
