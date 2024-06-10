import React from "react"
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";


const WeatherDetails=({icon,temp,city,country,lat,lon,wind,humidity})=>{
  return(
  <>
  <div className='image'>
    <img src={icon} id="icon" alt='image'></img>
  </div>
  <div className='temp'>{temp}°C</div>
  <div className='city'>{city}</div>
  <div className='country'>{country}</div>
  <div className='coordinates'>
    <div>
      <span className='lat'>lattitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='lon'>longitude</span>
      <span>{lon}</span>
    </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <img src={humidityIcon} alt='humidity' className='icon'></img>
      <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={windIcon} alt='wind' className='icon'></img>
      <div className='data'>
          <div className='wind-percent'>{wind}km/h</div>
          <div className='text'>Wind speed</div>
      </div>
    </div>


  </div>
 
  </>
  )
}
export default WeatherDetails
