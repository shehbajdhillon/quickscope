"use client";

import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { css } from "@/styled-system/css";
import { Stack, HStack, Spacer, VStack } from "@/styled-system/jsx";
import { ArrowRightIcon, CheckIcon, ChevronsUpDownIcon, ExternalLinkIcon } from "lucide-react";

import { useEffect, useState } from "react";

import * as Select from '@/components/ui/select'
import { MenuSeparator } from "@ark-ui/react";
import { Link } from "@/components/ui/link";

import { validatePostHogAPIKey, validateRailwayAPIKey } from "./actions";


const NewPage = () => {
  return (
    <Stack gap={"20px"} justifyContent={"center"}>

      <Stack gap="-20px">
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>New Monitor</h1>
        <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
          To setup a new monitor, import a git repository and an observability source.
        </p>
      </Stack>
      <VStack>
        <Stack direction={"column"}>
          <Stack
            direction={{ base: "column", md: "row" }}
            gap="30px"
          >
            <Stack maxWidth={{ md: "672px" }} w="full">
              <GithubImportBox />
            </Stack>
            <Stack maxWidth={{ md: "672px" }} w="full">
              <ObservabilityImportBox />
            </Stack>
          </Stack>
          <HStack pt="15px">
            <Spacer />
            <Button>
              Continue
              <ArrowRightIcon />
            </Button>
          </HStack>
        </Stack>
      </VStack>
    </Stack>
  );
};

