const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');




//function to get recipe
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes....."
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query} `);
    const response = await data.json();
   // console.log(response);

    recipeContainer.innerHTML = "";

   response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea} </p>
    <p>${meal.strCategory}</p>
    `

    const button = document.createElement('button');
    button.textContent ="recipe";
    recipeDiv.appendChild(button);

    //adding event listener to recipe button
    button.addEventListener('click', ()=>{
        openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
   });
}




const fetchIngredients = (meal) => {
    let IngredientsList ="";
    for(let i = 1  ; i<=20 ; i++ ){
        const ingrident = meal[`strIngredient${i}`];
        if(ingrident){
            const measure = meal[`strMeasure${i}`]
            IngredientsList += `<li>${measure} ${ingrident} </li>`
        }
        else{
            break;
        }
    }
    return IngredientsList;
}




const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML =`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3> ingredients : </h3>
    <ul class="ingridentList">${fetchIngredients(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>
    `
   recipeDetailsContent.parentElement.style.display = "block"
}




recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display ="none";
});




searchBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>for someone who dont know how to write in the text box , please likh do yeh gareeb aadmi bheek mang raha hai...please likh do</h2>`;
        return;
       
    }
    fetchRecipes(searchInput);
});
