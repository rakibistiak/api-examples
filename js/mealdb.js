document.getElementById('error-message').style.display='none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('error-message').style.display='none';
    if(searchText == ''){
        const searchResult = document.getElementById('search-result');
        const h4 = document.createElement('h4');
        h4.innerText = "Please type your desire food";
        h4.classList.add('d-flex','justify-content-center', 'mt-5');
        h4.style.width='100%'
        searchResult.appendChild(h4)
    }
   else{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayFood(data.meals))
        .catch(err => displayError(err))
   }
};
const displayError=(error)=>{
    document.getElementById('error-message').style.display='block'
}
const displayFood = (foods) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent='';
    console.log(foods.length);
    // searchResult.innerHTML='';
  /*   if(foods.length==null){
        console.log("no")
    } */
    for (const food of foods) {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `<div onclick="loadMealDetail('${food.idMeal}')" class="card h-100">
        <img src="${food.strMealThumb}" class="card-img-top img-fluid" alt="Food Image">
        <div class="card-body">
          <h5 class="card-title">${food.strMeal}</h5>
          <p class="card-text">${food.strInstructions.slice(0, 200)} </p>
      </div>`;
        searchResult.appendChild(div);
    }
};
const loadMealDetail = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]))
};
const displayMealDetails = (meal) => {
    const singleMealDetail = document.getElementById('single-meal-detail');
    const div = document.createElement('div');
    div.classList.add('card');
    // div.setAttribute('style','"width: 18rem;"');
    div.style.width = '18rem'
    div.innerHTML = `<img src="${meal.strMealThumb}" class="card-img-top" alt="Food Image">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="${meal.strYoutube}" class="btn btn-primary" target="_blank">Go somewhere</a>
    </div>`
    singleMealDetail.appendChild(div)
}