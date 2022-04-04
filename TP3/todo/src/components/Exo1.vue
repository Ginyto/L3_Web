<template>

    <div>
        <h1>Ceci est notre première app en vue JS en voici le titre -> {{message}}</h1>
    </div>

</template>

<script>
    export default {
        name: 'Exo-1',
        data() {
            return {
                message: 'Hello Vue!',
            }
        },
        methods: {
        },
        computed: {
        },
    }
</script>

<style lang="scss" scoped>

</style>