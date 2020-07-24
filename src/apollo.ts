import {setContext} from "@apollo/client/link/context";
import {store} from "./store";
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import { setToken } from "./reducers/auth";

const authLink = setContext((_, {headers}) => {
  const token = store.getState().auth.token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const errorLink = onError(({response, graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) => {
        if (message === "Invalid token") {
          store.dispatch(setToken(""));
          return null;
        }
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
        return null;
      },
    );

  if (networkError)
    console.log(`[Network error]: ${networkError}`);
  if (response)
    response.errors = [];
});


export const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache()
});
