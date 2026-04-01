import './WeatherCard.css';

function WeatherCard({ weather }) {
  const { name, sys, main, weather: weatherInfo, wind } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo[0].icon}@4x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{name}, {sys.country}</h2>
          <p className="date">{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
        <img src={iconUrl} alt={weatherInfo[0].description} className="weather-icon" />
      </div>
      
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{Math.round(main.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="description">{weatherInfo[0].description}</p>
      </div>
      
      <div className="weather-details">
        <div className="detail">
          <span className="detail-icon">🌡️</span>
          <div>
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{Math.round(main.feels_like)}°C</p>
          </div>
        </div>
        <div className="detail">
          <span className="detail-icon">💧</span>
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{main.humidity}%</p>
          </div>
        </div>
        <div className="detail">
          <span className="detail-icon">💨</span>
          <div>
            <p className="detail-label">Wind</p>
            <p className="detail-value">{Math.round(wind.speed * 3.6)} km/h</p>
          </div>
        </div>
        <div className="detail">
          <span className="detail-icon">📊</span>
          <div>
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
