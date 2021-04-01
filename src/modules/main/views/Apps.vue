<template>
    <div>
        <v-row justify="start">
            <v-col cols="3" v-for="app in listaApp" :key="app.id" class="px-10">
                <v-card
                    color="#385F73"
                    dark
                    :to="{ name: app.routeName }"
                    max-width="250"
                >
                    <v-card-title class="headline text-center">
                        {{ app.label }}
                    </v-card-title>

                    <v-card-subtitle>{{ app.descrizione }}</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { LISTA_MODULI } from '@/shared/info-moduli';
export default {
    name: 'Apps',
    components: {},
    data() {
        return {};
    },
    props: {},
    computed: {
        listaApp() {
            let result = LISTA_MODULI.filter((item) => item.id != 1);
            return result;
        }
    }
};
</script>

<style scoped></style>
