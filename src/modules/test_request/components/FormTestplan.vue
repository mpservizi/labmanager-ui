<template>
    <div>
        <v-row>
            <v-col cols="4">{{ msgRiepilogo }}</v-col>
            <v-col cols="2">19.1 = {{ totProve.c1 }}</v-col>
            <v-col cols="2">19.2 = {{ totProve.c2 }}</v-col>
            <v-col cols="2">19.3 = {{ totProve.c3 }}</v-col>
            <v-col cols="2">
                <v-btn @click="handleSave" text color="success"> Chiudi </v-btn>
            </v-col>
        </v-row>
        <!--  -->
        <!-- <v-row>
            <v-col cols="4">{{ msgRiepilogo }}</v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">
                <v-btn @click="handleSave" text color="success text-center">
                    Chiudi
                </v-btn>
            </v-col>
        </v-row> -->
        <!-- Riga inserimento valori  -->
        <v-row>
            <v-col cols="4">
                <v-text-field
                    v-model="p1"
                    label="titolo"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field v-model="p2" label="19.1" required></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field v-model="p3" label="19.2" required></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field v-model="p4" label="19.3" required></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn @click="handleAdd" plain fab color="info">
                    <v-icon>mdi-check-bold</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <!--  -->
        <div class="box_lista">
            <v-row dense v-for="(item, index) in prove" :key="index">
                <v-col cols="4">{{ item.titolo }}</v-col>
                <v-col cols="2">{{ item.c1 }}</v-col>
                <v-col cols="2">{{ item.c2 }}</v-col>
                <v-col cols="2">{{ item.c3 }}</v-col>
                <v-col cols="2"
                    ><v-btn plain color="error" @click="handleDelete(index)"
                        ><v-icon>mdi-delete</v-icon></v-btn
                    ></v-col
                >
                <v-col cols="11">
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
    data() {
        return {
            p1: '',
            p2: '',
            p3: '',
            p4: '',
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
            let msg = `Tot gruppi : ${this.numGruppi}  Tot prove: ${this.totAllProve}`;
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
        handleAdd() {
            let valid = this.p1 && this.p2 && this.p3 && this.p4;
            if (!valid) return;

            let obj = {
                id:this.prove.length+1,
                titolo: this.p1,
                c1: this.p2,
                c2: this.p3,
                c3: this.p4
            };
            this.prove.push(obj);
            this.p1 = '';
            this.p2 = '';
            this.p3 = '';
            this.p4 = '';
        },
        handleSave() {
            let tmp = {
                gruppi: this.prove,
                numGruppi: this.numGruppi,
                totProveCarichi: this.totProve
            };
            let json = JSON.stringify(tmp);
            let result = JSON.parse(json);
            this.$emit('salva', result);
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
