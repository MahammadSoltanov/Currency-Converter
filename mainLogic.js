//#region ViewLogic
function mainLogic(ifMobile)
{    
    // Mobile logic
    if(ifMobile.matches)
    {
        console.log(`works`);
        header.innerHTML = `<img src="/images/logo.svg">
        
        <div class="collapsible">
        <button class="drop-menu-button">Меню</button> 
        <div class="collapsible-menu">
        <p>БАНК</p>
        <p>БИЗНЕС</p>
        <p>ИНВЕСТИЦИИ</p>
        <p>СТРАХОВАНИЕ</p>
        <p>МОБАЙЛ</p>
        <p>ПУТЕШЕСТВИЕ</p>
        <p>РАЗВЛЕЧЕНИЕ</p>
        </div>
        </div>
        
        <button class="login">ВОЙТИ</button>`
    }
    // Tablet and PC logic
    else
    {
        console.log(`works 2`);
        header.innerHTML = `<img src="/images/logo.svg">

        <div class="menu-container">
            <p>БАНК</p>
            <p>БИЗНЕС</p>
            <p>ИНВЕСТИЦИИ</p>
            <p>СТРАХОВАНИЕ</p>
            <p>МОБАЙЛ</p>
            <p>ПУТЕШЕСТВИЕ</p>
            <p>РАЗВЛЕЧЕНИЕ</p>
        </div>
        
        <button class="login">ВОЙТИ</button>`
    }
}

let ifMobile = window.matchMedia('(max-width: 992px)');
const header = document.querySelector('.header');

window.addEventListener('resize', function(event) {
    mainLogic(ifMobile);
}, true);
//#endregion

