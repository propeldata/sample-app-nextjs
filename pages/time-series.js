
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request'
import { ClientCredentials } from 'simple-oauth2'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import Box from '@mui/material/Box'

import { Layout } from '../components'
import { buildTimeSeriesChartConfig } from '../utils'

export async function getServerSideProps(context) {
  /**
   * Set the config for the OAuth2 client
   */
  const config = {
    client: {
      id: process.env.CLIENT_ID_SAMPLE_APP,
      secret: process.env.CLIENT_SECRET_SAMPLE_APP
    },
    auth: {
      tokenHost: process.env.TOKEN_HOST,
      tokenPath: process.env.TOKEN_PATH
    }
  }

  /**
   * Create the OAuth2 client
   */
  const oauth2Client = new ClientCredentials(config)
  const tokenParams = {
      scope: '<scope>',
  }

  /**
   * Get a token using the client credentials
   */
  const accessToken = await oauth2Client.getToken()

  return {
    props: {
      accessToken: accessToken.token.access_token
    }
  }
}

/**
 * Set the query
 */
const QUERY = gql`
  query caseQuery ($id: ID!) {
    metric (id: $id) {
      timeSeries (input: {
        timeRange: {
          relative: LAST_5_YEARS
        }
        granularity: YEAR
      }) {
        labels
        values
      }
    }
  }
`

/**
 * Create a graphql client
 */
 const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_US_EAST_2)

export default function TimeSeries({ accessToken }) {
  const [options, setOptions] = React.useState()

  React.useEffect(() => {
    if (accessToken) {
      client.setHeader('authorization', 'Bearer ' + accessToken)
    }
  }, [accessToken])

  React.useEffect(() => {
    async function fetchData () {
      try {
        const { metric } = await client.request(QUERY, {
          /**
           * Your Metric ID
           */
          id: 'MET01FWKYS9ZH4HAZZ74P02AWSFX7'
        })

        setOptions(buildTimeSeriesChartConfig(metric.timeSeries))
      } catch (error) {}
    }

    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Propel Sample Time Series</title>
        <link rel='icon' href="/favicon.ico" />
      </Head>
      <Layout
        appLink={(
          <Link href="/">
            &larr; back to home
          </Link>
        )}
      >
        <h1>
          Metric Time Series
        </h1>

        <p>
          California COVID cases
        </p>

        {!options
          ? <p>Loading...</p>
          : (
          <div className="chart-container">
            <ReactECharts option={options} />
            <style jsx>{`
              .chart-container {
                display: flex;
                flex-direction: column;
                align-items: center;

                margin-top: 40px;
              }
            `}</style>
          </div>
        )}
      </Layout>
    </>
  )
}
