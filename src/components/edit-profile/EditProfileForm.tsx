import * as S from './EditProfileForm.styles'
import { useRef, useState, useCallback, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  editProfileSchema,
  TEditProfileFormValues
} from '@/schemas/user/editProfileSchema'
import { useCheckDuplicate } from '@/hooks/useCheckDuplicate'
import { useEditProfile } from '@/hooks/mutations/useEditProfile'
import { useDeactivateAccount } from '@/hooks/mutations/usedeactivateAccount'
import { useUserStore } from '@/stores/userStore'
import { Button } from '@/components'
import { DEFAULT_PROFILE_PATH } from '@/constants/user'

export const EditProfileForm = () => {
  const { user } = useUserStore()
  const { editProfile, isPending: isEditProfilePending } = useEditProfile()
  const { deactivateAccount, isPending: isDeactivateAccountPending } =
    useDeactivateAccount()

  // 사집 업로드
  const imgRef = useRef<HTMLInputElement>(null)
  const [imgPreview, setImgPreview] = useState<string>(
    user?.profilePicturePath ?? DEFAULT_PROFILE_PATH
  )

  // 중복 확인 해야하는 필드 valid 여부
  const [validNickname, setValidNickname] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields },
    setValue,
    setError,
    clearErrors,
    getValues,
    trigger,
    reset,
    watch // 디버깅용
  } = useForm<TEditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profilePicturePath: user?.profilePicturePath
    }
  })

  // 이미지 변경 반영
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImgPreview(reader.result as string)
        setValue('profilePicturePath', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 닉네임 중복 체크
  const { checkDuplicate: checkNickname } = useCheckDuplicate()

  const checkDuplicateNickname = useCallback(async () => {
    const currNickname = getValues('nickname') // 중복 확인 버튼 클릭시점에 가져온 값
    if (!currNickname || currNickname === user?.nickname) {
      return setError('nickname', { message: '현재 닉네임과 동일합니다' })
    }

    const result = await checkNickname('nickname', currNickname)

    if (result.data) {
      setError('nickname', {
        message: '이미 사용 중인 닉네임입니다'
      })
      setValidNickname(false)
    } else {
      setValidNickname(true)
    }
  }, [setError, user?.nickname])

  // 폼 제출 핸들러
  const onSubmit: SubmitHandler<TEditProfileFormValues> = async formData => {
    const mergedData = {
      ...user,
      ...formData
    }

    // 병합된 데이터를 서버로 전송
    await editProfile(mergedData)
  }

  // 변경 사항 유무 추적
  const formData = watch()
  const isFormChanged = useMemo(() => {
    const defaultValues = {
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profilePicturePath: user?.profilePicturePath
    }

    return (
      formData.nickname !== defaultValues.nickname ||
      (formData.password ?? '') !== defaultValues.password ||
      (formData.confirmPassword ?? '') !== defaultValues.confirmPassword ||
      formData.profilePicturePath !== defaultValues.profilePicturePath
    )
  }, [formData, user])

  // 변경 사항 되돌리기
  const handleCancel = () => {
    reset({
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profilePicturePath: user?.profilePicturePath
    })
    if (imgRef.current) imgRef.current.value = ''
    setImgPreview(user?.profilePicturePath ?? '')
  }

  // 계정 해지
  const handleDeactiveAccount = () => {
    toast.dismiss() // 이미 존재하는 토스트 모두 제거

    toast(
      <S.ToastDAContainer>
        <p>⚠️ 정말 계정을 해지하시겠습니까?</p>
        <S.ToastDABtnContainer>
          <S.ToastDACancleBtn
            type="button"
            color="gray"
            size="small"
            padding="var(--space-xsmall) var(--space-small)"
            onClick={() => toast.dismiss()}>
            취소
          </S.ToastDACancleBtn>
          <S.ToastDAAcceptBtn
            type="button"
            color="pink"
            size="small"
            padding="var(--space-xsmall) var(--space-small)"
            onClick={async () => {
              toast.dismiss()
              toast.promise(
                deactivateAccount(),
                {
                  loading: '해지 중...',
                  success: '계정이 성공적으로 해지되었습니다.',
                  error: '계정 해지 중 오류가 발생했습니다.'
                },
                {
                  id: 'deactivate-process',
                  duration: 3000, // success, error 표시
                  position: 'top-center'
                }
              )
            }}>
            해지
          </S.ToastDAAcceptBtn>
        </S.ToastDABtnContainer>
      </S.ToastDAContainer>,
      {
        position: 'top-center',
        duration: Infinity,
        id: 'deactivate-account', // 토스트 중복 방지를 위한 id
        style: {
          background: 'var(--color-pale-gray)'
        }
      }
    )
  }

  // 디버깅용
  console.log('current edit profile form', {
    errors: errors,
    data: watch(),
    validNickname: validNickname,
    isFormChanged
  })

  return (
    <S.EditProfileFormContainer>
      <S.EditProfileFormTitle>프로필 수정</S.EditProfileFormTitle>
      <S.EditProfileForm onSubmit={handleSubmit(onSubmit)}>
        <S.ProfileImg
          src={imgPreview ?? user?.profilePicturePath}
          alt="profileImg"
          onError={e => {
            e.currentTarget.src = DEFAULT_PROFILE_PATH // 폴백 이미지
          }}
        />
        <S.PictureInput
          type="file"
          id="profilePicturePath"
          {...register('profilePicturePath')}
          ref={imgRef}
          onChange={handleImageChange}
        />
        {touchedFields.profilePicturePath && errors.profilePicturePath && (
          <S.ErrorMessage>{errors.profilePicturePath?.message}</S.ErrorMessage>
        )}
        <S.FormField>
          <Button
            type="button"
            color="transparent"
            padding="var(--space-xsmall) var(--space-small)"
            onClick={() => imgRef.current?.click()}>
            이미지 변경
          </Button>
        </S.FormField>
        <S.FormField>
          <S.InputwithDuplicateBtn>
            <S.FormInput
              type="text"
              id="nickname"
              {...register('nickname', {
                onChange: () => setValidNickname(false)
              })}
              placeholder="닉네임을 입력해주세요"
              error={touchedFields.nickname && !!errors.nickname}
            />
            <Button
              type="button"
              color="transparent"
              disabled={!getValues('nickname')}
              onClick={checkDuplicateNickname}>
              중복 확인
            </Button>
          </S.InputwithDuplicateBtn>
          {touchedFields.nickname && errors.nickname && (
            <S.ErrorMessage>{errors.nickname?.message}</S.ErrorMessage>
          )}
          {validNickname && (
            <S.SuccessMessage>사용 가능한 닉네임입니다</S.SuccessMessage>
          )}
        </S.FormField>
        <S.FormField>
          <S.FormInput
            type="password"
            id="password"
            {...register('password', {
              onChange: e => {
                const value = e.target.value
                if (!value) {
                  setValue('password', undefined, { shouldValidate: false })
                  setValue('confirmPassword', undefined, {
                    shouldValidate: false
                  })
                  clearErrors(['password', 'confirmPassword'])
                } else {
                  trigger(['password', 'confirmPassword'])
                }
              }
            })}
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

        <S.FormButtonContainer>
          {isFormChanged && (
            <S.CancleButton
              type="button"
              color="gray"
              onClick={handleCancel}>
              변경 되돌리기
            </S.CancleButton>
          )}
          <S.SubmitButton
            color="pink"
            disabled={
              !isFormChanged ||
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              isEditProfilePending
            }>
            {isEditProfilePending ? '저장 중...' : '변경 저장'}
          </S.SubmitButton>
        </S.FormButtonContainer>

        <S.DeactivateAccountButton
          type="button"
          color="gray"
          padding="var(--space-xsmall) var(--space-large)"
          onClick={handleDeactiveAccount}>
          {isDeactivateAccountPending ? '해지 중...' : '계정 해지'}
        </S.DeactivateAccountButton>
      </S.EditProfileForm>
    </S.EditProfileFormContainer>
  )
}
