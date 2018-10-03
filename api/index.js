import { GraphQLServer } from 'graphql-yoga'
import mocks from './mocks'

const { MOCKS } = process.env

const typeDefs = 'api/schema.graphql'

const resolvers = {
  Query: {
    feed: () => [],
    tournaments: () => []
  }
}

export default function createGraphQLServer(options = {}) {
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    mocks: MOCKS && mocks
  })

  server.createHttpServer(options)

  return server.express
}
