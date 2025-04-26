import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [temp, setTemp] = useState(33);
  const [city, setCity] = useState("coimbatore")
  const [latitude, setLatitude] = useState("11");
  const [longitude, setLongitude] = useState("76.9667")
  const [Humidity, setHumidity] = useState(38);
  const [windSpeed, setWindSpeed] = useState("3.09")
  const [weatherIcon, setWeatherIcon] = useState("04d");
  const [country, setCountry] = useState("IN");
  const [tempcity, setTempcity] = useState("Coimbatore");

  async function getWeather() {

    const api = "2bd410af16c4de90e8a9c1e04d893429";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${tempcity}&appid=${api}`;
    const data = await (await fetch(url)).json();
    console.log(data);
    if (data.cod == 404) alert("City Not Found Try again")
    else {
      setCity(tempcity)
      setTemp((data.main.temp - 273.15).toFixed(2));
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setWeatherIcon(data.weather[0].icon);
      setCountry(data.sys.country);
    }
  }
  function handleClick(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  }
  useEffect(() => {
    getWeather();
  }, [])

  return (
    <>
      <div className='bg-gray-800 h-screen flex justify-center items-center'>
        <div className='bg-white w-94 rounded-lg px-4 py-6 flex justify-center items-center flex-col'>
          <div className='relative w-full'>
            <input type="text" onChange={(e) => setTempcity(e.target.value)} onKeyDown={e => handleClick(e)} className=' border-2 border-solid capitalize border-sky-400 rounded-lg w-full p-4 h-10 focus:border-sky-400  focus:outline-sky-400 ' />
            <img src="search.png" alt="search icon" className='absolute top-3 right-2 w-5 cursor-pointer' onClick={getWeather} />
          </div>
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} alt="Weather icon" className='w-36' />
          <h1 className='text-3xl font-medium font-r '>{temp}°C</h1>
          <h3 className='text-4xl mt-2 text-amber-600 uppercase'>{city}</h3>
          <h4 className='text-lg'>{country}</h4>
          <div className='flex flex-row justify-center gap-10 mt-5'>
            <div className='text-center'>
              <h2 className='font-semibold text-lg'>Latitude</h2>
              <h2 className='font-medium'>{latitude}</h2>
            </div>
            <div className='text-center'>
              <h2 className='font-semibold text-lg'>Logitude</h2>
              <h2 className='font-medium'>{longitude}</h2>
            </div>
          </div>
          <div className='flex justify-between w-full pl-6 pr-2 pt-14'>
            <div className='flex justify-center items-center flex-col'>
              <img src="image.png" alt="Humidity" className='mb-4 w-14 ' />
              <h1 className='font-semibold text-lg'>{Humidity}%</h1>
              <h2 className='font-medium text-md'>Humidity</h2>
            </div>
            <div className='flex justify-center items-center flex-col'>
              <img src="wind.png" alt="WindSpeed" className='mb-4 w-14 ' />
              <h1 className='font-semibold text-lg'>{windSpeed} km/h</h1>
              <h2 className='font-medium text-md'>Wind Speed</h2>
            </div>
          </div>


        </div>


      </div >
    </>
  )
}

export default App
