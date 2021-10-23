


function affichageOrdreIdEtPrix() {
  
  const totalPrix = document.querySelector(".montant span");
  const orderId = document.querySelector(".numero span");
  totalPrix.innerText = localStorage.getItem("totalCommade");
  orderId.innerText = localStorage.getItem("idCommande");
  //On vide le localStorage pour recommencer plus tard le processus d'achat
  localStorage.clear(); 
}

affichageOrdreIdEtPrix();
