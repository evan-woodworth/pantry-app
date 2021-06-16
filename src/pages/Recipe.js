import React, {useState, useEffect} from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const Recipe = (props) => {
  const data = props.location.state.meal ? props.location.state.meal : props.meal;
  const mealId = data.idMeal ? data.idMeal : data.mealId;
  const mealName = data.name ? data.name : data.strMeal;
  const userData = props.location.state.user ? props.location.state.user : props.user;
  const ingredientsList = <li>Loading..</li>
  let video = '';
  const [recipe, setRecipe] = useState(data);
  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(async () => {
    let meal = {};
    try {
      if (data.custom) {
        // if it is a custom recipe
        console.log('custom data')
        meal = data;
      } else {
        // if it is 
        const mealResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/mealdb/id/${mealId}`)
        console.log(mealResponse)
        let ingredients = [];
        for (let i = 0; i < 20; i++) {
          let arrayIngredient = mealResponse.data.meals[0][`strIngredient${i}`]
          let arrayMeasurement = mealResponse.data.meals[0][`strMeasure${i}`]
          if (arrayIngredient) {
            ingredients.push({
              name: arrayIngredient,
              measurement: arrayMeasurement
            })
          }
        }
        meal = {
          name: mealResponse.data.meals[0].strMeal,
          mealId: mealResponse.data.meals[0].idMeal,
          category: mealResponse.data.meals[0].strCategory,
          area: mealResponse.data.meals[0].strArea,
          thumbnail: mealResponse.data.meals[0].strMealThumb,
          tags: mealResponse.data.meals[0].strTags,
          instruction: mealResponse.data.meals[0].strInstructions,
          youtubeUrl: mealResponse.data.meals[0].strYoutube,
          ingredients
        }
        console.log('------------- meal ----------')
        console.log(meal)
      }
      setRecipe(meal);
      console.log('------------------------------------------')
      if (meal.youtubeUrl) {
        video = <a href={meal.youtubeUrl}>Here</a>
      } else if (meal.youtubeUrl === "" || [] || false) {
        video = 'Not available'
      };
      setFinishedLoading(true)
    } catch (error) {
      return <p>There was an issue displaying the recipe...</p>
    }
  }, [mealId]);



  const handleFavorite = () => {
    let payload = {
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name
      },
      name: recipe.name,
      mealId: recipe.mealId,
      category: recipe.category,
      area: recipe.area,
      thumbnail: recipe.thumbnail,
      tags: recipe.tags,
      instruction: recipe.instruction,
      youtubeUrl: recipe.youtubeUrl,
      ingredients: recipe.ingredients
    };
    axios.put(`${REACT_APP_SERVER_URL}/api/users/recipes`, payload)
    .then(() => {
      alert(`${data.strMeal} added to favorites!`);
    }).catch(error => {
      console.log('------------ FAVORITE ERROR ------------')
      console.log(error);
    })
  }

  const handleShoppingList = (async () => {
    const pantResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/pantries`);
    const pantData = pantResponse.data.pantryList[0];
    const pantryPayload = {
      id: pantData
    }
    const ingResponse = await axios.put(`${REACT_APP_SERVER_URL}/api/pantries/ingredients`, pantryPayload);
    const ingData = ingResponse.data.ingredientList; //array
    const ingredientList = []
    recipe.ingredients.forEach((ing) => {
      if ( !ingData.includes( ing.name ) ) {
        ingredientList.push(
          {title: ing.name})
      }
    })
    props.history.push({
      pathname: '/shoppinglist', 
      state: {
        ingredients: ingredientList,
        user: userData }
    })
  }) 
  if (!finishedLoading) {
    return (<p>...Loading</p>)
  }
  return (
    <section className='section meal-section'>
      <h2 className='section-title'>{recipe.name}</h2>
      <div className='food'>
        <img src={recipe.thumbnail} alt={recipe.name}/>
        <div className='food-info'>
          <p><span className='food-data'> Name:</span>{recipe.name}</p>
          <p><span className='food-data'> Category:</span>{recipe.category}</p>
          <p><span className='food-data'> Area:</span>{recipe.area}</p>
          <p><span className='food-data'> Instructions:</span>{recipe.instruction}</p>
          <p><span className='food-data'> Video Instructions:</span>{video}</p>
          <hr/>
          <p><span className='food-data'> Ingredients:</span>
          {recipe.ingredients.map((item, index) => (<li key={index}>{item.name}: {item.measurement}</li>))}</p>
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