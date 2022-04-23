const express = require('express');
const res = require('express/lib/response');
const router = express.Router()
const mysql = require('mysql2')
const db = mysql.createConnection({
  host: "localhost",
  database: 'advanced-web_tp5',
  user: "root",
  password: "W%5EM8G7CpvZb%QP"

});

db.connect(function(err) {
  if(err) throw err;
  console.log('Connected!')
})


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
  res.status(200).json(req.session.panier)
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {
  const id = parseInt(req.body.id)
  const qty = parseInt(req.body.qty)

  if(!articles.filter(article => article.id === id).length > 0) {
    res.status(404).json({message: 'Article doesn\'t exist'})
    return
  }
  if(qty <= 0 || !Number.isInteger(qty)) {
    res.status(400).json({message: 'Quantity must be a positive integer'})
    return
  }
  if(req.session.panier.articles.filter(article => article.id === id).length > 0) {
    res.status(400).json({message: 'Article already added to cart'})
    return
  }
  req.session.panier.articles.push({
    'id': id,
    'qty': qty
  })
  res.status(200).json({message: `${qty}x article n°${id} added to cart`})
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  const fname = req.body.fname
  const lname = req.body.lname
  if(fname === '' || lname === '' || typeof fname !== 'string' || typeof lname !== 'string') {
    res.status(400).json({ message: 'Invalid details' })
  }
  req.session.destroy()
  res.status(200).json({ message: `Thank you for your purchase ${fname} ${lname}`})
  
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
  const id = parseInt(req.params.articleId)
  const qty = parseInt(req.body.qty)

  if(!req.session.panier.articles.filter(article => article.id === id).length > 0) {
    res.status(404).json({message: 'Cannot modify quantity of article not added to cart'})
    return
  }
  if(!Number.isInteger(qty) || qty <= 0) {
    res.status(400).json({ message: 'Quantity must be a positive integer' })
    return
  }
  req.session.panier.articles[req.session.panier.articles.findIndex(article => { return article.id === id })].qty = qty
  res.status(200).json({ message: `Quantity of article n°${id} modified to ${qty}`})
  
  
})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {
  const id = parseInt(req.params.articleId)
  if(!req.session.panier.articles.filter(article => article.id === id).length > 0) {
    res.status(404).json({message: 'Cannot delete article not added to cart'})
    return
  }
  req.session.panier.articles.splice(req.session.panier.articles.findIndex(article => { return article.id === id }))
  res.status(200).json({ message: `Removed article n°${id}`})
})


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  db.query('SELECT * FROM articles', function(err, results) {
    res.json(results)
  })
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = req.body.price

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }
  db.query(`INSERT INTO articles(name, description, image, price) VALUES('${name}', '${description}', '${image}', '${price}');`, function(err, results) {
    if(err) throw err;
    res.json({message: 'Article added'})
  
  })
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

router.get('/login', (req, res) => {
  const email = req.query.email
  if(typeof email != 'string' || email == '') {
    res.status(400).json({message: 'email parameter is required'})
    return
  }
  db.query(`SELECT * FROM users WHERE email = '${email}'`, function(err, result) {
    if (err) throw err;
    if(result.length == 0) {
      res.status(404).json({message: 'User not found'})
      return
    }
    res.json({message: `User '${email}' found`})
    req.session.id = result[0].id_user

  })
})

module.exports = router
