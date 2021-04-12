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
                    :error="isError"
                    :error-messages="errMsg"
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
    props: ['label', 'dataAvvio', 'isError', 'errMsg'],
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
        },
        //Formatta la data per visualizzare in data picker
        formattaPerDataPicker(strInput) {
            //Input = DD/MM/YYYY
            let arr = strInput.split('/');
            //Output YYYY-MM-DD
            let formatArr = [arr[2], arr[1], arr[0]];
            return formatArr.join('-');
        },
        //Formatta la data scelta in datapicker
        formattaDaDataPicker(strInput) {
            //Input YYYY-MM-DD
            let arr = strInput.split('-');
            //Output in DD/MM/YYYY
            let formatArr = [arr[2], arr[1], arr[0]];
            return formatArr.join('/');
        }
    },
    mounted() {
        //Data di oggi come data default
        this.dataSelect = new Date().toISOString().substr(0, 10);
        this.salva();
    },
    computed: {
        //Formatta la data selezionata nel data picker
        formatDate() {
            let strDate = '';
            if (this.dataSelect) {
                strDate = this.formattaDaDataPicker(this.dataSelect);
            }
            return strDate;
        }
    },
    watch: {
        dataAvvio: function (newVal) {
            if (newVal) {
                this.dataSelect = this.formattaPerDataPicker(newVal);
            }
        }
    }
};
</script>

<style scoped></style>
