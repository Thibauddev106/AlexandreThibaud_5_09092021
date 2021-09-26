// Stocker la récuperation des valeurs du formulaire dans le localstorage 

//Déclaration de la variable "produitEnregistrer" dans laquelle on met les key et les values qui sont dans le localstorage
let produitEnregistrer = document.querySelector(".content");
// JSON.parse pour convertir les données au format JSON qui sont dans le localstorage en objet JavaScript
let copieLS = JSON.parse(localStorage.getItem("produits"));

main();

function main() {
    affichageCarte();
}

function affichageCarte() {
    let test = document.querySelector("effacerArticle");
    let  = document.querySelector("product");
    let  = document.querySelector("siPanierVide")

/* Si le tableau enregistré du localStorage contient au moins un objet,
on affiche le panier et on supprime le message d'erreur*/
    if (localStorage.getItem("produits"))
}