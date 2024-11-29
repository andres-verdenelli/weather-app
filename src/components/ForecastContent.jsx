/* eslint-disable react/prop-types */
import styled, { keyframes, css } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ForecastContainer = styled.div`
  margin-top: 24px;
  ${css`
    animation: ${fadeIn} 0.5s ease-out;
  `}
`

const ForecastTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
`

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(8px, 2vw, 16px);
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const DayCard = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: clamp(12px, 3vw, 16px);
  text-align: center;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  transition: all 0.2s ease;
  animation: ${slideIn} 0.3s ease-out;
  animation-delay: ${({ $index }) => `${$index * 0.1}s`};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
    border-color: ${({ theme }) => theme.primary}33;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`

const Date = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
  font-size: clamp(0.9rem, 2.5vw, 1rem);
`

const WeatherIcon = styled.img`
  width: clamp(48px, 8vw, 64px);
  height: clamp(48px, 8vw, 64px);
  margin: 8px auto;
  transition: transform 0.2s ease;

  ${DayCard}:hover & {
    transform: scale(1.1);
  }
`

const Temperature = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  font-size: clamp(0.9rem, 2.5vw, 1rem);

  .max {
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }

  .min {
    color: ${({ theme }) => theme.text}aa;
  }
`

const Condition = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export default function ForecastContent({ forecast }) {
  const formatDate = dateStr => {
    try {
      const [year, month, day] = dateStr.split('-').map(Number)
      const date = new globalThis.Date(year, month - 1, day)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateStr
    }
  }

  return (
    <ForecastContainer>
      <ForecastTitle>3-Day Forecast</ForecastTitle>
      <ForecastGrid>
        {forecast.forecastday.map((day, index) => (
          <DayCard
            key={day.date}
            $index={index}
          >
            <Date>{formatDate(day.date)}</Date>
            <WeatherIcon
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              loading='lazy'
            />
            <Temperature>
              <span className='max'>{Math.round(day.day.maxtemp_c)}°</span>
              <span className='min'>{Math.round(day.day.mintemp_c)}°</span>
            </Temperature>
            <Condition>{day.day.condition.text}</Condition>
          </DayCard>
        ))}
      </ForecastGrid>
    </ForecastContainer>
  )
}
