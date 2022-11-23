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
let firstCurrency, secondCurrency, currentCurrencyRate;
firstCurrency = 'RUB'; secondCurrency = 'USD';

// Eight buttons that change currencies
const currencyButtons = document.getElementsByClassName('currency-value');

// Adding event listener to each button
for(let i = 0; i < currencyButtons.length; i++){currencyButtons[i].addEventListener('click', function(){changeColor(i);});}

// Inputs where user enters value to be converted in both way
const userInputs = document.getElementsByClassName('user-input');
userInputs[0].addEventListener('keydown', checkInput); userInputs[0].addEventListener('keyup', convertMoney2);
userInputs[1].addEventListener('keydown', checkInput); userInputs[1].addEventListener('keyup', convertMoney1);

// Areas that show information about current selected currencies
const currencyInfos = document.getElementsByClassName('currency-info');
changeColor(0); changeColor(5);

async function changeColor(index)
{       
    if(index < 4)
    {
        firstCurrency = currencyButtons[index].textContent;                
        await updateCurrencyInfo();
        convertMoney1();    
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
        await updateCurrencyInfo();      
        convertMoney2();          
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

// Checking for correct input format
function checkInput(event)
{   
    if(event.target.value[0] == '0' && event.target.value[1] != '.' && event.target.value.length > 1) event.preventDefault();
    if(event.target.value[event.target.value.length - 1] == ',') event.target.value = event.target.value.replace(',', '.');
    if((event.which < 48 || event.which > 57) && (event.key != '.') && (event.key != ',') && (event.which != 8) && (event.which != 37) && (event.which != 39) && (event.which < 96 || event.which > 105) ){event.preventDefault();}
    if((event.target.value.includes('.')) && (event.key == '.' || event.key == ',')){event.preventDefault();}
    if(event.target.value == '' && (event.key == '.' || event.key == ',')) event.preventDefault();        
}


// Function that updates information about selected currencies
async function updateCurrencyInfo()
{               
    var requestURL = `https://api.exchangerate.host/convert?from=${firstCurrency}&to=${secondCurrency}`;
    await fetch(requestURL).then(response => response.json()).then((data) => 
    {
        currencyInfos[0].innerHTML = `1 ${firstCurrency} = ${parseFloat(data.info.rate.toFixed(4))} ${secondCurrency}`;
        currencyInfos[1].innerHTML = `1 ${secondCurrency} = ${parseFloat((1 / data.info.rate).toFixed(4))} ${firstCurrency}`;            
        currentCurrencyRate = data.info.rate;            
    });
}    

// Works when you write something in second input and updates first based on second
function convertMoney1()
{               
    var start = userInputs[1].selectionStart,
        end = userInputs[1].selectionEnd,
        oldValue = userInputs[1].value;

        if(userInputs[0].value[0] == '0' && userInputs[1].value[1] != '.' && userInputs[1].value.length > 1) userInputs[1].value = userInputs[1].value.replace('0', '');

    let modifiedValue = userInputs[1].value.replaceAll(' ', '');
    modifiedValue = modifiedValue.replace(',','.');     
    
    let formatted = formatThousands(modifiedValue);  
    userInputs[1].value = formatted;

    if(oldValue.length < userInputs[1].value.length){start++; end++;}    
    else if(oldValue.length > userInputs[1].value.length){start--; end--;}

    userInputs[1].setSelectionRange(start, end);

    let newValue = parseFloat((modifiedValue * 1/currentCurrencyRate).toFixed(4));
    if(modifiedValue == '' || formatted == '') newValue = '';        
    if(newValue >= 0) userInputs[0].value = formatThousands(newValue);         
}

// Works when you write something in first input and updates second based on first
function convertMoney2()
{                
    var start = userInputs[0].selectionStart,
        end = userInputs[0].selectionEnd,
        oldValue = userInputs[0].value;

    if(userInputs[0].value[0] == '0' && userInputs[0].value[1] != '.' && userInputs[0].value.length > 1) userInputs[0].value = userInputs[0].value.replace('0', '');
    

    let modifiedValue = userInputs[0].value.replaceAll(' ', '');
    modifiedValue = modifiedValue.replace(',','.');            
    
    let formatted = formatThousands(modifiedValue);     
    userInputs[0].value = formatted;
    
    if(oldValue.length < userInputs[0].value.length){start++; end++;}    
    else if(oldValue.length > userInputs[0].value.length){start--; end--;}

    userInputs[0].setSelectionRange(start, end);

    let newValue = parseFloat((modifiedValue * currentCurrencyRate).toFixed(4));
    if(modifiedValue == '' || formatted == '') newValue = '';        
    if(newValue >= 0) userInputs[1].value = formatThousands(newValue);             
}

function formatThousands(x) 
{               
        
    if(!isNaN(x))
    {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");                     
        return parts.join(".");
    }

    else return '';
}