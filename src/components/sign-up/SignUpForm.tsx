import * as S from './SignUpForm.styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signUpSchema, TSignUpFormValues } from '@/schemas/user/signUpSchema'
import { useCheckDuplicate } from '@/hooks/queries/useCheckDuplicate'
import { useSignUp } from '@/hooks/mutations/useSignUp'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    watch // 디버깅용
  } = useForm<TSignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { signUp, isPending } = useSignUp(setError)

  // 닉네임, 이메일 중복 체크
  const { isDuplicate: isDuplicateNickname } = useCheckDuplicate(
    'nickname',
    watch('nickname')
  )
  const { isDuplicate: isDuplicateEmail } = useCheckDuplicate(
    'email',
    watch('email')
  )

  const checkDuplicateNicknameOrEmail = (field: 'nickname' | 'email') => {
    if (field === 'nickname' && isDuplicateNickname) {
      setError('nickname', { message: '이미 사용 중인 닉네임입니다' })
    } else if (field === 'email' && isDuplicateEmail) {
      setError('email', { message: '이미 가입된 이메일입니다' })
    }
  }

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<TSignUpFormValues> = async formData => {
    await signUp(formData)
  }

  // 디버깅용
  console.log('current sign up form', {
    errors: errors,
    data: watch()
  })

  return (
    <S.SignUpFormContainer>
      <S.SignUpFormTitle>회원가입</S.SignUpFormTitle>
      <S.SignUpForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormField>
          <S.Input
            type="nickname"
            id="nickname"
            {...register('nickname')}
            placeholder="닉네임"
            // error={ errors.nickname }
            onBlur={() => checkDuplicateNicknameOrEmail('nickname')} // 닉네임 중복 체크
          />
          {errors.nickname && (
            <S.ErrorMessage>{errors.nickname?.message}</S.ErrorMessage>
          )}
        </S.FormField>
        <S.FormField>
          <S.Input
            type="email"
            id="email"
            {...register('email')}
            placeholder="이메일 (example@email.com)"
            // error={ errors.email }
            onBlur={() => checkDuplicateNicknameOrEmail('email')} // 이메일 중복 체크
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
        <S.FormField>
          <S.Input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="비밀번호를 다시 입력해주세요"
            // error={ errors.confirmPassword }
          />
          {errors.confirmPassword && (
            <S.ErrorMessage>{errors.confirmPassword?.message}</S.ErrorMessage>
          )}
        </S.FormField>

        <S.SubmitButton
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || isPending
          }>
          {isPending ? '가입 중...' : '가입하기'}
        </S.SubmitButton>
      </S.SignUpForm>
    </S.SignUpFormContainer>
  )
}
