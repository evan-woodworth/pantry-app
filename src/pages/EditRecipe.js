import React from 'react';

const EditRecipe = (props) => {
    console.log(props)
    const {name, instruction, area, category, thumbnail, youtubeUrl} = props.location.state
    const ingredient = props.location.state.ingredients

    const ingredientList = ingredient.map((item, index) => {
        return (<li key={index}>{item.name}: {item.measurement}</li>)
    });

    let youtube = '';
    if (youtubeUrl) {
      youtube = <a href={youtubeUrl}>Here</a>
    } else if (youtubeUrl === "" || [] || false) {
      youtube = ''
    };

    return (
        <section className='section meal-section'>
            <h2 className='section-title'>{name}</h2>
            <div className='food'>
                <img src={thumbnail} alt={name}/>
                <div className='food-info'>
                    <p><span className='food-data'> Name: </span>{name}</p>
                    <p><span className='food-data'> Category: </span>{category}</p>
                    <p><span className='food-data'> Area: </span>{area}</p>
                    <p><span className='food-data'> Instructions: </span>{instruction}</p>
                    <p><span className='food-data'> Video Instructions: </span>{youtube}</p>
                    <hr/>
                    <p><span className='food-data'> Ingredients: </span>{ingredientList}</p>
                    <hr/>
                    <button onClick={props.history.goBack} className="btn btn-primary">Back</button>
                </div>
            </div>
        </section>
    )
}

export default EditRecipe;