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
var submit = document.getElementById("download-button");
submit.addEventListener("click", proposeBudget);

function proposeBudget(event) {
    event.preventDefault();
    // check for valid income and saving percentage input
    var salary = document.getElementById("salary");
    var saving = document.getElementById("saving");

    var regex = /\d+/;
    // if the input is not vaild, the input box will turn red
    if (regex.test(salary.textContent)) {
        salary.style.backgroundColor = "#ff000042";
        salary.style.color = "red";
        console.log(regex.test(salary.textContent));
    };

    if (regex.test(saving.textContent)) {
        saving.style.backgroundColor = "#ff000042";
        saving.style.color = "red";
        console.log(regex.test(saving.textContent));
    };

    if (saving.textContent > 100 || saving.textContent < 0) {
        saving.style.backgroundColor = "#ff000042";
        saving.style.color = "red";
        alert("Please enter a valid number for percentage.");
    };
    console.log(saving.textContent);

    // var chips = document.getElementsByClassName("chip");

    // if (chips.length == 0 || !chips) {
    //     alert("Please choose at least one category.");
    // };
};