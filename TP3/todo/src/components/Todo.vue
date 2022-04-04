<template>

    <div id="main">
        <h1 id = "titre">TODO LIST</h1>

        <div id="todo">

            Titre de la tache <br>
            <input type="text" class="saisie">

            <br>

            Description de la tache <br>
            <input type="text" class="saisie">

            <br>

            <button type='button'>Ajouter la tâche</button>

        </div>

    </div>

</template>

<script>

    export default {
        name: 'todo-list',

        data() {
            return {

            }
        },
        methods: {

        },
        computed: {

        },
    }

</script>


<style lang="css" scoped>

#main{
    background-color: #e89eff;
}

#todo{
    background-color: #ffd6a9;

}


</style>