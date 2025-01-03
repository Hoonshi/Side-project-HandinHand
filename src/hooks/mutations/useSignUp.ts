import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../../supabaseConfig'
import { TSignUpFormValues } from '@/schemas/user/signUpSchema'
import { DEFAULT_PROFILE_PATH } from '@/constants/user'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { isApiError } from '@/utils/isApiError'

export const useSignUp = (
  onError: (field: keyof TSignUpFormValues, message: string) => void
) => {
  const handleError = useErrorHandler()

  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: async ({ email, password, nickname }: TSignUpFormValues) => {
      // Supabase 회원가입
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
            profile_picture_path: DEFAULT_PROFILE_PATH
          }
        }
      })

      if (error) throw error // onError에서 처리

      return data // 성공시 데이터 반환
    },
    onError: error => {
      if (isApiError(error) && error.status >= 400 && error.status < 500) {
        // 400번재 에러는 폼에 에러 메시지 표시
        onError('email', '이메일을 다시 확인해주세요')
        return
      }
      handleError('회원가입', error)
    }
  })

  return { signUp, isPending }
}
