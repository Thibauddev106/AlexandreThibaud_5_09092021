

//Déclaration de la variable "produitEnregistrer" dans laquelle on met les key et les values qui sont dans le localstorage
let produitEnregistrer = document.querySelector(".cartePanier__recap");
// JSON.parse pour convertir les données au format JSON qui sont dans le localstorage en objet JavaScript
let tabLS = JSON.parse(localStorage.getItem("products"));
console.log(tabLS)

function affichageCarte() {
    let test = document.querySelector(".boutonsDuPanier");
    let carteProduit = document.querySelector(".cartePanier");
    let carteVide = document.querySelector(".siPanierVide")

    /* Si le tableau enregistré du localStorage contient au moins un objet,
    on affiche le panier et on supprime le message d'erreur*/
    if (localStorage.getItem("products")) {
        carteProduit.style.display = "flex";
        carteProduit.style.display = "column";
        carteProduit.style.display = "space-around";
        carteVide.style.display = "none"
    }

    /* Pour chaque objet dans le tableau du localStorage, on crée les divs de l'affichage 
    du panier et on les remplit avec les données du tableau*/
    for (let article in tabLS) {
        let articleLigne = document.createElement("div");
        produitEnregistrer.insertBefore(articleLigne, test);
        articleLigne.classList.add("cartePanier__recap__row", "article-ligne");

        let articleNom = document.createElement("div");
        articleLigne.appendChild(articleNom);
        articleNom.classList.add("cartePanier__recap__title");
        articleNom.innerHTML = tabLS[article].name;

        let articleQuantite = document.createElement("div");
        articleLigne.appendChild(articleQuantite);
        articleQuantite.classList.add("cartePanier__recap__title", "title-quantity");
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
affichageCarte();

function viderPanier() {

    // Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
    const viderPanierBtn = document.querySelector(".viderLePanier");
    viderPanierBtn.addEventListener("click", () => {
        localStorage.clear();
    });
}
viderPanier();

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

    // affichage du prix avec converstion en euro
    totalPrix.innerText = `Total : ${(tabPrix = new Intl.NumberFormat(
        "fr-FR",
        {
            style: "currency",
            currency: "EUR",
        }
    ).format(tabPrix))}`;
    console.log(tabPrix);
}
totalPanier();

//-------------------------Le formulaire de commande-------------------------
//-----------gestion validation du formulaire-------------
let form = document.querySelector("#inscription");
// Ecouter la modification de chaque champ
form.prenom.addEventListener("change",function() {
    validPrenom(this);
})
form.nom.addEventListener("change",function() {
    validNom(this);
})
form.adresse.addEventListener("change",function() {
    validAdresse(this);
})
form.ville.addEventListener("change",function() {
    validVille(this);
})
form.codePostal.addEventListener("change",function() {
    validCodePostal(this);
})
form.email.addEventListener("change",function() {
    validEmail(this);
})

//************* Validation Prenom ***********/
    
const validPrenom = function(inputPrenom) {
    //creation de la reg exp pour validation prenom
    let prenomRegExp = new RegExp("^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$","g");
    
    //Recuparation de la balise SMALL
    let small = inputPrenom.nextElementSibling;
    //On test l'expression regulière
    if (prenomRegExp.test(inputPrenom.value)) {
        small.innerHTML = "Prénom Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        document.getElementById("prenom").style.border="2px solid green";
        return true;
    } else {
        small.innerHTML ="Prénom non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        document.getElementById("prenom").style.border="2px solid red";
        return false;
    }
}
//************* Validation Nom ***********/
const validNom = function(inputNom) {
    //creation de la reg exp pour validation nom
    let nomRegExp = new RegExp("^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$","g");
    
    //Recuparation de la balise SMALL
    let small = inputNom.nextElementSibling;
    //On test l'expression regulière
    if (nomRegExp.test(inputNom.value)) {
        small.innerHTML = "Nom Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        document.getElementById("nom").style.border="2px solid green";
        return true;
    } else {
        small.innerHTML ="Nom non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        document.getElementById("nom").style.border="2px solid red";
        return false;
    }
}
//************* Validation Adresse ***********/
const validAdresse = function(inputAdresse) {
    //creation de la reg exp pour validation nom
    let adresseRegExp = new RegExp("^[a-zA-Z0-9]{3,50}$","g");
    
    //Recuparation de la balise SMALL
    let small = inputAdresse.nextElementSibling;
    //On test l'expression regulière
    if (adresseRegExp.test(inputAdresse.value)) {
        small.innerHTML = "Adresse Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        document.getElementById("adresse").style.border="2px solid green";
        return true;
    } else {
        small.innerHTML ="Adresse non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        document.getElementById("adresse").style.border="2px solid red";
        return false;
    }
}
//************* Validation Ville ***********/
const validVille = function(inputVille) {
    //creation de la reg exp pour validation ville
    let villeRegExp = new RegExp("^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$","g");
    
    //Recuparation de la balise SMALL
    let small = inputVille.nextElementSibling;
    //On test l'expression regulière
    if (villeRegExp.test(inputVille.value)) {
        small.innerHTML = "Ville Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        document.getElementById("ville").style.border="2px solid green";
        return true;
    } else {
        small.innerHTML ="Ville non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        document.getElementById("ville").style.border="2px solid red";
        return false;
    }
}
//************* Validation Code postal ***********/
const validCodePostal = function(inputCodePostal) {
    //creation de la reg exp pour validation nom
    let codePostalRegExp = new RegExp("^[0-9]{5}$","g");
    
    //Recuparation de la balise SMALL
    let small = inputCodePostal.nextElementSibling;
    //On test l'expression regulière
    if (codePostalRegExp.test(inputCodePostal.value)) {
        small.innerHTML = "Code postal Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        document.getElementById("codePostal").style.border="2px solid green";
        return true;
    } else {
        small.innerHTML ="Code postal non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        document.getElementById("codePostal").style.border="2px solid red";
        return false;
    }
}
//************* Validation Email ***********/
const validEmail = function(inputEmail) {
    //creation de la reg exp pour validation email
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
    
    //Recuparation de la balise SMALL
    let small = inputEmail.nextElementSibling;
    //On test l'expression regulière
    if (emailRegExp.test(inputEmail.value)) {
        small.innerHTML = "Email Valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
        document.getElementById("email").style.border="2px solid green";
        return true;
    } else {
        small.innerHTML ="Email non Valide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
        document.getElementById("email").style.border="2px solid red";
        return false;
    }
}

// Ecouter la soumission du formulaire
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (validPrenom(form.prenom) && validNom(form.nom) && validAdresse(form.adresse) && validVille(form.ville) 
    && validCodePostal(form.codePostal) && validEmail(form.email))
    {  
    //fonction pour créer la requete POST avec numero commande et les infos contact
    function requestPost() {
        let order = {
            contact: {
                firstName: document.querySelector("#prenom").value.trim(),
                lastName: document.querySelector("#nom").value.trim(),
                address: document.querySelector("#adresse").value.trim(),
                city: document.querySelector("#ville").value.trim(),
                email: document.querySelector("#email").value.trim(),
            },
            products: [], 
        };
        //on crée notre requete post vers API
        // en lui passant les parametre les données a envoyer
        const request = new Request("http://localhost:3000/api/teddies/order",
            {
                method: "POST",
                body: JSON.stringify(order),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }),
            });
        // Préparation du prix formaté pour l'afficher sur la prochaine page
        let prixConfirmation = document.querySelector(".total").innerText;
        prixConfirmation = prixConfirmation.split(" :");
        // Envoi de la requête
        fetch(request)
            .then((response) => response.json())
            .then((response) => {
                //on récupère la réponse de l'API pour obtenir numéro de commande
                let numCommand = response.orderId;
                console.log(numCommand);
                
                // On met à jour le localStorage avec le numéro de commande
                localStorage.setItem("idCommande", JSON.stringify(numCommand));
                // on met à jour le localStorage avec infos de commande
                localStorage.setItem("infosOrder", JSON.stringify(order));
                // On met à jour le localStorage avec le prix de la commande
                localStorage.setItem("totalCommade", JSON.stringify(prixConfirmation[1]));
            });
            
        // fonction pour confirmer la commande et ouvrir la page confirmation
        function confirmer() {
            alert("la commande est confirmée");
            setTimeout(function () { window.location = "confirmation.html"},3000);
        }
        confirmer();
    }
    requestPost()
    } else {
        alert("Veuillez bien remplir le formulaire"); 
    }            
});

            

    
    


