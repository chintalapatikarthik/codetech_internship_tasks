import './Forecast.css';

function Forecast({ forecast }) {
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p className="forecast-day">{getDayName(day.dt_txt)}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
            <p className="forecast-desc">{day.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
