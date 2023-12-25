const addBtn = document.getElementById("add-btn")
const removeBtn = document.getElementById("remove-btn")
const userInput = document.getElementById("user-input")
const ulEl = document.getElementById("ul-el")

let listOfLinks = []
let listOfNotes = []

//let historyLinks = JSON.parse(localStorage.getItem("listOfLinks"))
//let historyNotes = JSON.parse(localStorage.getItem("listOfNotes"))

if (localStorage.getItem("listOfLinks") && localStorage.getItem("listOfNotes")) {
    listOfLinks = JSON.parse(localStorage.getItem("listOfLinks"));
    listOfNotes = JSON.parse(localStorage.getItem("listOfNotes"));
    renderNotesList();
  }


addBtn.addEventListener("click", function(){ 
  let note = userInput.value
  
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        // and use that tab to fill in out title and url
        
        listOfLinks.push(tabs[0].url)
        listOfNotes.push(note)
  
        localStorage.setItem("listOfLinks", JSON.stringify(listOfLinks))
        localStorage.setItem("listOfNotes", JSON.stringify(listOfNotes))

        renderNotesList()

        userInput.value = ""
    })

    

  

})

removeBtn.addEventListener("click", function(){
    listOfNotes=[]
    listOfLinks=[]
    localStorage.clear()

    renderNotesList()
})


function renderNotesList(){
    ulEl.textContent = ""
    let insideHTML = ""
    if(listOfLinks){
        for(let i=0; i<listOfLinks.length; i++){
            insideHTML+= `
            <li>
                ${listOfNotes[i]}: <a target="_blank" href="${listOfLinks[i]}">${listOfLinks[i]}</a>
            </li> 
            `
        }
    }
    
    ulEl.innerHTML = insideHTML
}

