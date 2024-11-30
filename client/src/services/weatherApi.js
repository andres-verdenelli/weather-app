import axios from 'axios'

const BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api'

const weatherApi = axios.create({
  baseURL: BASE_URL,
})

export const fetchWeatherData = async location => {
  console.log('API URL:', BASE_URL)
  console.log('Requesting weather for location:', location)
  try {
    const { data } = await weatherApi.get('/weather', {
      params: { location },
    })
    return data
  } catch (error) {
    console.error('API Error:', error.response || error)
    throw error
  }
}
