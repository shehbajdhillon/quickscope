import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { css } from "@/styled-system/css";
import { Center, Grid, GridItem, Stack, VStack } from "@/styled-system/jsx";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import * as Tabs from '@/components/ui/tabs'

export default async function Dashboard({ params }: { params: { teamSlug: string }}) {

  const options = [
    { id: 'monitors', label: 'Monitors' },
    { id: 'teamsettings', label: 'Team Settings' },
  ]

  return (
    <Stack gap={"20px"} justifyContent={"center"}>
      <Tabs.Root defaultValue="monitors">
        <Tabs.List>
          {options.map((option) => (
            <Tabs.Trigger key={option.id} value={option.id}>
              {option.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="monitors">
          <VStack>
            <MonitorCardGrid teamSlug={params.teamSlug} />
          </VStack>
        </Tabs.Content>
        <Tabs.Content value="teamsettings">
          Settings about the team. Invite members, change payment info.
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
}

const MonitorCardGrid = ({ teamSlug }: { teamSlug: string }) => {
  return (
    <Grid
      placeItems="center"
      gap="30px"
      py="20px"
      gridTemplateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        xl: "repeat(6, 1fr)",
      }}
    >
      <GridItem colSpan={2}>
        <NewMonitorCard teamSlug={teamSlug} />
      </GridItem>
      {new Array(7).fill(0).map((_, key) => (
        <GridItem colSpan={2} key={key}>
          <MonitorCard teamSlug={teamSlug} />
        </GridItem>
      ))}
    </Grid>
  );
};

const NewMonitorCard = ({ teamSlug }: { teamSlug: string }) => {
  return (
    <Link href={`/dashboard/${teamSlug}/new`}>
      <Card className={css({
        borderWidth: "1px",
        w: { base: "330px", md: "360px" },
        h: { base: "215.63px", md: "232.5px"},
      })}>
        <CardBody>
          <Center h="full">
            <PlusIcon size={"30px"} />
            <text className={css({ fontWeight: "medium", fontSize: "25px" })}>New Monitor</text>
          </Center>
        </CardBody>
      </Card>
    </Link>
  );
};

const MonitorCard = ({ teamSlug }: { teamSlug: string }) => {
  return (
    <Link href={`/dashboard/${teamSlug}/monitor`}>
      <Card className={css({
        borderWidth: "1px",
        w: { base: "330px", md: "360px" },
        h: { base: "215.63px", md: "232.5px"},
      })}>
        <CardHeader>
          <CardTitle>PlanetCast Monitor</CardTitle>
          <CardDescription>3 Fixes Available</CardDescription>
        </CardHeader>
        <CardBody>
          Pass Rate: 86%
        </CardBody>
        <CardFooter gap="3">
          <Button variant="outline">Cancel</Button>
          <Button>Invite</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

