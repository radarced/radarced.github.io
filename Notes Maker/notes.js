import { onNoteAdd } from "./Popup.js";
export let ELs = {};
export let Notes_state = {
    Nextindex : 0,
    notes : [],
}

function getElements()
{
    ELs = {};
    ELs.noteAdder = document.querySelector(".addNotes");
    ELs.body = document.querySelector("body");
    ELs.noteCtr = document.querySelector(".NotesContainer");
}

function addListeners()
{
    ELs.noteAdder.addEventListener("click",onNoteAdd);
}

export function createNote(value,id)
{
    let note = document.createElement("div");
    note.className = "Note";
    note.innerText = value;
    let deleteEl = document.createElement("div");
    deleteEl.innerText = "delete";
    deleteEl.className = "delete";
    note.appendChild(deleteEl); 
    note.title = value;
    if(id === undefined)
    {
        note.id = Notes_state.Nextindex;
    }else
    {
        note.id = id;
    }
    ELs.noteCtr.appendChild(note);
    note.addEventListener("click",OnNoteClick);
}

function OnNoteClick(e)
{
    let target = e.target;
    if(target.className === "delete")
    { // delete the note
        let parentEl = target.parentNode;
        let index = parentEl.id;
        parentEl.remove(); // removed it from the dom 
        // TODO : delete it from the data as well    
        console.log("item to delete is",localStorage.getItem(`Note${index}`));    
        localStorage.removeItem(`Note${index}`);
    }else if(target.className === "Note")
    {
        document.location.assign(`editor.html?id=${target.id}`);
    }
}

export function MakeNoteData(title)
{ // title = Note's title; index = Note's index in the container (localStorage)
// Note0 (key) - > "&title&index"
    let currNote = new note(title,Notes_state.Nextindex);
    localStorage.setItem(`Note${Notes_state.Nextindex}`,JSON.stringify(currNote));
    Notes_state.Nextindex++;
    localStorage.setItem("Nextindex",`${Notes_state.Nextindex}`);
    console.log(Notes_state);
}

function note(t,i)
{
    this.title = t;
    this.index = i;
    this.body ="";
    return this;
}

function LoadNotes()
{
    Notes_state.notes.length = localStorage.length;
    for(let i = 0;i<localStorage.length;i++)
    {
        let key = localStorage.key(i);
        if(key === "Nextindex")
        {
            Notes_state.Nextindex = +(localStorage.getItem(key));
        }else
        {
        Notes_state.notes[i] = JSON.parse(localStorage.getItem(key));
        createNote(Notes_state.notes[i].title,Notes_state.notes[i].index);
        }
    }
}

function init()
{
    getElements();
    addListeners();
    LoadNotes();
}

init();