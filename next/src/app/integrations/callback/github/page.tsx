import { css } from "@/styled-system/css";
import { Stack, VStack } from "@/styled-system/jsx";
import { GetTeamSlugsQuery, LinkGitHubAccountMutation } from "@/__generatedGqlTypes__/graphql";
import { auth } from "@clerk/nextjs";
import { GetApolloClient } from "@/apollo-client";
import { gql } from "@apollo/client";
import { GET_TEAM_SLUGS } from "@/app/dashboard/gql";
import { ConfirmationBox } from "./components";

export const dynamic = "force-dynamic";

const LINK_GITHUB_ACCOUNT = gql`
  mutation LinkGitHubAccount($teamSlug: String!, $installationId: Int64!) {
    addGithubInstallationId(teamSlug: $teamSlug, installationId: $installationId) {
      accountName
    }
  }
`;

type Props = {
  searchParams?: {
    installation_id?: string;
  };
};

export default async function GitHubCallbackPage(params: Props) {

  const installationId = params.searchParams?.installation_id;

  if (installationId === undefined) return <div />;

  const { getToken } = auth();
  const apolloClient = GetApolloClient(true, getToken);
  const { data } = await apolloClient.query<GetTeamSlugsQuery>({
    query: GET_TEAM_SLUGS,
    context: { fetchOptions: { next: { revalidate: 5 } } }
  });
  const teams = data.teams;

  // For now users have only one team so we know which team to link the github account to
  // When users are able to create multiple teams,
  // we'll assign the github account to the last accessed team

  const { data: integrationInfo } = await apolloClient.mutate<LinkGitHubAccountMutation>({
    mutation: LINK_GITHUB_ACCOUNT,
    variables: { teamSlug: teams[0].teamSlug, installationId: parseInt(installationId!) },
  });

  const accountName = integrationInfo?.addGithubInstallationId.accountName;

  return (
    <Stack gap={"20px"} justifyContent={"center"}>
      <Stack gap="-20px">
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>GitHub Integration</h1>
        <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
          Connect your GitHub acccount to QuickScope.
        </p>
      </Stack>
      <VStack>
        <Stack direction={"column"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap="30px"
            w="full"
          >
            <Stack maxWidth={{ md: "672px" }} w="full">
              <ConfirmationBox accountName={accountName!} />
            </Stack>
          </Stack>
        </Stack>
      </VStack>
    </Stack>
  );
};
