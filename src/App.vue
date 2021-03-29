<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <!--  -->
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark dense>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>My-App</v-toolbar-title>
            <v-btn icon to="/" class="ml-5">
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <breadcrumbs class="app-links"></breadcrumbs>
                <div class="rw">
                    <router-view></router-view>
                    <!-- <test-planner-view></test-planner-view> -->
                </div>
            </v-container>
        </v-main>
        <v-footer padless dense>
            <v-col class="text-center" cols="12">
                <span>Made with passion by </span><strong>Malkit Sandhu</strong>
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
import Breadcrumbs from './components/Breadcrumbs';
// import TestPlannerView from 'Moduli/schedular/views/PlannerView.vue';
export default {
    name: 'App',
    components: { Breadcrumbs },
    data: () => ({
        drawer: false,
        dev: true
    })
};
</script>
<style>
html,
body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
    /* overflow: hidden; */
}
.prova {
    background: green;
    height: 100%;
}
.rw {
    /* background: gray; */
    height: 850px;
}
</style>
