<template>

    <div>
        <h1 id="titre">Ceci est notre première app en vue JS en voici le titre -> {{message}}</h1>

        <Todo></Todo>


    </div>

</template>

<script>

    import Todo from './Todo.vue'

    export default {
        name: 'Exo-1',

        data() {
            return {
                message: 'Exercice 1',
            }
        },

        methods: {

        },
        computed: {

        },

        components: {
            Todo
        }
    }
</script>

<style lang="css" scoped>

#titre{
    background-color: #a9ff38;
}
</style>