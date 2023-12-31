import { GetApolloClient } from "@/apollo-client";
import { gql } from "@apollo/client";
import { auth } from "@clerk/nextjs";

const GET_TEAMS = gql`
  query GetTeams {
    getTeams {
      slug
    }
  }
`;

export default async function Page() {
  const { getToken } = auth()
  const apolloClient = GetApolloClient(true, getToken);
  let teams: any[] = [];
  const { data } = await apolloClient.query({ query: GET_TEAMS });
  teams = data.getTeams;
  return {
    props: { redirect: `/dashboard/${teams[0].slug}` }
  }
};


