<template>
    <form @submit.prevent="loginUser">
        <h2>Veuillez vous connecter</h2>
        <input type="text" v-model="user.email" placeholder="Email" required>
        <button type="submit">Login</button>
    </form>
</template>

<script>
module.exports = {
    data () {
        return {
            user: {
                email: ''
            }
        }
    },
    methods: {
        loginUser() {
            this.$emit('login-user', this.user)
        }
    }
}
</script>