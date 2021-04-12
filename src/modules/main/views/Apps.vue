<template>
    <v-container class="">
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="8">
                <v-row>
                    <v-col
                        cols="6"
                        v-for="app in listaApp"
                        :key="app.id"
                        class="pa-10"
                    >
                        <v-card
                            color="secondary"
                            dark
                            :to="{ name: app.routeName }"
                            max-width="400"
                            height="200"
                        >
                            <v-card-title class="headline justify-center">
                                {{ app.label }}
                            </v-card-title>

                            <v-card-subtitle>{{
                                app.descrizione
                            }}</v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import { LISTA_MODULI } from '@/shared/info-moduli';
export default {
    name: 'Apps',
    components: {},
    data() {
        return {
            //List id apps da mostrare in questo ordine
            listaIds: [4, 2, 5]
        };
    },
    props: {},
    computed: {
        listaApp() {
            let result = [];
            let listaIndici = LISTA_MODULI.map((o) => o.id);
            this.listaIds.forEach((id) => {
                let pos = listaIndici.indexOf(id);
                result.push(LISTA_MODULI[pos]);
            });
            return result;
        }
    }
};
</script>

<style scoped></style>
