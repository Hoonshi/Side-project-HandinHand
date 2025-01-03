import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../../supabaseConfig'
import {
  TEditProfileFormValues,
  TEditProfileRequestValues
} from '@/schemas/user/editProfileSchema'
import { useErrorHandler } from '@/hooks/useErrorHandler'

export const useEditProfile = () => {
  const handleError = useErrorHandler()

  const { mutateAsync: editProfile, isPending } = useMutation({
    mutationFn: async ({
      nickname,
      password,
      profilePicturePath
    }: TEditProfileFormValues) => {
      const updateData: TEditProfileRequestValues = {
        data: {
          nickname,
          profile_picture_path: profilePicturePath
        }
      }

      // password를 바꿀 때만 요청에 추가
      if (password) updateData.password = password

      // Supabase 프로필 수정
      const { error } = await supabase.auth.updateUser(updateData)

      if (error) throw error
    },
    onError: error => handleError('프로필 수정', error)
  })

  return { editProfile, isPending }
}
