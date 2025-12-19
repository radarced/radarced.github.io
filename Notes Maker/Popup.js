import { ELs , createNote } from "./notes.js";
import {Notes_state , MakeNoteData} from "./notes.js"
let Popup = null;
export function resetPopup()
{
        Popup.add.remove();
        Popup.Input.remove();
        Popup.cancel.remove();
        Popup.popup.remove();
        Popup = null;
}

export function onNoteAdd()
{ //  add a popup which has an input and two buttons cancel and Add
    console.log(Popup);
    if(Popup === null)
    {
        Popup = {};
        createPopup();
        handlePopup();
    }else
    {
        alert("A popup is already open");
    }
}

function handlePopup()
{
    Popup.add.addEventListener("click",()=>{
        let value = Popup.Input.value;
        createNote(value);
        MakeNoteData(value);
        resetPopup();
        });
    Popup.cancel.addEventListener("click",()=>{
        resetPopup();
    });
}


export function createPopup()
{
        Popup.popup = document.createElement("div");
        Popup.Input = document.createElement("input");
        Popup.Input.type = "text";
        Popup.Input.name = "noclue";
        Popup.Input.placeholder = "Enter Title of Note";
        Popup.Input.id = "input!";
        let div = document.createElement("div");
        div.className = "Popupbtns";
        Popup.cancel = document.createElement("button");
        Popup.add = document.createElement("button");
        Popup.cancel.className = "cancel";
        Popup.add.className = "add";
        Popup.cancel.innerText = "Cancel";
        Popup.add.innerText = "Add Note";
        Popup.popup.appendChild(Popup.Input);
        div.appendChild(Popup.cancel);
        div.appendChild(Popup.add);
        Popup.popup.appendChild(div);
        Popup.popup.className = "AddNotePopup";
        ELs.body.appendChild(Popup.popup);
}
