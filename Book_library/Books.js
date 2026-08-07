let EL_references = {
    new_button : document.querySelector(".create-book"),
    books_container : document.querySelector(".booksContainer"),
    body : document.querySelector("body")
}

let appState = {
    new_buttonClicked : false,
    form : null,
}

let Books = [];

window.onload = function()
{
    appState.form = document.createElement("form");
    appState.form.className = "Modal";
    let ModalHTML = `<div class="modal-1">
        <label for="author">Author name :         
        <input type="text" name="author" id="author" required minLength="2" maxLength="40">
        </label>
        <label for="title">Title : 
        <input type="text" name="title" id="title" required minLength="2" maxLength="40">
        </label>
        </div>
        
        <div class="modal-2">
        <label for="pages">Pages of book :
        <input type="number" name="pages" id="pages" required min="1">
        </label>
        <label for="bookRead" id="modal-2-2">Book read? &nbsp
        <input type="checkbox" name="read" id="bookRead" value="true">
        </label>
        </div>
        <button type="submit" id="modal-submitBtn">Submit</button>`;
    appState.form.insertAdjacentHTML("beforeend",ModalHTML);
    let submitButton = appState.form.children[2];

    appState.form.addEventListener("submit",submitNew); // when the data is submitted(aka validated) THEN you take the input preventDefault and all that jazz
    addEventHandlers();
}

function displayModal()
{
    if(!appState.new_buttonClicked)
    {
        appState.new_buttonClicked = true;
    }else
    { // if it is already clicked
        return ;
    }
    // Create the Modal - > append the constituents - > append the Modal
    EL_references.body.appendChild(appState.form);
}

function closeForm()
{
    EL_references.body.removeChild(appState.form);
    appState.new_buttonClicked = false;
    // after the form is closed either by the closing button or by submission you set the clicked = false
    // to specify that its not clicked anymore
}

function addEventHandlers()
{
    EL_references.new_button.addEventListener("click",displayModal);
    EL_references.books_container.addEventListener("click",bookHandler);
}

// STATE FUNCTIONS 

function submitNew(e)
{
    e.preventDefault();

    // format Input 
    let formData = new FormData(e.target);  // this constructor function does not give you a standard object representation of your form controls values this is desgined like so cuz of flexiblity 
    let formattedVals = Object.fromEntries(formData); 
    formattedVals.read = formattedVals.read || false;

    createBook(formattedVals);
    
    closeForm();


    displayBook(Books.at(-1));
}

function createBook(formattedVals)
{
    let new_book = new Book(formattedVals);
    Books.push(new_book);   
}

function Book(inputData)
{
    this.author = inputData.author;
    this.title = inputData.title;
    this.pages = inputData.pages;
    this.read = inputData.read;
    this.id = crypto.randomUUID();
}

Book.prototype._read = function()
{
    this.read = !this.read; // inverse it - > change it to the opposite of it      
}

// book helper functions tbh this should be in one object but whatever 

function readBook(id)
{
    let targetBook = Books.find((el)=>el.id === id);
    targetBook._read();
    displayBooks();
}

function removeBook(id)
{
    let targetIndex = Books.findIndex((el)=>el.id === id);
    if(targetIndex > -1)
    { // meaning it exists in the container < - just to be safe 
        Books.splice(targetIndex,1);
    }   
    displayBooks();
}

// DOM FUNCTIONS 

function displayBook(lastBook)
{
    let BookHTML = `<div class="author">author : ${lastBook.author}</div>
    <div class="title">title  : ${lastBook.title}</div> <div class="pages">Pages :  ${lastBook.pages}</div> <div class="readDisplay ${lastBook.read ? "read" : "not-read"}">${lastBook.read ? "read" : "not read"}</div>
    <button class="remove">Remove book</button>
    `;
    let book = document.createElement("div");
    book.className = "book";
    book.dataset.id = lastBook.id;
    book.insertAdjacentHTML("beforeend",BookHTML);

    EL_references.books_container.appendChild(book);
}

function displayBooks()
{
    EL_references.books_container.innerHTML = ""; // reset it ;
    for(let book of Books)
    {
        displayBook(book);
    }
}

// EVENT HANDLERS 

function bookHandler(e)
{ // if the class is either readDisplay or remove then handle it accordingly

    let decisionClass = e.target.classList[0]; // basically the first class of the read and remove button is what determines if the event handler should proceed or not and how it should proceed 
    let id;

    switch(decisionClass)
    {
        case "remove" :
        id = e.target.parentElement.dataset.id;
        removeBook(id); 
        break;
        case "readDisplay" : 
        id = e.target.parentElement.dataset.id;
        readBook(id);
        break;
        default : 
        // nothing 
        break;
    }
}
