import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../../supabaseConfig'
import { useUserStore } from '@/stores/userStore'

export const useSignOut = () => {
  const { clearUser } = useUserStore()

  const { mutateAsync: signOut, isPending } = useMutation({
    mutationFn: async () => {
      try {
        // Supabase 로그아웃
        const { error } = await supabase.auth.signOut()

        if (error) {
          console.error('로그아웃 에러:', error)
          throw error
        }

        // 전역 상태에서 사용자 정보 제거
        clearUser()
      } catch (error) {
        console.error('로그아웃 에러:', error)
        throw error
      }
    },
    onError: error => {
      if (error instanceof Error) {
        console.error('로그아웃 에러:', error)
      }
    }
  })

  return { signOut, isPending }
}
