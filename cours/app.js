const express = require("express")
// Importer le package express, on utilise la commande require

const app = express();// permet de créer une application express


app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
}); // le premier middleware qui enregistre « Requête reçue ! » dans la console et passe l'exécution

app.use((req, res, next) => {
    res.status(201);
    next();
}); // le deuxième middleware ajoute un code d'état 201 à la réponse et passe l'exécution

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
}); //le troisième middleware envoie la réponse JSON et passe l'exécution ;

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
}); // le dernier middleware enregistre « Réponse envoyée avec succès ! » dans la console, il n’a pas besoin d’appeler la fonction next() à la fin parce que c’est le dernier middleware







module.exports = app;// on va exporter cette application (cette constante) pour qu’on puisse y accéder aux autres fichiers de notre dossier notamment notre serveur node.