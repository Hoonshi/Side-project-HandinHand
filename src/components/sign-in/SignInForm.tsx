import * as S from './SignInForm.styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signInSchema, TSignInFormValues } from '@/schemas/user/signInSchema'
import { useSignIn } from '@/hooks/mutations/useSignIn'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
          <S.Input
            type="email"
            id="email"
            {...register('email')}
            placeholder="이메일 (example@email.com)"
            // error={ errors.email }
          />
          {errors.email && (
            <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>
          )}
        </S.FormField>
        <S.FormField>
          <S.Input
            type="password"
            id="password"
            {...register('password')}
            placeholder="비밀번호를 입력해주세요 (6자 이상)"
            // error={ errors.password }
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password?.message}</S.ErrorMessage>
          )}
        </S.FormField>

        <S.SubmitButton
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || isPending
          }>
          {isPending ? '로그인 중...' : '로그인'}
        </S.SubmitButton>
      </S.SignInForm>
    </S.SignInFormContainer>
  )
}
