<template>

    <div id="main">
        <h1 id = "titre">TODO LIST</h1>

        <div id="todo">

            <div id="sup">
                <div id="ele">
                    Ajouter un élément
                </div>
                
                <input type="text" class="saisie" id="titre_tache" placeholder="tache" v-model="top">
            </div>


            <div id="down">
                <div>Description de la tache </div>
                <textarea v-model="bottom" type="text" class="saisie" id="description" placeholder="Description de votre tache"></textarea>
            </div>

            <div id="bot_zone">
                <div id="bot">

                    <div>Tache déjà faite ?
                        <input type="checkbox" id="check" v-bind="echo">
                    </div>

                    <button type='button' id="add_button" @click="addTache(top,bottom)">Ajouter</button>
                </div>
            </div>

        </div>

        <div id="journal">
                <h1> ✅ : {{fait}}  Quêtes  ❌ : {{pasfait}}</h1>
                
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

                if(titre != undefined || description != undefined) {
                    console.log(titre);
                    console.log(description);

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
                }

                else {
                    alert("Veuillez remplir tous les champs");
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
            fait(){
                var x = 0

                for(var i = 0; i < this.coche.length; i++) {
                    if(this.coche[i] == '✅') {
                        x++
                    }
                }

                return x
            },

            pasfait(){
                var x = 0

                for(var i = 0; i < this.coche.length; i++) {
                    if(this.coche[i] == '❌') {
                        x++
                    }
                }

                return x
            }
        },
    }

</script>


<style lang="css" scoped>


#sup{
    margin-top: 2vh;
}

#down{
    margin-top: 2vh;
}

.saisie{
    border-radius: 3%;
    border: none;

    border-left: solid 0.5vh rgb(24, 114, 218);
    border-bottom: solid 0.2vh rgb(24, 114, 218);
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
    border: none;
    background-color: white;
    border-bottom: solid 0.2vh rgb(24, 114, 218);
    align-self: center;
}

#ele{
    width: 30vh;
    border: none;
    background-color: white;
    border-bottom: solid 0.2vh rgb(24, 114, 218);
    margin-left: 80vh;
    margin-bottom: 3vh;

    display: flex;
}


.sub_zone{
    display: flex;
    justify-content: center;
}

.subtitle{
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-around;
    width: 100vh;

    border-bottom: solid 0.05vh black;
}

#bot_zone{
    display: flex;
    justify-content: center;
}

#bot{
    /* background-color: rgb(255, 0, 191); */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    width: 30vh;
    height: 10vh;
}







</style>