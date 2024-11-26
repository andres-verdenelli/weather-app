import axios from 'axios'

const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  params: {
    key: import.meta.env.VITE_WEATHER_API,
    aqi: 'no',
  },
})

export const fetchWeatherData = async location => {
  const { data } = await weatherApi.get('/current.json', {
    params: { q: location },
  })
  return data
}
