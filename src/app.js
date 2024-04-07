const {remote} = require('electron')
const main = remote.require('./main')

const notesList = document.querySelector('#sidebar-info')
const noteContent = document.querySelector('#content')
const noteTime = new Date().toLocaleString()

let notes = []
let idSelected = 0

// Select Item
const selectItem = async (id) =>{
    if(id != undefined)
    {
        idSelected = id
        
        const noteSelected = await main.getItemById(id)
        noteContent.innerHTML= `
        <div class="content-name">
            <h3 class="name">${noteSelected[0].name}</h3>
        </div>
        <div class="content-note">
        <textarea class="note" id="node-${idSelected}">
            ${noteSelected[0].content}
        </textarea>
    </div>
    `
    }      
}

// Add Note
const addNote = async () =>{
    const note = {
        name: "Note...",
        time: noteTime,
        content:""
       } 
       await main.createItem(note)
       init()
}

//Save Note
const saveNote = async () =>{ 
    
    const noteName = document.querySelector(`.name-${idSelected}`).value
    const noteCont = document.querySelector(`#node-${idSelected}`).value
    const note = {
        name: noteName,
        time: noteTime,
        content: noteCont
       } 
        await main.updateItem( idSelected, note)
        const noteSelected = await main.getItemById(idSelected)
        noteContent.innerHTML= `
        <div class="content-name">
            <h3 class="name">${noteSelected[0].name}</h3>
        </div>
        <div class="content-note">
        <textarea class="note" id="node-${idSelected}">
            ${noteSelected[0].content}
        </textarea>
    </div>
    `
}

// Delete Note
const deleteNote = async () =>{   
    const response = confirm("Are you sure want to delete?")
    if(response){
        await main.deleteItem(idSelected)
        await getNotes()
    }
}

function renderNotes(notes){
    notesList.innerHTML=""
    notes.forEach(note => {
        notesList.innerHTML += `
        <div class="element-info" onclick="selectItem(${note.id})">
            <div class="element-info-name">
            <input type="text" id="info-name" class = "name-${note.id}" value = "${note.name}" >
                </div>
            <div class="element-info-time">
            <p>${note.time}</p>
                </div>
        </div> 
     `
    });
}

const getNotes = async () => {
    notes = await main.getItems()
    renderNotes(notes)
}

async function init(){
    getNotes()
}

init()