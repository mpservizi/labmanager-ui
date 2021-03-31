<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-data-iterator :items="listaRichieste" hide-default-footer>
                    <template v-slot:header>
                        <v-toolbar class="mb-2" color="primary" dark flat>
                            <v-toolbar-title>
                                Seleziona il gruppo prove da
                                pianificare</v-toolbar-title
                            >
                        </v-toolbar>
                    </template>
                    <template v-slot:default="">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Progetto</th>
                                        <th class="text-left">Gruppo prove</th>
                                        <th class="text-left">19.1</th>
                                        <th class="text-left">19.2</th>
                                        <th class="text-left">19.3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template
                                        v-for="(item, index) in listaRichieste"
                                    >
                                        <tr :key="index">
                                            <td>{{ item.titoloProgetto }}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr
                                            v-for="(prova, k) in item.prove"
                                            :key="`r-${index}-t-${k}`"
                                        >
                                            <td></td>
                                            <td>{{ prova.titolo }}</td>
                                            <td>{{ prova['19.1'] }}</td>
                                            <td>{{ prova['19.2'] }}</td>
                                            <td>{{ prova['19.3'] }}</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                    <template v-slot:footer>
                        <v-toolbar class="mt-2" color="white" dark flat>
                            <v-btn color="primary" @click.stop="cancel">
                                Cancel
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="info" @click.stop="completa">
                                Pianificato
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="success" @click.stop="save">
                                Save
                            </v-btn>
                        </v-toolbar>
                    </template>
                </v-data-iterator>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'FormRichieste',
    components: {},
    props: {
        listaRichieste: Array
    },
    data() {
        return {
            singleSelect: false,
            selected: [],
            headers: [
                { text: 'Progetto', value: 'titoloProgetto' },
                { text: 'Gruppo prove', value: 'titoloProva' },
                { text: '19.1', value: '19.1' },
                { text: '19.2', value: '19.2' },
                { text: '19.3', value: '19.3' }
            ]
        };
    },
    created() {},
    mounted() {},
    methods: {
        save() {
            let result = this.selected[0];
            if (!result) {
                alert('Nessun dato selezionato');
                return;
            }
            this.$emit('save', result);
        },
        cancel() {
            this.$emit('close');
        },
        completa() {
            let result = this.selected[0];
            if (result) {
                this.$emit('completa', result);
            }
        }
    },
    computed: {
        listaValoriRichieste() {
            let result = [];
            this.listaRichieste.forEach((item) => {
                let c1 = 0,
                    c2 = 0,
                    c3 = 0;
                item.prove.forEach((prova) => {
                    let obj = {
                        ...item,
                        id: `${item.id}-${prova.id}`,
                        titoloProva: prova.titolo,
                        19.1: c1 + prova['19.1'],
                        19.2: c2 + prova['19.2'],
                        19.3: c3 + prova['19.3']
                    };
                    result.push(obj);
                });
            });

            console.log(result);
            return result;
        }
    }
};
</script>

<style scoped>
.tab_richieste {
    overflow: hidden;
}
</style>
