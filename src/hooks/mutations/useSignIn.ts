import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { UseFormSetError } from 'react-hook-form'
import { supabase } from '../../../supabaseConfig'
import { TSignInFormValues } from '@/schemas/user/signInSchema'
import { queryClient } from '../../App'

export const useSignIn = (setError: UseFormSetError<TSignInFormValues>) => {
  const navigate = useNavigate()

  const { mutateAsync: signIn, isPending } = useMutation({
    mutationFn: async (formData: TSignInFormValues) => {
      // Supabase 로그인
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) {
        if (error.status === 500) {
          setError('email', {
            message: '이메일과 비밀번호를 다시 확인해주세요 ~~'
          })
          throw error
        } else {
          throw error // 다른 에러는 ErrorBoundary에 던짐
        }
      }

      return data // 성공시 데이터 반환
    },

    onSuccess: data => {
      console.log('로그인 성공:', data)
      queryClient.invalidateQueries({ queryKey: ['fetchUser'] }) // 로그인 후 사용자 정보를 다시 가져옴
      // 성공 시 홈으로 이동
      navigate('/')
    },
    onError: error => {
      if (error instanceof Error) {
        console.error('로그인 에러:', error)
      }
    }
  })

  return { signIn, isPending }
}
