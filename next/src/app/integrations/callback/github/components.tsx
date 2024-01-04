"use client"

import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { css } from "@/styled-system/css";
import { HStack, Spacer, Stack } from "@/styled-system/jsx";

export const ConfirmationBox = ({ accountName }: { accountName: string }) => {
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
            Successfully connected to <Code size={"lg"}>{accountName}</Code> on GitHub.
          </text>
          <text className={css({ fontSize: "20px" })}>
            Your QuickScope team will have access to all authorized resources of this GitHub account.
          </text>
        </Stack>
      </CardBody>
      <CardFooter>
        <HStack pt="15px">
          <Spacer />
          <Button onClick={() => window.close()}>
            Close Window
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};
