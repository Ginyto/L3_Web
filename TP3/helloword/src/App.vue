<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld></HelloWorld>
  <Exercice1></Exercice1>
  <Exercice2></Exercice2>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Exercice1 from './components/Exercice1.vue'
import Exercice2 from './components/Exercice2.vue'


export default {

  name: 'App',

  components: {
    HelloWorld,
    Exercice1,
    Exercice2,

  }

}

</script>


<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
