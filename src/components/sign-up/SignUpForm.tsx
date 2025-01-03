import * as S from './SignUpForm.styles'
import { useState, useEffect, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signUpSchema, TSignUpFormValues } from '@/schemas/user/signUpSchema'
import { useCheckDuplicate } from '@/hooks/useCheckDuplicate'
import { useSignUp } from '@/hooks/mutations/useSignUp'
import { Button } from '@/components'

export const SignUpForm = () => {
  // 중복 확인 해야하는 필드 valid 여부
  const [validFields, setValidFields] = useState<{
    nickname?: boolean
    email?: boolean
  }>({})

  const {
    register,
    handleSubmit,
    trigger,
    formState: { isSubmitting, errors, touchedFields },
    setError,
    getValues,
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

  const { signUp, isPending } = useSignUp(
    (field: keyof TSignUpFormValues, message: string) => {
      setError(field, { message })
      setValidFields(prev => ({ ...prev, [field]: false }))
    }
  )

  // 초기 유효성 검사
  useEffect(() => {
    trigger(['nickname', 'email', 'password', 'confirmPassword'])
  }, [trigger])

  // 닉네임, 이메일 중복 체크
  const { checkDuplicate } = useCheckDuplicate()

  const checkDuplicateNicknameOrEmail = useCallback(
    async (field: 'nickname' | 'email') => {
      const currNickname = getValues('nickname')
      const currEmail = getValues('email')

      const result = await (field === 'nickname'
        ? checkDuplicate('nickname', currNickname)
        : checkDuplicate('email', currEmail))
      if (result.data) {
        setError(field, {
          message:
            field === 'nickname'
              ? '이미 사용 중인 닉네임입니다'
              : '이미 가입된 이메일입니다'
        })
        setValidFields(prev => ({ ...prev, [field]: false }))
      } else {
        setValidFields(prev => ({ ...prev, [field]: true }))
      }
    },
    [setError]
  )

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
          <S.InputwithDuplicateBtn>
            <S.FormInput
              type="text"
              id="nickname"
              {...register('nickname', {
                onChange: () =>
                  setValidFields(prev => ({ ...prev, nickname: false }))
              })}
              placeholder="닉네임을 입력해주세요"
              error={touchedFields.nickname && !!errors.nickname}
            />
            <Button
              type="button"
              color="transparent"
              size="small"
              disabled={!getValues('nickname')}
              onClick={() => checkDuplicateNicknameOrEmail('nickname')}>
              중복 확인
            </Button>
          </S.InputwithDuplicateBtn>
          {touchedFields.nickname && errors.nickname && (
            <S.ErrorMessage>{errors.nickname?.message}</S.ErrorMessage>
          )}
          {validFields.nickname && (
            <S.SuccessMessage>사용 가능한 닉네임입니다</S.SuccessMessage>
          )}
        </S.FormField>
        <S.FormField>
          <S.InputwithDuplicateBtn>
            <S.FormInput
              type="email"
              id="email"
              {...register('email', {
                onChange: () =>
                  setValidFields(prev => ({ ...prev, email: false }))
              })}
              placeholder="이메일 (example@email.com)"
              error={touchedFields.email && !!errors.email}
            />
            <Button
              type="button"
              color="transparent"
              size="small"
              disabled={!getValues('email')}
              onClick={() => checkDuplicateNicknameOrEmail('email')}>
              중복 확인
            </Button>
          </S.InputwithDuplicateBtn>
          {touchedFields.email && errors.email && (
            <S.ErrorMessage>{errors.email?.message}</S.ErrorMessage>
          )}
          {validFields.email && (
            <S.SuccessMessage>가입 가능한 이메일입니다.</S.SuccessMessage>
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
        <S.FormField>
          <S.FormInput
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="비밀번호를 다시 입력해주세요"
            error={touchedFields.confirmPassword && !!errors.confirmPassword}
          />
          {touchedFields.confirmPassword && errors.confirmPassword && (
            <S.ErrorMessage>{errors.confirmPassword?.message}</S.ErrorMessage>
          )}
        </S.FormField>

        <S.SubmitButton
          color="pink"
          disabled={
            isSubmitting ||
            Object.keys(errors).length > 0 ||
            isPending ||
            !validFields.nickname ||
            !validFields.email
          }>
          {isPending ? '가입 중...' : '가입하기'}
        </S.SubmitButton>
        <S.ToOtherPageText href="/signin">
          회원가입이 되어 있으신가요?
        </S.ToOtherPageText>
      </S.SignUpForm>
    </S.SignUpFormContainer>
  )
}
