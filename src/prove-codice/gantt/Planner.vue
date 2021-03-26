<template>
    <div>
        <div id="gantt_here" style="width: 100%; height: 800px"></div>
    </div>
</template>

<script>
import MyGantt from 'Moduli/gantt/js/my-gantt.js';
export default {
    name: 'Planner',
    components: {},
    data: () => ({
    }),
    mounted() {
        init();
    },
    methods: {
    }
};

function init() {
    MyGantt.init('gantt_here');
}
</script>
<style>
@import '~Moduli/gantt/libs/gantt/dhtmlxgantt.css';
@import '~Moduli/gantt/css/my-style.css';
</style>
