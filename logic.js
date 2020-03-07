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

    // grab the value of salary
    var salaryCal = salary.value
    var savingCal = saving.value
    var calculation = ((salaryCal * savingCal)/100)
    alert(calculation)
    // grab the value of saving
    // do your calculation
    // alert calculation

    getInflation();

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

function getInflation(){

    // get current date
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1); 
    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + fullDate.getDate();

    // get date from 1 year ago for range of inflation calculation
    var prevDate = (fullDate.getFullYear() - 4)+ "/" + twoDigitMonth + "/" + fullDate.getDate();

    var apiUrl = 'https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';

    
    fetch('https://extreme-ip-lookup.com/json/')
        .then( res => res.json())
        .then(response => {        
            var countrySource = response.country.toLowerCase();
             $.getJSON(apiUrl, {
                    country: countrySource,
                    start: prevDate,
                    end: currentDate,
                    amount: 100,
                    format: true
                    })
                    .done(function (data) {        
                        var temp_val = data.replace("$", "");
                        var inflation = (Number(temp_val) / 100) / 4;                        
                        projectedSavings(inflation);                                                                                    
                    });                                
            
                })
};

function projectedSavings(x) {
    var salary = document.getElementById("salary");
    var saving = document.getElementById("saving");

    var salaryCal = salary.value
    var savingCal = saving.value
    
    var retirementSaving = ((savingCal / 100) * salaryCal) * Math.pow((1 + x), 20);
    console.log(retirementSaving);
    //Put code here to append to budget template 
}



var data = {
    categories: [
      {name: 'one', url_title: 'oneUrl'},
      {name: 'two', url_title: 'twoUrl'}
    ],
  };
  
  var container = document.getElementById('container');
  var comma = document.createTextNode(', ');
  
  function createCategoryElement(name, url) {
    var urlBase = '#journal-category-';
    var cssClass = 'js-page-link';
  
    var el = document.createElement('a');
    el.setAttribute('href', urlBase + url);
    el.setAttribute('class', cssClass);
    el.innerHTML = name;
    return el;
  }
  
  // puliing categories from index 
  function appendToBudget(){
  for (var i = 0; i < data.categories.length; i++) {
    var category = data.categories[i];
    var categoryElement = createCategoryElement(category.name, category.url_title);
    container.appendChild(categoryElement);
  
    
    if (i + 1 < data.categories.length) {
      container.appendChild(salary);
    }
  }
}
          
          