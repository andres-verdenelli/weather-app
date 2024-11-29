const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173', // URL de desarrollo
      'https://weather-app-mu-blush-55.vercel.app', // URL de producción
    ],
    methods: ['GET'], // Solo permitir peticiones GET
    credentials: true,
  })
)
app.use(express.json())

// Ruta para el pronóstico del tiempo
app.get('/api/weather', async (req, res) => {
  console.log('Request received:', req.query)
  const { location } = req.query

  try {
    console.log(
      'Making request to WeatherAPI with key:',
      process.env.WEATHER_API_KEY ? 'Present' : 'Missing'
    )
    const response = await axios.get(
      'https://api.weatherapi.com/v1/forecast.json',
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: location,
          days: 3,
          aqi: 'no',
        },
      }
    )
    console.log('WeatherAPI response received')
    res.json(response.data)
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message)
    res.status(500).json({
      error:
        error.response?.data?.error?.message ||
        'Error al obtener datos del clima',
    })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
