import * as S from './EditProfileForm.styles'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  editProfileSchema,
  TEditProfileFormValues
} from '@/schemas/user/editProfileSchema'
import { useCheckDuplicate } from '@/hooks/queries/useCheckDuplicate'
import { useEditProfile } from '@/hooks/mutations/useEditProfile'
import { useUserStore } from '@/stores/userStore'

export const EditProfileForm = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const { editProfile, isPending } = useEditProfile()

  // 사집 업로드
  const imgRef = useRef<HTMLInputElement>(null)
  const [imgPreview, setImgPreview] = useState<string>(
    user?.profilePicturePath ?? ''
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    setError,
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

  // 닉네임, 이메일 중복 체크
  const { isDuplicate: isDuplicateNickname } = useCheckDuplicate(
    'nickname',
    watch('nickname') ?? ''
  )

  const checkDuplicateNickname = () => {
    if (isDuplicateNickname)
      setError('nickname', { message: '이미 사용 중인 닉네임입니다' })
  }

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
  const isFormChanged =
    JSON.stringify(formData) !==
    JSON.stringify({
      nickname: user?.nickname,
      password: '',
      confirmPassword: '',
      profilePicturePath: user?.profilePicturePath
    })

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

  // 디버깅용
  console.log('current edit profile form', {
    errors: errors,
    data: watch()
  })

  return (
    <>
      <S.BackIcon onClick={() => navigate(-1)} />
      <S.EditProfileFormContainer>
        <S.EditProfileFormTitle>프로필 수정</S.EditProfileFormTitle>
        <S.EditProfileForm onSubmit={handleSubmit(onSubmit)}>
          <S.ProfileImg
            src={imgPreview ?? user?.profilePicturePath}
            alt="profileImg"
          />
          <S.PictureInput
            type="file"
            id="profilePicturePath"
            {...register('profilePicturePath')}
            // error={ errors.profilePicturePath }
            ref={imgRef}
            onChange={handleImageChange}
          />
          {errors.profilePicturePath && (
            <S.ErrorMessage>
              {errors.profilePicturePath?.message}
            </S.ErrorMessage>
          )}
          <S.FormField>
            <S.ChangeImageButton
              type="button"
              onClick={() => imgRef.current?.click()}>
              이미지 변경
            </S.ChangeImageButton>
          </S.FormField>
          <S.FormField>
            <S.Input
              type="nickname"
              id="nickname"
              {...register('nickname')}
              placeholder="닉네임을 입력해주세요"
              // error={ errors.nickname }
              onBlur={() => checkDuplicateNickname()} // 닉네임 중복 체크
            />
            {errors.nickname && (
              <S.ErrorMessage>{errors.nickname?.message}</S.ErrorMessage>
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

          <S.ButtonContainer>
            {isFormChanged && (
              <S.CancleButton
                type="button"
                onClick={handleCancel}>
                변경 되돌리기
              </S.CancleButton>
            )}
            <S.SubmitButton
              disabled={
                isSubmitting || Object.keys(errors).length > 0 || isPending
              }>
              {isPending ? '저장 중...' : '변경 저장'}
            </S.SubmitButton>
          </S.ButtonContainer>
        </S.EditProfileForm>
      </S.EditProfileFormContainer>
    </>
  )
}
