<template>
    <div>
        <v-row>
            <v-col v-for="app in listaApp" :key="app.id">
                <div>
                    <h1>{{ app.label }}</h1>
                    <router-link :to="{ name: app.routeName }"
                        >Open</router-link
                    >
                </div>
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
