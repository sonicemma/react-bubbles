import React, {useState} from "react";
import axios from 'axios';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [login, setLogin] = useState({})

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', login)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubble-age');
      }) .catch(err => {
        console.log('Error logging in: ', err)
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='username'
          name='username'
          value={login.username}
          onChange={handleChange}
          autocomplete='off'
        />
        <input 
          type='text'
          name='password'
          value={login.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default Login;
