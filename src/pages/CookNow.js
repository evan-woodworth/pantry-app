import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";
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
    const ingListData = ingListResponse.data.ingredientList;
    const ingList = []
    ingListData.forEach(ing=>ingList.push(ing.toLowerCase()))
    console.log("pantry ingredients",ingList);
    let cookRecipeList = [];

    recipeList.forEach((oneRecipe) => {
      let haveIngredients = true;
      oneRecipe.ingredients.forEach((recipeIngredient) => {
        console.log(recipeIngredient)
        if (!ingList.includes(recipeIngredient.name.toLowerCase())) {
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
  if (recipesCookNow) {
    var recipeList = recipesCookNow.map((meal, index) => {
      let location = {
        pathname: '/recipe',
        state: {
          meal: meal,
          user: user
        }
      };
      return(
        <article className="meal" key={index}>
          <div className="img-container">
            <img src={meal.thumbnail} alt={meal.name} />
          </div>
          <div className="meal-footer">  
            <h3>{meal.name}</h3>
            <p>{meal.category}</p>
            <Link to={location} user={user} className="btn btn-primary btn-details"> Details </Link>
          </div>
        </article>
      );
    })
  } else {
    return <p>You do not have enough ingredients for any of your favorite meals!</p>
  }

  return (
    <section>
      <h2 className='section-title'>Cook Now</h2>
      <div className='meals-center'>
        {recipesCookNow.length ? recipeList : <p> You do not have enough ingredients for any of your favorite meals! </p>}
      </div>
    </section>
  )
};

export default CookNow;