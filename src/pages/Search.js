import React from "react";
import {Link} from "react-router-dom";


const Search = (props) => {
  const data = props.location.state.result;
  const user = props.location.state.user;

  if (data) {
    var searchList = data.map((meal, index) => {
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
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
          <div className="meal-footer">  
            <h3>{meal.strMeal}</h3>
            <p>{meal.strCategory}</p>
            <Link to={location} user={user} className="btn btn-primary btn-details"> Details </Link>
          </div>
        </article>
      );
    })
  } else {
    return <p>No search matches.</p>
  };

  return (
    <section>
      <h2 className='section-title'>Search Result</h2>
      <div className='meals-center'>
        {data.length ? searchList : <p> ...Loading... </p>}
      </div>
    </section>
  );
};

export default Search;