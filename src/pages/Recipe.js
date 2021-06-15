import React, {useState, useEffect} from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const Recipe = (props) => {
  const data = props.location.state.meal ? props.location.state.meal : props.meal;
  const mealId = data.idMeal ? data.idMeal : data.mealId;
  const userData = props.location.state.user ? props.location.state.user : props.user;
  const [recipe, setRecipe] = useState(data);

  useEffect(() => {
    axios.get(`${REACT_APP_SERVER_URL}/api/mealdb/id/${mealId}`)
    .then(response => {
      let meal = response.data.meals[0];
      setRecipe(meal);
    }).catch(error => {
      console.log('------------ RECIPE ERROR ------------');
      console.log(error)
    });
  }, [mealId]);

  let video = '';
  if (recipe.strYoutube) {
    video = <a href={recipe.strYoutube}>Here</a>
  } else if (recipe.strYoutube === "" || [] || false) {
    video = 'Not available'
  };

  let ingredients = [];
  for (let i = 0; i < 20; i++) {
    let arrayIngredient = recipe[`strIngredient${i}`]
    let arrayMeasurement = recipe[`strMeasure${i}`]
    if (arrayIngredient) {
      ingredients.push({
        name: arrayIngredient,
        measurement: arrayMeasurement
      })
    }
  }

  const handleFavorite = () => {
    let payload = {
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name
      },
      name: recipe.strMeal,
      mealId: recipe.idMeal,
      category: recipe.strCategory,
      area: recipe.strArea,
      thumbnail: recipe.strMealThumb,
      tags: recipe.strTags,
      instruction: recipe.strInstructions,
      youtubeUrl: recipe.strYoutube,
      ingredients
    };
    axios.put(`${REACT_APP_SERVER_URL}/api/users/recipes`, payload)
    .then(response => {
      alert(`${data.strMeal} added to favorites!`);
    }).catch(error => {
      console.log('------------ FAVORITE ERROR ------------')
      console.log(error);
    })
  }

  const ingredientsList = ingredients.map((item, index) => {
    return (<li key={index}>{item.name}: {item.measurement}</li>)
  })

  const handleShoppingList = (() => {
    const ingredientList = []
    ingredients.forEach((ing) => {
      ingredientList.push(
        {title: ing.name})
    })
    props.history.push({
      pathname: '/shoppinglist', 
      state: {
        ingredients: ingredientList,
        user: userData }
    })
  }) 

  return (
    <section className='section meal-section'>
      <h2 className='section-title'>{recipe.strMeal}</h2>
      <div className='food'>
        <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
        <div className='food-info'>
          <p><span className='food-data'> Name:</span>{recipe.strMeal}</p>
          <p><span className='food-data'> Category:</span>{recipe.strCategory}</p>
          <p><span className='food-data'> Area:</span>{recipe.strArea}</p>
          <p><span className='food-data'> Instructions:</span>{recipe.strInstructions}</p>
          <p><span className='food-data'> Video Instructions:</span>{video}</p>
          <hr/>
          <p><span className='food-data'> Ingredients:</span>{ingredientsList}</p>
          <hr/>
          <button onClick={handleShoppingList} className="btn btn-secondary">Generate Shopping List</button>
          {userData ? <button onClick={handleFavorite} className="btn btn-secondary">Favorite</button> : <></>}
          <button onClick={props.history.goBack} className="btn btn-primary">Back</button>
        </div>
      </div>
    </section>
  )
};

export default Recipe;