import React, {useState} from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const EditPage = (props) => {
    const {name, instruction, area, category, thumbnail, youtubeUrl} = props.meal;
    const mealId = props.meal.mealId;
    const ingredient = props.meal.ingredients;
    const userData = props.user;

    const ingredientList = ingredient.map((item, index) => {
        return (<li key={index}>{item.name}: {item.measurement}</li>)
    });

    const [newName, setNewName] = useState({name})
    const [newCategory, setNewCategory] = useState({category});
    const [newArea, setNewArea] = useState({area});
    const [newInstruction, setNewInstruction] = useState({instruction});
    const [newVideo, setNewVideo] = useState('');
    const [newIngredients, setNewIngredients] = useState(ingredientList);
    
    const handleName = (e) => {
        setNewName(e.target.value);
    }

    const handleCategory = (e) => {
        setNewCategory(e.target.value);
    }

    const handleArea = (e) => {
        setNewArea(e.target.value);
    }

    const handleInstruction = (e) => {
        setNewInstruction(e.target.value);
    }

    const handleVideo = (e) => {
        setNewVideo(e.target.value);
    }

    const handleIngredients = (e) => {
        setNewIngredients(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            user: {
                id: userData.id,
                email: userData.email,
                name: userData.name
            },
            mealId: mealId,
            name: newName,
            category: newCategory,
            area: newArea,
            instruction: newInstruction,
            youtubeUrl: newVideo
        }
        axios.put(`${REACT_APP_SERVER_URL}/api/users/edit`, payload);
    }

    let youtube = '';
    if (youtubeUrl) {
      youtube = <a href={youtubeUrl}>Here</a>
    } else if (youtubeUrl === "" || [] || false) {
      youtube = ''
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className='section meal-section'>
                <h2 className='section-title'>{name}</h2>
                <div className='food'>
                    <img src={thumbnail} alt={name} />
                    <div className='food-info'>
                        <p><span className='food-data'> Name: </span>
                            <input type='text' value={newName.value} placeholder={name} onChange={handleName}/> </p>
                        <p><span className='food-data'>Category: </span> 
                            <input type='text' value={newCategory.value} placeholder={category} onChange={handleCategory}/> </p>
                        <p><span className='food-data'>Area: </span> 
                            <input type='text' value={newArea.value} placeholder={area} onChange={handleArea}/> </p>
                        <p><span className='food-data'>Instructions: </span>
                            <input type='text' value={newInstruction.value} placeholder={instruction} onChange={handleInstruction}/> </p>
                        <p><span className='food-data'>Video Instructions: </span> 
                            <input type='text' value={newVideo.value} placeholder='' onChange={handleVideo}/></p>
                        <hr/>
                        <p><span className='food-data'>Ingredients: </span> 
                            <input type='text' value={newIngredients.value} placeholder='' onChange={handleIngredients}/> </p>
                        <hr/>
                        <button onClick={handleSubmit} className="btn btn-primary"> Submit </button>
                    </div>
                </div>
            </section>
        </form>
    )
}


export default EditPage;