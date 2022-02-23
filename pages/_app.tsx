import type { AppProps } from 'next/app'

import '../styles/global.css'

function DemoApp (props: AppProps): JSX.Element {
  const { Component, pageProps } = props
  return <Component {...pageProps} />
}

export default DemoApp
