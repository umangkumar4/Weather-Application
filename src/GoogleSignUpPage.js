import React from 'react'
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import {app}from './firebase'
import {useNavigate } from 'react-router-dom';
import './GoogleSignUpPage.css'

const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();


function GoogleSignUpPage() {
    
const navigate=useNavigate()
   const signUp=()=>
   {
     signInWithPopup(auth,googleProvider)
     .then(()=>
     {
       navigate('/data')
     })
   }

  return (
    <>
    <h1>Weather API</h1>
    <div className='sign-in'>
        <h3>Welcome to Weather API</h3>
    {/* <p>A weather API is an Application Programming Interface that allows weather data to be queried from scripts and code. Good weather APIs provide both historical weather data and forecast data via an easy-to-use, well-defined programming interface. </p> */}
    <p>Here you will get data like temperature, Min-temperature, Max-temperature, Humidity</p>
    <p>Visibility, Wind-speed of a particular city all <br/>over the world....</p>
          <button className='btn' onClick={signUp} >Continue with Google</button>
      </div>
    </>
  )
}

export default GoogleSignUpPage
