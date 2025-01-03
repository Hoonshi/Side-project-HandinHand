import { supabase } from '../../supabaseConfig'
import { useUserStore } from '@/stores/userStore'

export const useCheckDuplicate = () => {
  const { user } = useUserStore()

  const checkDuplicate = async (field: string, value: string) => {
    try {
      if (field === 'nickname' && user?.nickname === value)
        return { data: false }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq(field, value)

      if (error) throw error

      return { data: data?.length > 0 }
    } catch (error) {
      throw error
    }
  }

  return { checkDuplicate }
}
