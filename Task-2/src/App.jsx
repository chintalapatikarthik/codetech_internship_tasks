import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherRes.ok) {
        throw new Error('City not found. Please try again.');
      }
      
      const weatherData = await weatherRes.json();
      setWeather(weatherData);
      
      // Fetch 5-day forecast
      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json();
        // Get one forecast per day (at noon)
        const dailyForecast = forecastData.list.filter(item => 
          item.dt_txt.includes('12:00:00')
        ).slice(0, 5);
        setForecast(dailyForecast);
      }
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>🌤️ Weather App</h1>
          <p>Check the weather anywhere in the world</p>
        </header>
        
        <SearchBar onSearch={fetchWeather} loading={loading} />
        
        {error && <div className="error">{error}</div>}
        
        {loading && <div className="loading">Loading weather data...</div>}
        
        {weather && !loading && (
          <>
            <WeatherCard weather={weather} />
            {forecast && <Forecast forecast={forecast} />}
          </>
        )}
        
        {!weather && !loading && !error && (
          <div className="placeholder">
            <p>🔍 Enter a city name to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
