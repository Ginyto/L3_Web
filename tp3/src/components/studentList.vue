<template>
    <div class="container">
        <h1>Liste des étudiants</h1>
        <button class="btn btn-light m-2"><router-link to="/groupe-a">Groupe A</router-link></button>
        <button class="btn btn-light m-2"><router-link to="/groupe-b">Groupe B</router-link></button>
        <button class="btn btn-light m-2"><router-link to="/groupe-ab">Groupe AB</router-link></button>
        <div class="container mt-5">
            <router-view />
        </div>    
    </div>
</template>
<script>
export default {
    name: "studentList",
}
</script>
<style scoped>
router-link {

}
</style>