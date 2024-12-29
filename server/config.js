const isDevelopment = process.env.NODE_ENV !== 'production'

const config = {
  // Puerto para desarrollo local
  port: process.env.PORT || 3001,

  // API Key de WeatherAPI
  weatherApiKey: process.env.WEATHER_API_KEY,

  // URL base de WeatherAPI
  weatherApiUrl: 'https://api.weatherapi.com/v1',

  // Configuración de CORS
  corsOptions: {
    origin: true, // Permite cualquier origen en producción
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'X-Api-Version',
    ],
  },
}

module.exports = config
