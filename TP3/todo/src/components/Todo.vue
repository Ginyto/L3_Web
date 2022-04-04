/* eslint-disable vue/require-v-for-key */
<template>

    <div id="main">
        <h1 id = "titre">TODO LIST</h1>

        <div id="todo">

            <div id="sup">
                <div>Nom de la tache</div>
                <input type="text" class="saisie" id="titre_tache" placeholder="tache" v-model="top">
            </div>


            <div id="down">
                <div>Description de la tache </div>
                <textarea v-model="bottom" type="text" class="saisie" id="description" placeholder="Description de votre tache"></textarea>
            </div>


            Tache déjà faite ? <input type="checkbox" id="check" v-bind="echo">
            <button type='button' id="add_button" @click="addTache(top,bottom)">Ajouter la tâche</button>

        </div>

        <div id="journal">
                <h1>Quêtes</h1>
                
                <div class="sub_zone">
                    <div class="subtitle">
                        <div>#</div>
                        <div>Titre</div>
                        <div>Description</div>
                        <div>Etat</div>
                    </div>
                </div>

                <div class="sub_zone" v-for = "(titre, index) in nom" :key="titre">

                    <div class="subtitle">

                        <div>{{index + 1}}</div>
                        <div>{{titre}}</div>
                        <div>{{aim[index]}}</div>
                        <div @click="fini(index)">{{coche[index]}}</div>

                    </div>


                </div>
        </div>

    </div>

</template>

<script>

    export default {
        name: 'todo-list',

        data() {
            return {
                nom : [],
                aim : [],
                coche : []
            }
        },

        methods: {

            addTache(titre, description) {
                this.nom.push(titre);
                this.aim.push(description);

                this.top = "";
                this.bottom = "";

                if(document.getElementById("check").checked == true) {
                    this.coche.push('✅');
                }
                else {
                    this.coche.push('❌');
                }

            },

            fini(index) {

                if(this.coche[index] == '✅') {
                    this.coche[index] = '❌'
                }

                else {
                    this.coche[index] = '✅'
                }
            }
            

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

#sup{
    margin-top: 2vh;
}

#down{
    margin-top: 2vh;
}

.saisie{
    border-radius: 3%;
    border: none;
}

#titre_tache{
    width: 30vh;
    height: 3vh;
}

#description{
    width: 30vh;
    height: 10vh;
}

#add_button{
    width: 20vh;
}

#journal{
    background-color: #5bd0ff;
}

.sub_zone{
    display: flex;
    justify-content: center;
}

.subtitle{
    background-color: #e89eff;
    display: flex;
    justify-content: space-around;
    width: 100vh;
}

</style>