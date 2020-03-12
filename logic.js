/* Onload Functions (Do Not Touch)                     **  **              */
displayTagsFromStorage();
addEventListenerOnLoad();

function toggleSections(e) {
  if (e.target.innerHTML == 'Home') {
    document.getElementById('BudgetPage').style.display = 'none';
    document.getElementById('Home').style.display = 'block';
    document.getElementById("ContactPage").style.display = 'none';
  } else if (e.target.innerHTML == 'Budget Plan') {
    document.getElementById('BudgetPage').style.display = 'block';
    document.getElementById('Home').style.display = 'none';
    document.getElementById("ContactPage").style.display = 'none';
  } else if (e.target.innerHTML == 'Contact Us') {
    document.getElementById('BudgetPage').style.display = 'none';
    document.getElementById('Home').style.display = 'none';
    document.getElementById("ContactPage").style.display = 'block';
    document.getElementById("ThankYou").style.display = "none";
  }
};

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

function addEventListenerOnLoad() {
  window.addEventListener('beforeunload', function (e) {
    updateLocalStorage();
  })
  var addInputBttn = document.getElementById("addInputBttn");
  addInputBttn.addEventListener("click", addInputField);
  var submit = document.getElementById("submit-button");
  submit.addEventListener("click", proposeBudget);
  document.getElementById('closeBtn').addEventListener('click', clearInputFields);
  document.getElementById('addChipsBtn').addEventListener('click', addNewCategoryToHomePage);

  document.addEventListener('DOMContentLoaded', function () {
    var modalEl = document.querySelectorAll('.modal');
    var instance1 = M.Modal.init(modalEl);
    var selectEl = document.querySelectorAll('select');
    var instance2 = M.FormSelect.init(selectEl);
  });
  document.getElementById('home').addEventListener('click', toggleSections);
  document.getElementById('budget').addEventListener('click', toggleSections);
  document.getElementById('homeMobile').addEventListener('click', toggleSections);
  document.getElementById('budgetMobile').addEventListener('click', toggleSections);
  document.getElementById('contact').addEventListener('click', toggleSections);
  document.getElementById('contactMobile').addEventListener('click', toggleSections);
  document.getElementById('feedbackForm').addEventListener('submit', sendMsg);

  //Toggling graph hide and show
  document.getElementById('mySwitch').addEventListener('click', toggleOnAndOff);

  //Download Budget to Excel
  document.getElementById('downloadExcel').addEventListener('click', exportToExcel);

}
/*                       **  **              */

// ** Khoi's code **
function toggleGraph(e) {
  e.preventDefault();
  console.log(e.target.innerHTML);
  if (e.target.innerHTML == 'Bar Graph') {
    document.getElementById('myChartBar').style.display = 'block';
    document.getElementById('myChartPie').style.display = 'none';
  } else if (e.target.innerHTML == 'Pie Graph') {
    document.getElementById('myChartBar').style.display = 'none';
    document.getElementById('myChartPie').style.display = 'block';
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
  budgetOptions.appendChild(divItem);
}

// When click on Ok, append category into current category
function addNewCategoryToHomePage() {

  // Get the new values from the modal that the user typed in
  var newValues = getNewCategory();

  // Append new values to existing id="budget-options" list
  appendToExistingOptions(newValues);

  //Update local storage
  setTimeout(updateLocalStorage, 500);
  clearInputFields();
}

function getNewCategory() {
  var newCategoryRaw;
  var newCategory;
  var newChips = [];
  var inputDiv = document.getElementById('inputDiv').children;

  for (var i = 0; i < inputDiv.length; i++) {
    newCategoryRaw = inputDiv[i].value.trim().toLowerCase();
    newCategory = newCategoryRaw.charAt(0).toUpperCase() + newCategoryRaw.slice(1);
    newChips.push(newCategory);
  }
  return newChips;

}

function appendToExistingOptions(newChips) {
  var budgetOptions = document.getElementById("budget-options");
  for (var i = 0; i < newChips.length; i++) {
    var divItem = document.createElement("div");
    divItem.classList.add("chip");
    divItem.setAttribute("data-name", newChips[i]);
    divItem.innerHTML = newChips[i];

    var icon = document.createElement("i");
    icon.classList.add("close");
    icon.classList.add("material-icons");
    icon.innerText = "close";

    divItem.appendChild(icon);
    budgetOptions.appendChild(divItem);
  }
}

function updateLocalStorage() {
  var budgetOptions = document.getElementById("budget-options");
  var chipsForLocalStorage = [];
  var allCurrentTags = budgetOptions.children;
  var item;

  for (var i = 0; i < allCurrentTags.length; i++) {
    item = allCurrentTags[i].getAttribute('data-name');
    chipsForLocalStorage.push(item);
  }

  localStorage.setItem('chips', JSON.stringify(chipsForLocalStorage));

}

// When click on Close or Ok in Modal, leave only 1 input field
function clearInputFields() {
  var inputDiv = document.getElementById('inputDiv'); // return object
  var percentDiv = document.getElementById('percentDiv');
  var inputFields = inputDiv.children; // Return a list 
  var percentInput = percentDiv.children;
  for (var i = 1; i < inputFields.length; i++) {
    inputFields[i].remove();
    i--;
  }
  for (var i = 1; i < percentInput.length; i++) {
    percentInput[i].remove();
    i--
  }
  // Clear the value of first input field
  inputFields[0].value = "";
  percentInput[0].value = "";
}

function exportToExcel() {
  // Create an empty note book
  var workbook = XLSX.utils.book_new();
  var ws_name = "Budget";

  // Take data from Ibraheim stuff, amount and percentage
  // Do a for loop using "" as length

  /* Make worksheet */
  var ws_data = [
    [
      "Item",
      "Amount spent monthly ($CAD)",
      "Amount spent monthly (%)"
    ],
    ["Item1", 2, "20%"],
    ["Item2", 3, "30%"],
    [""],
    [" ", "Projected Saving With Inflation", 1000],
    [" ", "Projected Saving Without Inflation", 2000]
  ];

  // Create worksheet

  var ws = XLSX.utils.aoa_to_sheet(ws_data);

  /* Add the worksheet to the workbook */
  XLSX.utils.book_append_sheet(workbook, ws, ws_name);

  //Download the file in Excel
  XLSX.writeFile(workbook, "Your Budget.xls");
}

function visualize(years, savingData) {
  //Empty out myChart 
  var myChart = document.getElementById('myChart');
  myChart.innerHTML = "";

  //Create 3 new canvas
  for (var i = 0; i <= 2; i++) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', '1500');
    canvas.setAttribute('height', '1200');
    if (i == 0) {
      canvas.id = 'myChartBar';
    } else if (i == 1) {
      canvas.id = 'myChartPie';
      canvas.style.display = 'none';
    } else if (i == 2) {
      canvas.id = 'myChartLine';
      canvas.style.marginTop = '20px';
    }

    myChart.appendChild(canvas);
  }

  visualizeBar();
  visualizePie();
  visualizeLine(years, savingData);

  document.getElementById('barGraph').addEventListener('click', toggleGraph);
  document.getElementById('pieGraph').addEventListener('click', toggleGraph);
}

