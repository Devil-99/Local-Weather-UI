import './App.css';
import { React, useState, useEffect } from 'react';
import {locationRoute} from './utils/ApiRoutes';
import axios from 'axios';
import {MdSunny,MdLocationOn} from 'react-icons/md';
import {IoIosPartlySunny,IoMdSearch} from 'react-icons/io';
import {BsFillMoonStarsFill,BsFillCloudFill,BsFillCloudLightningRainFill,BsCloudHaze2Fill} from 'react-icons/bs';
import logo from './weather-icon.png';
import rainbg from './rain.gif';
import sky from './sky.jpg';
import cloud from './cloud.jpg';
import fog from './fog.jpg';
import night from './night.jpg';


function App() {

  const [location,setLocation] = useState("bankura");
  const [input,setInput] = useState("");
  const defaultData = {
    "location": "NIL",
    "temperature": "0℃",
    "feels_like": "0℃",
    "humidity": "0%",
    "clouds": "0%",
    "wind_speed": "0 km/h",
    "country": "IN",
    "description": "NIL"
  };
  const [weatherDetails, setWeatherDetails] = useState(defaultData);
  
  const days=["Sun","Mon","Tue","Wed","Thurs","Fri","Sat"];
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const calender=new Date();
  const backgroundImage = `https://source.unsplash.com/1600x900/?${location}`;

  const currentDate = ()=>{
    let i=calender.getDay();

    let m=calender.getMonth();
    let day=calender.getDate();
    let hours=calender.getHours();
    let mins = calender.getMinutes();
    if(mins<10){
      mins="0"+mins;
    }
    return `${hours}:${mins} | ${days[i]} | ${day}/${months[m]}`;
  }

  const getData = async()=>{
    const apiData = await axios.post(locationRoute,{location:location});
    setWeatherDetails(apiData.data);
  }

  useEffect(()=>{
    getData();
  },[location]);

  const handleChange = (e)=>{
    setInput(e.target.value);
  }
  
  const handleSubmit = async ()=>{
    setLocation(input);
  }
  
  const weatherStatus = weatherDetails.status;
  var icon,leftbodybg=sky,textcolor="black";
  if(weatherStatus==="Sunny"||weatherStatus==="Clear"){
    if(calender.getHours()<18){
      icon=<MdSunny className='icon' style={{color: 'yellow'}}/>
      leftbodybg=sky;
    }
    else{
      icon=<BsFillMoonStarsFill className='icon' style={{color: 'rgb(220, 210, 80)'}}/>
      leftbodybg=night;
      textcolor="white";
    }
  }
  else if(weatherStatus==="Mist" || weatherStatus==="Smoke" || weatherStatus==="Haze"){
    icon=<BsCloudHaze2Fill className='icon' style={{color: 'rgb(220, 220, 220)'}}/>
    leftbodybg=fog
  }
  else if(weatherStatus==="Clouds"){
    icon=<BsFillCloudFill className='icon' style={{color: 'rgb(60, 60, 60)'}}/>
    leftbodybg=cloud;
  }
  else if(weatherStatus==="Rain"){
    icon=<BsFillCloudLightningRainFill className='icon' style={{color: 'rgb(200,200,200)'}}/>
    leftbodybg=rainbg;
    textcolor="white";
  }
  else
    icon=<IoIosPartlySunny className='icon' style={{color: 'yellow'}}/>

  return (
    <div className="App" style={{backgroundImage:`url(${backgroundImage})`}}>
      <header>
        <div className="logo">
          <img className='logoimage' src={logo}></img>
        </div>
        <div className="searchBar">
          <input type="text" className="searchInput" onChange={(e)=>{handleChange(e)}}/>
          <button className="searchButton" onClick={handleSubmit}><IoMdSearch className='searchicon'/></button>
        </div>
      </header>
      <div className='mainbody'>
        <div className='leftbody' style={{backgroundImage:`url(${leftbodybg})`}}>
          <div className="icons">
            {icon}
          </div>
          <div className="data">
            <h1 style={{color:textcolor}}>{weatherDetails.temperature} ℃</h1>
            <p style={{color:textcolor}}>Feels Like - {weatherDetails.feels_like} ℃</p>
            <h2 style={{color:textcolor}}><MdLocationOn className='location_icon'/> {weatherDetails.location}-{weatherDetails.country}</h2>
            <p style={{color:textcolor}}>{currentDate()}</p>
          </div>
        </div>
        <div className='rightbody'>
          <h2>Description - {weatherDetails.description}</h2>
          <h2>Humidity - {weatherDetails.humidity}%</h2>
          <h2>Wind Speed - {weatherDetails.wind_speed} km/h</h2>
          <h2>Clouds - {weatherDetails.clouds}%</h2>
          <h2>Visibility - {weatherDetails.visibility / 1000} km</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
