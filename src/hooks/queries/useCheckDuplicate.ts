import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../../supabaseConfig'
import { useUserStore } from '@/stores/userStore'

export const useCheckDuplicate = (field: string, value: string) => {
  const { user } = useUserStore()

  const { data } = useQuery({
    queryKey: ['checkDuplicate', field, value],
    queryFn: async () => {
      try {
        // 현재 유저의 닉네임은 검사 통과
        if (field === 'nickname' && user?.nickname === value) return false

        // Supabase에서 데이터 가져오기
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq(field, value)

        if (error) {
          console.error(`${field} 중복 체크 에러:`, error)
          throw error
        }

        return (data ?? []).length > 0
      } catch (error) {
        console.error(`${field} 중복 체크 에러:`, error)
        throw error
      }
    },
    enabled: !!field && !!value
  })
  return { isDuplicate: data }
}
