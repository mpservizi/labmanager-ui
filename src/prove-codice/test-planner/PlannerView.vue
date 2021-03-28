<template>
    <div>
        <v-row>
            <v-col cols="9">
                <div class="planner">
                    <p>Test planner</p>
                    <TestPlanner @ready="init"/>
                </div>
            </v-col>
            <v-col cols="3">
                <div class="toPlan">
                    <div id="tree_container"></div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import TestPlanner from 'Moduli/schedular/components/TestPlanner.vue';
import { MyPlanner } from './MyPlanner.js';
export default {
    name: 'TestPlannerView',
    components: { TestPlanner },
    data: () => ({}),
    mounted() {        
    },
    methods: {
        init(containerId){
        MyPlanner.init(containerId);
        init();
        }
    }
};

function init() {
}
</script>
<style scoped>
.toPlan {
    border: 1px solid red;
}
.toPlan div {
    border: 1px solid red;
    margin: 5px;
}
.planner {
    border: 1px solid red;
}
</style>