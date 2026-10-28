import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js"
import { appSettings } from "./config.js"

const app = initializeApp(appSettings);
const database = getDatabase(app);
const ingredientsInDB = ref(database, "ingredients");


const form = document.getElementById("submit-form");
const input = document.getElementById("input-field");
const ingredientsList = document.getElementById("ingredients-list");


form.addEventListener("submit", function(event){
    event.preventDefault();
    const inputValue = input.value.trim();
    addIngredient(inputValue);
});

function addIngredient(inputValue) {
    clearInputField();
    if (inputValue === "") return;
    push(ingredientsInDB, inputValue);
}

onValue(ingredientsInDB, function(snapshot){
    if (snapshot.exists()) {
        
        let ingredientsArray = Object.entries(snapshot.val());
        clearIngredientsList();
    
        for (let i = 0; i < ingredientsArray.length; i++) {
            let currentIngredient = ingredientsArray[i];

            appendItemToIngredientsList(currentIngredient);
        }
    } else {
        ingredientsList.innerHTML = "Ningún ingrediente por aquí 🍳"
    }
})

function clearIngredientsList() {
    ingredientsList.innerHTML = "";
}

function clearInputField() {
    input.value = "";
}


function appendItemToIngredientsList(item) {
    let itemId = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.setAttribute("id", itemId);

    newEl.textContent = itemValue;

    ingredientsList.append(newEl);

    newEl.addEventListener("click", function(){
        let locationOfIngredientInDB = ref(database,`ingredients/${itemId}`);

        remove(locationOfIngredientInDB);
    })
}