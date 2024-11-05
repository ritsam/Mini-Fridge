import { Stack } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://chaqabahar.us-east-a.ibm.stepzen.net/api/laughing-mongoose/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey chaqabahar::local.net+1000::3530f1a38f5228920460fa94780ce2e9ac651f3da07a9738ee24e2dda78cdff0',
  },
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default RootLayout;