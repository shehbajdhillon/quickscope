"use client";

import { Button } from "@/components/ui/button";
import { css } from "@/styled-system/css";
import { Stack, HStack, VStack, Spacer } from "@/styled-system/jsx";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { VercelToken, exchangeCodeForAccessToken } from "./actions";
import Link from "next/link";

const VercelCallbackPage = () => {

  const [scope, setScope] = useState<"team" | "personal account" | undefined>();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  const [_, exchange] = useTransition();

  const [res, setRes] = useState<VercelToken>();

  useEffect(() => {
    if (!code) return;

    exchange(async () => {
      const result = await exchangeCodeForAccessToken(code);
      setScope(result.team_id ? "team" : "personal account");
      setRes(result);
      console.log({ result });
    });
  }, [code]);

  return (
    <Stack gap={"20px"} justifyContent={"center"}>
      <Stack gap="-20px">
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>Vercel Integration</h1>
        <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
          Connect your Vercel acccount to QuickScope.
        </p>
      </Stack>
      <VStack hidden={res === undefined}>
        <Stack direction={"column"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap="30px"
            w="full"
          >
            <Stack maxWidth={{ md: "672px" }} w="full">
              { res && <ConfirmationBox token={res} /> }
            </Stack>
          </Stack>
          <HStack pt="15px">
            <Spacer />
            <Link href="/dashboard">
              <Button>
                <ArrowLeftIcon />
                Cancel
              </Button>
            </Link>
            <Link href={next!}>
              <Button>
                Continue
                <ArrowRightIcon />
              </Button>
            </Link>
          </HStack>
        </Stack>
      </VStack>
    </Stack>
  );
};

const ConfirmationBox = ({ token }: { token: VercelToken }) => {
  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Connect Vercel Account</CardTitle>
        <CardDescription>
          This will allow QuickScope to access resources on your Vercel account.
        </CardDescription>
      </CardHeader>
      <CardBody gap={"20px"}>
        <HStack>
          <text className={css({ fontSize: "20px" })}>
            You are about to connect<br /><br />
            <span className={css({ fontWeight: "medium" })}>
              Vercel team<br />{"Shehbaj Dhillon's Personal Workspace"}<br /><br />
            </span>
            with<br /><br />
            <span className={css({ fontWeight: "medium" })}>
              QuickScope team<br />{"Shehbaj Dhillon's Personal Workspace"}<br /><br />
            </span>
            Your QuickScope team will have access to all authorized resources of this Vercel team.
          </text>
        </HStack>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default VercelCallbackPage;
