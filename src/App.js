import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {

  // console.log(process.env.REACT_APP_WEATHER_KEY);
  const apiKey = process.env.REACT_APP_WEATHER_KEY

  const [data, setData] = useState ({})
  const [location, setLocation] = useState ('');
  
  // Including units=imperial convert metric system to imperial
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      //we instal axios (npm i axios) in order to be able to use it here.
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }


  return (
    <div className="app">

      <div className='search'>
        <input 
        value = {location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        type='text'
        placeholder='Enter Location'
        />
      </div>

      <div className='container'>
          <div className='top'>
              <div className='location'>
                <p>{data.name}</p>
              </div>
              <div className='temp'>
                {/* Adding .toFixed() converts to whole number and not decimal*/}
                {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              </div>
              <div className='description'>
                {data.main ? <p>{data.weather[0].main}</p> : null}
              </div>
          </div>

          {data.name != undefined && 
              <div className='bottom'>
                <div className='feels'>
                  {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                  <p>Feels Like</p>
                </div>
                <div className='humidity'>
                  {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className='wind'>
                  {data.wind  ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                  <p>Wind Speed</p>
                </div>
              </div>
          }

          
      </div>
    </div>
  );
}

export default App;
