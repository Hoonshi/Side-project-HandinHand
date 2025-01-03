import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../../supabaseConfig'
import { useErrorHandler } from '@/hooks/useErrorHandler'
import { getURL } from '@/utils/getURL'

export const useGoogleSignIn = () => {
  const handleError = useErrorHandler()

  const { mutateAsync: googleSignIn, isPending } = useMutation({
    mutationFn: async () => {
      // Supabase 구글 로그인
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${getURL()}/auth/callback`,
          // 매번 새롭게 로그인하게
          queryParams: {
            access_type: 'offline', // refresh token을 받아서 사용자가 로그아웃해도 앱은 Google API 에 액세스 가능
            prompt: 'consent' // 매번 동의 화면을 보여줌 (refresh token 강제 재발급)
          }
        }
      })

      if (error) throw error
    },
    onError: error => {
      handleError('구글 로그인', error)
    }
  })

  return { googleSignIn, isPending }
}
