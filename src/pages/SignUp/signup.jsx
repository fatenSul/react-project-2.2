import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { toast } from 'react-toastify';
import { object, string } from 'yup';

export default function Signup() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setUser({
        ...user,
        [name]: files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateData();

    if (isValid) {
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('image', user.image);

      try {
        const { data } = await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`, formData);
        setUser({
          userName: '',
          email: '',
          password: '',
          image: '',
        });
        if (data.message === 'success') {
          toast('YOUR ACCOUNT HAS BEEN CREATED SUCCESSFULLY!!')
        }
      } catch (error) {
        console.error(error); // Log any errors
      }
    }
  };

  const validateData = async () => {
    const registerSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().email("Please enter a valid email").required(),
      password: string().min(8).max(20).required("Please make your password more than 8 characters"),
      image: string().required(),
    });
    try {
      await registerSchema.validate(user, { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      console.log("validate error", error.errors)
      error.errors.forEach(errorMessage => {
        alert(errorMessage); // Display error message as an alert
      });
      setErrors(error.errors)
      return false;
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">User Name</label>
        <input type="text" id="userName" value={user.userName} name="userName" onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={user.email} name="email" onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={user.password} name="password" onChange={handleChange} />

        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" onChange={handleImageChange} />

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
