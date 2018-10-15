import express from 'express'
import next from 'next'
import compression from 'compression'

import assetsMiddleware from './assets'
import routes from './routes'
import createGraphQLServer from './api'

const {
  NODE_ENV,
  HOST,
  PORT,
  ASSETS_ROUTE,
  API_ROUTE,
  GRAPHQL_ENDPOINT,
  SUBSCRIPTIONS_ENDPOINT,
  PLAYGROUND_ENDPOINT
} = process.env

const app = express()

app.use(compression())

const nextApp = next({ dev: NODE_ENV !== 'production' })
nextApp.prepare().then(() => {
  console.log(`> Ready on ${HOST}:${PORT}`)
})

app.use(ASSETS_ROUTE, assetsMiddleware)

app.use(
  API_ROUTE,
  createGraphQLServer({
    port: PORT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: SUBSCRIPTIONS_ENDPOINT,
    playground: PLAYGROUND_ENDPOINT
  })
)

app.use(routes.getRequestHandler(nextApp))

export default app
