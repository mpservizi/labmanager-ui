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
                    :value="formatDate"
                    :label="label"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="dataSelect" @input="salva"></v-date-picker>
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
            dataSelect: ''
        };
    },
    methods: {
        salva() {
            this.menu = false;
            this.$emit('cambio', this.formatDate);
        }
    },
    computed: {
        //Formatta la data selezionata nel data picker
        formatDate() {
            let strDate = '';
            //Data default è in questo format 'YYYY-MM-DD'
            if (this.dataSelect) {
                let arr = this.dataSelect.split('-');
                //Converto in DD/MM/YYYY
                let formatArr = [arr[2], arr[1], arr[0]];
                strDate = formatArr.join('/');
            }
            return strDate;
        }
    }
};
</script>

<style scoped></style>
