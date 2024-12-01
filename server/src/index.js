const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

// Middleware
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

// Ruta simplificada para prueba de conexión
app.get('/api/weather', async (req, res) => {
  console.log('Request received at /api/weather')
  console.log('Query params:', req.query)

  // Respuesta de prueba
  res.json({
    success: true,
    message: 'Conexión exitosa con el backend',
    receivedLocation: req.query.location,
  })
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
