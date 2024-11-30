import axios from 'axios'

const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3001/api'
    : 'https://weather-app-mu-blush-55.vercel.app/api'

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
