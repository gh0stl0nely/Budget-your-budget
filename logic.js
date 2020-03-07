// displayTagsFromStorage(); Remember to de-comment!!

function displayTagsFromStorage() {
  var storage = JSON.parse(localStorage.getItem("chips")); // []

  if (storage) {
    var budgetOptions = document.getElementById("budget-options");

    for (var i = 0; i < storage.length; i++) {
      createAndDisplayTag(storage, i, budgetOptions);
    }
  } else {
    storage = [];
    localStorage.setItem("chips", JSON.stringify(storage));
  }
}

//Helper for displayTagsFromStorage
function createAndDisplayTag(storage, i, budgetOptions) {
  var divItem = document.createElement("div");
  divItem.classList.add("chip");
  divItem.setAttribute("data-name", storage[i]);
  divItem.innerHTML = storage[i];

  var icon = document.createElement("i");
  icon.classList.add("close");
  icon.classList.add("material-icons");
  icon.innerText = "close";

  divItem.appendChild(icon);
  console.log(divItem);
  budgetOptions.appendChild(divItem);
}

// submitting income and saving percentage
var submit = document.getElementById("submit-button");
submit.addEventListener("click", proposeBudget);

function proposeBudget(event) {
  event.preventDefault();
  // check for valid income and saving percentage input
  var salary = document.getElementById("salary");
  var saving = document.getElementById("saving");

  var regex = /\d*\.?\d*$/;
  // if the input is not vaild, the input box will turn red
  if (!regex.test(salary.value)) {
    salary.style.backgroundColor = "#ff000042";
    salary.style.color = "red";
  } else {
    salary.style.backgroundColor = "none";
    salary.style.color = "black";
  }

  if (!regex.test(saving.value)) {
    saving.style.backgroundColor = "#ff000042";
    saving.style.color = "red";
  } else {
    saving.style.backgroundColor = "white";
    saving.style.color = "black";
  }

  // user need to enter a number between 0-100 for percentage
  if (saving.value > 100 || saving.value < 0) {
    saving.style.backgroundColor = "#ff000042";
    saving.style.color = "red";
    alert("Please enter a number from 1 to 100.");
  }

  // choose at least one category
  var chips = document.getElementsByClassName("chip");
  if (chips.length == 0 || !chips) {
    alert("Please choose at least one category.");
  }
}

// Function to convert data into downloadable Excel file

function exportToExcel() {
  // Create an empty note book
  var workbook = XLSX.utils.book_new();
  var ws_name = "Budget";
  
  // Take data from Ibraheim stuff, amount and percentage
  // Do a for loop using "" as length
    
  /* Make worksheet */
  var ws_data = [
    ["Item".bold().toString(), "Amount spent monthly ($CAD)", "Amount spent monthly (%)"],
    ["life", 2, "20%"],
    ["life", 3, "30%"],
    ['s'],
    [' ',"Projected Saving With Inflation", 1000],
    [' ',"Projected Saving Without Inflation", 2000],
  ];
  
  // Add sheet to 

  var ws = XLSX.utils.aoa_to_sheet(ws_data);

  /* Add the worksheet to the workbook */
  XLSX.utils.book_append_sheet(workbook, ws, ws_name);

  //Download the file
  XLSX.writeFile(workbook, "out.xls");
}

var inflation;
var countrySource;

fetch('https://extreme-ip-lookup.com/json/')
.then( res => res.json())
.then(response => {
    countrySource = response.country.toLowerCase(); 
}).catch((data, status) => {
    console.log('Request failed');
 })

// get current date
var fullDate = new Date();
var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1); 
var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + fullDate.getDate();

// get date from 1 year ago for range of inflation calculation
var prevDate = (fullDate.getFullYear() - 1)+ "/" + twoDigitMonth + "/" + fullDate.getDate();

var apiUrl = 'https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';

$('#inflation').on('click', function calculate() {
  $.getJSON(apiUrl, {
      country: countrySource,
      start: prevDate,
      end: currentDate,
      amount: 100,
      format: true
    })
    .done(function (data) {        
        var temp_val = data.replace("$", "");
        inflation = Number(temp_val);
    });
});

function graphToggle(){
    var switches = document.getElementById('mySwitch').checked;
    if(switches == true){
        document.getElementById('myChart').style.visibility = 'visible';
    } else {
        document.getElementById('myChart').style.visibility = 'hidden';
    }
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