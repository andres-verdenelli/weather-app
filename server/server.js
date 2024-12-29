const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const config = require('./config')

const app = express()

// Middleware
app.use(cors(config.corsOptions))
app.use(express.json())

// Health check endpoint para Vercel
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' })
})

// Endpoint para obtener el clima por ciudad
app.get('/api/weather', async (req, res) => {
  try {
    const { location } = req.query

    if (!location) {
      return res.status(400).json({ error: 'Se requiere una ubicación' })
    }

    console.log('Config:', {
      apiKey: config.weatherApiKey ? 'Presente' : 'No presente',
      apiUrl: config.weatherApiUrl,
      environment: process.env.NODE_ENV,
    })

    if (!config.weatherApiKey) {
      return res.status(500).json({
        error: 'Error de configuración',
        message: 'No se ha configurado la API key del servicio de clima',
      })
    }

    console.log(`Buscando clima para: ${location}`)

    // Obtener tanto el clima actual como el pronóstico
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(`${config.weatherApiUrl}/current.json`, {
        params: {
          key: config.weatherApiKey,
          q: location,
          lang: 'es',
        },
      }),
      axios.get(`${config.weatherApiUrl}/forecast.json`, {
        params: {
          key: config.weatherApiKey,
          q: location,
          days: 3,
          lang: 'es',
        },
      }),
    ])

    const weatherData = {
      location: {
        name: currentResponse.data.location.name,
        region: currentResponse.data.location.region,
        country: currentResponse.data.location.country,
        localtime: currentResponse.data.location.localtime,
      },
      current: {
        temp_c: currentResponse.data.current.temp_c,
        condition: currentResponse.data.current.condition,
        humidity: currentResponse.data.current.humidity,
        wind_kph: currentResponse.data.current.wind_kph,
        feelslike_c: currentResponse.data.current.feelslike_c,
      },
      forecast: forecastResponse.data.forecast,
    }

    console.log('Datos del clima obtenidos:', weatherData)
    res.json(weatherData)
  } catch (error) {
    console.error(
      'Error al obtener el clima:',
      error.response?.data || error.message
    )
    res.status(error.response?.status || 500).json({
      error: 'Error al obtener datos del clima',
      details: error.response?.data || error.message,
    })
  }
})

// Endpoint para obtener el pronóstico de varios días
app.get('/api/forecast', async (req, res) => {
  try {
    const { city, days = 3 } = req.query

    if (!city) {
      return res
        .status(400)
        .json({ error: 'Se requiere el nombre de la ciudad' })
    }

    if (!config.weatherApiKey) {
      return res.status(500).json({
        error: 'Error de configuración',
        message: 'No se ha configurado la API key del servicio de clima',
      })
    }

    console.log(`Buscando pronóstico para: ${city}, días: ${days}`)

    const response = await axios.get(`${config.weatherApiUrl}/forecast.json`, {
      params: {
        key: config.weatherApiKey,
        q: city,
        days: days,
        lang: 'es',
      },
    })

    const forecastData = {
      location: response.data.location,
      current: response.data.current,
      forecast: response.data.forecast.forecastday.map(day => ({
        date: day.date,
        max_temp_c: day.day.maxtemp_c,
        min_temp_c: day.day.mintemp_c,
        condition: day.day.condition,
        daily_chance_of_rain: day.day.daily_chance_of_rain,
      })),
    }

    console.log('Pronóstico obtenido')
    res.json(forecastData)
  } catch (error) {
    console.error(
      'Error al obtener el pronóstico:',
      error.response?.data || error.message
    )
    res.status(error.response?.status || 500).json({
      error: 'Error al obtener el pronóstico',
      details: error.response?.data || error.message,
    })
  }
})

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`
    🚀 Servidor iniciado
    📍 Puerto: ${config.port}
    🌍 Entorno: ${process.env.NODE_ENV || 'development'}
    ⚡ URL: http://localhost:${config.port}
  `)
})
