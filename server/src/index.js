const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

// Configuración de WeatherAPI
const WEATHER_API_KEY = process.env.WEATHER_API_KEY
const WEATHER_API_URL = 'http://api.weatherapi.com/v1'

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://weather-app-mu-blush-55.vercel.app',
            'https://weather-app-mu-blush-55.vercel.app/',
          ]
        : 'http://localhost:5173',
    methods: ['GET'],
    credentials: true,
  })
)
app.use(express.json())

// Ruta para obtener datos del clima
app.get('/api/weather', async (req, res) => {
  try {
    console.log('Request received at /api/weather')
    console.log('Query params:', req.query)

    const { location } = req.query
    if (!location) {
      return res.status(400).json({
        error: 'Location parameter is required',
      })
    }

    // Hacer la solicitud a WeatherAPI
    const response = await axios.get(`${WEATHER_API_URL}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: location,
        days: 3, // Obtener pronóstico para 3 días
        aqi: 'no', // No incluir datos de calidad del aire para simplificar
      },
    })

    // Enviar la respuesta al cliente
    res.json(response.data)
  } catch (error) {
    console.error(
      'Error fetching weather data:',
      error.response?.data || error.message
    )
    res.status(error.response?.status || 500).json({
      error:
        error.response?.data?.error?.message || 'Error fetching weather data',
    })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
