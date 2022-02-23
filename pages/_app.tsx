import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/global.css'

const queryClient = new QueryClient()

function DemoApp (props: AppProps): JSX.Element {
  const { Component, pageProps } = props
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default DemoApp
