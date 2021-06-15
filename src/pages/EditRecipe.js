import React, {useState} from 'react';
import EditPage from './EditPage';


const EditRecipe = (props) => {
    const {name, instruction, area, category, thumbnail, youtubeUrl} = props.location.state.meal;
    const ingredient = props.location.state.meal.ingredients;
    const [showForm, setShowForm] = useState(false);

    const ingredientList = ingredient.map((item, index) => {
        return (<li key={index}>{item.name}: {item.measurement}</li>)
    });

    let youtube = '';
    if (youtubeUrl) {
      youtube = <a href={youtubeUrl}>Here</a>
    } else if (youtubeUrl === "" || [] || false) {
      youtube = ''
    };

    const handleEdit = () => {
        setShowForm(true);
    }

    if (showForm) {
        return <EditPage user={props.location.state.user} meal={props.location.state.meal}/>
    }

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
                    <button onClick={props.history.goBack} className="btn btn-primary"> Back </button>
                    <button onClick={handleEdit} className="btn btn-secondary"> Edit </button>
                </div>
            </div>
        </section>
    )
}

export default EditRecipe;