import styled from 'styled-components'
import { Button, Input } from '@/components'

export const FormContainer = styled.section`
  width: 100%;
  max-width: 400px;
  text-align: center;
`

export const FormTitle = styled.h1`
  font-size: var(--font-large);
  font-weight: 700;
  margin-bottom: var(--space-large);
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-large);
`

export const FormField = styled.div`
  position: relative;
  width: 100%;
`

export const InputwithDuplicateBtn = styled.div`
  display: flex;
  gap: var(--space-small);
  width: 100%;
`

export const FormInput = styled(Input)`
  width: 100%;
`

export const BaseMessage = styled.p`
  position: absolute;
  top: 100%;
  left: var(--space-xsmall);
  margin-top: var(--space-xsmall);
`

export const ErrorMessage = styled(BaseMessage)`
  color: var(--color-text-warning);
`

export const SuccessMessage = styled(BaseMessage)`
  color: var(--color-text-gray);
`

export const SubmitButton = styled(Button)`
  width: 100%;
`

export const ToOtherPageText = styled.a`
  margin-top: var(--space-medium);
  display: block;
  color: var(--color-text-gray);
  text-decoration: underline;
  transition: color 0.3s;

  &:hover {
    color: var(--color-white);
  }
`
