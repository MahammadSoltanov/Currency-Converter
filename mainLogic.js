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

// Variables that contain current currencies
let firstCurrency, secondCurrency;
firstCurrency = 'RUB';
secondCurrency = 'USD';

let defaultInfo;

// Eight buttons that change currencies
const currencyButtons = document.getElementsByClassName('currency-value');
changeColor(0); changeColor(5);

// Adding event listener to each button
for(let i = 0; i < currencyButtons.length; i++){currencyButtons[i].addEventListener('click', function(){changeColor(i);});}

// Inputs where user enters value to be converted in both way
const userInputs = document.getElementsByClassName('user-input');
userInputs[0].addEventListener('keypress', convertMoney1);
userInputs[1].addEventListener('keypress', convertMoney2);

const currencyInfos = document.getElementsByClassName('currency-info');

function changeColor(index)
{   
    console.log(defaultInfo);
    if(index < 4)
    {
        firstCurrency = currencyButtons[index].textContent;                
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
        updateCurrencyInfo();        
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

function convertMoney1(event)
{   
    // Checking for correct input format
    if(event.target.value[event.target.value.length - 1] == ',') event.target.value = event.target.value.replace(',', '.');
    if((event.which < 48 || event.which > 57) && (event.key != '.') && (event.key != ',')){event.preventDefault();}
    if((event.target.value.includes('.')) && (event.key == '.' || event.key == ',')){event.preventDefault();}
}

function convertMoney2(event)
{
    // Checking for correct input format
    if(event.target.value[event.target.value.length - 1] == ',') event.target.value = event.target.value.replace(',', '.');
    if((event.which < 48 || event.which > 57) && (event.key != '.') && (event.key != ',')){event.preventDefault();}
    if((event.target.value.includes('.')) && (event.key == '.' || event.key == ',')){event.preventDefault();}
}

// Function that updates information about selected currencies
function updateCurrencyInfo()
{       
    var requestURL = `https://api.exchangerate.host/convert?from=${firstCurrency}&to=${secondCurrency}`;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var response = request.response;      
      currencyInfos[0].innerHTML = `1 ${firstCurrency} = ${response.info.rate.toFixed(4)} ${secondCurrency}`;
      currencyInfos[1].innerHTML = `1 ${secondCurrency} = ${parseFloat((1 / response.info.rate).toFixed(4))} ${firstCurrency}`;
      defaultInfo = response;
    }
}

