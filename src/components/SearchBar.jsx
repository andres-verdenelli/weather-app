/* eslint-disable react/prop-types */
import styled, { keyframes, css } from 'styled-components'
import { FaLocationCrosshairs } from 'react-icons/fa6'

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  flex: 1;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text}aa;
  }

  @media (max-width: 480px) {
    width: 100%;
    font-size: 1.1rem;
    padding: 14px 16px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    width: 100%;
    gap: 12px;
  }
`

const BaseButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }

  @media (max-width: 480px) {
    flex: 1;
    padding: 16px 24px;
    font-size: 1.1rem;
  }
`

const Button = styled(BaseButton)`
  background-color: ${({ theme }) => theme.primary};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      animation: ${pulse} 1.5s ease-in-out infinite;
    `}
`

const LocationButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primary}11;
  }

  svg {
    font-size: 1.2em;

    @media (max-width: 480px) {
      font-size: 1.4em;
    }
  }
`

export default function SearchBar({
  value,
  onChange,
  onSearch,
  isLoading,
  onLocationRequest,
}) {
  return (
    <SearchContainer>
      <Input
        type='text'
        placeholder='Enter city or location...'
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !isLoading) {
            onSearch(value)
          }
        }}
        aria-label='Search location'
        disabled={isLoading}
      />
      <ButtonGroup>
        <LocationButton
          onClick={onLocationRequest}
          disabled={isLoading}
          aria-label='Use current location'
          title='Use current location'
        >
          <FaLocationCrosshairs />
        </LocationButton>
        <Button
          onClick={() => onSearch(value)}
          disabled={isLoading}
          $isLoading={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </ButtonGroup>
    </SearchContainer>
  )
}
