import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API;
const baseUrl = 'https://api.openweathermap.org';

const getCoordinates = (city) => {

    const request = axios.get(
      `${baseUrl}/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    return request.then((response) => response.data);
  };
  
  const getWeather = (lat, lon) => {
    const request = axios.get(
      `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`
    );
    return request.then((response) => response.data);
  };
  
  export default { getCoordinates, getWeather };