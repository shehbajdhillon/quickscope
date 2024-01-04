import { GetTeamSlugsQuery } from "@/__generatedGqlTypes__/graphql";
import { GetApolloClient } from "@/apollo-client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { GET_TEAM_SLUGS } from "./gql";

export default async function Page() {
  const { getToken } = auth();
  const apolloClient = GetApolloClient(true, getToken);
  const { data } = await apolloClient.query<GetTeamSlugsQuery>({
    query: GET_TEAM_SLUGS,
    context: { fetchOptions: { next: { revalidate: 5 } } }
  });
  const teams = data.teams;
  redirect(`/dashboard/${teams[0].teamSlug}` )
};


