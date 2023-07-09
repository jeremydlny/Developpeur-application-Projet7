function displayHeader() {
    let headerCard = document.querySelector('.headerCard');
    headerCard.insertAdjacentHTML("beforeend", `
    <div class="background-header">
    <img class="background_image" src="contents/images/Background.png" alt="Background">
    <div class="header_content">
        <div class="logo_and_title">
            <img class="logo_header" src="contents/images/Logo.png" alt="Logo">
            <h1 class="titre_header">CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
            </h1>
        </div>
        <div class="d-flex justify-content-center h-100">
            <div class="search">
                <input type="text" class="search-input" placeholder="Rechercher une recette, un ingrédient, ..."
                    name="">
                <a href="#" class="search-icon">
                    <img src="contents/icons/Search.png" alt="Search">
                </a>
            </div>
        </div>
    </div>
</div>
    `);

    return headerCard;

}