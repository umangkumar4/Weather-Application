import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './component.css';
import {BiSearch} from "react-icons/bi";
import {getAuth,onAuthStateChanged,signOut}  from 'firebase/auth'
import {app} from './firebase'



const auth=getAuth(app)

function Component() {
  const [city,setCity]=useState('Lucknow');
  const [search,setsearch]=useState('Lucknow');
  const [Wind,setWind]=useState('mumbai');
  const [visible,setVisile]=useState('mumbai');
  const[login,setLogin]=useState(null)
 // var ct;
  function clicked(){getApi();}


   const getApi=async()=>
   {
     const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=208d290b725ee2448cd399e2d5618b5e`)
     const data= await response.json();
     setsearch(data.main)
     setWind(data.wind)
     setVisile(data)
   }
    
   useEffect(()=>
   {
    getApi();
   },[])


   useEffect(()=>
   {
    onAuthStateChanged(auth,user=>
     {
       if(user){
         setLogin(user)
         console.log("loggde in",user)
       }
       else{setLogin(null)
      console.log("Logged out")}
       }
   )},[])

  const navigate=useNavigate()
  if(login===null)
  {
    navigate('/')
  }




return (
    
    <>
    <div>
      <button className="log-out-btn" onClick={()=>signOut(auth)} > Log Out</button>
    </div>
  
      <div className='main-div'>
        <div className='left-div'>
          {!search?(
            <>
            <div className='city'><h1>No City Found </h1><div className='country'><h1>IN</h1></div></div>
            <div className='left-div-footer'>
                <div className='date_time'>
                    <div className='date'>{new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}</div>
                    <div className='day'><span>Wednesday</span><span>15 Febuary 2021</span></div>
                </div>
                <div className='degree'>0 °C</div>
            </div>
            </>
          ):(
            <>
            <div className='city'><h1>{city}</h1><div className='country'><h1>IN</h1></div></div>
            <div className='left-div-footer'>
                <div className='date_time'>
                    <div className='date'>{new Date().getHours()}:{new Date().getMinutes()}:{new Date().getSeconds()}</div>
                    <div className='day'><span>Wednesday</span><span>15 Febuary 2021</span></div>
                </div>
                <div className='degree'>{search.temp} °C</div>
            </div>
            </>)}
        </div>

    
        





    {/*-------------------------------------Right div-------------------------------------------------------- */}
    {!search?(
      <>
      <div className='right-div'>
        <div className='input-div'>
            <input type='text' className='input' onChange={(event)=>{setCity(event.target.value)}} id='citySearch' placeholder='Enter City.....' /><BiSearch onClick={clicked} className='searchBtn'/>
        </div>
      <div className='data'>
          <div className="temperature temp">No City Found</div>
          <div className="visibilty temp">Humidity :       0%</div>
          <div className="max temp">Max Temperature :          0 °C</div>
          <div className="min temp">Min Temperature :            0 °C</div>
          <div className="min temp">Visibility :          0 mi</div>
          <div className="min temp">Wind Speed :          0(km/h)</div>
        </div>
        </div>
        </>
    ):(
        <div className='right-div'>
        <div className='input-div'>
            <input type='text' className='input' onChange={(event)=>{setCity(event.target.value)}} id='citySearch' placeholder='Enter City.....' /><BiSearch onClick={clicked} className='searchBtn'/>
        </div>
        <div className='data'>
          <div className="temperature temp">{city}</div>
          <div className="visibilty temp">Humidity :       {search.humidity }%</div>
          <div className="max temp">Max Temperature :          {search.temp_max} °C</div>
          <div className="min temp">Min Temperature :            {search.temp_min} °C</div>
          <div className="min temp">Visibility :          {visible.visibility} mi</div>
          <div className="min temp">Wind Speed :          {Wind.speed }(km/h)</div>
        </div>

        

        </div>)}

      </div>
    </>
  )
}

export default Component
