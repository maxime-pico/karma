const { GraphQLServer } = require('graphql-yoga');

// 2
const resolvers = {
	Query: {
		karma: () => 3,
	},
};

// 3
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
