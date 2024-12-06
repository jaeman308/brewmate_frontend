import {useState, useEffect} from 'react'

const CoffeeBeans = () => {
    const [coffeeBeans, setCoffeeBeans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState (null);

useEffect(() => {
    const fetchCoffeeBeans = async () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            setError('No token found. Please log in.');
            setLoading(false);
            return;
        }

        try{
            const res = await fetch(`${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeeLogs?category=Coffee beans`, {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const errorDetails = await res.text();
                throw new Error(`Failed to load Coffee Beans. Status: ${res.status}, Message: ${errorDetails}`);
            }
            const data = await res.json();
            setCoffeeBeans(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchCoffeeBeans();
}, []);

if(loading) {
    return <p> Loading ...</p>
}

if(error) {
    return <p>Error: {error}</p>
}

if(coffeeBeans.length === 0) {
    return (
        <>
        <h1>Coffee Beans</h1>
        <p>No recipes found in this category!</p>
        </>
    )
}

    
    return (
        <div>
        <h1>Coffee Beans</h1>
        <ul>
            {coffeeBeans.map((bean)=> (
                <li key={bean._id}>
                <h3> Title: {bean.title} </h3>
                <p>Description: {bean.description}</p>           
                <p>Location: {bean.location}</p>
                </li>

            ))}
        </ul>
        </div>
    )
};



export default CoffeeBeans;