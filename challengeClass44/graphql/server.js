import { ApolloServer } from '@apollo/server'
import { resolvers } from './resolvers/index.js'
import { typeDefs } from './typeDefs/index.js'

export const server = new ApolloServer({ resolvers, typeDefs })