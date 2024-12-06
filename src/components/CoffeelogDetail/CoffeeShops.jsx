import {useState, useEffect} from 'react'

const CoffeeShops = () => {
    const [coffeeShops, setCoffeeShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState (null);

useEffect(() => {
    const fetchCoffeeShops = async () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            setError('No token found. Please log in.');
            setLoading(false);
            return;
        }

        try{
            const res = await fetch(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeeLogs?category=Coffee shops`, {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const errorDetails = await res.text();
                throw new Error(`Failed to load Coffee Shops. Status: ${res.status}, Message: ${errorDetails}`);
            }
            const data = await res.json();
            setCoffeeShops(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchCoffeeShops();
}, []);

if(loading) {
    return <p> Loading ...</p>
}

if(error) {
    return <p>Error: {error}</p>
}

if(coffeeShops.length === 0) {
    return (
        <>
        <h1>Coffee Shops</h1>
        <p>No recipes found in this category!</p>
        </>
    )
}

    
    return (
        <div>
        <h1>Coffee Shops</h1>
        <ul>
            {coffeeRecipes.map((recipe)=> (
                <li key={recipe._id}>
                <h3>Shops Name:{shop.name}</h3>
                <p>Price Range: {shop.pricerange}</p>
                <p>Location: {shop.location}</p>        
                </li>

            ))}
        </ul>
        </div>
    )
};



export default CoffeeShops;


