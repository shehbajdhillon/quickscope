import { css } from "@/styled-system/css";
import { Stack, VStack } from "@/styled-system/jsx";
import { exchangeCodeForAccessToken, getVercelTeamName } from "./actions";
import { ConfirmationBox } from "./components";
import { GetTeamSlugsQuery, VercelToken } from "@/__generatedGqlTypes__/graphql";
import { auth } from "@clerk/nextjs";
import { GetApolloClient } from "@/apollo-client";
import { GET_TEAM_SLUGS } from "@/app/dashboard/gql";

export const dynamic = "force-dynamic";

type Props = {
  searchParams?: {
    code?: string;
    next?: string;
  };
};

export default async function VercelCallbackPage(params: Props) {

  const token = await exchangeCodeForAccessToken(params.searchParams?.code!);
  const next = params.searchParams?.next;
  const teamName = await getVercelTeamName(token);

  const vercelToken: VercelToken = {
    accessToken: token.access_token,
    installationId: token.installation_id,
    userId: token.user_id,
    tokenType: token.token_type,
    teamId: token.team_id || "",
    accountName: teamName,
  };

  const { getToken } = auth();
  const apolloClient = GetApolloClient(true, getToken);
  const { data } = await apolloClient.query<GetTeamSlugsQuery>({
    query: GET_TEAM_SLUGS,
    context: { fetchOptions: { next: { revalidate: 5 } } }
  });
  const teams = data.teams;
  const slug = teams[0].teamSlug;

  return (
    <Stack gap={"20px"} justifyContent={"center"}>
      <Stack gap="-20px">
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>Vercel Integration</h1>
        <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
          Connect your Vercel acccount to QuickScope.
        </p>
      </Stack>
      <VStack hidden={token === undefined}>
        <Stack direction={"column"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap="30px"
            w="full"
          >
            <Stack maxWidth={{ md: "672px" }} w="full">
              { token &&
                <ConfirmationBox
                  vercelToken={vercelToken}
                  next={next!}
                  teamName={teamName}
                  teamSlug={slug}
                />
              }
            </Stack>
          </Stack>
        </Stack>
      </VStack>
    </Stack>
  );
};
