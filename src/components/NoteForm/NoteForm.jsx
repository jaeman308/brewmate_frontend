import {useState, useEffect} from 'react';
import * as coffeelogService from '../../services/coffeelogService';

const NoteForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });


    

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleAddNote(formData)
        setFormData({ text: ''});
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='text-input'>Your Note:</label>
            <textarea 
            required
            type="text"
            name="text"
            id="text-input"
            value={(formData.text)}
            onChange={handleChange}
            />
            <button type="submit">Submit Note</button>
        </form>
    );
};
export default NoteForm;