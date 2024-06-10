import './App.css'
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png"
import cloudIcon from "./assets/cloud.png";
import snowIcon from "./assets/snow.png"
//import windIcon from "./assets/wind.png";
import rainIcon from "./assets/rain.png"
import drizzleIcon from "./assets/drizzle.png";
//import humidityIcon from "./assets/humidity.png"
import thunderIcon from "./assets/thunderstrom.png"
import { useState } from 'react';
import { useEffect } from 'react';
import WeatherDetails  from './Components/WeatherDetails';
//import climateIcon from "./assets/climate.jpeg"

function App() {
  const[icon,seticon]=useState();
  const[temp,settemp]=useState(0);
  const[city,setcity]=useState(undefined);
  const[country,setcountry]=useState(undefined);
  const[lat,setlat]=useState(0);
  const[lon,setlon]=useState(0);
  const[wind,setwind]=useState(0);
  const[humidity,sethumidity]=useState(0);
  const[text,settext]=useState("london");
  const[loading,setloading]=useState(false);
  const[citynotfound,setcitynotfound]=useState(false);
  const[error,seterror]=useState(null);

  const weatherIconMap={//you can see this code in api there they alloted id's for different weather icon so we are using it
    "01d" : clearIcon,
    "01n" :clearIcon,
    "02d" : cloudIcon,
    "02n" : cloudIcon,
    "03d" : drizzleIcon,
    "03n" : drizzleIcon,
    "04d" : drizzleIcon,
    "04n" : drizzleIcon,
    "09d" : rainIcon,
    "09n" : rainIcon,
    "10d" : rainIcon,
    "10n" : rainIcon,
    "11d" :thunderIcon,
    "11n" : thunderIcon,
    "13d" : snowIcon,
    "13n" : snowIcon,
  }
  let API_KEY="07b1fa780d3babf200038ed0242f2288";


  
  const  search =async()=>{
    setloading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_KEY}&units=Metric`;
    try{
      const response = await fetch(url);
      const data = await response.json();
      //the data will be in readablestream so we are converting the value
      if(data.cod==="404"){
        setcitynotfound(true);
        console.log("city not found");
        setloading(false);
        return;
      }
     
      settemp(data.main.temp);//if you see in json file the temp will be inside main same goes for all
      setcity(data.name);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlon(data.coord.lon);
      setwind(data.wind.speed);
      sethumidity(data.main.humidity);
      const iconcode=data.weather[0].icon;
      seticon(weatherIconMap[iconcode]|| clearIcon);
      setcitynotfound(false);
    }
    catch(error){
        console.error("An error occurred:",error.message);
        seterror("error occur while fetching data");
    }
    finally{
        setloading(false);
    }
  }



  const handlecity=(e)=>{
    settext(e.target.value);
  };
  const handlekeydown=(e)=>{
      if(e.key==="Enter"){
        search();
      }
  };

  useEffect(function(){
    search();
  },[])
  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityinput' value={text} onChange={handlecity} onKeyDown={handlekeydown}placeholder='Search City'></input>
          <div className='search-icon' onClick={()=>search()}>
            <img src={searchIcon} id="search" alt="search-icon" />
          </div>
        </div>
      
        <div className='loading'>
          <p>{loading===true? "loading...": ""}</p>
        </div>
        {error && <div className='error-message'>{error}</div>}
        {citynotfound && <div className='citynotfound'>City Not Found</div>}
        
        
        {!citynotfound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} wind={wind} humidity={humidity}/>}
       <p className='footer'>
          Designed by Neha
        </p>
      </div>
    </>
  )

}
export default App
