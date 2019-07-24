import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';


///////////////////////////// APP-ID  ////  APP-KEY ///////////////////////////
const App = () => {
  const APP_ID = "a47acb96";
  const APP_KEY = "47b763cc2466f273e0fd7aebaa7a6444";


  /////////////////////// STATE /////////////////////////////


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');



  useEffect(() => {
    getRecipes();
  }, [query]);


  //////////////////////////////////  FETCH-DATA  ////////////////////////////////
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch(' ');
  }

  //////////////////////////////  JSX-Reander  /////////////////////////////////
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch} />
        <button
          className="search-button"
          type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.calories}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
