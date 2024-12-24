export interface TUser {
  userId?: string
  nickname: string
  email: string
  profilePicturePath: string
}

export interface TUserState {
  user: TUser | null
  setUser: (user: TUser) => void
  clearUser: () => void
}
