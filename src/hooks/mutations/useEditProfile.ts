import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabaseConfig'
import {
  TEditProfileFormValues,
  TEditProfileRequestValues
} from '@/schemas/user/editProfileSchema'
import { queryClient } from '../../App'

export const useEditProfile = () => {
  const navigate = useNavigate()

  const { mutateAsync: editProfile, isPending } = useMutation({
    mutationFn: async (formData: TEditProfileFormValues) => {
      try {
        const updateData: TEditProfileRequestValues = {
          data: {
            nickname: formData.nickname,
            profile_picture_path: formData.profilePicturePath
          }
        }

        // password를 바꿀 때만 요청에 추가
        if (formData.password) updateData.password = formData.password

        // Supabase 프로필 수정
        const { data, error } = await supabase.auth.updateUser(updateData)

        /*
        비번 수정 에러
        current edit profile form 
        {errors: {…}, data: {…}}
        @supabase_supabase-js.js?v=15ee55be:4025 
        PUT https://mqzvkxdlkmjprngutete.supabase.co/auth/v1/user 422 (Unprocessable Content)
        useEditProfile.ts:25 프로필 수정 에러: AuthApiError: New password should be different from the old password.
            at handleError2 (@supabase_supabase-j…s?v=15ee55be:4338:9)
            at async _handleRequest2 (@supabase_supabase-j…s?v=15ee55be:4379:5)
            at async _request (@supabase_supabase-j…?v=15ee55be:4363:16)
            at async @supabase_supabase-j…?v=15ee55be:5674:44
            at async SupabaseAuthClient._useSession (@supabase_supabase-j…?v=15ee55be:5538:14)
            at async SupabaseAuthClient._updateUser (@supabase_supabase-j…?v=15ee55be:5659:14)
            at async @supabase_supabase-j…?v=15ee55be:5654:14
        mutationFn	@	useEditProfile.ts:25
        await in execute		
        onSubmit	@	EditProfileForm.tsx:71
        */
        if (error) {
          console.error('프로필 수정 에러:', error)
          throw error // ErrorBoundary로 에러 던짐
        }

        return data // 성공시 데이터 반환
      } catch (error) {
        console.error('프로필 수정 에러:', error)
        throw error
      }
    },
    onSuccess: data => {
      console.log('프로필 수정 성공:', data)
      queryClient.invalidateQueries({ queryKey: ['fetchUser'] }) // 프로필 수정 후 사용자 정보를 다시 가져옴
      navigate(-1) // 성공시 이전 페이지로 이동
    },
    onError: error => {
      if (error instanceof Error) {
        console.error('프로필 수정 에러:', error)
      }
    }
  })

  return { editProfile, isPending }
}
