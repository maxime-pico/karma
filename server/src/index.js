const { ApolloServer } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const prisma = new PrismaClient({
	errorFormat: 'minimal',
})

const resolvers = {
	Query,
	Mutation,
	AuthPayload,
}
console.log(path.join(__dirname, 'schema.graphql'))
// Starts the connection with the graphql server at specified endpoint with
// the secret
const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
	resolvers,
	context: ({ req }) => {
		return {
			...req,
			prisma,
		}
	},
})

const port = Number.parseInt(process.env.PORT) || 4000

server
	.listen(port)
	.then(({ url }) => console.log(`Server is running on ${url}`))
