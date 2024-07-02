import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { randomUUID } from 'node:crypto';

const typeDefs = `#graphql
  type User {
    id: String!
    name: String!
  }
	type Query {
		users: [User!]!
	}

	type Mutation {
		createUser(name: String!): User!
	}
`;

interface User {
  id: string,
  name: string
}

const users: User[] = [];

const resolvers = {
	Query: {
		users: () => {
			return users
		}
	},

	Mutation: {
		createUser: (_, args) => {
      const user = {
        id: randomUUID(),
        name: args.name
      };

      users.push(user);

      return user
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