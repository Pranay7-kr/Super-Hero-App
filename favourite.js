let getfavItem = JSON.parse(localStorage.getItem("favItem"));  // Is used for get the result from local storage
let favHero = document.querySelector(".favHero");  // Is used for to put the results


// created renderItems function to put the result in my favHero InnerHTML

const renderItems = ()=>{
         const favData = getfavItem.map((item,index)=>{  // Here we storing the data from getFavItem.
            
            return `
            <div class="card-container">
            <div class ="hero-name">${item.name}</div>
    <div class="img-section">
        <img src="${item.thumbnail.path+ "." + item.thumbnail.extension}" alt="">                  
    </div>
    <div class="remove-part">
        <button class = "removeButton" onclick = "removeFavourite(${index})">Remove</button>
    </div>
    </div>
    `;
    }).join();

    favHero.innerHTML = favData;  
    
}
renderItems();

// we used removeFavourite to remove the specific data which user want.
const removeFavourite=(index)=>{
    getfavItem.splice(index,1);
    localStorage.setItem("favItem", JSON.stringify(getfavItem));
    renderItems();
    
}