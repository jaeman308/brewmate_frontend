import {useState, useEffect, useContext} from 'react';
import { Link, useParams} from 'react-router-dom';
import { AuthedUserContext } from '../../App';

const CategoryLogs = () => {
    const { user } = useContext(AuthedUserContext);
    const { category } = useParams();
    console.log('Category:', category)
    const [coffeeLogs, setCoffeelogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        console.log('Fetching coffee logs for category:', category);
        const fetchCoffeeLogs = async () => {
            if (!user?.token) {
                setError('You must be logged in to view coffee logs');
                setLoading(false);
                return;
            }
            try{
                const url = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/coffeelogs/${category}`;
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (!res.ok) {
                    const errorDetails = await res.text();
                    throw new Error(`Failed to load ${category}. Status: ${res.status}, Message: ${errorDetails}`)
                }
                const data = await res.json();
                console.log('Fetched data:', data);
                setCoffeelogs(data);
            }catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (user?.token) {
            fetchCoffeeLogs();
            console.log("Fetched coffee logs:", coffeeLogs); 
        }
    }, [category, user]);

    if (loading) {
        return <main> Brewing up your logs....</main>
    }
    
    if (error) {
        console.log('Error fetching data:', error)
        return <p>Error: {error}</p>
    }

    if (coffeeLogs.length === 0) {
        return (
            <>
            <h1> {category}</h1>
            <p> No {category} found! </p>
            </>
        );
    };
    return (
        <>
        <h1>{category}</h1>
        <ul>
            {coffeeLogs.map((log) => (
                <li key={log._id}>
                    <h3>Title: {log.title}</h3>
                    <p> Description: {log.description}</p>
                    <p> Location: {log.coffeeBeans?.location ||'N/A'}</p>
                    <p> Price range: {log.coffeeShops?.pricerange || 'N/A'}</p>
                    <p> Type: {log.type}</p>
                    <p>Shop Name: {log.coffeeShops?.shopname || 'N/a'}</p>
                    <p>Ingredients: {log.cofeeRecipes?.ingredients || 'N/A'}</p>
                    <p>Address: {log.coffeeShops?.address || 'N/A'}</p>
                    <p></p>

                </li>
            ))}
        </ul>
        </>
    )


    };


    export default CategoryLogs;






