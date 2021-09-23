let params = (new URL(document.location)).searchParams;
let id = params.get("id");
console.log(id)

const produitCardImg = document.querySelector(".img");
const produitCardName = document.querySelector(".produitCard__infos__titre");
const produitCardDescription = document.querySelector(".produitCard__infos__description");
const produitCardPrice = document.querySelector(".produitCard__infos__prix");
const numOurson = document.querySelector("#numOurson");

main();

function main() {
    getArticle();
}

function getArticle() {
    //
    fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(function (reponse) {
            return reponse.json();
        })
        .catch((error) => {
            alert("probleme de serveur")
        })
        .then(function(resultatApi) {
        article = resultatApi;
        produitCardName.innerHTML = article.name;
        produitCardImg.src = article.imageUrl;
        produitCardDescription.innerText = article.description;
        // afficher prix en euros
        article.price = article.price / 100;
        produitCardPrice.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency", currency: "EUR",
        }).format(article.price);

        })
    }