function visualizeBar() {
  var ctx = document.getElementById('myChartBar').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Recommended amount',
        data: [Math.floor((100 - 50) * Math.random()), Math.floor((100 - 50) * Math.random())],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Your Budget',
        fontSize: 25,
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Recommended spending amount ($CAD)',
            fontSize: 14,
            fontColor: '#26a69a',
            foneWeight: 'bold',
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Category',
            fontSize: 20,
            fontColor: '#26a69a',
          }
        }]
      },

    }
  });
}

function visualizePie() {

  var ctx = document.getElementById('myChartPie').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Recommended spending per category',
        data: [Math.floor((100 - 50) * Math.random()), Math.floor((100 - 50) * Math.random())],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },

    options: {
      title: {
        display: true,
        text: 'Your Budget',
        fontSize: 25,
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Recommended spending amount ($CAD)',
            fontSize: 14,
            fontColor: '#26a69a',
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Category',
            fontSize: 20,
            fontColor: '#26a69a',
          }
        }]

      }
    }
  });
}

function visualizeLine(years, savingData) {
  var ctx = document.getElementById('myChartLine').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Saving over the years',
        data: savingData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Your Saving Plan',
        fontSize: 25,
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Savings ($CAD)',
            fontSize: 14,
            fontColor: '#26a69a',
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Future years',
            fontSize: 20,
            fontColor: '#26a69a',
          }
        }]

      }
    }

  })
}

function toggleOnAndOff(e) {
  var toggle = e.target.checked;
  var graph = document.getElementById('myChart');
  if (toggle) {
    graph.style.display = 'block';
  } else {
    graph.style.display = 'none';
  }
}

// ** Demi's code **
function proposeBudget(event) {
  event.preventDefault();
  // Check there is at least one category 
  var chips = document.getElementsByClassName("chip");
  if (chips.length == 0 || !chips) {
    M.toast({
      html: "Please choose at least one category.",
      classes: 'red',
      displayLength: '1500'
    });
    return;
  };

  // check for valid income and saving percentage input
  // grab the value of salary and saving
  var salaryVal = document.getElementById("salary").value;
  var savingVal = document.getElementById("saving").value;
  var savingAmount = ((salaryVal * savingVal) / 100);
  // show on the budget page
  document.getElementById("incomeAmount").innerText = salaryVal;
  document.getElementById("savingAmount").innerText = savingAmount;

  var regex = /\d*\.{0,1}\d*/;

  // if the input is not vaild, the input box will turn red
  if (!regex.test(salaryVal)) {
    M.toast({
      html: 'Please enter a valid number for income.',
      classes: 'red',
      displayLength: '2000'
    });
    return;
  } else {
    salary.style.backgroundColor = "white";
    salary.style.color = "black";
  };

  if (!regex.test(savingVal)) {
    M.toast({
      html: 'Please enter a valid number for saving percentage.',
      classes: 'red',
      displayLength: '2000'
    });
    return;
  } else {
    saving.style.backgroundColor = "white";
    saving.style.color = "black";
  };

  // user need to enter a number between 0-100 for percentage

  if (saving.value > 100 || saving.value < 0) {
    M.toast({
      html: 'Please enter a number from 0 to 100.',
      classes: 'red',
      displayLength: '2000'
    });
    return;
  } else {
    saving.style.backgroundColor = "white";
    saving.style.color = "black";
  }
  // Update local storage
  updateLocalStorage();

  // Move over to Your Budget section
  document.getElementById('Home').style.display = "none";
  document.getElementById('BudgetPage').style.display = "block";

  //Append budget values
  appendToBudget();

  // Generating Inflation
  getInflation();
};

