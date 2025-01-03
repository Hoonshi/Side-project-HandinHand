import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseConfig'
import { useUserStore } from '@/stores/userStore'
import { queryClient } from '../App'

// 프로필 쿼리 함수
const fetchUserProfile = async (userId: string) => {
  const { data } = await supabase
    .from('users')
    .select('email, nickname, profile_picture_path')
    .eq('user_id', userId)
    .single()
  return data
}

export const useAuthStateChange = () => {
  const navigate = useNavigate()
  const { setUser, clearUser } = useUserStore()

  // 로그아웃 처리 함수
  const handleSignOut = () => {
    clearUser()
    queryClient.clear()
    navigate('/signin')
  }

  useEffect(() => {
    // 초기 세션 체크
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user) return

      const userData = await queryClient.fetchQuery({
        queryKey: ['userProfile', session.user.id],
        queryFn: () => fetchUserProfile(session.user.id)
      })

      if (userData) {
        setUser({
          email: userData.email,
          nickname: userData.nickname || '',
          profilePicturePath: userData.profile_picture_path || ''
        })
      }
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // console.log('Event type:', event)
      // console.log('Session:', session)

      switch (event) {
        case 'SIGNED_IN':
          if (session?.user) {
            if (!session?.user) return
            const userData = await queryClient.fetchQuery({
              queryKey: ['userProfile', session.user.id],
              queryFn: () => fetchUserProfile(session.user.id)
            })

            if (userData) {
              setTimeout(() => {
                setUser({
                  email: userData.email,
                  nickname: userData.nickname || '',
                  profilePicturePath: userData.profile_picture_path || ''
                })
                queryClient.invalidateQueries({ queryKey: ['userProfile'] })
                navigate('/')
              }, 0)
            }
          }
          break

        case 'SIGNED_OUT':
        case 'TOKEN_REFRESHED':
          if (!session) handleSignOut()
          break

        case 'USER_UPDATED':
          if (session?.user) {
            queryClient.invalidateQueries({
              queryKey: ['userProfile', session.user.id] // 프로필 쿼리 무효화
            })
          }
          break
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])
}
