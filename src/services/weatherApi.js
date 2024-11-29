import axios from 'axios'

const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  params: {
    key: import.meta.env.VITE_WEATHER_API,
    aqi: 'no',
    days: 3,
  },
})

export const fetchWeatherData = async location => {
  const { data } = await weatherApi.get('/forecast.json', {
    params: { q: location },
  })
  return data
}
