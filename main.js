import express from 'express'
import next from 'next'
import compression from 'compression'

import assetsMiddleware from './assets'
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

const server = express()

server.use(compression())

const app = next({ dev: NODE_ENV !== 'production' })

app.prepare().then(() => {
  console.log(`> Ready on ${HOST}:${PORT}`)
})

server.use(ASSETS_ROUTE, assetsMiddleware)

server.use(
  API_ROUTE,
  createGraphQLServer({
    port: PORT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: SUBSCRIPTIONS_ENDPOINT,
    playground: PLAYGROUND_ENDPOINT
  })
)

server.get('/tournaments/:slug/:path?', (req, res) => {
  app.render(req, res, `/tournaments/tournament`, {
    slug: req.params.slug,
    path: req.params.path
  })
})

server.get('*', (req, res) => {
  return app.getRequestHandler()(req, res)
})

export default server
