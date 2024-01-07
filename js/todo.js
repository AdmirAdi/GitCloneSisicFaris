const modalOverlay = document.getElementById("modal-overlay");
const addTodoButton = document.getElementById("content-add-todo-button");
const modalAddTodoButton = document.getElementById("modal-add-todo-button");
const closeModalButton = document.getElementById("modal-close-modal-button");
const addTodoTitle = document.getElementById("add-todo-title");
const addTodoDescription = document.getElementById("add-todo-description");
const modalErrorMessage = document.getElementById("modal-error-message");
const todoItemsContainer = document.getElementById("content-todo-items-container");
const searchButton = document.getElementById("content-search-button");
const searchInput = document.getElementById("content-search-input");
const showAllButton = document.getElementById("content-show-all-button");

function clearModalInputs() {
    addTodoTitle.value = "";
    addTodoDescription.value = "";
}

function validateModalInputs() {
    const naslovRegex = /^[\wćčšžđĆČŠŽĐ ]{2,50}$/;

    // Prazan string se tretira kao "falsy" vrijednost
    if(!addTodoTitle.value) {
        return "Naslov mora biti popunjen";
    }

    if(!naslovRegex.test(addTodoTitle.value)) {
        return "Neispravan format naslova";
    }

    return "";
}

function generateCurrentDateString() {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let string = "";
    
    if(day < 10) string += "0";
    string += (day + ".");
    if(month < 10) string += "0";
    string += (month + "." + year + " ");
    if(hours < 10) string += "0";
    string += (hours + ":");
    if(minutes < 10) string += "0";
    string += (minutes + ":");
    if(seconds < 10) string += "0";
    string += seconds;

    return string;
}

function createTodoItem() {
    modalErrorMessage.innerHTML = "";
    modalErrorMessage.style.display = "none";

    const error = validateModalInputs();

    if(error) {
        modalErrorMessage.innerHTML = error;
        modalErrorMessage.style.display = "block";
        return false;
    } else {
        const container = document.createElement("div");
        container.className = "content-todo-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const contentDiv = document.createElement("div");
        contentDiv.className = "content-todo-item-content";

        const title = document.createElement("span");
        title.className = "content-todo-item-title";
        title.innerHTML = addTodoTitle.value;

        const description = document.createElement("span");
        description.className = "content-todo-item-description";
        description.innerHTML = addTodoDescription.value;

        const dateOfAdding = document.createElement("span");
        dateOfAdding.className = "content-todo-item-date";
        dateOfAdding.innerHTML = generateCurrentDateString();

        const deleteIcon = document.createElement("img");
        deleteIcon.className = "content-todo-item-delete-image";
        deleteIcon.src = "../images/image-bin.png";

        checkbox.addEventListener("input", function(e) {
            if(e.target.checked) {
                title.style.textDecoration = "line-through";
            } else {
                title.style.textDecoration = "none";
            }
        });

        deleteIcon.addEventListener("click", function() {
            container.remove();
        });

        contentDiv.append(title);
        contentDiv.append(description);
        contentDiv.append(dateOfAdding);

        container.append(checkbox);
        container.append(contentDiv);
        container.append(deleteIcon);

        todoItemsContainer.append(container);

        return true;
    }
}

addTodoButton.addEventListener("click", function() {
    modalOverlay.style.display = "flex";
});

closeModalButton.addEventListener("click", function() {
    clearModalInputs();
    modalOverlay.style.display = "none";
});

modalAddTodoButton.addEventListener("click", function() {
    const result = createTodoItem();

    if(result) {
        clearModalInputs();
        modalOverlay.style.display = "none";
    }
});

searchInput.addEventListener("input", function(e) {
    if(e.target.value) {
        searchButton.disabled = false;
    } else {
        searchButton.disabled = true;
    }
});

searchButton.addEventListener("click", function() {
    for(let i = 0; i < todoItemsContainer.children.length; i++) {
        const content = todoItemsContainer.children[i].children[1];
        const title = content.children[0];
        if(!title.innerHTML.toLowerCase().includes( searchInput.value.toLowerCase() )) {
            todoItemsContainer.children[i].style.display = "none";
        }
    }

    searchInput.value = "";
    searchButton.disabled = true;
});

showAllButton.addEventListener("click", function() {
    for(let i = 0; i < todoItemsContainer.children.length; i++) {
        todoItemsContainer.children[i].style.display = "flex";
    }
});