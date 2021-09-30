let params = (new URL(document.location)).searchParams;
let id = params.get("id");
console.log(id)

const produitCardImg = document.querySelector(".img");
const produitCardName = document.querySelector(".produitCard__infos__titre");
const produitCardDescription = document.querySelector(".produitCard__infos__description");
const produitCardPrice = document.querySelector(".produitCard__infos__prix");
const nbrOurson = document.querySelector("#numOurson");

main();

function main() {
    getArticle();
    ajouterAuPanier();
}

function getArticle() {
    // On récupère uniquement le produit dont on a besoin via le paramètre dans la requête
    fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (reponse) {
        return reponse.json();
    })
    .catch((error) => {
        alert("probleme de serveur")
    })
    .then(function(resultatApi) {
        // On place les données reçues via l'API aux bons endroits sur la page
        article = resultatApi;
        produitCardName.innerHTML = article.name;
        produitCardImg.src = article.imageUrl;
        produitCardDescription.innerText = article.description;
        // afficher prix en euros
        article.price = article.price / 100;
        produitCardPrice.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency", currency: "EUR",
        }).format(article.price);

        let couleurSelect = document.getElementById("coulSelect");
        for (let i = 0; i < article.colors.length; i++) {
            let option = document.createElement("option");
            option.innerText = article.colors[i];
            couleurSelect.appendChild(option);
        }
    })
}

function ajouterAuPanier() {
    const ajouterAuPanierBtn = document.querySelector(".ajouter");
   

    ajouterAuPanierBtn.addEventListener("click", () => {
        if (nbrOurson.value > 0 && nbrOurson.value < 100){
            //création de l'article qui sera ajouté au panier
            let produitAjoute = {
                name: produitCardName.innerHTML,
                price: parseFloat(produitCardPrice.innerHTML),
                quantity: parseFloat(document.querySelector("#numOurson").value),
                colors: document.querySelector("#coulSelect").value,
                _id: id,
            };

            // gestion localStorage
            let tabProduitsPanier = [];
            
            /* si le localStorage est rempli, on récupère son contenu,
            on l'insère dans le tableau tabProduitsPanier,
            et on le renvoit vers le localStorage avec le nouveau produit ajouté.*/
            if (localStorage.getItem("produits") !== null) {
                tabProduitsPanier = JSON.parse(localStorage.getItem("produits"));
                tabProduitsPanier.push(produitAjoute);
                localStorage.setItem("produits", JSON.stringify(tabProduitsPanier));
            }
            else {
            // si le localStorage est vide, on le crée avec le produit ajouté
            tabProduitsPanier.push(produitAjoute);
            localStorage.setItem("produits", JSON.stringify(tabProduitsPanier));
            }
        }
    });
}

