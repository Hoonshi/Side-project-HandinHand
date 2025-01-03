import { Suspense, useState } from 'react'
import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
  QueryErrorResetBoundary
} from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import toast, { Toaster } from 'react-hot-toast'
import { DeferredLoader, ErrorFallback } from '@/components'
import Router from './routes/router'
import GlobalStyle from '@/styles/GlobalStyle'
import '@/styles/fonts.css'
import '@/styles/designToken.css'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // 백그라운드 리페치 에러는 토스트로 표시
    onError: (error, query) => {
      if (query.state.data !== undefined) {
        toast.error(`에러가 발생했습니다: ${error.message}`)
      }
    }
  })
})

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false) //ReactQueryDevtoolsPanel 열고 닫기

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            padding: 'var(--space-medium)',
            background: 'var(--color-white)',
            color: 'var(--color-text-dark)'
          }
        }}
      />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={ErrorFallback}>
            <Suspense fallback={<DeferredLoader />}>
              <Router />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }>{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
      {isOpen && (
        <ReactQueryDevtoolsPanel
          style={{ height: '200px' }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </QueryClientProvider>
  )
}

export default App
