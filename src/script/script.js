var Database = {
 keyName: "Mutant Database",
 data: []
};

function loadDataSource() {
 let rawData = localStorage.getItem(Database.keyName);
 let parsedData = JSON.parse(rawData);
 Database.data = parsedData.response;
 let select = document.querySelector("#select-mutant");
 Database.data.forEach(function(mutant) {
   var let = `<option value="${mutant.name.alias}">${mutant.name.alias}</option>`;

   select.insertAdjacentHTML("beforeend", option);

 });

}


function searchForMutantByAlias(mutantAlias) {

 var index = -1;

 Database.data.forEach(function(mutant, i){

   if(mutant.name.alias === mutantAlias){
     index = i;
   }

 });

 if (index === -1) {
   alert("Invalid Alias");
 } else {
   displayData(index);
 }
}


function displayData(index) {

 let mutant = Database.data[index];

 let powers = mutant.powers.join(", ");
 let affiliations = mutant.affiliation.join(", ");

 let htmlTemplate = `

 <div class="card">
   <div class="row g-0">

     <div class="col-md-4">
       <img src="${mutant.image}" class="img-fluid rounded-start">
     </div>

     <div class="col-md-8">
       <div class="card-body">

         <h3>${mutant.name.alias}</h3>
         <p><strong>Name:</strong> ${mutant.name.firstName} ${mutant.name.lastName}</p>

         <p><strong>Gender:</strong> ${mutant.profile.gender}</p>
         <p><strong>Eyes:</strong> ${mutant.profile.eyes}</p>
         <p><strong>Hair:</strong> ${mutant.profile.hair}</p>
         <p><strong>Height:</strong> ${mutant.profile.height}</p>

         <p><strong>Powers:</strong> ${powers}</p>
         <p><strong>Affiliations:</strong> ${affiliations}</p>

       </div>
     </div>

   </div>
 </div>

 `;

 document.querySelector("#results-section").innerHTML = htmlTemplate;
}


function getSelectedValue() {
let selectElement = document.querySelector("#select-mutant");
let selectedOption = selectElement.options[selectElement.selectedIndex];
 let selectedText = selectedOption.text;

 searchForMutantByAlias(selectedText);
}

document.querySelector("#select-mutant").addEventListener('change', getSelectedValue);

loadDataSource();
