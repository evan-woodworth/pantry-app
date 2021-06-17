import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const MyRecipes = (props) => {
  console.log(props)
  const [userRecipes, setUserRecipes] = useState([])
  const user = props.user

  const getUserRecipes = () => {
    console.log('Getting Recipes')
    axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`)
    .then((response) => {
      console.log(response.data)
      setUserRecipes(response.data)
    })
    .catch((error) => {
      console.log('------------ MYRECIPE ERROR ------------')
      console.log(error)
    })
  }

  const handleRemove = async (e,recipeId) => {
    const response = await axios.delete(`${REACT_APP_SERVER_URL}/api/users/recipes/${recipeId}`);
    getUserRecipes();
  }

  useEffect(() => {
    getUserRecipes();
  }, [])

  if (userRecipes) {
    var recipesList = userRecipes.map((recipe, index) => {
      let location = {
        pathname: '/editrecipe',
        state: {
         meal: recipe,
         user: user 
        }
      }
      return (
        <article className='meal' key={index}>
          <div className='img-container'>
            <img src={recipe.thumbnail} alt={recipe.name} />
          </div>
          <div className='meal-footer'>
            <h3>{recipe.name}</h3>
            <p>{recipe.category}</p>
            <Link to={location} className='btn btn-primary btn-details'> {' '}Details{' '} </Link>
            <button className='btn btn-primary btn-details' onClick={e=>handleRemove(e,recipe._id)} >{' '}Remove{' '}</button>
          </div>
        </article>
      )
    })
  } else {
    return <p>No recipes</p>
  }

  return (
    <div>
      <section>
        <h1 className='section-title'> My Recipes </h1>
        <div className='meals-center'>
          {userRecipes.length ? recipesList : <p> You do not have any favorited recipes! </p>}
        </div>
      </section>
    </div>
  )
}

export default MyRecipes
