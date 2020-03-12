/* Onload Functions (Do Not Touch)                     **  **              */

localStorage.setItem("remainingPercentage", 100); // This variable is fixed
displayTagsFromStorage();
addEventListenerOnLoad();
setInterval(updateLocalStorage, 0);
setInterval(checkPercentageLeft, 100);

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
  var percentStorage = JSON.parse(localStorage.getItem('percent'));

  if (storage) {
    var budgetOptions = document.getElementById("budget-options");

    for (var i = 0; i < storage.length; i++) {
      createAndDisplayTag(storage, i, budgetOptions, percentStorage, remainingPercentage);
    }

    if (percentStorage.length == 0) {
      document.getElementById('remainingPercentage').innerHTML = 100;
      return;
    } else {
      var totalPercentageUsed = percentStorage.reduce((acc, value) => acc += value);
      var newRemainingPercentage = 100 - Number(totalPercentageUsed);
      document.getElementById('remainingPercentage').innerHTML = newRemainingPercentage;
    }

  } else {
    storage = [];
    percentStorage = [];
    document.getElementById('remainingPercentage').innerHTML = 100;
    localStorage.setItem("chips", JSON.stringify(storage));
    localStorage.setItem("percent", JSON.stringify(percentStorage));
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
function createAndDisplayTag(storage, i, budgetOptions, percentStorage) {
  var divItem = document.createElement("div");
  divItem.classList.add("chip");
  divItem.setAttribute("data-name", storage[i]);
  divItem.setAttribute("data-percent", percentStorage[i]);
  divItem.innerHTML = storage[i] + ' (' + percentStorage[i] + '%' + ')';

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
  var correspondingPercentage = getNewPercentage();

  // Append new values to existing id="budget-options" list
  appendToExistingOptions(newValues, correspondingPercentage);

  //Update local storage
  updateLocalStorage();
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

function getNewPercentage() {
  var newPercentage;
  var percentages = [];
  var percentDiv = document.getElementById('percentDiv').children;

  for (var i = 0; i < percentDiv.length; i++) {
    newPercentage = percentDiv[i].value.trim();
    percentages.push(newPercentage);
  }
  return percentages;
}

function appendToExistingOptions(newChips, newPercentage) {
  var budgetOptions = document.getElementById("budget-options");
  for (var i = 0; i < newChips.length; i++) {
    var divItem = document.createElement("div");
    divItem.classList.add("chip");
    divItem.setAttribute("data-name", newChips[i]);
    divItem.setAttribute("data-percent", newPercentage[i]);
    divItem.innerHTML = newChips[i] + ' (' + newPercentage[i] + '%' + ')';

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
  var percentForLocalStorage = [];
  var allCurrentTags = budgetOptions.children;
  var item;
  var percentage;

  for (var i = 0; i < allCurrentTags.length; i++) {
    item = allCurrentTags[i].getAttribute('data-name');
    percentage = allCurrentTags[i].getAttribute('data-percent');
    chipsForLocalStorage.push(item);
    percentForLocalStorage.push(percentage);
  }

  localStorage.setItem('chips', JSON.stringify(chipsForLocalStorage));
  localStorage.setItem('percent', JSON.stringify(percentForLocalStorage));
  //
  var usedPercentagesInStorage = JSON.parse(localStorage.getItem('percent')); // The most updated percentages used
  if (usedPercentagesInStorage.length == 0) {
    document.getElementById('remainingPercentage').innerHTML = 100;
    return;
  } else {
    var totalPercentageUsed = usedPercentagesInStorage.reduce((acc, value) => Number(acc) + Number(value));
    var newRemainingPercentage = 100 - Number(totalPercentageUsed);
    document.getElementById('remainingPercentage').innerHTML = newRemainingPercentage;
  }
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

function exportToExcel(inflation) {
  var income = Number(document.getElementById('incomeAmount').innerHTML);
  var saving = Number(document.getElementById('savingAmount').innerText);
  var dropDownYearOption = document.getElementById('year');
  var selectedRetirementYear = Number(dropDownYearOption.options[dropDownYearOption.selectedIndex].value);
  var retirementAmount = Number(document.getElementById('retirementAmount').innerHTML);

  // Create an empty note book
  var workbook = XLSX.utils.book_new();
  var ws_name = "Budget";

  // Pull data from Category and Monthly allowance and %

  var categories = document.getElementById('categoryBudget').children;
  var monthlyAllowance = document.getElementById('monthlyAllowanceBudget').children;
  var percentagesBudget = document.getElementById('percentageBudget').children;
  var eachCategory;

  /* Make worksheet */
  var ws_data = [
    ["", "Your Monthly Income ($CAD)", income],
    ["", "Your Monthly Saving ($CAD)", saving],
    ["", "Years To Retirement", selectedRetirementYear],
    [" "],
    ["Category", "Amount spent monthly ($CAD)", "Amount spent monthly (%)"],
  ];

  for (var i = 0; i < categories.length; i++) {
    eachCategory = [];
    eachCategory.push(categories[i].innerHTML);
    eachCategory.push(Number(monthlyAllowance[i].innerHTML));
    eachCategory.push(percentagesBudget[i].innerHTML);
    ws_data.push(eachCategory)
  }

  ws_data.push([" "]);
  ws_data.push([" ", "Current inflation rate (May subject to change over time)", inflation]);
  ws_data.push([" ", "Projected Saving after " + selectedRetirementYear + " year With Inflation", retirementAmount]);

  // Create worksheet

  var ws = XLSX.utils.aoa_to_sheet(ws_data);

  /* Add the worksheet to the workbook */
  XLSX.utils.book_append_sheet(workbook, ws, ws_name);

  //Download the file in Excel
  XLSX.writeFile(workbook, "Your Monthly Budget.xls");
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

  visualizeBarAndPieGraph();
  visualizeLine(years, savingData);

  document.getElementById('barGraph').addEventListener('click', toggleGraph);
  document.getElementById('pieGraph').addEventListener('click', toggleGraph);
}

function getRandomRGBA(lengthOfArray) {
  var colorMix = [];
  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  var randomByte = () => randomNumber(0, 255);
  var randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2);

  var randomCssRgba;

  for (var i = 0; i < lengthOfArray.length; i++) {
    randomCssRgba = `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`;
    colorMix.push(randomCssRgba);
  }

  return colorMix;
}

function visualizeBarAndPieGraph() {
  var chipStorage = JSON.parse(localStorage.getItem("chips"));
  var monthlyAllowance = document.getElementById('monthlyAllowanceBudget').children;
  var monthlyAllowanceData = [];

  for (var i = 0; i < monthlyAllowance.length; i++) {
    monthlyAllowanceData.push(monthlyAllowance[i].innerHTML);
  }

  var color = getRandomRGBA(chipStorage);

  var ctxBar = document.getElementById('myChartBar').getContext('2d');
  var myChartBar = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: chipStorage,
      datasets: [{
        label: 'Per category budget ($CAD)',
        data: monthlyAllowanceData,
        backgroundColor: color,
        //   // 'rgba(255, 206, 86, 0.2)',
        borderColor: color,
        // 'rgba(255, 99, 132, 1)',
        borderWidth: 2
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
            labelString: 'Per category budget ($CAD)',
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

  var ctxPie = document.getElementById('myChartPie').getContext('2d');
  var myChartPie = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: chipStorage,
      datasets: [{
        label: 'Per category budget ($CAD)',
        data: monthlyAllowanceData,
        backgroundColor: color,
        // 'rgba(255, 99, 132, 0.2)'
        borderColor: color,
        // 'rgba(255, 99, 132, 1)',
        borderWidth: 2
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
            labelString: 'Per category budget ($CAD)',
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
  // checking user input
  var validInputs = checkAndGetUserInput();
  if(!validInputs){
    return;
  }

  // Display data on budget page
  document.getElementById("incomeAmount").innerText = validInputs[0];
  document.getElementById("savingAmount").innerText = validInputs[1];
  document.getElementById("unusedAmount").innerText = validInputs[2] + '(Spend on anything you want!)';
  // Move over to Your Budget section

  document.getElementById('Home').style.display = "none";
  document.getElementById('BudgetPage').style.display = "block";

  //Append budget values
  appendToBudget();

  // Generating Inflation
  getInflation();
};

function checkAndGetUserInput() {
  // Check there is at least one category 
  var chips = document.getElementsByClassName("chip");
  if (chips.length == 0 || !chips) {
    M.toast({
      html: "Please select at least one category.",
      classes: 'red',
      displayLength: '1500'
    });
    return false;
  };

  //Check if user enters blank percentage
  var isContainBlank = isContainBlankPercentage();

  if(isContainBlank){
    return;
  }

  // check for valid income and saving percentage input
  // grab the value of salary and saving
  var salaryVal = document.getElementById("salary").value; // 1000
  var savingVal = document.getElementById("saving").value; // 10%
  if (salaryVal == '' || savingVal == '') {
    M.toast({
      html: "Please fill in the missing field for income/saving rate.",
      classes: 'red',
      displayLength: '1500'
    });
    return false;
  }

  var savingAmount = Math.floor((((salaryVal * savingVal) / 100)) * 100) / 100; // 100
  var salaryAfterSavingRate = salaryVal - savingAmount; // 1000 - 100 = 900
  var remainingPercentage = document.getElementById("remainingPercentage").innerHTML;
  var unusedAmount = Math.floor(((salaryAfterSavingRate * remainingPercentage) / 100) * 100) / 100;

  var regex = /\d*\.{0,1}\d*/;

  // if the input is not vaild, the input box will turn red
  if (!regex.test(salaryVal)) {
    M.toast({
      html: 'Please enter a valid number for income.',
      classes: 'red',
      displayLength: '2000'
    });
    return false;
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
    return false;
  } else {
    saving.style.backgroundColor = "white";
    saving.style.color = "black";
  };

  // user need to enter a number between 0-100 for percentage

  if (saving.value > 100 || saving.value <= 0) {
    M.toast({
      html: 'Please enter a number between 1 and 100 for saving rate.',
      classes: 'red',
      displayLength: '2000'
    });
    return false;
  } else {
    saving.style.backgroundColor = "white";
    saving.style.color = "black";
  }

  // make sure spend money amount is less than or equal to income
  var percentageLeft = document.getElementById("remainingPercentage").innerHTML;
  if (percentageLeft < 0) {
    M.toast({
      html: "Please make sure the percentage remaining is not negative.",
      classes: 'red',
      displayLength: '1500'
    });
    return false;
  };

  return [salaryVal, savingAmount, unusedAmount];
}

function isContainBlankPercentage(){
  var percent = JSON.parse(localStorage.getItem('percent'));
  for(var i = 0; i < percent.length;i++){
    if(percent[i] == ''){
      M.toast({
        html: "Percentage cannot be empty",
        classes: 'red',
        displayLength: '1500'
      });
      return true;
    }
  }
  return false;
}

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

function checkPercentageLeft() {
  var percentageLeft = document.getElementById("remainingPercentage").innerHTML;
  if (percentageLeft < 0) {
    document.getElementById("remainingDiv").classList.add("red");
    document.getElementById("remainingDiv").classList.remove("green");
    document.getElementById("remainingDiv").classList.remove("indigo");
  } else if (percentageLeft == 0) {
    document.getElementById("remainingDiv").classList.add("indigo");
    document.getElementById("remainingDiv").classList.remove("red");
    document.getElementById("remainingDiv").classList.remove("green");
  } else {
    document.getElementById("remainingDiv").classList.remove("indigo");
    document.getElementById("remainingDiv").classList.remove("red");
    document.getElementById("remainingDiv").classList.add("green");
  };
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
          console.log(inflation);
          projectedSavings(inflation);
          document.getElementById('downloadExcel').addEventListener('click', () => {
            exportToExcel(inflation)
          });
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
  var savingEveryXYear;

  //Only get 4 years , not including the last year which is year the user selected

  for (var i = 0; i <= 4; i++) {
    savingEveryXYear = Math.floor(((savingCal / 100) * salaryCal) * Math.pow((1 + x), eachYear));
    savingsForEachYear.push(savingEveryXYear);
    years.push(eachYear);
    eachYear += yearApart;
  }

  // Year will be in 20xx format, not 5 or 10 or 20 year format
  var eachYearFactorInThisYear = years.map(each => each + thisYear)

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

  var chipStorage = JSON.parse(localStorage.getItem("chips"));
  var percentStorage = JSON.parse(localStorage.getItem("percent"));

  //Data On Budget Page
  var categories = document.getElementById('categoryBudget');
  var monthlyAllowance = document.getElementById('monthlyAllowanceBudget');
  var percentagesBudget = document.getElementById('percentageBudget');

  categories.innerHTML = "";
  monthlyAllowance.innerHTML = "";
  percentagesBudget.innerHTML = "";

  var salaryVal = document.getElementById("salary").value;
  var savingVal = document.getElementById("saving").value;

  // do your calculation
  var calculation = ((salaryVal * savingVal) / 100); // Literally the saving 
  var budgetLeft = (salaryVal - calculation) // What's left after deducted saving (this amount will be used for spending on each category2)
  var eachCategoryAmount; // Monthly allowance for each category
  var eachPercentageAmount;

  for (var i = 0; i < chipStorage.length; i++) {
    // Append to id="categoryBudget"
    var node = document.createElement("p");
    node.setAttribute('id', chipStorage[i]);
    node.innerHTML = chipStorage[i];
    categories.appendChild(node);

    //Append to id="monthlyAllowanceBudget"
    var allowance = document.createElement('p');
    eachCategoryAmount = Math.floor(((budgetLeft * percentStorage[i]) / 100) * 100) / 100; // Only 2 decimal places
    allowance.innerHTML = eachCategoryAmount;
    monthlyAllowance.appendChild(allowance);

    //Append to id="percentageBudget"
    var percentage = document.createElement('p');
    eachPercentageAmount = percentStorage[i] + '%';
    percentage.innerHTML = eachPercentageAmount;
    percentagesBudget.appendChild(percentage);
  }
}