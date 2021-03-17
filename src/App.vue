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
            <v-container>
                <breadcrumbs />
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Breadcrumbs from './components/Breadcrumbs';
export default {
    name: 'App',
    components: { Breadcrumbs },
    data: () => ({
        drawer: false
    })
};
</script>
<style>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}
</style>
