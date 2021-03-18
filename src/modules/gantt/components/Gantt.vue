<template>
    <div ref="gantt" class="ganttBox"></div>
</template>
 
<script>
import { gantt } from '../libs/gantt/dhtmlxgantt.js';
export default {
    name: 'gantt',
    props: {
        tasks: {
            type: Object,
            default() {
                return { data: [], links: [] };
            }
        }
    },

    mounted: function () {
        gantt.config.xml_date = '%Y-%m-%d';

        gantt.init(this.$refs.gantt);
        gantt.parse(this.$props.tasks);
    }
};
</script>
 
<style>
@import '../libs/gantt/dhtmlxgantt.css';
.ganttBox {
    position: relative;
    height: 100%;
}
</style>