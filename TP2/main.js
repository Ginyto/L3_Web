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
        },
    },

    computed: {

        myText() {
            if (this.isWhite) {
                return 'Blanc'
            }
            return 'Noir'
        }
    }
})

vm2.mount('#vm2')



const tableau = Vue.createApp({

    data() {
        return {

            tab:[
                { nom : "Dupont", note : 12, groupe: "A" },
                { nom : "Aubin", note : 8, groupe : "B" },
                { nom : "François", note : 14, groupe : "B" },
                { nom: "Martin", note: 9, groupe: "A" }
            ]
        }
    },

    methods: {
        quelgroupe(i) {
            if (this.tab[i].groupe === "A") {
                return true
            }
            return false
            }
        }
    
})

tableau.mount('#tableau')