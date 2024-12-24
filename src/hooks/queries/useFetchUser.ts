import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../../supabaseConfig'
import { TUser } from '@/types/user'
import { useUserStore } from '@/stores/userStore'

export const useFetchUser = () => {
  const { setUser } = useUserStore()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['fetchUser'],
    queryFn: async () => {
      try {
        // Supabase에서 세션 데이터 가져오기
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('user fetch 에러:', error)
          throw error
        }

        const session = data?.session
        const user = session?.user
        const userMetadata = user?.user_metadata

        // 사용자 정보가 없으면 null 반환
        if (!userMetadata) {
          return null
        }

        const fetchedUser: TUser = {
          email: userMetadata.email,
          nickname: userMetadata.nickname,
          profilePicturePath: userMetadata.profile_picture_path
        }

        // 전역 상태에 사용자 정보 저장
        setUser(fetchedUser)

        return fetchedUser
      } catch (error) {
        console.error('user fetch 에러:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 데이터를 5분 동안 fresh 상태로 유지
    gcTime: 30 * 60 * 1000 // 캐시된 데이터를 30분 동안 유지
  })

  return { data, isLoading, isError }
}
