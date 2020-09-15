import React, { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './LoginManager';



function Login() {

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    photo: ''
  });
  initializeLoginFrameWork();

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };



  
  

  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name,user.email,user.password)
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);

        })
      
    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email,user.password)
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
      
    }
    event.preventDefault();
  }

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;

    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }

  }
 
  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res=>{
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
      })

  }  

  const signOut = () => {
      handleSignOut()
      .then(res=>{
          setUser(res);
          setLoggedInUser(res);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res=>{
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
    })
  }

  return (
    <div style={{textAlign: 'center'}} >
      {
        user.isSignedIn ? <button onClick={signOut} >Sign Out</button> : <button onClick={googleSignIn} >Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign In using facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name} </p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt='user-image' ></img>

        </div>
      }

      <h1>Authentication</h1>
      <input onChange={() => { setNewUser(!newUser) }} type="checkbox" name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit} >
        {
          newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" required />
        }
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your email address" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
        <br />
        <input type="submit" value={newUser? 'Sign Up' : 'Sign In'} />
        <br />
        <p style={{ color: 'red' }}>{user.error}</p>
        <br />
        {
          user.success && <p style={{ color: 'green' }}> User {newUser ? 'Created' : 'Logged In'} Successfully </p>
        }


      </form>






    </div>
  );
}

export default Login;
