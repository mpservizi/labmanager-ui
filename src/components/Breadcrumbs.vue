<template>
    <div>
        <v-breadcrumbs
            large
            :items="breadcrumbList"
            divider=" / "
        ></v-breadcrumbs>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    data() {
        return {
            breadcrumbList: []
        };
    },
    mounted() {
        this.updateList();
    },
    watch: {
        $route() {
            this.updateList();
        }
    },
    methods: {
        updateList() {
            let listaRouter = this.$route.meta.breadcrumb;
            let listaLinks = [];
            //Se ci sono più di 1 link, altrimenti nascondo breadcumb
            if (listaRouter.length > 1) {
                listaRouter.forEach((item) => {
                    if (item) {
                        let obj = {
                            text: item.name,
                            disabled: false,
                            exact: true,
                            to: { name: item.link }
                        };
                        listaLinks.push(obj);
                    }
                });
            }
            this.breadcrumbList = listaLinks;
        }
    }
};
</script>

<style scoped>
</style>