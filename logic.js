// displayTagsFromStorage(); Remember to de-comment!! 

function displayTagsFromStorage() {
    var storage = JSON.parse(localStorage.getItem('chips')); // []

    if (storage) {
        var budgetOptions = document.getElementById('budget-options');

        for (var i = 0; i < storage.length; i++) {
            createAndDisplayTag(storage, i, budgetOptions);
        }
    } else {
        storage = [];
        localStorage.setItem('chips', JSON.stringify(storage));
    }
}

//Helper for displayTagsFromStorage
function createAndDisplayTag(storage, i, budgetOptions) {
    var divItem = document.createElement('div');
    divItem.classList.add('chip');
    divItem.setAttribute('data-name', storage[i]);
    divItem.innerHTML = storage[i];

    var icon = document.createElement('i');
    icon.classList.add('close');
    icon.classList.add('material-icons');
    icon.innerText = 'close';

    divItem.appendChild(icon);
    console.log(divItem)
    budgetOptions.appendChild(divItem);
}

// * Whenver the user about to leave the tab, the browser will save all the current chip inside local storage

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     e.returnValue = '';

//     var storage = [];
//     var budgetOptions = this.document.getElementById('budget-options').children;

//     for (var i = 0; i < budgetOptions.length; i++) {
//         var chip = budgetOptions[i];
//         var name = chip.getAttribute('data-name');
//         storage.push(name);
//     }

//     this.localStorage.setItem('chips', JSON.stringify(storage));

// })

// submitting income and saving percentage
var submit = document.getElementById("submit-button");
submit.addEventListener("click", proposeBudget);


function proposeBudget(event) {
    event.preventDefault();
    // check for valid income and saving percentage input
    var salary = document.getElementById("salary");
    var saving = document.getElementById("saving");
    var budgetLeft = document.getElementById("budgetLeft")

    // grab the value of salary
    var salaryCal = salary.value
    var savingCal = saving.value
    var calculation = ((salaryCal * savingCal)/100)
    var budgetCalculation = (salaryCal - calculation)
    alert(budgetCalculation)

    // grab the value of saving
    // do your calculation
    // alert calculation

    var regex = /\d*\.?\d*$/;
    // if the input is not vaild, the input box will turn red
    if (!regex.test(salary.value)) {
        salary.style.backgroundColor = "#ff000042";
        salary.style.color = "red";
    } else {
        salary.style.backgroundColor = "none";
        salary.style.color = "black";
    };

    if (!regex.test(saving.value)) {
        saving.style.backgroundColor = "#ff000042";
        saving.style.color = "red";
    } else {
        saving.style.backgroundColor = "white";
        saving.style.color = "black";
    };

    // user need to enter a number between 0-100 for percentage
    if (saving.value > 100 || saving.value < 0) {
        saving.style.backgroundColor = "#ff000042";
        saving.style.color = "red";
        alert("Please enter a number from 1 to 100.");
    };

    // choose at least one category
    var chips = document.getElementsByClassName("chip");
    if (chips.length == 0 || !chips) {
        alert("Please choose at least one category.")
    };
};

var inflation;
var countrySource;

fetch('https://extreme-ip-lookup.com/json/')
.then( res => res.json())
.then(response => {
    countrySource = response.country.toLowerCase(); 
       
})
 .catch((data, status) => {
    console.log('Request failed');
 })

// get current date
var fullDate = new Date();
var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1); 
var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + fullDate.getDate();

// get date from 1 year ago for range of inflation calculation
var prevDate = (fullDate.getFullYear() - 5)+ "/" + twoDigitMonth + "/" + fullDate.getDate();

var apiUrl = 'https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';

function calculate() {
  $.getJSON(apiUrl, {
      country: countrySource,
      start: prevDate,
      end: currentDate,
      amount: 100,
      format: true
    })
    .done(function (data) {        
        var temp_val = data.replace("$", "");
        inflation = (Number(temp_val) - 100) / 5 ;
    });
};


         

          submitButton.onclick = function(){

var salaryCal = salary.value
    var savingCal = saving.value
    var calculation = ((salaryCal * savingCal)/100)
    var budgetCalculation = (salaryCal - calculation)
            var submitButton = document.getElementById("submit-button")
            var content = document.getElementsByClassName("chips")

            if (content) {
          (storage) 
                var budgetOptions = document.getElementById('budget-options');
                for (var i = 0; i < storage.length; i++){
                    var categoryCalculation = document.getElementsByid("budget-options").value = budgetOptions / budgetCalculation 
                }

            }
                }
           

          