<template>
    <div>
        <v-row>
            <!-- <v-col cols="4">{{ msgRiepilogo }}</v-col> -->
            <v-col cols="2">Gruppi : {{ numGruppi }}</v-col>
            <v-col cols="3">Prove totali : {{ totAllProve }}</v-col>
            <v-col cols="2">19.1 = {{ totProve.c1 }}</v-col>
            <v-col cols="2">19.2 = {{ totProve.c2 }}</v-col>
            <v-col cols="2">19.3 = {{ totProve.c3 }}</v-col>
            <v-col cols="1">
                <v-btn @click="handleSave" color="">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <!-- Riga inserimento valori  -->
        <v-row dense>
            <v-col cols="12">
                <v-radio-group
                    class="d-flex"
                    row
                    mandatory
                    v-model="itemEdit.corrente"
                >
                    <template v-slot:label>
                        <div class="text-h5">Corrente nominale :</div>
                    </template>
                    <v-radio label="10A" value="10"></v-radio>
                    <v-radio label="16A" value="16"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <!--  -->
        <v-row dense>
            <v-col cols="3">
                <v-text-field
                    v-model="itemEdit.p1"
                    label="Titolo gruppo"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    v-model="itemEdit.p2"
                    label="19.1"
                    required
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    v-model="itemEdit.p3"
                    label="19.2"
                    required
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    v-model="itemEdit.p4"
                    label="19.3"
                    required
                    type="number"
                ></v-text-field>
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="2">
                <div class="pt-3">
                    <v-btn @click="handleAdd" text color="info">
                        Inserisci
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <!--  -->
        <div class="box_lista">
            <v-row dense v-for="(item, index) in prove" :key="index">
                <v-col cols="3">{{ item.titolo }}</v-col>
                <v-col cols="2">{{ item.c1 }}</v-col>
                <v-col cols="2">{{ item.c2 }}</v-col>
                <v-col cols="2">{{ item.c3 }}</v-col>
                <v-col cols="1">{{ item.corrente }}A</v-col>
                <v-col cols="1">
                    <v-btn plain color="error" @click="handleDelete(index)"
                        ><v-icon>mdi-delete</v-icon></v-btn
                    >
                </v-col>
                <v-col cols="1">
                    <v-btn plain color="info" @click="handleEdit(index)"
                        ><v-icon>mdi-pencil</v-icon></v-btn
                    >
                </v-col>
                <v-col cols="12">
                    <v-divider></v-divider>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormTestplan',
    components: {},
    props: ['listaProve'],
    data() {
        return {
            itemEdit: this.resetObjForm(),
            prove: []
        };
    },
    computed: {
        totProve() {
            let result = {
                c1: 0,
                c2: 0,
                c3: 0
            };
            this.prove.forEach((item) => {
                result.c1 += item.c1 * 1;
                result.c2 += item.c2 * 1;
                result.c3 += item.c3 * 1;
            });
            return result;
        },
        msgRiepilogo() {
            let msg = `Tot gruppi : ${this.numGruppi}   Tot prove: ${this.totAllProve}`;
            return msg;
        },
        totAllProve() {
            let objTot = this.totProve;
            let totprove = objTot.c1 + objTot.c2 + objTot.c3;
            return totprove;
        },
        numGruppi() {
            return this.prove.length;
        }
    },
    methods: {
        handleDelete(pos) {
            this.prove.splice(pos, 1);
        },
        handleEdit(pos) {
            let arrItem = this.prove[pos];
            this.itemEdit = Object.assign(
                {},
                {
                    id: arrItem.id,
                    p1: arrItem.titolo,
                    p2: arrItem.c1,
                    p3: arrItem.c2,
                    p4: arrItem.c3,
                    corrente: arrItem.corrente
                }
            );
        },
        ordinaArrayProve(lista) {
            function compare(a, b) {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            }

            lista.sort(compare);
        },
        resetObjForm() {
            return {
                id: null,
                p1: '',
                p2: '',
                p3: '',
                p4: '',
                corrente: '10'
            };
        },
        creaObjGruppoProva() {
            let f = this.itemEdit;
            let obj = {
                titolo: f.p1,
                c1: f.p2 * 1,
                c2: f.p3 * 1,
                c3: f.p4 * 1,
                corrente: f.corrente,
                stato: 1
            };
            return obj;
        },
        handleAdd() {
            let f = this.itemEdit;
            let valid = f.p1 && f.p2 && f.p3 && f.p4;
            if (!valid) return;

            let obj = this.creaObjGruppoProva();
            //update o insert new
            if (f.id) {
                obj.id = f.id; //ricopio id esistente
                //rimuovo oggetto esistente
                let posItem = this.prove.map((o) => o.id).indexOf(f.id);
                this.prove.splice(posItem, 1);
            } else {
                //Genero id per nuovo item
                obj.id = 'tp-' + new Date().getTime();
            }
            //Inserisco oggetto nella matrice
            this.prove.push(obj);
            //Odrino valori in base al id, che corrisponde al indice
            this.ordinaArrayProve(this.prove);
            // Resetto campi oggetto form
            this.itemEdit = this.resetObjForm();
        },
        handleSave() {
            let tmp = {
                prove: this.prove,
                numGruppi: this.numGruppi,
                totProveCarichi: this.totProve,
                totSamples: this.totAllProve
            };
            let json = JSON.stringify(tmp);
            let result = JSON.parse(json);
            this.$emit('salva', result);
        }
    },
    mounted() {
        this.prove = this.listaProve;
    },
    watch: {
        listaProve: function (arrProve) {
            if (arrProve) {
                this.prove = arrProve;
            }
        }
    }
};
</script>

<style scoped>
.box_lista {
    height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
