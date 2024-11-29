import axios from 'axios'

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const fetchWeatherData = async location => {
  const { data } = await weatherApi.get('/weather', {
    params: { location },
  })
  return data
}
