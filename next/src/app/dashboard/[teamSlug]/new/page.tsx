"use client";

import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { css } from "@/styled-system/css";
import { Stack, HStack, Spacer, VStack } from "@/styled-system/jsx";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  ExternalLinkIcon,
  TrashIcon
} from "lucide-react";

import { useEffect, useState } from "react";

import * as Select from '@/components/ui/select'
import { MenuSeparator } from "@ark-ui/react";
import { Link } from "@/components/ui/link";

import { listRepositories, validatePostHogAPIKey, validateRailwayAPIKey } from "./actions";
import { openPopUpWindow } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Code } from "@/components/ui/code";
import { gql, useQuery } from "@apollo/client";
import { GetLinkedGitHubAccountsQuery } from "@/__generatedGqlTypes__/graphql";
import { useParams } from "next/navigation";
import { RestEndpointMethodTypes } from "@octokit/rest";

const GET_LINKED_GITHUB_ACCOUNTS = gql`
  query GetLinkedGitHubAccounts($teamSlug: String!) {
    teams(teamSlug: $teamSlug) {
      integrations(integrationName: GITHUB) {
        accountName
        integrationName
        githubInstallationId
      }
    }
  }
`;


const NewPage = () => {

  const [currentStep, setCurrentStep] = useState(0);

  const params = useParams();

  return (
    <Stack gap={"20px"} justifyContent={"center"}>

      <Stack gap="-20px">
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>New Monitor</h1>
        <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
          To setup a new monitor, import a git repository and an observability source.
        </p>
      </Stack>

      <VStack>
        <VStack maxW="1020px" w="full">

          <HStack w="full" justifyContent={"space-between"}>
            {[
              "Connect Repository",
              "Connect Observability Source",
              "Deploy",
             ].map((step, idx) => (
              <VStack w="full" key={idx}>
                <Badge
                  variant={currentStep >= idx ? "solid" : "outline"}
                  size={"lg"}
                >
                  {idx + 1}
                </Badge>
                <text className={css({ textAlign: "center" })}>
                  {step}
                </text>
              </VStack>
            ))}
          </HStack>

            <Stack maxWidth={{ md: "560px" }} w="full" display={currentStep !== 0 ? "none" : "block"}>
              <GithubImportBox teamSlug={params.teamSlug as string} />
            </Stack>

            <Stack maxWidth={{ md: "560px" }} w="full" display={currentStep !== 1 ? "none" : "block"}>
              <ObservabilityImportBox />
            </Stack>

            <Stack maxWidth={{ md: "560px" }} w="full" display={currentStep !== 2 ? "none" : "block"}>
              <MonitorReviewBox />
            </Stack>

            <HStack pt="15px" w="full" maxWidth={{ md: "560px" }}>
              <Spacer />
              <Button onClick={() => setCurrentStep(curr => Math.max(curr - 1, 0))}>
                <ArrowLeftIcon />
                Back
              </Button>
              <Button onClick={() => setCurrentStep(curr => Math.min(curr + 1, 2))}>
                Continue
                <ArrowRightIcon />
              </Button>
            </HStack>

        </VStack>
      </VStack>
    </Stack>
  );
};

const MonitorReviewBox = () => {
  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Deploy Monitor</CardTitle>
        <CardDescription>
          Give your monitor a name and review your selected options.
        </CardDescription>
      </CardHeader>
      <CardBody gap={"20px"}>
        <HStack>
          <Input placeholder="Monitor Name" />
        </HStack>

        <Stack>
          <text className={css({ fontWeight: "medium" })}>
            Repository Connected
          </text>
          <MenuSeparator />
          <HStack>
            <text>PlanetCast</text>
            <Spacer />
            <Code>shehbajdhillon</Code>
          </HStack>
        </Stack>

        <Stack>
          <text className={css({ fontWeight: "medium" })}>
            Observability Sources Connected
          </text>
          <MenuSeparator />
          <HStack>
            <text>PostHog</text>
            <Spacer />
            <Code>****HGF2</Code>
          </HStack>
          <HStack>
            <text>Vercel</text>
            <Spacer />
            <Code>syncsoftware</Code>
          </HStack>
          <HStack>
            <text>Railway</text>
            <Spacer />
            <Code>****FWEF3</Code>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
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
    <Card w="full">
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


type REPOSITORIES = RestEndpointMethodTypes["apps"]["listReposAccessibleToInstallation"]["response"]["data"]["repositories"];

const GithubImportBox = (props: { teamSlug: string }) => {

  const openGithubPopUp = () => {
    const githubAppInstallationUrl =
      "https://github.com/apps/quickscopedev/installations/new";
    const window = openPopUpWindow(githubAppInstallationUrl);
    const checkChildWindow = setInterval(() => {
      if (window?.closed) {
        clearInterval(checkChildWindow);
        refetch();
      }
    }, 1000);
  };

  const { data, refetch }
    = useQuery<GetLinkedGitHubAccountsQuery>(
    GET_LINKED_GITHUB_ACCOUNTS, { variables: { teamSlug: props.teamSlug } });

  const accounts = data?.teams[0].integrations;

  const items = accounts?.map(acc => { return { label: acc.accountName, value: acc.accountName, installationId: acc.githubInstallationId } } );

  const [repos, setRepos] = useState<REPOSITORIES>([]);
  const [selectedRepos, setSelectedRepos] = useState<REPOSITORIES>([]);

  const fetchRepos = async (gitAccount: string) => {
    const id = items?.find(item => item.value === gitAccount)?.installationId;
    const res = await listRepositories(id);
    setRepos(res.data.repositories);
  };

  useEffect(() => {
    if (accounts === undefined) return;
    fetchRepos(accounts[0].accountName);
  }, [accounts]);

  const pushRepo = (repo: REPOSITORIES) => {
    setSelectedRepos([ ...selectedRepos, ...repo ]);
  }

  const popRepo = (idx: number) => {
    const newRepos = [ ...selectedRepos ];
    newRepos.splice(idx, 1);
    setSelectedRepos(newRepos);
  };

  return (
    <Card w="full">
      <CardHeader>
        <CardTitle>Import Git Repository</CardTitle>
        <CardDescription>
          Connect Git repositories containing your application code.
        </CardDescription>
      </CardHeader>
      <CardBody gap={"20px"}>
        { items &&
        <HStack>
          <Select.Root
            positioning={{ sameWidth: true }}
            items={items}
            defaultValue={[items[0].value]}
            onValueChange={(event) => fetchRepos(event.value[0])}
            hidden={items.length == 0}
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
          <Input placeholder="Search" />
        </HStack>
        }
        <Button w="max" onClick={openGithubPopUp}>
          {"+ Add New GitHub Account"}
        </Button>
        <Stack overflowY={"auto"} maxH={"300px"}>
        {repos.map((repo, key) => {
          return (
            selectedRepos.find(r => r.id === repo.id) === undefined &&
            <HStack key={key}>
              {repo.name}
              <Spacer />
              <Button onClick={() => pushRepo([repo])}>
               Import
              </Button>
            </HStack>
          )
        })}
        </Stack>
        <MenuSeparator />
        {selectedRepos.length <= 0 &&
          <text>All connected repositories will show here. (None connected yet)</text> }
        <Stack overflowY={"auto"} maxH={"150px"}>
        {selectedRepos.map((repo, key) => (
          <HStack key={key}>
            {repo.name}
            <Spacer />
            <Button onClick={() => popRepo(key)}>
              <TrashIcon />
            </Button>
          </HStack>
        ))}
        </Stack>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default NewPage;
