/* eslint-disable react/prop-types */
import styled from 'styled-components'
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

const WeatherCard = styled.div`
  background-color: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
  animation: fadeIn 0.3s ease-in;

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

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }
`

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background: ${({ theme }) => theme.body};
  border-radius: 12px;
`

const Temperature = styled.div`
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`

const Condition = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  img {
    width: 64px;
    height: 64px;
  }
`

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 20px;
`

const WeatherItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.body};
  border-radius: 8px;

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.primary};
  }

  .label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text}aa;
  }

  .value {
    font-size: 1.1rem;
    font-weight: 500;
  }
`

export default function WeatherContent({ info }) {
  return (
    <WeatherCard>
      <LocationHeader>
        <IoLocationSharp
          size={24}
          color={({ theme }) => theme.primary}
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
    </WeatherCard>
  )
}
