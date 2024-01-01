"use client";

import { Button } from "@/components/ui/button";
import { css } from "@/styled-system/css";
import { Stack, HStack, VStack, Spacer } from "@/styled-system/jsx";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Code } from "@/components/ui/code";

const GitHubCallbackPage = () => {

  const searchParams = useSearchParams();
  const installationId = searchParams.get("installation_id");
  const setupAction = searchParams.get("setup_action");

  const [_, exchange] = useTransition();

  useEffect(() => {
    if (!installationId) return;

    exchange(async () => {
    });
  }, [installationId]);

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
              <ConfirmationBox />
            </Stack>
          </Stack>
          <HStack pt="15px">
            <Spacer />
            <Button onClick={() => window.close()}>
              Close Window
            </Button>
          </HStack>
        </Stack>
      </VStack>
    </Stack>
  );
};

const ConfirmationBox = () => {
  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Connect GitHub Account</CardTitle>
        <CardDescription>
          This will allow QuickScope to access resources on your GitHub account.
        </CardDescription>
      </CardHeader>
      <CardBody gap={"20px"}>
        <Stack>
          <text className={css({ fontSize: "20px" })}>
            Successfully connected to <Code size={"lg"}>shehbajdhillon</Code> on GitHub.
          </text>
          <text className={css({ fontSize: "20px" })}>
            Your QuickScope team will have access to all authorized resources of this GitHub account.
          </text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GitHubCallbackPage;
