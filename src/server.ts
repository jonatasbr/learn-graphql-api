import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import CategoryResolver from './modules/category/resolvers/CategoryResolver';

const app = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [CategoryResolver], // add this
  });

  const server = new ApolloServer({ schema });
  await server.listen(4000);

  console.log('Server has started!');
};

app();
