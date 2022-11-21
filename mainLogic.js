//#region ViewLogic
function mainLogic(ifMobile)
{    
    // Mobile logic
    if(ifMobile.matches)
    {        
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

let firstCurrency, secondCurrency;
firstCurrency = 'RUB';
secondCurrency = 'USD';

const currencyButtons = document.getElementsByClassName('currency-value');
changeColor(0); changeColor(5);

for(let i = 0; i < currencyButtons.length; i++){currencyButtons[i].addEventListener('click', function(e){changeColor(e,i);});}

const userInputs = document.getElementsByClassName('user-input');
userInputs[0].addEventListener('input', convertMoney(from, to));
userInputs[1].addEventListener('input', convertMoney(from, to));

const currencyInfos = document.getElementsByClassName('currency-info');

function changeColor(e, index)
{   
    if(index < 4)
    {
        firstCurrency = currencyButtons[index].textContent;
        updateCurrencyInfo(0);    
        currencyButtons[index].style.backgroundColor = '#833AE0';
        currencyButtons[index].style.color = 'white';

        for(let i = 0; i < 4; i++)
        {
            if(i != index)
            {
                currencyButtons[i].style.backgroundColor = 'white';
                currencyButtons[i].style.color = '#9F9F9F';
            }
        }
    }

    else
    {
        secondCurrency = currencyButtons[index].textContent;
        updateCurrencyInfo(1);    
        currencyButtons[index].style.backgroundColor = '#833AE0';
        currencyButtons[index].style.color = 'white';

        for(let i = 4; i < 8; i++)
        {
            if(i != index)
            {
                currencyButtons[i].style.backgroundColor = 'white';
                currencyButtons[i].style.color = '#9F9F9F';
            }
        }
    }
}

function convertMoney(from, to)
{

}

function updateCurrencyInfo(index)
{
    
}

var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR&amount=1200&places=4';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();



        