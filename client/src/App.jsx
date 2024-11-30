// Comentamos temporalmente las importaciones que no usaremos
// import { useState, useEffect } from 'react'
// import { getWeatherData } from './services/weatherApi'
// import WeatherCard from './components/WeatherCard'
// import SearchBox from './components/SearchBox'
// import './App.css'

function App() {
  // Comentamos todo el estado y efectos
  // const [weather, setWeather] = useState(null)
  // const [city, setCity] = useState('')
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   // ... código comentado
  // }, [city])

  // const handleSearch = async (searchCity) => {
  //   // ... código comentado
  // }

  return (
    <div className='App'>
      <h1>Mi Aplicación del Clima</h1>
      <p>Esta es una versión simplificada para pruebas de despliegue</p>
      {/* Comentamos temporalmente los componentes
      <SearchBox onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      */}
    </div>
  )
}

export default App
