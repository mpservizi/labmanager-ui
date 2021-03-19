<template>
    <div>
        <div>
            <v-btn @click="raggruppa">Raggruppa</v-btn>
        </div>
        <div ref="gantt" class="ganttBox"></div>
    </div>
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
    data() {
        return {
            gruppoAttivo: false
        };
    },
    mounted: function () {
        gantt.plugins({
            grouping: true
        });

        // gantt.config.task_height = 16;
        // gantt.config.row_height = 40;

        gantt.serverList('carichi', [
            { key: 1, label: '19.1' },
            { key: 2, label: '19.2' },
            { key: 3, label: '19.3' }
        ]);

        gantt.templates.grid_row_class = gantt.templates.task_row_class = function (
            start,
            end,
            task
        ) {
            if (task.$virtual) return 'summary-row';
        };
        gantt.templates.task_class = function (start, end, task) {
            if (task.$virtual) {
                // task.render = 'split';
                // task.open = false;
                return 'summary-bar';
            }
        };

        // gantt.config.xml_date = '%Y-%m-%d';
        gantt.config.xml_date = '%d-%m-%Y';

        gantt.init(this.$refs.gantt);
    },
    methods: {
        raggruppa() {
            if (this.gruppoAttivo) {
                gantt.groupBy(false);
            } else {
                gantt.groupBy({
                    groups: gantt.serverList('carichi'),
                    relation_property: 'idCarico',
                    group_id: 'key',
                    group_text: 'label'
                });
                // gantt.sort('start_date');
            }
            this.gruppoAttivo = !this.gruppoAttivo;

            gantt.render();
        }
    },
    computed: {
        // Estaggo i dati dal store
        dati() {
            return this.$store.getters['GanttModule/listaTasks'];
        }
    },
    watch: {
        //  Quando cambiano i dati nel store ricarico nel gantt
        dati(newVal, oldVal) {
            gantt.parse(newVal);
        }
    }
};
</script>
 
<style>
@import '../libs/gantt/dhtmlxgantt.css';
.ganttBox {
    /* position: relative; */
    height: 800px;
}

.summary-row,
.summary-row.odd {
    background-color: #eeeeee;
    font-weight: bold;
}

.gantt_grid div,
.gantt_data_area div {
    font-size: 12px;
}

.summary-bar {
    opacity: 0;
}

.baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255, 153, 0);
}
/* move task lines upper */
.gantt_task_line,
.gantt_line_wrapper {
    margin-top: -9px;
}

.gantt_side_content {
    margin-bottom: 7px;
}

.gantt_task_link .gantt_link_arrow {
    margin-top: -12px;
}

.gantt_side_content.gantt_right {
    bottom: 0;
}
</style>