import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const apiServer =
  process.env.NODE_ENV === 'production'
    ? 'https://api.quickscope.dev'
    : 'http://localhost:8080';

const httpLink: any = createUploadLink({ uri: apiServer });

export const GetApolloClient = (ssrMode: boolean, getToken: any) => {
  const authMiddleware = setContext(async (_, { headers }) => {
    const token = await getToken({ template: 'QuickScope_GQL_Server' });
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  return new ApolloClient({
    ssrMode,
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
}
