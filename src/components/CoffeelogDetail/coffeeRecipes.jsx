import {useState, useEffect} from 'react'

const CoffeeRecipes = () => {
    const [coffeeRecipes, setCoffeeRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState (null);

useEffect(() => {
    const fetchCoffeeRecipes = async () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            setError('No token found. Please log in.');
            setLoading(false);
            return;
        }

        try{
            const res = await fetch(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeeLogs?category=Coffee recipes`, {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const errorDetails = await res.text();
                throw new Error(`Failed to load Coffee Beans. Status: ${res.status}, Message: ${errorDetails}`);
            }
            const data = await res.json();
            setCoffeeRecipes(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchCoffeeRecipes();
}, []);

if(loading) {
    return <p> Loading ...</p>
}

if(error) {
    return <p>Error: {error}</p>
}

if(coffeeRecipes.length === 0) {
    return (
        <>
        <h1>Coffee Recipes</h1>
        <p>No recipes found in this category!</p>
        </>
    )
}


    
    return (
        <div>
        <h1>Coffee Beans</h1>
        <ul>
            {coffeeRecipes.map((recipe)=> (
                <li key={recipe._id}>
                <h3> Title: {recipe.title} </h3>
                <p>Type: {recipe.type}</p>
                <p>Ingredients: {recipe.ingredients}</p>           
                </li>

            ))}
        </ul>
        </div>
    )
};



export default CoffeeRecipes;