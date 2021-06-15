# Recipantry

## https://recipantry.herokuapp.com/

## Table of Contents

- [What is Recipantry?](#what-is)
- [Setup](#setup)
- [Technologies Used](#technologies)
- [Process Work](#process-work)
- [Routes](#routes)

### What is Recipantry

Recipantry is the only application you need to organize all your food preparation. With Recipantry you can:

- Get inspiration with recipes for meals you would like to prepare
- Track the foods you currently have in your pantry at home
- Discover recipes you can cook with the ingredients already in your house
- Create your own custom recipes alongside the ones provided by the application
- Generate a shopping list you can take with you based on the ingredients you don't have and the recipes you want to cook

With Recipantry you will never lack for cooking inspiration and never make your own shopping list again!

### Setup

1. Fork and Clone this repository and the accompanying pantry-database repository.
2. Install MongoDB and plug the URI in the .env file of the pantry-databse repository.
3. Generate an API token at https://wwww.themealdb.com

### Technologies

This project was created with the following technologies:

- React
- Express
- Axios
- MongoDB
- Mongoose
- Passport
- dotenv
- React-Router-DOM
- GenPDF.js

### Process Work

1. Created a working directory with two sub-directories, one for front end, one for backend. 
2. Seeded Database with ingredients and Categories from the API
3. Built backend routes in order to create reuseable code for data access functions
4. Built models for the data that would be leveraged by the front end components
5. Built React components for pieces of the application that would be leveraged by multiple pages
6. Build React components for individual pages that provide the user with a specific functionality.

### Routes

| Method | Path | Purpose |
| ------ | ---- | ------- |
| GET | /category/id/ | Fetch a category by it's ID |
| GET | /category/name/ | Fetch a category by it's name |
| GET | /catgory/ | Fetch all categories |
| GET | /ingredients/id/ | Fetch an ingredient by it's ID |
| GET | /ingredients/name/ | Fetch an ingredient by it's name |
| GET | /ingredients/ | Fetch all ingredients |
| GET | /mealdb/searchType/ | Fetch pre-defined URLS from the API|
| GET | /pantries/id/ | Fetch a pantry by it's ID |
| GET | /pantries/name/ | Fetch a pantry by it's name |
| PUT | /pantries/ingredients/ | Add an ingredient to a users pantry |
| GET | /pantries/ | Fetch all pantries for a user |
| POST | /pantries/create/ | Create a pantry |
| POST | /pantries/shoppinglist/ | Create a shopping list based on a pantry |
| PUT | /pantries/addIngredient/ | Create a new ingredient |
| PUT | /pantries/deleteIngredient/ | remove an ingredient from a pantry |
| GET | /recipes/id/ | Fetch a recipe by it's ID |
| GET | /recipes/name/ | Fetch a recipe by it's name |
| GET | /recipes/all/ | Fetch all recipes |
| GET | /users/profile/ | Fetch a user's profile |
| GET | /users/recipes/ | Fetch a user's saved recipes |
| GET | /users/pantries/ | Fetch a user's pantries |
| GET | /users/shoppingLists/ | Fetch a user's shopping lists |
| POST | /users/signup/ | Provide a user's signup data to the database |
| POST | /users/login/ | Provide a user's login data |
| PUT | /users/recipes/ | Provide a user's saved recipes |
| PUT | /users/pantries/ | Provide a user's pantries |

### Data Relationship

![DataRelationship]((/https://github.com/evan-woodworth/pantry-app/blob/master/Pantry%20ERD.pdf))
