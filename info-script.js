let getInfoItem = JSON.parse(localStorage.getItem("infoItem")); // Is used for get the result from local storage

let info = document.querySelector("#info-container");  // Is used for to put the results


  // created information function to put the result in my information part

 function inforamtion(){

    info.innerHTML = `
               <div class="flex-row hero-name">${getInfoItem[0].name}</div>
               <div class="flex-row  hero-img-and-more-info">
                    <img id="image" src = "${getInfoItem[0].thumbnail.path + "." + getInfoItem[0].thumbnail.extension}" alt="">
                    <div class="flex-col more-info">
                         <div class="flex-row id">
                              <b>ID:</b><span> ${getInfoItem[0].id}</span>
                         </div>
                         <div class="flex-row comics">
                              <b>Comics:</b><span> ${getInfoItem[0].comics.available}</span>
                         </div>
                         <div class="flex-row series">
                              <b>Series:</b><span> ${getInfoItem[0].series.available}</span>
                         </div>
                         <div class="flex-row stories">
                              <b>Stories:</b><span> ${getInfoItem[0].stories.available}</span>
                         </div>
                    </div>
               </div>
               <div class="flex-col hero-discription">
                    <b>Discription:</b>
                    <p>${getInfoItem[0].description != "" ? getInfoItem[0].description : "No Description Available"}</p>
               </div>`;
 }

 window.onload=()=>{
    inforamtion();
 }