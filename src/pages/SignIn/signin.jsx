import React, { useState } from 'react';
import axios from 'axios';
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './signin.css';


export default function signin() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const validateData = async () => {
        const LoginScheme = object({
            email: string().email().required(),
            password: string().min(8).max(20).required(),
        });
        try {
            await LoginScheme.validate(user, { abortEarly: false });
            return true;
        } catch (error) {
            setErrors(error.errors);
            setLoader(false);
            return (false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (await validateData()) {
            try {
                const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,
                    {
                        email: user.email,
                        password: user.password
                    });
                setUser({
                    email: '',
                    password: '',
                });

                console.log(data); // Check the response from the server

            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <h2>Sign in </h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={user.email} name="email" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={user.password} name="password" onChange={handleChange} />


                <button type='submit' disabled={loader ? 'disabled' : null} > {!loader ? 'login' : 'wait...'}</button>

            </form>
        </>
    );
}
