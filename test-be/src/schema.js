import { makeExecutableSchema } from "graphql-tools";
import types from './types'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
    typeDefs:types,
    resolvers
})

export default schema