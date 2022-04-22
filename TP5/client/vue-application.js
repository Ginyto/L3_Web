const Home = window.httpVueLoader('./components/Home.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/panier', component: Panier },
]

const router = new VueRouter({ routes })

var app = new Vue({
  router,

  el: '#app',

  data: {
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    }
    
  },

  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    // const res2 = await axios.get('/api/panier')
    // this.panier = res2.data
  },

  methods: {

    async vuelogin(user, pwd) {
      const res = await axios.get(`/api/login?user=${user}&pwd=${pwd}`)
      console.log(res)

      if (res.data.Boolean === false) {
        console.log('acces denied')
        alert("Le nom d'utilisateur ou le mot de passe sont incorrectes")
      }

      if (res.data.Boolean === true) {
        this.$router.push('/home')
      }

    },

    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },

    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },

    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    }

  }

})
