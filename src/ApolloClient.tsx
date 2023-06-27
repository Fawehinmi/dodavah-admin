import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/link-error";
import { ApolloLink } from "apollo-link";
import { environment } from "./environment";

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from session
  const session: any = await getSession();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,

      authorization: `Bearer ${session?.token}`,
    },
  };
});

const uploadLink = createUploadLink({
  uri: environment.Uri.Graphql,
  fetchOptions: {
    credentials: "include",
  },
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      console.log("entered grapppppp");
      for (let err of graphQLErrors as any) {
        switch (err.extensions.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case "UNAUTHENTICATED":
            // Modify the operation context with a new token
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                // authorization: getNewToken(),
              },
            });
            // Retry the request, returning the new observable
            return forward(operation);
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }
);

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: ApolloLink.from([
    errorLink,
    authLink.concat(uploadLink as any),
  ] as any) as any,
  cache: new InMemoryCache() as any, //.restore({}),
});

export default client;
