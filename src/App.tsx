import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { DeferredLoader, ErrorFallback } from '@/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './routes/router'

export const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <GlobalStyles /> */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<DeferredLoader />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
