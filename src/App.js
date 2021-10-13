import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import React, { useState,useEffect } from 'react';
import Home from './components/Home'
import Car from './components/Car'
import firebase from "./firebase/firebaseConfig";
import Login from './components/Login';

function App() {

   

  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const [hasAccount,setAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }
   
  const clearErrors = () => {
    setPasswordError("");
    setEmailError("");
  }
   
//iniciar sesión
  const handleLogin = () => {
    clearErrors();
    firebase.auth().signInWithEmailAndPassword(email,password)
    .catch((err)=> {
      switch (err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
      }
    });
  };
//crear cuenta
  const handleSingup = () => {
    clearErrors();
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .catch((err)=>{
      switch (err.code){
        case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    }
    )
  }

  const handleLogout = () => {
    firebase.auth().signOut();
    clearInputs();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        clearInputs();
        setUser(user);
      }else{
        setUser("");
      }
    });
  };

  useEffect(()=>{
    authListener();
  },[]);
   

  return (

    <div className="App">
      {user ? (
          <div>
            <div> <button onClick={handleLogout}>Cerrar sesión</button></div>
            <Home user = {user}/>
            <Car user = {user}/>
          </div>
      ):(
        <Login email={email}
        setEmail={setEmail}
         password={password} 
         setPassword={setPassword}
         handleLogin={handleLogin}
         handleSingup={handleSingup}
         hasAccount={hasAccount}
         setAccount={setAccount}
         emailError={emailError}
         passwordError={passwordError}/>
      )}
    </div>

  );
}

export default App;
