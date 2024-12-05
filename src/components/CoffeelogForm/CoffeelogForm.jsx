import { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import * as coffeelogServices from '../../services/coffeelogService';

const CoffeelogForm = (props) => {
     const [category, setCategory] = useState('');
     const [selectedPricerange, setSelectedPricerange] = useState('');
     const [selectedType, setSelectedType] = useState('');
     const [formData, setFormData] = useState({
        title: '',
        location: '',
        shopname: '',
        address: '',
        ingredients: '',

});

     const handleCategoryChange = (event) =>{
        setCategory(event.target.value);
     };
     

     const handlePricerangeChange = (event) => {
        setSelectedPricerange(event.target.value);
     }
     const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
     };
     
     const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

     }

     const renderForm = () => {
        switch(category) {
            case'Coffee Bean': 
            return(
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onchange={handleInputChange}
                    />
                    <label htmlFor="location">Location:</label>
                    <input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onchange={handleInputChange}
                    />
                    <label htmlFor="description">Description:</label>
                    <input 
                    type="text" 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onchange={handleInputChange}
                    />
                </div>
            );
            case 'Coffee Shop':
                return(
                    <div>
                    <label htmlFor="shopname">Shop Name:</label>
                    <input 
                    type="text" 
                    id="shopname" 
                    name="shopname"
                    value={formData.shopname}
                    onchange={handleInputChange}
                    />
                    <label htmlFor="pricerange">Price Range:</label>
                    <select 
                        id="pricerange" 
                        name ="pricerange"
                        value={selectedPricerange}
                        onChange={handlePricerangeChange}
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
                   onchange={handleInputChange}
                   />
                   <label htmlFor="description">Description:</label>
                   <input type="text" id="description" name="description"/>
                </div>
                );
            case 'Coffee Recipe':
            return (
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={formData.title}
                    onchange={handleInputChange}
                    />
                    <label htmlFor="ingredients">Ingredients:</label>
                    <input 
                    type="text" 
                    id="ingredients" 
                    name="ingredients"
                    value={formData.ingredients}
                    onchange={handleInputChange}
                    />
                    <label htmlFor="type">Type of drink:</label>
                    <select 
                        id="type" 
                        name ="type"
                        value={selectedType}
                        onChange={handleTypeChange}
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
     const handleSubmit = (event) => {
        event.preventDefault();
     };

     return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='category'>Coffee Log</label>
                    <select
                     id="category" 
                     name="category" 
                     value={category} 
                     onChange={handleCategoryChange}>
                        <option value="">Category</option>
                        <option value="Coffee Bean">Coffee Bean</option>
                        <option value="Coffee Shop">Coffee Shop</option>
                        <option value="Coffee Recipe">Coffee Recipe</option>
                    </select>
                    </div>
                    {renderForm()}
            <button type="submit">Submit</button>
            </form>        
            
        </>
     )
};

export default CoffeelogForm;