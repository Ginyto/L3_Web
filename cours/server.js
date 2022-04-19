const http = require("http")
// Importer le package, accès à l’objet http

const app = require("./app")


app.set("port", process.env.PORT || 3000)
// On doit dire à l’application express sur quel port elle doit tourner


const server = http.createServer(app)
// créer le serveur en utilisant la fonction createServer du package http, cette méthode va prendre deux arguments la requête et la réponse (req et res)
// Cette méthode va être appelé à chaque requête reçu par le serveur, c’est la réponse du serveur
// → là, on a un serveur près



server.listen(process.env.PORT || 3000);
// le serveur va attendre les requêtes
// envoyées sur un port(par défaut 3000), « process.env.PORT » ça c’est lorsque
// l’environnement sur lequel il tourne votre serveur vous envoie un port à utiliser.