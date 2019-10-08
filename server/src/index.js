require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
	Query,
	Mutation,
	AuthPayload,
}

// Starts the connection with the graphql server at specified endpoint with
// the secret
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false,
	},
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: `src/generated/${process.env.PRISMA_SCHEMA_FILENAME}.graphql`,
			endpoint: process.env.DATABASE_ENDPOINT,
			secret: "development-secret",
			debug: true,
		}),
	}),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
