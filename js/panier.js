

//Déclaration de la variable "produitEnregistrer" dans laquelle on met les key et les values qui sont dans le localstorage
let produitEnregistrer = document.querySelector(".cartePanier__recap");
// JSON.parse pour convertir les données au format JSON qui sont dans le localstorage en objet JavaScript
let tabLS = JSON.parse(localStorage.getItem("produits"));

main();

function main() {
    affichageCarte();
    viderPanier();
    totalPanier();
}

function affichageCarte() {
    let test = document.querySelector(".boutonsDuPanier");
    let carteProduit = document.querySelector(".cartePanier");
    let carteVide = document.querySelector(".siPanierVide")

/* Si le tableau enregistré du localStorage contient au moins un objet,
on affiche le panier et on supprime le message d'erreur*/
    if (localStorage.getItem("produits")) {
        carteProduit.style.display = "flex";
        carteProduit.style.display = "column";
        carteProduit.style.display = "space-around";
        carteVide.style.display = "none"
    }

    /* Pour chaque objet dans le tableau du localStorage, on crée les divs de l'affichage 
    du panier et on les remplit avec les données du tableau*/
    for (let article in tabLS) {
        let articleLigne = document.createElement("div");
        produitEnregistrer.insertBefore(articleLigne,test);
        articleLigne.classList.add("cartePanier__recap__row", "article-ligne");

        let articleNom = document.createElement("div");
        articleLigne.appendChild(articleNom);
        articleNom.classList.add("cartePanier__recap__title");
        articleNom.innerHTML = tabLS[article].name;

        let articleQuantite = document.createElement("div");
        articleLigne.appendChild(articleQuantite);
        articleQuantite.classList.add("cartePanier__recap__title","title-quantity");
        articleQuantite.innerHTML = tabLS[article].quantity;

        let articleCouleur = document.createElement("div");
        articleLigne.appendChild(articleCouleur);
        articleCouleur.classList.add("cartePanier__recap__title");
        articleCouleur.innerHTML = tabLS[article].colors;

        let articlePrix = document.createElement("div");
        articleLigne.appendChild(articlePrix);
        articlePrix.classList.add("cartePanier__recap__title", "data-price", "price");
    
        // Affichage du prix avec la convertion en euro
        articlePrix.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(tabLS[article].price * tabLS[article].quantity);


    }
}

function viderPanier() {

    // Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
    const viderPanierBtn = document.querySelector(".viderLePanier");
    viderPanierBtn.addEventListener("click", () => {
      localStorage.clear();
    });
  }

function totalPanier() {
    let tabPrix = [];
    let totalPrix = document.querySelector(".total");

    // on push chaque prix du DOM dans un tableau
    let prixArticleSelonQuantite = document.querySelectorAll(".price");
    for (let prix in prixArticleSelonQuantite) {
        tabPrix.push(prixArticleSelonQuantite[prix].innerHTML);   
    }

    // on enlève les undefined du tableau
    tabPrix = tabPrix.filter((el) => {
        return el != undefined;
    })
    // transformer en nombre chaque valeur du tableau
    tabPrix = tabPrix.map((x) => parseFloat(x));

    // additionner les valeurs du tableau pour avoir le prix total avec la méthode reduce
    const reducer = (accumulateur, valeurCourante) => accumulateur + valeurCourante;
    tabPrix = tabPrix.reduce(reducer);
    console.log(tabPrix);

    // affichage du prix avec converstion en euro
    totalPrix.innerText = `Total : ${(tabPrix = new Intl.NumberFormat(
        "fr-FR",
        {
          style: "currency",
          currency: "EUR",
        }
      ).format(tabPrix))}`;
}

