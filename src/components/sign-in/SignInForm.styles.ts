import styled from 'styled-components'
import {
  FormContainer,
  FormTitle,
  Form,
  FormField,
  FormInput,
  ErrorMessage,
  SubmitButton,
  ToOtherPageText
} from '../common-ui/styles/Form.styles'
import { Button } from '@/components'
import { FcGoogle } from 'react-icons/fc'

export const SignInFormContainer = FormContainer

export const SignInFormTitle = FormTitle

export const SignInForm = Form

export { FormField, FormInput, ErrorMessage, SubmitButton, ToOtherPageText }

export const OtherSignInText = styled.div`
  align-self: flex-start;
  margin-top: var(--space-large);
  width: 100%;
  text-align: left;
  padding-bottom: var(--space-small);
  border-bottom: 1px solid var(--color-white);
`

export const GoogleSignInBtn = styled(Button)`
  width: 100%;
  background-color: var(--color-white);
  color: var(--color-black);
  position: relative;

  &:hover {
    background-color: var(--color-white);
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.12);
      pointer-events: none;
    }
  }
`

export const GoogleBtnTextWrapper = styled.div`
  display: flex;
  gap: var(--space-medium);
  align-items: center;
  justify-content: center;
`

export const GoogleIcon = styled(FcGoogle)``
