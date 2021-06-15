import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const MyRecipes = (props) => {
  const [userRecipes, setUserRecipes] = useState([]);  

  useEffect(() => {
    axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`)
    .then(response => {
      console.log(response.data);
      setUserRecipes(response.data);
    }).catch(error => {
      console.log('------------ MYRECIPE ERROR ------------')
      console.log(error);
    })
  }, []);

  if (userRecipes) {
    var recipesList = userRecipes.map((recipe, index) => {
      let location = {
        pathname: '/editrecipe',
        state: recipe
      };
      return (
        <article className="meal" key={index}>
          <div className="img-container">
            <img src={recipe.thumbnail} alt={recipe.name} />
          </div>
          <div className="meal-footer">
            <h3>{recipe.name}</h3>
            <p>{recipe.category}</p>
            <Link to={location} className="btn btn-primary btn-details"> Details </Link>
          </div>
        </article>
      )
    })
  } else {
    return <p>No recipes</p>
  }

  return (
    <div>
      <h1>My Saved Recipes</h1>
      <p>
        Write a function that grabs data from "mongoDB" and uses the collection
        "MyRecipes" to list all the users saved recipes on this page. Link this page to 'RecipeInfo.js' to see ingredients in recipe.
      </p>
      <li>User should have a way to add recipes</li>
      <li>User should have a way to edit recipes</li>
      <li>User should be able to remove recipes</li>
      <li>User should be able to view all ingredients in recipe</li>
      <section>
        <h2 className='section-title'> My Recipes </h2>
        <div className='meals-center'>
        {userRecipes.length ? recipesList : <p> ...Loading... </p>}
        </div>
      </section>
    </div>
  )
}


export default MyRecipes;