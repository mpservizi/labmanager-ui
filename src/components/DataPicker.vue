<template>
    <div>
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="valore"
                    :label="label"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="valore" @input="salva"></v-date-picker>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: 'DataPicker',
    components: {},
    props: ['label'],
    data() {
        return {
            menu: false,
            valore: ''
        };
    },
    methods: {
        salva() {
            this.menu = false;
            this.$emit('cambio', this.valore);
        }
    }
};
</script>

<style scoped></style>
