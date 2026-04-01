# Task-2: Weather Application

A responsive web application that fetches and displays weather data using the **OpenWeatherMap API**.

## Features

- 🔍 Search weather by city name
- 🌡️ Current weather conditions (temperature, humidity, wind, pressure)
- 📅 5-day weather forecast
- 📱 Fully responsive design
- 🎨 Modern, beautiful UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Installation

1. Navigate to the Task-2 directory:
   ```bash
   cd Task-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

### Getting an API Key

1. Go to https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to "API Keys" in your account
4. Copy your API key and add it to the `.env` file

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Styling with flexbox, grid, and gradients

## Project Structure

```
Task-2/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # City search input
│   │   ├── WeatherCard.jsx    # Current weather display
│   │   └── Forecast.jsx       # 5-day forecast
│   ├── App.jsx                # Main app component
│   └── main.jsx
├── .env                       # API key (create this)
└── package.json
```
