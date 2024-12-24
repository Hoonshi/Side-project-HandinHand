import * as S from './Error.styles'
import { useErrorBoundary } from 'react-error-boundary'
// import { Button } from '@/components';

export function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary()

  return (
    <S.ErrorContainer>
      <S.ErrorText>에러가 발생했습니다</S.ErrorText>
      <S.ErrorDetailText>{error.message}</S.ErrorDetailText>
      <button onClick={resetBoundary}>다시 시도</button>
    </S.ErrorContainer>
  )
}
