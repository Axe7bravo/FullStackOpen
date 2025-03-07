
import { useState, useEffect } from 'react';
import weatherService from '../services/weather';
import './CountryDetails.css';

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState([]); 

  useEffect(() => {
    if (country && country.capital) {
      const fetchWeatherData = async () => {
        const weatherPromises = country.capital.map(async (capital) => {
          try {
            const coordinates = await weatherService.getCoordinates(capital);
            if (coordinates && coordinates.length > 0) {
              const { lat, lon } = coordinates[0];
              const weather = await weatherService.getWeather(lat, lon);
              return { capital, weather };
            } else {
              return { capital, weather: null }; 
            }
          } catch (error) {
            console.error(`Error fetching weather for ${capital}:`, error);
            return { capital, weather: null }; 
          }
        });

        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
      };

      fetchWeatherData();
    }
  }, [country]);

  if (!country) return null;

  return (
    <div className="country-container">
      <h2>{country.name.common}</h2>
      <p>Capital(s): {country.capital.join(' || ')}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} style={{ width: '200px' }} />

      {weatherData.map(({ capital, weather }) => (
        <div key={capital}>
          {weather && (
            <div className="weather-container">
              <h3>Weather in {capital}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Description: {weather.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="Weather icon"
                className="weather-icon"
              />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )}
          {!weather && <p>Weather data not available for {capital}.</p>}
        </div>
      ))}
    </div>
  );
};

export default CountryDetails;