import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader";
import search from '../assets/search.png';
import clearSky from '../assets/clear.png'
import clouds from '../assets/clouds.png'
import haze from '../assets/haze.png'
import overcast from '../assets/overcast-cloud.png'
import broken from '../assets/broken-clouds.png'
import location from '../assets/location.png'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'
import pressureIcon from '../assets/pressure.png'

function Weather() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [name, setName] = useState("")
  const [tempMin, setTempMin] = useState("")
  const [tempMax, setTempMax] = useState("")
  const [humidity, setHumidity] = useState("")
  const [pressure, setPressure] = useState("")
  const [country, setCountry] = useState("")
  const [feelsLike, setFeelsLike] = useState("")
  const [wind, setWind] = useState("")
  const [condition, setCondition] = useState("")
  const [icon, setIcon] = useState("")

  const [loading, setLoading] = useState(false)

  const API_KEY = "d0c5cdce71ec8d1203cff6fd6c267853"
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

  const handleCity = (e) => {
    setCity(e.target.value)
  }

  const fetchWeather = async () => {
    setLoading(true)
    try{
      const response = await fetch(API_URL)
      const data = await response.json()
      
      if (response.ok){
        setWeather(data)
      }else{
        alert(data.message)
      }
    }catch(error){
      alert("Network error: "+ error.message)
    }finally{
      setLoading(false)
    }
    setCity("")
  }

  useEffect(() => { 
    if(weather){ 
      setName(weather.name)
      setCountry(weather.sys.country)
      setTempMin(`${(weather.main.temp_min).toFixed()}°C`)
      setTempMax(`${(weather.main.temp_max).toFixed()}°C`)
      setHumidity(`${weather.main.humidity}%`)
      setPressure(`${weather.main.pressure}hPa`)
      setFeelsLike(`${(weather.main.feels_like).toFixed()}°C`)
      setWind(`${weather.wind.speed}Km/h`)
      setCondition(weather.weather[0].description)
    }
    
    if(condition.toLowerCase() === "clear sky"){
      setIcon(clearSky)
    }else if(condition.toLowerCase() === "broken clouds"){
      setIcon(broken)
    }else if(condition.toLowerCase() === "overcast clouds"){
      setIcon(overcast)
    }else if(condition.toLowerCase() === "haze"){
      setIcon(haze)
    }else{
      setIcon(clouds)
    } 
  }, [weather, condition])

  return(
    <div className="max-w-90  h-100 rounded-2xl mx-auto p-3 backdrop-blur-sm bg-white/5">
      <div className="w-100% flex bg-white/3 justify-between rounded-full py-2 px-5">
        <input type="text" value={city} onChange={(e) => handleCity(e)} placeholder="Search City" className="w-4/5 outline-none text-white"/>
        <button onClick={fetchWeather}><img src={search} alt="" className="w-7 invert cursor-pointer"/></button>
      </div>
      {loading ? (<SkeletonLoader />) : weather ? (
      <div className="px-3">
        <div className="py-5 text-xl g-2 w-80">
          <div className="flex align-center gap-2">
            <img src={location} alt="" className="w-6 h-6 invert brightness"/>
            <p className="text-white">{name} {country}</p>
          </div>
        </div>
        <div className="flex w-100% justify-between items-center pb-5 ">
          <img src={icon} alt="Weather Icon" className="w-20 m-0" />
          <div className="flex-row">
            <p className="text-white text-5xl font-bold">{feelsLike}</p>
            <p className="text-white">{condition}</p>
            <p className="text-white">High: {tempMax} &nbsp; Low: {tempMin}</p>
          </div>
        </div>
        <div className="flex w-full justify-between gap-5">
          <div className="grow basis-5 flex-col text-center bg-white/10 rounded-xl p-1 gap-5">
            <img src={humidityIcon} alt="" className=" invert w-10 h-10 mx-auto mb-2" />
            <p className="text-[12px] text-white font-bold">{humidity}</p>
          </div>
          <div className="grow basis-5 flex-col text-center bg-white/10 rounded-xl p-1 gap-5">
            <img src={pressureIcon} alt="" className=" invert w-10 h-10 mx-auto mb-2" />
            <p className="text-[12px] text-white font-bold">{pressure}</p>
          </div>
          <div className="grow basis-5 flex-col text-center bg-white/10 rounded-xl p-1 gap-5">
            <img src={windIcon} alt="" className="w-10 invert  h-10 mx-auto mb-2" />
            <p className="text-[12px] text-white font-bold">{wind}</p>
          </div>
        </div>
      </div>) : 
      (
        <div className="text-center">
          <img src="/public/weather icon.svg" alt="weather icon" className="w-50 mx-auto"/>
          <h1 className="text-white text-3xl pb-4 font-bold">Welcome to skycast</h1>
          <p className="text-white">Search for any city to get current weather forecast</p>
        </div>
      )
      }
    </div>
  )
}

export default Weather;
