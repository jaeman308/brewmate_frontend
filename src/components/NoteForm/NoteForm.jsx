import {useState, useEffect} from 'react';
import styles from "../NoteForm/NoteForm.module.css"
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
        <main className={styles.container}>
        <form  onSubmit={handleSubmit}>
            <section>
                <div>
            <label htmlFor='text-input'>Your Note:</label>
            <textarea 
            required
            type="text"
            name="text"
            id="text-input"
            value={(formData.text)}
            onChange={handleChange}
            />
            </div>
            </section>
            <button type="submit">Submit Note</button>
        </form>
        </main>
    );
};
export default NoteForm;