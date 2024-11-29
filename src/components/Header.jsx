import styled, { keyframes, css } from 'styled-components'
import { WiCloud } from 'react-icons/wi'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(16px, 4vw, 20px) 0;
  margin-bottom: clamp(20px, 5vw, 30px);
  border-bottom: 2px solid ${({ theme }) => theme.border};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    opacity: 0.5;
  }
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 10px);

  &:hover svg {
    ${css`
      animation: ${rotate} 2s linear infinite;
    `}
  }
`

const Logo = styled(WiCloud)`
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: ${({ theme }) => theme.primary};
  transition: color 0.3s ease;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin: 0;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px ${({ theme }) => theme.shadow};
`

export default function Header() {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Logo aria-hidden='true' />
        <Title>Weather App</Title>
      </TitleContainer>
    </HeaderContainer>
  )
}
