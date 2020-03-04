// displayTagsFromStorage(); Remember to de-comment!! 

function displayTagsFromStorage(){
    var storage = JSON.parse(localStorage.getItem('chips')); // []

    if(storage){
        var budgetOptions = document.getElementById('budget-options');

        for(var i = 0; i < storage.length; i++){
            createAndDisplayTag(storage,i, budgetOptions);
        }
    } else {
        storage = [];
        localStorage.setItem('chips', JSON.stringify(storage));
    }
}

//Helper for displayTagsFromStorage
function createAndDisplayTag(storage,i, budgetOptions){
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

// window.addEventListener('beforeunload', function(e){
//     e.preventDefault();
//     e.returnValue = '';

//     var storage = [];
//     var budgetOptions = this.document.getElementById('budget-options').children;

//     for(var i = 0; i < budgetOptions.length; i++){
//         var chip = budgetOptions[i];
//         var name = chip.getAttribute('data-name');
//         storage.push(name);
//     }

//     this.localStorage.setItem('chips', JSON.stringify(storage));

// })

