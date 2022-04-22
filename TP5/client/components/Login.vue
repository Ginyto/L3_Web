<template>

  <div id="zone">

    <div id="login">

      <h2>Connexion🔒</h2>

      <div id="input_zone">
          
          👤 : <input type="text" v-model="login" placeholder="Login"> <br>
  
          🤐 : <input type="password" v-model="password" placeholder="Password"> <br> <br>
          
          <button @click="init()"> Connexion </button>

      </div>

    </div>

  </div>

</template>


<script>

module.exports = {

  data () {

    return {

      login: '',
      password: ''

    }
  },

  methods: {
    init(){

      console.log(this.login)
      console.log(this.password)

      if(!this.login != ""){
        alert('Veuillez remplir tous les champs')
      }

      else{
        console.log('demande de connexion')
        this.$emit('vuelogin', this.login, this.password)
      }

    }
  }
}
</script>


<style scoped>

#zone{
  display: flex;

  width: 100%;
  height: 80%;
  
  justify-content: center;
  align-items: center;

  background-color: aquamarine;

}

#login{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 300px;

  background-color: rgb(242, 188, 242);
  border-radius: 10px;

}

</style>
