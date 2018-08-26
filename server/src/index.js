const { GraphQLServer } = require('graphql-yoga')

// 1
const typeDefs = `
type Query {
  karma: Int!
}
`

// 2
const resolvers = {
  Query: {
    karma: () => 3
  }
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))