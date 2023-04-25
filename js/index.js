
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js"

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
    
})

onValue(ingredientsInDB, function(snapshot){
    let ingredientsArray = Object.values(snapshot.val())

    clearIngredientsList()

    

    for (let i = 0; i < ingredientsArray.length; i++) {
        let currentIngredient = ingredientsArray[i]

        appendItemToIngredientsList(currentIngredient)
        
    }
})

function clearIngredientsList(){
    ingredientsList.innerHTML = ""
}

function clearInputField() {
    input.value = ""
}


function appendItemToIngredientsList(itemValue) {
    ingredientsList.innerHTML += `<li>${itemValue}</li>`
    
}

/* Turning an Object into an Array */

let users = {
    "00": "debernardifranco2003@gmail.com",
    "01": "agustinadebernardi@gmail.com",
    "02": "claudiabnavarro65@gmail.com"
}

let usersEmails = Object.values(users)

/* console.log(usersEmails); */

let usersIDs = Object.keys(users)

/* console.log(usersIDs); */

let usersEntries = Object.entries(users)

/* console.log(usersEntries); */