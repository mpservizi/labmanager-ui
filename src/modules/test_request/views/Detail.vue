<template>
    <div>
        <div>Detail test request</div>
        <div>
            <form-request :richiesta="testRequest"></form-request>
        </div>
    </div>
</template>
<script>
import FormRequest from './../components/FormRequest.vue';
export default {
    name: 'DetailView',
    components: { FormRequest },
    data() {
        return {
            testRequest: {}
        };
    },
    created() {},
    props: {},
    mounted() {
        this.testRequest = this.$store.getters['TestRequestModule/detailRequest'];
    },
    methods: {},
    computed: {}
};
</script>

<style scoped></style>
