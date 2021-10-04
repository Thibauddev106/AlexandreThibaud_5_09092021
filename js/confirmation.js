

function affichageOrdreIdEtPrix() {
  const totalConfirmation = document.querySelector(".total span");
  const orderId = document.querySelector(".ordreId span");
  
  totalConfirmation.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");
  
  // On vide le localStorage pour recommencer plus tard le processus d'achat
  localStorage.clear(); 
}

affichageOrdreIdEtPrix();