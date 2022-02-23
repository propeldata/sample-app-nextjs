import Head from 'next/head'
import Link from 'next/link'

import { Layout } from '../components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Propel Sample App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container">
          test
        </div>
        <style jsx>{`
          .container {
            display: flex;
          }
        `}</style>
      </main>
    </>
  )
}
