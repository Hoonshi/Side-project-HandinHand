import * as S from './SignInForm.styles'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signInSchema, TSignInFormValues } from '@/schemas/user/signInSchema'
import { useSignIn } from '@/hooks/mutations/useSignIn'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isSubmitting, errors, touchedFields },
    setError,
    watch // 디버깅용
  } = useForm<TSignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { signIn, isPending } = useSignIn(setError)

  // 초기 유효성 검사
  useEffect(() => {
    trigger(['email', 'password'])
  }, [trigger])

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<TSignInFormValues> = async formData => {
    await signIn(formData)
  }

  // 디버깅용
  console.log('current sign in form', {
    errors: errors,
    data: watch()
  })

  return (
    <S.SignInFormContainer>
      <S.SignInFormTitle>로그인</S.SignInFormTitle>
      <S.SignInForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormField>
          <S.FormInput
            type="email"
            id="email"
            {...register('email')}
            placeholder="이메일 (example@email.com)"
            error={touchedFields.email && !!errors.email}
          />
          {touchedFields.email && errors.email && (
            <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>
          )}
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="password"
            id="password"
            {...register('password')}
            placeholder="비밀번호를 입력해주세요 (6자 이상)"
            error={touchedFields.password && !!errors.password}
          />
          {touchedFields.password && errors.password && (
            <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>
          )}
        </S.FormField>

        <S.SubmitButton
          color="pink"
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || isPending
          }>
          {isPending ? '로그인 중...' : '로그인'}
        </S.SubmitButton>

        <S.ToSignUpText href="/signup">
          회원가입이 되어 있지 않으신가요?
        </S.ToSignUpText>
      </S.SignInForm>
    </S.SignInFormContainer>
  )
}
