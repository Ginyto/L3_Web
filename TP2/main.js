const app = Vue.createApp({

    data() {
        return {
            groupe: '10',
            age: '22',
            annee: '2022'
        }
    },
})

app.mount('#app')


const vm2 = Vue.createApp({

    data() {
        return {

            isWhite: false,

        }
    },

    methods: {
        inverser() {
            this.isWhite = !this.isWhite
            console.log(this.isWhite)
        }
    }
})

vm2.mount('#vm2')