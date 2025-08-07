import React, { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader";
import search from '../assets/search.png';
import location from '../assets/location.png'
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/wind.png'
import pressureIcon from '../assets/pressure.png'
import weatherIcon from '../assets/weather icon.svg'
import notFound from '../assets/not-found.png'
import clear from '../assets/clouds/clear.png'
import cloud from '../assets/clouds/cloud.png'
import brokenCloud from '../assets/clouds/broken-cloud.png'
import haze from '../assets/clouds/haze.png'
import lightRain from '../assets/clouds/light-rain.png'
import overcast from '../assets/clouds/overcast.png'
import thunderStorm from '../assets/clouds/thunder-storm.png'

function Weather() {
  const [city, setCity] = useState("")
  const [lon, setLon] = useState("")
  const [lat, setLat] = useState("")
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
  const [suggestion, setSuggestion] = useState([])

  const [loading, setLoading] = useState(false)
  const [geoLoad, setGeoLoad] = useState(true)
  const [error, setError] = useState(false)
  const [networkError, setNetworkError] = useState(false)

  const API_KEY = "d0c5cdce71ec8d1203cff6fd6c267853"
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${lon}&lon=${lat}&appid=${API_KEY}&units=metric`
  
  const fetchSuggestion = async (value) => {
    const suggestion_API = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=100&appid=${API_KEY}`
    try{
      const response = await fetch(suggestion_API)
      const data = await response.json()

      if(response.ok){
        setSuggestion([...data])
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleClick = (item) => {
    const cityName = `${item.name}, ${item.country}`
    const logitute = item.lon
    const latitude = item.lat
    setCity(cityName)
    setLon(logitute)
    setLat(latitude)
    setSuggestion([])
    fetchWeather()
  }

  const suggestions = suggestion.map((item, index) => (<li key={index} onClick={() => handleClick(item)} className="py-2 px-4 font-bold hover:bg-gray-500 cursor-pointer">{item.name} {item.country}</li>))

  const handleCity = (e) => {
    const value = e.target.value
    setCity(value)
    fetchSuggestion(value)
  }

  const fetchWeather = async () => {
    setLoading(true)
    setError(false)
    setNetworkError(false)
    try{
      const response = await fetch(API_URL)
      const data = await response.json()
      
      if (response.ok){
        setWeather(data)
      }else{
        setError(true)
        setWeather(null)
      }
    }catch(error){
      console.log("Network error: "+ error.message)
      setNetworkError(true)
      setWeather(null)
    }finally{
      setLoading(false)
    }
    setCity("")
  }

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter"){
      fetchWeather()
    }
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

      if(condition.toLowerCase() === "overcast clouds"){
        setIcon(overcast)
      }else if(condition.toLowerCase() === "broken clouds" || condition.toLowerCase() === "few clouds" || condition.toLowerCase() === "scattered clouds"){
        setIcon(brokenCloud)
      }else if(condition.toLowerCase() === "thunderstorm"){
        setIcon(thunderStorm)
      }else if(condition.toLowerCase() === "haze"){
        setIcon(haze)
      }else if(condition.toLowerCase() === "light rain"){
        setIcon(lightRain)
      }else if(condition.toLowerCase() === "cloud"){
        setIcon(cloud)
      }else{
        setIcon(clear)
      }
    }

  }, [weather, condition])

  return(
    <div className="max-w-85  h-100 rounded-2xl mx-auto p-3 backdrop-blur-sm bg-white/5">
      <div className="w-100% flex bg-white/3 justify-between rounded-full py-2 px-5 relative">
        <input type="text" value={city} onChange={(e) => handleCity(e)} onKeyDown={(e) => handleOnKeyDown(e)} placeholder="Search City" className="w-4/5 outline-none text-white"/>
        <button onClick={fetchWeather}><img src={search} alt="" className="w-7 invert cursor-pointer"/></button>
        {
          suggestion.length !== 0 && city.trim() !== "" && (
            <div className="absolute bg-white/80 backdrop-blur-lg top-[100%] w-70 rounded z-1">
            <ul className="flex flex-col ">
              {suggestions}
            </ul>
        </div>
          )
        }
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
        <div className="flex flex-row w-fulljustify-between gap-5">
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
      </div>) : error ? (
        <div className="text-center py-5">
          <img src={notFound} alt="" className="w-30 mx-auto invert" />
          <p className="text-white text-lg font-semibold py-6">City not found. Please try again.</p>
        </div>
      ) : networkError ? (
          <div className="text-center py-5">
            <img src={notFound} alt="" className="w-30 mx-auto invert" />
            <p className="text-white text-lg font-semibold py-6">Network Error. Please check your connection and try again.</p>
        </div>
      ) : (
        <div className="text-center">
          <img src={weatherIcon} alt="weather icon" className="w-50 mx-auto"/>
          <h1 className="text-white text-3xl pb-4 font-bold">Welcome to skycast</h1>
          <p className="text-white">Search for any city to get current weather forecast</p>
        </div>
      )

      }
    </div>
  )
}

export default Weather;
