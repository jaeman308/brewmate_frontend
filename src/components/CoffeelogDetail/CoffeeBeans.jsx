import {useState, useEffect} from 'react'

const CoffeeBeans = () => {
    const [coffeeBeans, setCoffeeBeans] = useState([]);
    const [loading, setLoading] = useState(true);
    cosnt [error, setError] = useSatate (null);

    useEffect(() => {
        const fetchCoffeeBeans = async () => {
            try {

                const res = await fetch('/api/coffeelogs?category=Coffee Beans');
                if(!res.ok) {
                    throw new Error('Failed to load Coffee Beans')
                }
                const data = await res.json();
                setCoffeeBeans(data);
            }catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCoffeeBeans();
    }, []);
    
    if(loading) {
        return <p> Loading...</p>;
    }
    if (error){
        return <p>Error: {error}</p>
    }


    
    return (
        <div>
        <h1>Coffee Beans</h1>
        <ul>
            {coffeeBeans.map((bean)=> (
                <li key={bean._id}>
                     <h3>{bean.title}</h3>
                     <p>{bean.description}</p>
                     <p>Location: {bean.location}</p>
                 </li>
            ))}
        </ul>
        </div>
    )
};



export default CoffeeBeans;