let Els = {}
let btn = document.querySelector(".save");
let Note = 
{
    title : "",
    index : 0,
    body : "",
}
function getElements()
{
    Els.mainSect = document.querySelector(".mainSection");
    Els.displaySect = document.querySelector(".displaySection");
    Els.editorSect = document.querySelector(".editorSection");
}

function UrlAnalysis()
{
    let searchParams =new URLSearchParams(window.location.search); // getting the search parameters from the url's antanomy
    console.log(searchParams);
    if (searchParams.has("id"))
    {
        let id = searchParams.get("id");
        LoadNote(id);
    }
}

function onEdit()
{
    let value = Els.editorSect.value;
    Els.displaySect.innerText = value;
}

function addListeners()
{
    Els.editorSect.addEventListener("input",onEdit);
}

function LoadNote(id)
{ // ok so in jsut one key - > value pair u squash in body (key) as well
    Note.index = id;
    let value = JSON.parse(localStorage.getItem(`Note${id}`));
    Note.title = value.title;
    Note.body = value.body;
    Els.displaySect.innerText = Note.body;
    Els.editorSect.innerText = Note.body;
}

function init()
{
    getElements();
    addListeners();
    UrlAnalysis();
}

function save()
{
    let value = Els.editorSect.value;
    Note.body = value;    
    localStorage.setItem(`Note${Note.index}`,JSON.stringify(Note));
    alert("SAVED");
}

setInterval(save,100000)
btn.addEventListener("click",save);
init();