import { create } from 'zustand'
import { TUserState } from '@/types/user'

export const useUserStore = create<TUserState>(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null }))
}))
