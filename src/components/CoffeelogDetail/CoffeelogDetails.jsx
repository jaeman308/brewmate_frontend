import { AuthedUserContext } from "../../App";
import { useState, useEffect, useContext} from'react';
import { useParams, Link} from 'react-router-dom';
import * as coffeelogService from '../../services/coffeelogService'
import NoteForm from "../NoteForm/NoteForm";
import styles from '../CoffeelogDetail/coffeelogdetail.module.css'

const CoffeeLogDetails = (props)=> {
    const {coffeelogId} = useParams();
    const [coffeelog, setcoffeelog] = useState(null);
    const user = useContext(AuthedUserContext);

    useEffect (() => {
        const fetchCoffeelog = async () => {
            const coffeelogData = await coffeelogService.show(coffeelogId)
            setcoffeelog(coffeelogData)
        }
        fetchCoffeelog()
    }, [coffeelogId])

    const handleAddNote = async (noteFormData) => {
        const newNote = await coffeelogService.createNote(coffeelogId, noteFormData)
        setcoffeelog({ ...coffeelog, notes: [...coffeelog.notes, newNote] })
    }
    if(!coffeelog) return <main>Brewing up your logs...</main>

    return(
        <main className={styles.container}>
            <header>
                <h1>{coffeelog.title}</h1>
                <p>
                    {coffeelog.author.username} posted on 
                    {new Date(coffeelog.createdAt).toLocaleDateString()}
                </p>
                {coffeelog.author._id === user._id && (
                    <>
                    <button className={styles.editbutton}><Link to={`/coffeelogs/${coffeelogId}/edit`}>Edit</Link></button>
                    <button onClick={() => props.handleDeleteCoffeelog(coffeelogId)}>Delete</button>
                    </>
                )}
            </header>
            <section>
                {coffeelog.category === 'Coffee Beans' && (
                    <div>
                        <img src="https://i.postimg.cc/pXSZV2DC/2.png" alt="beans"/>
                        <p>Title: {coffeelog.coffeeBeans.title}</p>
                        <p>Location: {coffeelog.coffeeBeans.location}</p>
                        <p>Description: {coffeelog.coffeeBeans.description}</p>
                    </div>
                )}

                {coffeelog.category === 'Coffee Shops' && (
                    <div>
                        <img src="https://i.postimg.cc/Xvfcgdt1/4.png" alt="logo"/>
                        <p>Shop Name: {coffeelog.coffeeShops.shopname}</p>
                        <p>Price Range: {coffeelog.coffeeShops.pricerange}</p>
                        <p>Address: {coffeelog.coffeeShops.address}</p>
                        <p>Description: {coffeelog.coffeeShops.description}</p>
                    </div>
                )}

                {coffeelog.category === 'Coffee Recipes' && (
                    <div>
                        <img src="https://i.postimg.cc/kgtyBksm/3.png" alt="logo"/>
                        <p>Title: {coffeelog.coffeeRecipes.title}</p>
                        <p>Ingredients: {coffeelog.coffeeRecipes.ingredients}</p>
                        <p>Type: {coffeelog.coffeeRecipes.type}</p>
                    </div>
                )}
            </section>
            <section>
                <h2>Notes</h2>
                <NoteForm handleAddNote = {handleAddNote}/>
                {!coffeelog.notes.length && <p>No notes yet.</p>}
                
                {coffeelog.notes.map((note) => {
                    return (
                         <article key={note._id}>
                            <header>
                                <p>
                                    {note.author.username} posted on {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                            </header>
                             <p>{note.text}</p>
                        </article>
                  )
                })}
            </section>
        </main>
    )
}

export default CoffeeLogDetails;