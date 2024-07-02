import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
	type Query {
		users: [String!]!
	}

	type Mutation {
		createUser(name: String!): String!
	}
`;

const users: string[] = [];

const resolvers = {
	Query: {
		users: () => {
			return users
		}
	},

	Mutation: {
		createUser: (parent, args, ctx) => {
      users.push(args.name);

      return args.name
    }
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);