import { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import * as coffeelogServices from '../../services/coffeelogService';


const CoffeelogForm = ({ handleAddCoffeelog, handleUpdateCoffeelog, isSubmitting }) => {
       const [formData, setFormData] = useState({
        title: '',
        location: '',
        shopname: '',
        address: '',
        ingredients: '',
        description: '',
        pricerange: '',
        type: '',
        category: '',

});

const[error, setError] = useState('');
const {coffeelogId} = useParams();


useEffect(() =>{
    if (coffeelogId){
        const fetchCoffeelog = async () => {
            const coffeeLogData = await coffeelogServices.show(coffeelogId);
            setFormData(coffeeLogData)
        }
         fetchCoffeelog();
    };
}, [coffeelogId]);


     const handleCategoryChange = (event) =>{
        const value = event.target.value;
        setFormData(prevData => ({
            ...prevData,
            category: value
        }));
     };
     

 
     const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

     }

     const validateForm = () => {
        if (!formData.category){
            setError('Please select a category.')
            return false;
        }

        switch (formData.category){
            case'Coffee Beans':
                return formData.title && formData.location && formData.description;
            case'Coffee Shops':
                return formData.title && formData.shopname && formData.pricerange && formData.address &&formData.description;
            case 'Coffee Recipes':
                return formData.title && formData.ingredients && formData.type;
            default: 
                return false;

        }
     };

     const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()){
            setError('');
            try {
                if(coffeelogId) {
                    await handleUpdateCoffeelog(coffeelogId, formData);
                } else {
                    await handleAddCoffeelog(formData);
                }
                setFormData({
                    title: '', 
                    location: '', 
                    description: '', 
                    shopname: '', 
                    pricerange: '', 
                    ingredients: '', 
                    type: '', 
                    category: ''
                });
            } catch (err) {
                setError('Failed to add coffee log.');
                console.error('Error adding coffee log:', err);
            }
        }
    };

     const renderForm = () => {
        switch(formData.category) {
            case'Coffee Beans': 
            return(
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="location">Location:</label>
                    <input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="description">Description:</label>
                    <input 
                    type="text" 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    />
                </div>
            );
            case 'Coffee Shops':
                return(
                    <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="shopname">Shop Name:</label>
                    <input 
                    type="text" 
                    id="shopname" 
                    name="shopname"
                    value={formData.shopname}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="pricerange">Price Range:</label>
                    <select 
                        id="pricerange" 
                        name ="pricerange"
                        value={formData.pricerange}
                        onChange={handleInputChange}
                    >
                        <option value="">---Choose your price range---</option>
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                        <option value="$$$$$">$$$$$</option>
                   </select>
                   <label htmlFor="address">Address:</label>
                   <input
                   type="text" 
                   id="address" 
                   name="address"
                   value={formData.address}
                   onChange={handleInputChange}
                   />
                   <label htmlFor="description">Description:</label>
                   <input 
                   type="text"
                   id="description" 
                   name="description"
                   value={formData.description}
                   onChange={handleInputChange}
                   />
                </div>
                );
            case 'Coffee Recipes':
            return (
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                    type="text" 
                    id="ingredients" 
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="type">Type of drink:</label>
                    <select 
                        id="type" 
                        name ="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    >
                        <option value="">---Drink Type---</option>
                        <option value="Espresso">Espresso</option>
                        <option value="Americano">Americano</option>
                        <option value="Cappuccino">Cappuccion</option>
                        <option value="Latte">Latte</option>
                        <option value="Mocha">Mocha</option>
                        <option value="Flat White">Flat White</option>
                        <option value="Iced Coffee">Iced Coffee</option>
                        <option value="Cartado">Cartado</option>
                        <option value="Affogato">Affogato</option>
                        <option value="Nitro Coffee">Nitro Coffee</option>
                        <option value="Drip Coffee">Drip Coffee</option>
                        <option value="Pour-over">Pour-over</option>
                        <option value="French Press">French Press</option>
                        <option value="Cafe au Lait">Cafe au Lait</option>
                   </select>
                </div>
            );
            default:
            return null;
        }
     };


 

     return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='category'>Coffee Log</label>
                    <select
                     id="category" 
                     name="category" 
                     value={formData.category} 
                     onChange={handleCategoryChange}
                     >
                        <option value="">Category</option>
                        <option value="Coffee Beans">Coffee Bean</option>
                        <option value="Coffee Shops">Coffee Shop</option>
                        <option value="Coffee Recipes">Coffee Recipe</option>
                    </select>
                    </div>
                    {renderForm()}
                    {error && <div className="error">{error}</div>}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Submit'}</button>
            </form>        
            
        </>
     );
};

export default CoffeelogForm;