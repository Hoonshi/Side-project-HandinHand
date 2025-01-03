import styled from 'styled-components'

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: var(--space-large);
  align-items: center;
  text-align: center;
`

export const ErrorText = styled.h1`
  color: var(--color-text-gray);
  font-weight: 700;
`

export const ErrorDetailText = styled.p`
  font-size: var(--font-large);
  word-break: keep-all;
`
