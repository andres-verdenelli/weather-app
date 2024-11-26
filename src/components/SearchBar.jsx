/* eslint-disable react/prop-types */
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  flex: 1;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`

const LocationButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.primary};
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
          if (e.key === 'Enter') {
            onSearch(value)
          }
        }}
      />
      <LocationButton
        onClick={onLocationRequest}
        disabled={isLoading}
      >
        📍
      </LocationButton>
      <Button
        onClick={() => onSearch(value)}
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </SearchContainer>
  )
}
