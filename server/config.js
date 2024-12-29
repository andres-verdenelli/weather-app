const isDevelopment = process.env.NODE_ENV !== 'production'

const config = {
  // Puerto para desarrollo local
  port: process.env.PORT || 3001,

  // API Key de WeatherAPI
  weatherApiKey: process.env.WEATHER_API_KEY,

  // URL base de WeatherAPI
  weatherApiUrl: 'http://api.weatherapi.com/v1',

  // Configuración de CORS
  corsOptions: {
    origin: isDevelopment
      ? 'http://localhost:5173' // URL del frontend en desarrollo
      : ['https://weather-app-mu-blush-55.vercel.app', /\.vercel\.app$/], // URLs permitidas en producción
    methods: ['GET', 'POST'],
    credentials: true,
  },
}

module.exports = config
