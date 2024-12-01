import { useState } from 'react'
import { fetchWeatherData } from '../services/weatherApi'

export const useWeather = () => {
  const [text, setText] = useState('')
  const [info, setInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = async input => {
    if (!input.trim()) return

    console.log('Iniciando búsqueda para:', input)
    setIsLoading(true)
    setError(null)

    try {
      console.log('Haciendo petición al backend...')
      const data = await fetchWeatherData(input)
      console.log('Respuesta del backend:', data)
      setInfo(data)
    } catch (error) {
      console.error('Error completo:', error)
      setError(error.message)
      setInfo(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords
          const location = `${latitude},${longitude}`
          const data = await fetchWeatherData(location)
          setInfo(data)
        } catch (error) {
          setError(error.message)
          console.log('Error message: ', error)
          setInfo(null)
        } finally {
          setIsLoading(false)
        }
      },
      () => {
        setError('Unable to retrieve your location')
        console.log('Error message: ', error)

        setIsLoading(false)
      }
    )
  }

  return {
    text,
    setText,
    info,
    isLoading,
    error,
    getData,
    getLocationWeather,
  }
}
