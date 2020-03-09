/* Onload Functions (Do Not Touch)                     **  **              */
displayTagsFromStorage();
addEventListenerOnLoad();

function toggleSections(e) {
    console.log(e.target);
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
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    });
    document.getElementById('home').addEventListener('click', toggleSections);
    document.getElementById('budget').addEventListener('click', toggleSections);
    document.getElementById('homeMobile').addEventListener('click', toggleSections);
    document.getElementById('budgetMobile').addEventListener('click', toggleSections);
    document.getElementById('contact').addEventListener('click', toggleSections);
    document.getElementById('contactMobile').addEventListener('click', toggleSections);
}
/*                       **  **              */

// ** Khoi's code **

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
    var inputFields = inputDiv.children; // Return a list 
    for (var i = 1; i < inputFields.length; i++) {
        inputFields[i].remove();
        i--;
    }
    // Clear the value of first input field
    inputFields[0].value = "";
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
    var salary = document.getElementById("salary");
    var saving = document.getElementById("saving");

    // grab the value of salary and saving
    var salaryCal = salary.value;
    var savingCal = saving.value;
    // do your calculation
    var calculation = ((salaryCal * savingCal) / 100);

    var regex = /\d+\.{0,1}\d+/; // Check to see if it contains 2 or more . or + or -

    // if the input is not vaild, the input box will turn red
    if (!regex.test(salaryCal)) {
        salary.style.backgroundColor = "#ff000042";
        salary.style.color = "red";
        console.log(regex.test(salary.value));
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

    if (!regex.test(savingCal)) {
        saving.style.backgroundColor = "#ff000042";
        saving.style.color = "red";
        M.toast({
            html: 'Please enter a valid number for saving.',
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
        saving.style.backgroundColor = "#ff000042";
        saving.style.color = "red";
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

    // Generating Inflation
    getInflation();
};

// For adding input fields to modal
function addInputField() {
    var inputDiv = document.getElementById("inputDiv");
    var inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.setAttribute("id", "customCategory");
    inputField.setAttribute('placeholder', 'New Category')
    inputField.setAttribute('require', "");
    inputField.setAttribute('aria-required', "true");
    inputField.classList.add("validate");
    inputDiv.appendChild(inputField);
}

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

    var salaryCal = salary.value
    var savingCal = saving.value

    var retirementSaving = ((savingCal / 100) * salaryCal) * Math.pow((1 + x), 20);
    console.log(retirementSaving);
    //Put code here to append to budget template
}

// ** Ebrahim's code **
var data = {
    categories: [{
        name: 'one',
        url_title: 'oneUrl'
    },
    {
        name: 'two',
        url_title: 'twoUrl'
    }
    ],

};

var container = document.getElementsByClassName('chips');
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

// Pulling categories from index 
function appendToBudget() {
    for (var i = 0; i < data.categories.length; i++) {
        var category = data.categories[i];
        var categoryElement = createCategoryElement(category.name, category.url_title);
        container.appendChild(categoryElement);


        if (i + 1 < data.categories.length) {
            container.appendChild(salary);
        }
    }
}