import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { UseFormSetError } from 'react-hook-form'
import { supabase } from '../../../supabaseConfig'
import { TSignUpFormValues } from '@/schemas/user/signUpSchema'
import { queryClient } from '../../App'

export const useSignUp = (setError: UseFormSetError<TSignUpFormValues>) => {
  const navigate = useNavigate()

  const { mutateAsync: signUp, isPending } = useMutation({
    mutationFn: async (formData: TSignUpFormValues) => {
      try {
        // Supabase 회원가입
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              nickname: formData.nickname
            }
          }
        })

        /* 
        test5@email.com에서
        useSignUp.ts:15 
        POST https://mqzvkxdlkmjprngutete.supabase.co/auth/v1/signup 500 (Internal Server Error)
        useSignUp.ts:40 회원가입 에러: AuthApiError: Database error saving new user
            at async Object.mutationFn (useSignUp.ts:15:33)
        */
        if (error) {
          if (error.status === 500) {
            setError('email', {
              message: '유효한 이메일 형식을 입력해주세요 ~~'
            })
            throw error
          } else {
            throw error // 다른 에러는 ErrorBoundary에 던짐
          }
        }

        return data // 성공시 데이터 반환
      } catch (error) {
        console.error('회원가입 에러:', error)
        throw error
      }
    },
    onSuccess: data => {
      console.log('회원가입 성공:', data)
      queryClient.invalidateQueries({ queryKey: ['fetchUser'] }) // 회원가입 후 사용자 정보를 다시 가져옴
      // 성공 시 홈으로 이동
      navigate('/')
    },
    onError: error => {
      if (error instanceof Error) {
        console.error('회원가입 에러:', error)
      }
    }
  })

  return { signUp, isPending }
}
