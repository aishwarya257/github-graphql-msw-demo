import { ApolloClient, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

const clientProps: {
  uri: string;
  cache: InMemoryCache;
  fetch?: typeof fetch;
} = {
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache()
};

if (process.env.NODE_ENV === "test") {
  clientProps.fetch = fetch;
}
export const client = new ApolloClient(clientProps);
