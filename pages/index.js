import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { GraphQLClient, gql } from 'graphql-request'
import { ClientCredentials } from 'simple-oauth2'
import ReactECharts from 'echarts-for-react'

import { Card, Tag, Layout } from '../components'
import { buildTimeSeriesChartConfig } from '../utils'
import Skeleton from '../components/Skeleton'

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

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 40px;

  margin-top: 20px;
`

const CardGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`

const ControlArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  > span {
    cursor: pointer;
  }
`


export default function Home({ accessToken }) {
  const [options, setOptions] = React.useState()
  const [actives, setActives] = React.useState([
    'cases',
    'deaths',
    'positive',
    'total'
  ])

  const { data, isLoading } = useQuery(
    'metrics',
    () => client.request(QUERY, {
      id: 'MET01FWKYS9ZH4HAZZ74P02AWSFX7'
    }, {
      'authorization': 'Bearer ' + accessToken
    }),
    {
      enabled: !!accessToken,
      refetchInterval: 3000
    }
  ) 

  React.useEffect(() => {
    if (data) {
      setOptions(buildTimeSeriesChartConfig(data.metric.timeSeries))
    }
  }, [data])

  const isActive = (title) => {
    return actives.includes(title)
  }

  const handleActivesFor = (title) => {
    isActive(title) 
     ? setActives(actives.filter(active => active !== title))
     : setActives([
       ...actives,
       title
     ])
  }

  return (
    <>
      <Head>
        <title>Propel Sample App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <ControlArea>
          <Tag color={isActive('cases') ? 'info' : 'default'} onClick={handleActivesFor.bind(null, 'cases')}>Covid cases</Tag>
          <Tag color={isActive('deaths') ? 'info' : 'default'} onClick={handleActivesFor.bind(null, 'deaths')}>Deaths</Tag>
          <Tag color={isActive('positive') ? 'info' : 'default'} onClick={handleActivesFor.bind(null, 'positive')}>Positive tests</Tag>
          <Tag color={isActive('total') ? 'info' : 'default'} onClick={handleActivesFor.bind(null, 'total')}>Total tests</Tag>
        </ControlArea>
        
          {isLoading && (
            <CardGrid>
              <Skeleton width={500} height={300} />
              <Skeleton width={500} height={300} />
              <Skeleton width={500} height={300} />
              <Skeleton width={500} height={300} />
            </CardGrid>
          )}

          {!isLoading && (
            <CardGrid>
              {isActive('cases') && (
                <Card title="Covid cases">
                  {!!options && <ReactECharts option={options} />}
                </Card>
              )}
              {isActive('deaths') && (
                <Card title="Deaths">
                  {!!options && <ReactECharts option={options} />}
                </Card>
              )}
              {isActive('positive') && (
                <Card title="Positive tests">
                  {!!options && <ReactECharts option={options} />}
                </Card>
              )}
              {isActive('total') && (
                <Card title="Total tests">
                  {!!options && <ReactECharts option={options} />}
                </Card>
              )}
            </CardGrid>  
          )}
      </Main>
    </>
  )
}
