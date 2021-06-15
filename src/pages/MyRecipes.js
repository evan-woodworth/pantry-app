import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const MyRecipes = (props) => {
  console.log(props)
  const [userRecipes, setUserRecipes] = useState([])
  const user = props.user

  useEffect(() => {
    axios.get(`${REACT_APP_SERVER_URL}/api/users/recipes`)
    .then((response) => {
        console.log(response.data)
        setUserRecipes(response.data)
      })
      .catch((error) => {
        console.log('------------ MYRECIPE ERROR ------------')
        console.log(error)
      })
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
          {userRecipes.length ? recipesList : <p> ...Loading... </p>}
        </div>
      </section>
    </div>
  )
}

export default MyRecipes
