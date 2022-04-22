const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const axios = require('axios')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'gianlucca',
  database: 'db_tp5'
})

//on connecte la variable db à la base de données
db.connect((err) => {

    if (err) throw err
    console.log('\n-----Connected!-----\n')

})


function sql_login(username, password, callback) {

  const sql = `SELECT * FROM users WHERE email = '${username}' AND password = '${password}';`

  db.query(sql, (err, result) => {

    if (err) throw err

    console.log("result---------->", result)

    if (result.length === 0) {

      return callback(false)

    }

    return callback(true)

  })

}

router.get('/login', (req, res) => {
  const username = req.query.user
  const password = req.query.pwd

  var mes = ""

  //console.log("here---------->", username, password)

  sql_login(username, password, (result) => {
    console.log("bool---------->", result)
    if (!result) {
      mes = "Wrong username or password"
      res.json({ Boolean: false })
    }

    else {
      mes = "Success"
      res.status(200).json({ Boolean: true })
    }

    
    
  })
  
})


function get_table(table, callback) {
  
  db.query(`SELECT * FROM ${table} LIMIT 100`, (err, result) => {
    if (err) throw err
    return callback(result)
  })

}


function sql_article(name, description, price, image) {

  //console.log("here---------->",name, description, price, image)

  if (price > 0) {
    return `INSERT INTO articles(name,description,price,image) VALUES('${name}','${description}',${price},'${image}');`
  }
  else {
    return "error"

  }

}


function add_article(name, description, price, image) {

  const sql = sql_article(name, description, price, image)

  //console.log("here---------->", sql)
  
  db.query(sql, (err, result) => {

    if (err) throw err

  })

}






class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  res.status(200)
    .json(req.session.panier)
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier/:articleId/:qte', (req, res) => {

  // res.json({
  //   message: "bien reçu !!!",

  //   query : req.query,

  //   body: req.body,
    
  //   params : req.params
  // })

  const id = parseInt(req.params.articleId)
  const qte = parseInt(req.params.qte)
  const panier = req.session.panier

  if ((id >= 0 && id <= articles.length) && (qte > 0) && (!panier.articles.find(article => article.id === id))) {

    const article = articles.find(article => article.id === id)
    

    for (let index = 0; index < qte; index++) {

      panier.articles.push(article)
    }

    res.status(200).json(panier)

  }

  else {
    res.status(400).json({ message: 'articleId should be a number or u need a quantity > 0' })
    return
  }
    
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {

  req.session.destroy()
  
  res.status(200).json({ message: `merci ${req.query.nom} ${req.query.prenom} pour votre achat`})

})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId/:qte', (req, res) => {

  // res.json({
  //   message: "bien reçu !!!",

  //   query : req.query,

  //   body: req.body,
    
  //   params : req.params
  // })

  const id = parseInt(req.params.articleId)
  const qte = parseInt(req.params.qte)
  const panier = req.session.panier

  if ((id >= 0 && id <= articles.length) && (qte > 0) && (panier.articles.find(article => article.id === id))) {

    const article = articles.find(article => article.id === id)

    const count = panier.articles.filter(article => article.id === id).length


    if (qte > count) {

      for (let index = 0; index < qte - count; index++) {

        panier.articles.push(article)
      }

    }

    else if (qte < count) {
        
      for (let index = 0; index < count - qte; index++) {
  
        panier.articles.splice(panier.articles.indexOf(article), 1)
      }
  
    }
    

    res.status(200).json(panier)

  }

  else {
    res.status(400).json({ message: 'articleId should be a number or you need a quantity > 0' })
    return
  }

})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {
  
    // res.json({
    //   message: "bien reçu !!!",
  
    //   query : req.query,
  
    //   body: req.body,
      
    //   params : req.params
    // })
  
    const id = parseInt(req.params.articleId)
    const panier = req.session.panier
  
    if ((id >= 0 && id <= articles.length) && (panier.articles.find(article => article.id === id))) {
  
      const article = articles.find(article => article.id === id)

      const count = panier.articles.filter(article => article.id === id).length

      for (let index = 0; index < count; index++) {
  
        panier.articles.splice(panier.articles.indexOf(article), 1)
        
      }
  
      res.status(200).json(panier)
  
    }
  
    else {
      res.status(400).json({ message: 'articleId should be a number' })
      return
    }
  
})


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {

  get_table('articles', (data) => { 
    res.json(data)
  })
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  add_article(req.body.name, req.body.description, parseInt(req.body.price), req.body.image)
  res.status(200).json({ message: 'article added' })
})




/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })




module.exports = router
