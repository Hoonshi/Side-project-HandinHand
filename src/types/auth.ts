export interface TAuthErrorState {
  errorMessage: string | null
  setAuthError: (message: string | null) => void
}
