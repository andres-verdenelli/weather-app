import styled from 'styled-components'

const StyledError = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 12px;
  margin: 20px 0;
  text-align: center;
`

export default function ErrorMessage({ children }) {
  return <StyledError>{children}</StyledError>
}
