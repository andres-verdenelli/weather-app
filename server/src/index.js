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
      'http://localhost:5173',
      'https://weather-app-mu-blush-55.vercel.app',
    ],
    methods: ['GET'],
    credentials: true,
  })
)
app.use(express.json())

// Ruta para el pronóstico del tiempo
app.get('/api/weather', async (req, res) => {
  console.log('Request received at /api/weather')
  console.log('Environment:', process.env.NODE_ENV)
  console.log('API Key:', process.env.WEATHER_API_KEY ? 'Present' : 'Missing')

  const { location } = req.query

  try {
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
    console.log('Weather API response successful')
    res.json(response.data)
  } catch (error) {
    console.error('Error full details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
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
