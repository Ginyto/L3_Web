<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Exo1/>
  </div>
</template>

<script>
// @ is an alias to /src
import Exo1 from '@/components/Exo1.vue'

export default {
  name: 'Exo1View',
  components: {
    Exo1
  }
}
</script>