// For adding input fields to modal
function addInputField() {
  var inputDiv = document.getElementById("inputDiv");
  var percentDiv = document.getElementById("percentDiv");
  var inputField = document.createElement("input");
  var inputPercent = document.createElement("input");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("id", "customCategory");
  inputField.setAttribute('placeholder', 'New Category')
  inputField.setAttribute('require', "");
  inputField.setAttribute('aria-required', "true");
  inputField.classList.add("validate");
  inputPercent.setAttribute("type", "number");
  inputPercent.setAttribute("id", "cetePercent");
  inputPercent.setAttribute("placeholder", "percent");
  inputPercent.setAttribute('require', "");
  inputPercent.setAttribute('aria-required', "true");
  inputPercent.classList.add("validate");
  inputDiv.appendChild(inputField);
  percentDiv.appendChild(inputPercent);
}

function sendMsg(event) {
  event.preventDefault();
  document.getElementById("nameInput").value = '';
  document.getElementById("email").value = '';
  document.getElementById("message").value = '';
  document.getElementById("ThankYou").style.display = "block";
  setTimeout(function () {
    document.getElementById("ThankYou").style.display = "none";
  }, 3000);
};


// ** Bin's code **
function getInflation() {
  // get current date
  var fullDate = new Date();
  var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
  var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + fullDate.getDate();

  // get date from 1 year ago for range of inflation calculation
  var prevDate = (fullDate.getFullYear() - 4) + "/" + twoDigitMonth + "/" + fullDate.getDate();

  var apiUrl = 'https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';

  fetch('https://extreme-ip-lookup.com/json/')
    .then(res => res.json())
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

// For calculating projected savings
function projectedSavings(x) {
  var salary = document.getElementById("salary");
  var saving = document.getElementById("saving");
  var salaryCal = salary.value;
  var savingCal = saving.value;


  //Calculation for each year saving

  var dropDownYearOption = document.getElementById('year');
  var selectedRetirementYear = Number(dropDownYearOption.options[dropDownYearOption.selectedIndex].value);


  var chosenYearSpan = document.getElementById('chosenYear');
  chosenYearSpan.innerHTML = selectedRetirementYear;

  //Get currentDay
  var thisYear = new Date().getFullYear();
  var eachYear = selectedRetirementYear / 5; // I.e: If 10, eachYear is 2 years apart until retirement
  var yearApart = eachYear; // If 10 then yearApart = 2 only, if 35 then 7 is yearApart

  var savingsForEachYear = [];
  var years = [];
  var savingPerYear;

  //Only get 4 years , not including the last year which is year the user selected

  for (var i = 0; i <= 4; i++) {
    savingPerYear = Math.floor(((savingCal / 100) * salaryCal) * Math.pow((1 + x), eachYear));
    savingsForEachYear.push(savingPerYear);
    years.push(eachYear);
    eachYear += yearApart;
  }
  var eachYearFactorInThisYear = years.map(each => each + thisYear)

  console.log(savingsForEachYear);
  console.log(years);
  console.log(eachYearFactorInThisYear);
  console.log(yearApart);

  //Calculation for retirement

  var retirementSaving = Math.floor(((savingCal / 100) * salaryCal) * Math.pow((1 + x), selectedRetirementYear));
  var retireAmountDiv = document.getElementById('retirementAmount');
  retireAmountDiv.innerHTML = retirementSaving;

  console.log(retirementSaving);

  // visualize all graphs after data is ready 
  visualize(eachYearFactorInThisYear, savingsForEachYear);
}

// ** Ebrahim's code **


function appendToBudget() {
  var container = JSON.parse(localStorage.getItem("chips"));
  var categories = document.getElementById('cate')
  var monthleyAll = document.getElementById('monthAll')

  categories.innerHTML = "";
  monthleyAll.innerHTML = "";

  var salaryVal = document.getElementById("salary").value;
  var savingVal = document.getElementById("saving").value;

  // do your calculation
  var calculation = ((salaryVal * savingVal) / 100);
  var budgetLeft = (salaryVal - calculation)
  var each = (budgetLeft / (container.length - 1))

  for (var i = 0; i < container.length; i++) {

    var node = document.createElement("p");

    node.setAttribute('id', container[i]);
    node.innerHTML = container[i];

    categories.appendChild(node);

    var allowance = document.createElement('p');
    allowance.innerHTML = each;
    monthleyAll.appendChild(allowance);
  }

}
