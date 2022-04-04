<template>

  <div class="hello">

    <h1>{{ msg }}</h1>

    <p>
      Voici notre TP3 en VueJS/CLI
      <br>
      ->
      <a href="./Exercice1.vue">Exercice1</a>.
      <br>
      ->
      <a href="./Exercice2.vue">Exercice2</a>.
    </p>

  </div>

</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
