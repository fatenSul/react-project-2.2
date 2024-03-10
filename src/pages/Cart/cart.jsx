import React, { useState } from 'react';

export default function cart() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', user);
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
        <input type="file" id="image" value={user.image} name="image" onChange={handleChange} />
      
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
