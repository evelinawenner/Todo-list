class Listitem {
    constructor(content, checked) {
        this.content = content;
        this.checked = checked;

    }
}
   
let items = [];


window.onload = function() {

    let item = new Listitem('Stig upp', false);
    let item2 = new Listitem('Gör lista', false);

    // let cars [car, car2];
    items.push(item);
    items.push(item2);
    
    generateHTML();

    const todoItems = document.getElementById('todo-items');
todoItems.addEventListener("click", deleteCheck);

const inputButton = document.getElementById('input-button');
inputButton.addEventListener("click", createListitem);

const sortButton = document.getElementById('sort');
sortButton.addEventListener("click", sortItems);
}

//FUNKTIONER NEDAN


// Skapa Listitem
function createListitem(event) {
    event.preventDefault();

    let newListitemContent = document.getElementById("content").value;
    let item = new Listitem(newListitemContent, false);
    items.push(item);
    generateHTML();

}

function generateHTML() {
    let container = document.getElementById("todo-items");
    container.innerHTML = "";

    for (let i = 0; i < items.length; i++) {

        const todoDiv = document.createElement("div");
        container.appendChild(todoDiv);
        todoDiv.classList.add("todo");
        
        const todoItem = document.createElement('li');
        todoItem.innerText = items[i].content;
        todoDiv.appendChild(todoItem);
        todoItem.classList.add('todo-item');
        
        let checkbtn = document.createElement('button');
        checkbtn.type = 'button';
        checkbtn.innerHTML = '<i class="fas fa-check"></i>';
        checkbtn.classList.add('checkbtn');
        todoDiv.appendChild(checkbtn);

        let trashbtn = document.createElement('button');
        trashbtn.type = 'button';
        trashbtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashbtn.classList.add('trashbtn');
        todoDiv.appendChild(trashbtn);
    }
    document.getElementById('content').value = "";
} 


function deleteCheck (e) {
    const item = e.target;

    if (item.classList[0] === 'trashbtn') {
        const todo = item.parentElement;
        const text = todo.innerText;
        for (let i = 0; i < items.length; i++) {
            if (items[i].content == text) {
                items.splice(i, 1);
            }
        }

       
        todo.remove();
        
    }

    if (item.classList[0] === 'checkbtn') {
        const todo = item.parentElement;
        todo.classList.toggle("checked");

        const text = todo.innerText;
        for (let i = 0; i < items.length; i++) {
            if (items[i].content == text) {
                items[i].checked = !items[i].checked;
            }
            
        }
    }
}

function sortItems() {
    
    items.sort(function(a, b){
        if(a.content < b.content) { return -1; }
        if(a.content > b.content) { return 1; }
        return 0;
    })
    
    generateHTML();
    console.log(items);
}