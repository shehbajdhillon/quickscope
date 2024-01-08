"use client";

import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { css } from "@/styled-system/css";
import { HStack, Spacer, Stack } from "@/styled-system/jsx";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { VercelToken } from "@/__generatedGqlTypes__/graphql";
import { useEffect } from "react";


const LINK_VERCEL_ACCOUNT = gql`
  mutation LinkVercelAccount($teamSlug: String!, $vercelToken: VercelToken!) {
    addVercelIntegration(teamSlug: $teamSlug, vercelToken: $vercelToken) {
      integrationName
    }
  }
`;

interface ConfirmationBoxProps {
  vercelToken: VercelToken;
  next: string;
  teamName: string;
  teamSlug: string;
};

export const ConfirmationBox: React.FC<ConfirmationBoxProps>  = (props) => {

  const { vercelToken, next, teamName, teamSlug } = props;

  const [linkVercelAccount, { loading, error, data }]
    = useMutation(LINK_VERCEL_ACCOUNT, { variables: { teamSlug, vercelToken } });

  const router = useRouter();

  const linkAccount = async () => {
    await linkVercelAccount();
    router.push(next);
  };

  useEffect(() => {
    console.log({ loading, error, data });
  }, [loading, error, data]);

  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Connect Vercel Account</CardTitle>
        <CardDescription>
          This will allow QuickScope to access resources on your Vercel account.
        </CardDescription>
      </CardHeader>
      <CardBody gap={"20px"}>
        <Stack>
          <text className={css({ fontSize: "20px" })}>
            Do you want to connect to <Code size={"lg"}>{teamName}</Code> on Vercel?
          </text>
          <text className={css({ fontSize: "20px" })}>
            Your QuickScope team will have access to all authorized resources of this Vercel account.
          </text>
        </Stack>
      </CardBody>
      <CardFooter>
        <HStack pt="15px">
          <Spacer />
          <Button onClick={() => window.close()}>
            Cancel
          </Button>
          <Button onClick={linkAccount}>
            Connect Vercel Account
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};
