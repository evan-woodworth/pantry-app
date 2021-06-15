// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

// const AddRecipe = (props) => {
//   console.log(props)
//   const userData = props.user
//   let newInput = `input`
//   const [ingredientInput, setIngredientInput] = useState([
//     { strIngredient: '', strMeasure: '' },
//   ])
//   const [name, setName] = useState('')
//   const [category, setCategory] = useState('')
//   const [area, setArea] = useState('')
//   const [instructions, setInstructions] = useState('')
//   const [mealThumb, setMealThumb] = useState('')
//   const [tags, setTags] = useState('')
//   const [youtube, setYoutube] = useState('')
//   const [ingredients, setIngredients] = useState([])

//   // handle input changes
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target
//     const list = [...ingredientInput]
//     list[index][name] = value
//     setIngredientInput(list)
//   }

//   // handle click event of the Remove button
//   const handleRemoveClick = (index) => {
//     const list = [...ingredientInput]
//     list.splice(index, 1)
//     setIngredientInput(list)
//   }

//   // handle click event of the Add button
//   const handleAddClick = () => {
//     setIngredientInput([
//       ...ingredientInput,
//       { strIngredient: '', strMeasure: '' },
//     ])
//   }

//   const handleAddRecipe = (e) => {
//     const payLoad = {
//       name,
//       category,
//       area,
//       instructions,
//       mealThumb,
//       tags,
//       youtube,
//       ingredients,
//     }
//     axios.put(`${REACT_APP_SERVER_URL}/api/users/recipe`, payLoad)
//   }

//   let ingredients = []
//   for (let i = 0; i < 20; i++) {
//     let arrayIngredient = recipe[`strIngredient${i}`]
//     let arrayMeasurement = recipe[`strMeasure${i}`]
//     if (arrayIngredient) {
//       ingredients.push({
//         name: arrayIngredient,
//         measurement: arrayMeasurement,
//       })
//     }
//   }

//   const handleName = (e) => {
//     console.log(e.target.value)
//     setName(e.target.value)
//   }

//   const handleCategory = (e) => {
//     setCategory(e.target.value)
//   }

//   const handleArea = (e) => {
//     console.log(e.target.value)
//     setArea(e.target.value)
//   }

//   const handleInstructions = (e) => {
//     console.log(e.target.value)
//     setInstructions(e.target.value)
//   }

//   const handleMealThumb = (e) => {
//     console.log(e.target.value)
//     setMealThumb(e.target.value)
//   }

//   const handleTags = (e) => {
//     console.log(e.target.value)
//     setTags(e.target.value)
//   }

//   const handleYoutube = (e) => {
//     console.log(e.target.value)
//     setYoutube(e.target.value)
//   }

//   return (
//     <div>
//       <h1>Use the Form to Add a Recipe to MyRecipes</h1>
//       <p>Write a function that allows user to add a recipe manually.</p>
//       <li>
//         User should be able to fill out a form to add recipe manually to
//         MyRecipes collection
//       </li>
//       <li>User should return to MyRecipes page onSubmit</li>
//       <form className='search-form'>
//         <label htmlFor='strMeal'>Recipe Name:</label>
//         <input
//           type='text'
//           id='strMeal'
//           name='strMeal'
//           onChange={handleName}
//           value={name.value}
//         ></input>
//         <label for='strCategory'>Category</label>
//         <select id='strCategory' name='strCategory' onChange={handleCategory}>
//           <option value='Beef'>Beef</option>
//           <option value='Chicken'>Chicken</option>
//           <option value='Dessert'>Dessert</option>
//           <option value='Lamb'>Lamb</option>
//           <option value='Miscellaneous'>Miscellaneous</option>
//           <option value='Pasta'>Pasta</option>
//           <option value='Pork'>Pork</option>
//           <option value='Seafood'>Seafood</option>
//           <option value='Side'>Side</option>
//           <option value='Starter'>Starter</option>
//           <option value='Vegan'>Vegan</option>
//           <option value='Vegetarian'>Vegetarian</option>
//           <option value='Breakfast'>Breakfast</option>
//           <option value='Goat'>Goat</option>
//         </select>
//         <label for='strArea'>Region:</label>
//         <input
//           type='text'
//           id='strArea'
//           name='strArea'
//           onChange={handleArea}
//         ></input>
//         <label for='strInstructions'>Instructions:</label>
//         <input
//           type='text'
//           id='strInstructions'
//           name='strInstructions'
//           onChange={handleInstructions}
//         ></input>
//         <label for='strMealThumb'>Thumbnail Address:</label>
//         <input
//           type='text'
//           id='strMealThumb'
//           name='strMealThumb'
//           value='https://static.wikia.nocookie.net/clubpenguin/images/8/85/Place_Setting_icon.png/revision/latest?cb=20171129210847'
//           onChange={handleMealThumb}
//         ></input>
//         <label for='strTags'>Tags</label>
//         <input
//           type='text'
//           id='strTags'
//           name='strTags'
//           onChange={handleTags}
//         ></input>
//         <label for='strYoutube'>Instructional Video Address</label>
//         <input
//           type='text'
//           id='strYoutube'
//           name='strYoutube'
//           value='https://www.youtube.com/watch?v=iik25wqIuFo'
//           onChange={handleYoutube}
//         ></input>
//         {/* <div className="ingBox">
//           <label for="strIngredient">Ingredient</label>
//           <input type="text" id="strIngredient" name="strIngredient" value={strIngredient} onChange={e => handleInputChange(e, i)}></input>
//           <label for="strMeasure">Measure</label>
//           <input type="text" id="strMeasure" name="strMeasure" value={strMeasure} onChange={e => handleInputChange(e, i)}></input>
//         </div>
//         <div className="ingredientButtons">
//           <button type="button" onClick={() => handleRemoveClick(i)}>Remove Ingredient</button>
//           <button type="button" onClick={handleAddClick}>Add Ingredient</button>
//         </div> */}
//         <button type='button' onClick={(e) => handleAddRecipe(e)}>
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

// export default AddRecipe

// const handleAddRecipe = (e) => {
//   let payload = {
//     user: {
//       id: userData.id,
//       email: userData.email,
//       name: userData.name
//     },
//     name: strMeal,
//     // mealId: null,
//     // category: data.strCategory,
//     // area: data.strArea,
//     // thumbnail: data.strMealThumb,
//     // tags: data.strTags,
//     // instructions: data.strInstructions,
//     // youtubeUrl: data.strYoutube,
//     // ingredients: ingredientInput.ingredients,
//     // measurements: ingredientInput.measurements
//   };
//   console.log(payload.ingredients);
//   axios.put(`${REACT_APP_SERVER_URL}/api/users/recipes`, payload)
//   .then(response => {
//     console.log(response.data);
//   }).catch(error => {
//     console.log('------------ FAVORITE ERROR ------------')
//     console.log(error);
//   })
// }
