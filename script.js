var jsonData;   //create a variable to hold the response from the API
var favItem = [];  //create an empty array 
var infoItem = [];  //create an empty array 

var getfavItem = JSON.parse(localStorage.getItem("favItem"));   //get favorite items from local storage and parse it as JSON
var getInfoItem = JSON.parse(localStorage.getItem("infoItem")); //get info items from local storage and parse it as JSON

favItem = getfavItem ? [...getfavItem] : [];


console.log(getfavItem);



let d = document.querySelector(".body");
let input = document.getElementById("input-box"); // get the search item value from the input field.
let button = document.getElementById("submit-button");  // click on submit button to get the result.
let showContainer = document.getElementById("show-container");  // Is used for to put result
let listContainer = document.querySelector(".list");

let date = new Date()
console.log(date.getTime());


function displayWords(value){
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}


input.addEventListener("keyup", async ()=>{
  if (input.value.length < 4) {
    listContainer.innerHTML = "";
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input.value}&ts=1&apikey=d617080f5733e085c759c01ab940e017&hash=e6623f44d8bdc6630176cf93407858c7`;
  const response = await fetch(url);
  const listData = await response.json();

  listData.data["results"].forEach((result)=>{
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });

  if(listContainer.style.height>d.style.height){
    d.style.height = `${listContainer.style.height}`;
  }
});

// create an asynchronous function to fetch data from API

button.addEventListener("click", (getResult = async ()=>{

  // create the URL with the search item value and API key

    showContainer.innerHTML ="";
    listContainer.innerHTML = "";
    
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input.value}&ts=1&apikey=d617080f5733e085c759c01ab940e017&hash=e6623f44d8bdc6630176cf93407858c7`;
    const response = await fetch(url);
    jsonData = await response.json();
    console.log(jsonData.data.count);
    
    if(jsonData.code==409){
      showContainer.innerHTML = "Please enter something before search!!";
      showContainer.style.color = "white";
      showContainer.style.textAlign = "center"
      return;
    }

    if (jsonData.data.count) {
      const filteredData = favItem.filter(
        (item) => item.id === jsonData.data.results[0].id
      );

      if(filteredData.length>0){
        showContainer.innerHTML = `
           <div class="card-container">
         <div class="container-character-image">
         <img src="${jsonData.data.results[0].thumbnail.path+ "." + jsonData.data.results[0].thumbnail.extension}"></div>
         <div class="character-name">${jsonData.data.results[0].name}</div>
         <div class="character-description">${jsonData.data.results[0].description}</div>
         <div class="info-fav">
         <button id="information">More Info</button>
         <button id="addToFav" disabled = "true">Already Added</button>
         </div>
         </div>
           `;
      }
      else{
        showContainer.innerHTML = `
           <div class="card-container">
         <div class="container-character-image">
         <img src="${jsonData.data.results[0].thumbnail.path+ "." + jsonData.data.results[0].thumbnail.extension}"></div>
         <div class="character-name">${jsonData.data.results[0].name}</div>
         <div class="character-description">${jsonData.data.results[0].description}</div>
         <div class="info-fav">
         <button id="information">More Info</button>
         <button id="addToFav">Add to Favourites</button>
         </div>
         </div>
           `;
      }
    }       
}));


function handleButton(e){
    
   if(e.target.id === "addToFav"){
    
    favItem.push(jsonData.data.results[0]);
    localStorage.setItem("favItem", JSON.stringify(favItem));
    // getfavItem = localStorage.getItem("favItem");
    console.log("button clicked");
    console.log(favItem);
    const filteredData = favItem.filter(
      (item) => item.id === jsonData.data.results[0].id
    );
    
  
    if (filteredData.length > 0) {
      e.target.innerHTML = "Already Added";
      e.target.disabled = true;
      
    } else {
      e.target.innerHTML = "Add to favorites";
      e.target.disabled = false;
      
    }
   }
   else if(e.target.id === "submit-button"){
    getResult();
   }
   else if(e.target.id==="information"){
    console.log("button clicked")
    infoItem.push(jsonData.data.results[0]);
    localStorage.setItem("infoItem", JSON.stringify(infoItem));
    window.location.href = "more-info.html";
   }
   else{
    return;
   }
   
}


// handle a button where u clicked

document.addEventListener("click",handleButton);