const ObservabilityImportBox = () => {
  const items = [
    { label: 'Vercel (Logs)', value: 'Vercel' },
    { label: 'PostHog (Logs, User Sessions)', value: 'PostHog' },
    { label: 'Railway.app (Logs)', value: 'Railway.app'},
    { label: 'Rollbar (Coming Soon)', value: 'Rollbar', disabled: true, },
    { label: 'Heroku (Coming Soon)', value: 'Heroku', disabled: true, },
    { label: 'AWS EC2 (Coming Soon)', value: 'AWS EC2', disabled: true, },
    { label: 'Fly.io (Coming Soon)', value: 'Fly.io', disabled: true, },
  ]

  const [provider, setProvider] = useState(items[0].value);

  const pushKey = (key: string) => {
    return true;
  };

  return (
    <Card borderColor={"red"}>
      <CardHeader>
        <CardTitle>Import Observability Source</CardTitle>
        <CardDescription>
          Connect services recording logs and user sessions generated by your application.
        </CardDescription>
      </CardHeader>
      <CardBody gap={"20px"}>

        <HStack>
          <Select.Root
            positioning={{ sameWidth: true }}
            items={items}
            defaultValue={[items[0].value]}
            onValueChange={(event) => setProvider(event.value[0])}
          >
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText />
                <ChevronsUpDownIcon />
              </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup id="gitprovider">
                  <Select.ItemGroupLabel htmlFor="gitprovider">Account</Select.ItemGroupLabel>
                  {items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        </HStack>

        <Stack>
          { provider == "Vercel" && <VercelImportBox /> }
          { provider == "PostHog" && <PostHogImportBox pushKey={pushKey} /> }
          { provider == "Railway.app" && <RailwayAppImportBox pushKey={pushKey} /> }
        </Stack>

        <MenuSeparator />
        <text>All connected services will show here. (None connected yet)</text>
      </CardBody>
    </Card>
  );
};


interface ImportBoxProps {
  pushKey: (key: string) => boolean;
};


const VercelImportBox = () => {
  return (
    <Stack>
      Connect Vercel
      <HStack>
        <Button>Connect Vercel Account</Button>
      </HStack>
      <Link fontSize={"sm"} href='https://vercel.com/docs/integrations' target="_blank">
        How Vercel Integrations Work
        <ExternalLinkIcon />
      </Link>
    </Stack>
  );
};


const PostHogImportBox: React.FC<ImportBoxProps> = ({ pushKey }) => {

  const POSTHOG_API_KEY_LENGTH = 47;
  const [posthogKey, setPosthogKey] = useState('')
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  const checkKeyValid = async () => {
    if (posthogKey.length != POSTHOG_API_KEY_LENGTH) {
      setConfirmed(false);
      return;
    }
    try {
      await validatePostHogAPIKey(posthogKey);
      setError("");
      setConfirmed(true);
    } catch (error) {
      setError("PostHog API key could not be confirmed.");
      setConfirmed(false);
    };
  };

  useEffect(() => {
    checkKeyValid();
  }, [posthogKey, checkKeyValid]);

  return (
    <Stack>
      Connect PostHog
      <HStack>
        <Input
          placeholder="PostHog API Key"
          value={posthogKey}
          onChange={(e) => setPosthogKey(e.target.value)}
        />
        <Button disabled={!confirmed} onClick={() => pushKey(posthogKey)}>
          Add
        </Button>
      </HStack>
      { posthogKey.length > 0 && <text className={css({ color: "red" })}>{error}</text> }
      <Link fontSize={"sm"} href='https://posthog.com/docs/api#how-to-obtain-a-personal-api-key' target="_blank">
        How to get PostHog API Key
        <ExternalLinkIcon />
      </Link>
    </Stack>
  );
};


const RailwayAppImportBox: React.FC<ImportBoxProps> = ({ pushKey }) => {

  const RAILWAY_API_KEY_LENGTH = 36;
  const [railwayKey, setRailwayKey] = useState('')
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  const checkKeyValid = async () => {
    if (railwayKey.length != RAILWAY_API_KEY_LENGTH) {
      setConfirmed(false);
      return;
    }
    try {
      await validateRailwayAPIKey(railwayKey);
      setError("");
      setConfirmed(true);
    } catch (error) {
      setError("Railway API key could not be confirmed.");
      setConfirmed(false);
    };
  };

  useEffect(() => {
    checkKeyValid();
  }, [railwayKey, checkKeyValid]);

  return (
    <Stack>
      Connect Railway.app
      <HStack>
        <Input
          placeholder="Railway API Key"
          value={railwayKey}
          onChange={(e) => setRailwayKey(e.target.value)}
        />
        <Button disabled={!confirmed} onClick={() => pushKey(railwayKey)}>
          Add
        </Button>
      </HStack>
      { railwayKey.length > 0 && <text className={css({ color: "red" })}>{error}</text> }
      <Link fontSize={"sm"} href='https://docs.railway.app/reference/public-api#authentication' target="_blank">
        How to get Railway API Key
        <ExternalLinkIcon />
      </Link>
    </Stack>
  );
};


const GithubImportBox = () => {

  const items = [
    { label: 'shehbajdhillon', value: 'shehbajdhillon' },
    { label: 'jointaro', value: 'jointaro' },
    { label: 'spendsense', value: 'spendsense'},
    { label: 'interviewingio', value: 'interviewingio' },
  ]

  return (
    <Card borderColor={"red"}>
      <CardHeader>
        <CardTitle>Import Git Repository</CardTitle>
        <CardDescription>
          Connect Git repositories containing your application code.
        </CardDescription>
      </CardHeader>
      <CardBody gap={"20px"}>

        <HStack>
          <Select.Root positioning={{ sameWidth: true }} items={items} defaultValue={[items[0].value]}>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText />
                <ChevronsUpDownIcon />
              </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup id="gitprovider">
                  <Select.ItemGroupLabel htmlFor="gitprovider">Account</Select.ItemGroupLabel>
                  {items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckIcon />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>


          <Input placeholder="Search" />
        </HStack>

        <HStack>
          PlanetCast
          <Spacer />
          <Button>
           Import
          </Button>
        </HStack>

        <HStack>
          Checkers
          <Spacer />
          <Button>
           Import
          </Button>
        </HStack>

        <HStack>
          Taro
          <Spacer />
          <Button>
           Import
          </Button>
        </HStack>

        <HStack>
          InterviewingIo
          <Spacer />
          <Button>
           Import
          </Button>
        </HStack>

        <MenuSeparator />

        <text>All connected repositories will show here. (None connected yet)</text>

      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default NewPage;

