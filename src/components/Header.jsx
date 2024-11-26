import styled from 'styled-components'
import { WiMoonAltWaxingCrescent4, WiDaySunny, WiCloud } from 'react-icons/wi'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 2px solid ${({ theme }) => theme.border};
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Logo = styled(WiCloud)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 20px;
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 24px;
`

export default function Header({ isDark, onThemeToggle }) {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Logo />
        <Title>Weather App</Title>
      </TitleContainer>
      <ThemeToggle onClick={onThemeToggle}>
        {isDark ? <WiMoonAltWaxingCrescent4 /> : <WiDaySunny />}
      </ThemeToggle>
    </HeaderContainer>
  )
}
