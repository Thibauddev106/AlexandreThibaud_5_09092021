let params = new URL(document.location).searchParams;
let id = params.get("id");

const produitCardImg = document.querySelector(".img");
const produitCardName = document.querySelector(".produit-card__infos__titre");
const produitCardDescription = document.querySelector(".produit-card__infos__description");
const produitCardPrice = document.querySelector(".produit-card__infos__prix");
const numOurson = document.querySelector("#numOurson");

main();

function main() {
    getArticles();
}

function getArticles() {
    fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(function (reponse) {
            return reponse.json();
        })
        .catch((error) => {
            alert("probleme de serveur")
        })
        .then(function(resultat) {
        article = resultat;
        console.log(article)
        produitCardName.innerHTML = article.name;
        produitCardImg.src = article.imageUrl;
        produitCardDescription.innerText = article.description;
        produitCardPrice.innerText = article.price;
        })
    }
