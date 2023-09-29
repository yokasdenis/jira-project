//handling button click
const createButtons=document.querySelectorAll("section > div > button");
//adding event listeners for create buttons
for (let i = 0; i < createButtons.length; i++) {
    createButtons[i].addEventListener("click",createTask);
}

function createTask(event){
    const textInput=event.target.nextElementSibling;
    textInput.className="show";
}

//handling input
const inputElements=document.querySelectorAll("section > div > input");
for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("keyup",handleInput);
}


function handleInput(event){
    const inputElement=event.target;
if(event.keyCode===13){
    let taskName=inputElement.value;

    const card =document.createElement("div");
    card.className="card";
    card.draggable="true";
    card.innerHTML=`<b>${taskName}</b>
            <button class="btn1" onclick="deleteTask(this)">delete</button>
            `;

            card.addEventListener("dragstart",onDragStart);

    const cardsContainer=inputElement.nextElementSibling;
    cardsContainer.appendChild(card);
    //emptying the input
    inputElement.value="";
    inputElement.className="hide";
  }
}

function deleteTask(deleteButton){
    const parentCard=deleteButton.parentNode;
    parentCard.remove();
}

//this object maintains the id of card and its container 
//whenever a card is started dragging
const draggingItemDetails={
    cardElement:null,
    containerId:"",
}
 function onDragStart(event){
    draggingItemDetails.cardElement=event.target;
    draggingItemDetails.containerId=event.target.parentNode.parentNode.id;
    //console.log(event.target.parentNode);
 }

const containers=document.getElementsByClassName("container");

for (let i = 0; i < containers.length; i++) {
    containers[i].addEventListener("dragover",(event)=>{
        event.preventDefault();
    })
    containers[i].addEventListener("drop",onDrop);
}
function onDrop(event){
const dropContainer=event.target.closest("div.container");
if(dropContainer.id===draggingItemDetails.containerId){
    alert("you can't drag the card in the same container")
    return
}
dropContainer.appendChild(draggingItemDetails.cardElement)
}