import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from '../SignupForm/SignupForm.module.css'

const SignupForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(['']);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    });

    const updateMessage = (msg) => {
        setMessage(msg);
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const newUserResponse = await authService.signup(formData)
             props.setUser(newUserResponse.user);
             navigate('/')

        } catch (error) {
        updateMessage(error.message)
        }
    };

    const {username, email, password, passwordConf} = formData;

    const isFormInvalid = () => {
        return !(username &&  email &&password && password === passwordConf);
    }

    return (
        <main className={styles.container}>
            <section>
            <img src="https://i.postimg.cc/RZVqZ7Zc/MUG-SCOUT-2.png" alt="logo"/>
            </section>
            <section>
            <form onSubmit={handleSubmit}> 
            <h1> Sign UP</h1>
            <p>{message}</p>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input 
                    type="text"
                    autoComplete="random-string"
                    id="name"
                    value={username}
                    name="username"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email"> Email:</label>
                    <input 
                    type="email"
                    autoComplete="off"
                    id="email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password"
                    autoComplete="off"
                    id="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input 
                    type="password"
                    autoComplete="new-password"
                    id="confirm"
                    value={passwordConf}
                    name="passwordConf"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button disabled={isFormInvalid()}>Sign Up</button>
                    <Link to="/">
                    <button>Cancel</button>
                    </Link>
                </div>
            </form>
            </section>
        </main>
    )
};

export default SignupForm;