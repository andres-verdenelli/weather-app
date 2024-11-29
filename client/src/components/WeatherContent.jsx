/* eslint-disable react/prop-types */
import styled, { useTheme, css } from 'styled-components'
import { IoLocationSharp } from 'react-icons/io5'
import { BsClockFill } from 'react-icons/bs'
import {
  WiThermometer,
  WiStrongWind,
  WiHumidity,
  WiCloudy,
  WiThermometerExterior,
  WiDayCloudyGusts,
} from 'react-icons/wi'
import ForecastContent from './ForecastContent'

// Constantes de estilo
const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
}

const TRANSITIONS = {
  default: 'all 0.3s ease-in-out',
}

const cardStyles = css`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  transition: ${TRANSITIONS.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}33;
  }
`

const WeatherCard = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: clamp(16px, 4vw, 24px);
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
  animation: fadeIn 0.3s ease-in;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.border};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  h2 {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    margin: 0;
    line-height: 1.3;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    text-align: center;
    justify-content: center;
  }
`

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: clamp(16px, 3vw, 20px);
  ${cardStyles}

  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
    gap: 16px;
  }
`

const Temperature = styled.div`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: ${TRANSITIONS.default};

  svg {
    color: ${({ theme }) => theme.primary};
  }
`

const Condition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  img {
    width: clamp(48px, 8vw, 64px);
    height: clamp(48px, 8vw, 64px);
    transition: ${TRANSITIONS.default};
  }

  span {
    font-size: clamp(0.9rem, 2vw, 1rem);
    text-align: center;
  }
`

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(clamp(120px, 25vw, 140px), 1fr)
  );
  gap: clamp(12px, 2vw, 16px);
  margin-top: 20px;
`

const WeatherItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: clamp(10px, 2vw, 12px);
  ${cardStyles}

  svg {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    color: ${({ theme }) => theme.primary};
  }

  .label {
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    color: ${({ theme }) => theme.text}aa;
  }

  .value {
    font-size: clamp(1rem, 2vw, 1.1rem);
    font-weight: 500;
  }
`

export default function WeatherContent({ info }) {
  const theme = useTheme()

  return (
    <WeatherCard>
      <LocationHeader>
        <IoLocationSharp
          size={24}
          style={{ color: theme.primary }}
        />
        <h2>
          {info.location.name}, {info.location.region}, {info.location.country}
        </h2>
      </LocationHeader>

      <MainInfo>
        <Temperature>
          <WiThermometer />
          {info.current.temp_c}°C
        </Temperature>

        <Condition>
          <img
            src={info.current.condition.icon}
            alt={info.current.condition.text}
          />
          <span>{info.current.condition.text}</span>
        </Condition>
      </MainInfo>

      <WeatherGrid>
        <WeatherItem>
          <BsClockFill />
          <div>
            <div className='label'>Local Time</div>
            <div className='value'>{info.location.localtime.split(' ')[1]}</div>
          </div>
        </WeatherItem>

        <WeatherItem>
          <WiThermometerExterior />
          <div>
            <div className='label'>Feels Like</div>
            <div className='value'>{info.current.feelslike_c}°C</div>
          </div>
        </WeatherItem>

        <WeatherItem>
          <WiStrongWind />
          <div>
            <div className='label'>Wind Speed</div>
            <div className='value'>{info.current.wind_kph} km/h</div>
          </div>
        </WeatherItem>

        <WeatherItem>
          <WiHumidity />
          <div>
            <div className='label'>Humidity</div>
            <div className='value'>{info.current.humidity}%</div>
          </div>
        </WeatherItem>

        <WeatherItem>
          <WiCloudy />
          <div>
            <div className='label'>Cloud Cover</div>
            <div className='value'>{info.current.cloud}%</div>
          </div>
        </WeatherItem>

        <WeatherItem>
          <WiDayCloudyGusts />
          <div>
            <div className='label'>UV Index</div>
            <div className='value'>{info.current.uv}</div>
          </div>
        </WeatherItem>
      </WeatherGrid>

      <ForecastContent forecast={info.forecast} />
    </WeatherCard>
  )
}
