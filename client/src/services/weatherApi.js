import axios from 'axios'

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const fetchWeatherData = async location => {
  console.log('API URL:', import.meta.env.VITE_API_URL)
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
