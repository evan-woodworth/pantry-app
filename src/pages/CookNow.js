import React, { useEffect, useState } from 'react';
import axios from 'axios'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;



// Query your favorited recipes to determine what you can make 
// with the ingredients in your pantry


function CookNow(props) {
  const [userRecipes, setUserRecipes] = useState([])
  const [recipesCookNow, setRecipesCookNow] = useState([]);
  const [allIngs, setAllIngs] = useState([]);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const user = props.user;
  console.log(props)

  const handleRecipe = async (e, recipe) => {
    props.history.push({
      pathname: '/recipe', 
      state: {
        meal: recipe,
        user: user }
    })
  }

  useEffect(async ()=>{
    const recipeResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`);
    const recipeList = recipeResponse.data;
    console.log("user recipes",recipeList);
    setUserRecipes(recipeList)

    const allIngResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/ingredients`);
    const allIngData = allIngResponse.data.theIngredients;
    console.log('allIngData',allIngData)
    setAllIngs(allIngData);

    const pantryResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/pantries`);
    const pantId = pantryResponse.data.pantryList[0]._id;
    console.log("pantId",pantId);
    const payload = {
      id: pantId
    }
    const ingListResponse = await axios.put(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`, payload);
    const ingList = ingListResponse.data.ingredientList;
    console.log("pantry ingredients",ingList);
    let cookRecipeList = [];

    recipeList.forEach((oneRecipe) => {
      let haveIngredients = true;
      oneRecipe.ingredients.forEach((recipeIngredient) => {
        console.log(recipeIngredient)
        if (!ingList.includes(recipeIngredient.name)) {
          haveIngredients = false;
        }
      })
      if (haveIngredients) {
        cookRecipeList.push(oneRecipe);
      }
    })
    console.log("Recipe cook list", cookRecipeList)
    setRecipesCookNow(cookRecipeList);
    setFinishedLoading(true);

  },[])
  
  if (!finishedLoading) {
    return (<p>...Loading</p>)
  }
  return (
    <div>
      <h1>Cook Now</h1>
      <ul>
        {recipesCookNow.map((recipe) => (
        <li className="ing">
          <div>{recipe.name}</div>
          <button onClick={e=>handleRecipe(e, recipe)}>View Details</button>
        </li>))}
      </ul>
    </div>
  )
};

export default CookNow;