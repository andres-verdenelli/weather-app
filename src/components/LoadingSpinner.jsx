import styled from 'styled-components'

const Spinner = styled.div`
  border: 3px solid ${({ theme }) => theme.border};
  border-top: 3px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default function LoadingSpinner() {
  return <Spinner />
}
