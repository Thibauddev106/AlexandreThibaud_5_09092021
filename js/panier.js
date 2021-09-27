// Stocker la récuperation des valeurs du formulaire dans le localstorage 

//Déclaration de la variable "produitEnregistrer" dans laquelle on met les key et les values qui sont dans le localstorage
let produitEnregistrer = document.querySelector(".cart-card__recap");
// JSON.parse pour convertir les données au format JSON qui sont dans le localstorage en objet JavaScript
let copieLS = JSON.parse(localStorage.getItem("produits"));

main();

function main() {
    affichageCarte();
    viderPanier();
}

function affichageCarte() {
    let test = document.querySelector(".width-to-empty-cart");
    let carteProduit = document.querySelector(".cart-card");
    let carteVide = document.querySelector(".siPanierVide")

/* Si le tableau enregistré du localStorage contient au moins un objet,
on affiche le panier et on supprime le message d'erreur*/
    if (localStorage.getItem("produits")) {
        carteProduit.style.display = "flex";
        carteProduit.style.display = "column";
        carteProduit.style.display = "space-around";
        carteVide.style.display = "none"
    }

    /* Pour chaque objet dans le tableau copié du localStorage, on crée les divs de l'affichage du panier
    et on les remplit avec les données du tableau*/
    for (let article in copieLS) {
        let articleLigne = document.createElement("div");
        produitEnregistrer.insertBefore(articleLigne,test);
        articleLigne.classList.add("cart-card__recap__row", "article-ligne");

        let articleNom = document.createElement("div");
        articleLigne.appendChild(articleNom);
        articleNom.classList.add("cart-card__recap__title");
        articleNom.innerHTML = copieLS[article].name;

        let articleQuantite = document.createElement("div");
        articleLigne.appendChild(articleQuantite);
        articleQuantite.classList.add("cart-card__recap__title","title-quantity");
        articleQuantite.innerHTML = copieLS[article].quantity;

        let articlePrix = document.createElement("div");
        articleLigne.appendChild(articlePrix);
        articlePrix.classList.add("cart-card__recap__title", "data-price", "price");
    }
    
}

function viderPanier() {

    // Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
    const viderPanierBtn = document.querySelector(".viderLePanier");
    viderPanierBtn.addEventListener("click", () => {
      localStorage.clear();
    });
  }

