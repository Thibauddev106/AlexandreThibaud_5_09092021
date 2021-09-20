main();

function main() {
    getArticles();
}

function getArticles() {
    fetch("http://localhost:3000/api/teddies")
        .then(function (reponse) {
            return reponse.json();
        })
        .catch((error) => {
            alert("probleme de serveur")
        })
        .then(function(resultat) {
            const articles = resultat;
            console.log(articles);
            for (let article in articles) {
                let carte = document.createElement("div");
                document.querySelector(".produits").appendChild(carte);
                carte.classList.add("produit");
                

                let produitLien = document.createElement("a");
                carte.appendChild(produitLien);
                produitLien.href = `produit.html?id = ${resultat[article]._id}`;
                produitLien.classList.add("stretched-link");

                let produitImgDiv = document.createElement("div");
                produitLien.appendChild(produitImgDiv);
                produitImgDiv.classList.add("produit__img");

                let produitImg = document.createElement("img");
                produitImgDiv.appendChild(produitImg);
                produitImg.src = resultat[article].imageUrl;

                let produitInfosDiv = document.createElement("div");
                produitLien.appendChild(produitInfosDiv);
                produitInfosDiv.classList.add("produit__infos");
                
                let produitInfoTitre = document.createElement("div");
                produitInfosDiv.appendChild(produitInfoTitre);
                produitInfoTitre.classList.add("produit__infos__titre");
                produitInfoTitre.innerHTML = resultat[article].name;
                
                let produitInfoPrix = document.createElement("div");
                produitInfosDiv.appendChild(produitInfoPrix);
                produitInfoPrix.classList.add("produit__infos__prix");
                produitInfoPrix.innerHTML = resultat[article].price;


                
                    }
                })
                
    }