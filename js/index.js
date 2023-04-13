
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://fir-mobileapp-78098-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ingredientsInDB = ref(database, "ingredients")

/* console.log(app);
console.log(database); */



const input = document.getElementById("input-field")
const button = document.getElementById("add-button")
const ingredientsList = document.getElementById("ingredients-list")


button.addEventListener("click", function(){
    let inputValue = input.value
    /* FIREBASE */
    push(ingredientsInDB, inputValue) 
    console.log(`${inputValue} agregado a la base de datos`);

    /* Front */

    clearInputField()
    
    
    appendItemToIngredientsList(inputValue)
    
})

function clearInputField() {
    input.value = ""
}


function appendItemToIngredientsList(itemValue) {
    ingredientsList.innerHTML += `<li>${itemValue}</li>`
    
}