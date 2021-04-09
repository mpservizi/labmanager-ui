<template>
    <v-app>
        <!-- <v-navigation-drawer v-model="drawer" app>
        </v-navigation-drawer> -->

        <v-app-bar app color="primary" dark dense>
            <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->

            <v-toolbar-title>Brescia-Lab</v-toolbar-title>
            <v-btn icon to="/" class="ml-5" plain>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn icon :to="{ name: 'apps' }" class="ml-5" plain>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <!-- <breadcrumbs class="app_links"></breadcrumbs> -->
        </v-app-bar>

        <v-main>
            <v-container fluid class="app_box">
                <div class="router_box">
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
// import Breadcrumbs from './components/Breadcrumbs';
// import TestPlannerView from 'Moduli/schedular/views/PlannerView.vue';
export default {
    name: 'App',
    components: {},
    data: () => ({
        // drawer: false,
    }),
    computed: {
        msgLoading() {
            return this.$store.state.isLoading;
        }
    }
};
</script>
<style>
html,
body {
    margin: 0;
    padding: 0;
    height: 100vh;
    /* overflow: hidden; */
}
.app_box {
    /* background-color: pink; */
    min-height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
}
.router_box {
    display: grid;
    /* background-color: green; */
}
a.v-breadcrumbs__item {
    color: white !important;
}
</style>
