import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './styles/theme'
import { useWeather } from './hooks/useWeather'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import WeatherContent from './components/WeatherContent'
import ErrorMessage from './components/ErrorMessage'
import useThemePreference from './hooks/useThemePreference'
import { GlobalStyles } from './styles/globalStyles'

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 15px;
  }
`

export default function App() {
  const { isDark } = useThemePreference()
  const { text, setText, info, isLoading, error, getData, getLocationWeather } =
    useWeather()

  console.log('Environment:', {
    apiUrl: import.meta.env.VITE_API_URL,
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
  })

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Container>
        <Header />
        <SearchBar
          value={text}
          onChange={setText}
          onSearch={getData}
          onLocationRequest={getLocationWeather}
          isLoading={isLoading}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {isLoading && <LoadingSpinner />}
        {!isLoading && info && <WeatherContent info={info} />}
      </Container>
    </ThemeProvider>
  )
}
