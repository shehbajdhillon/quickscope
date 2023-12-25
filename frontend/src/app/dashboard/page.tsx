import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { css } from "@/styled-system/css";
import { Center, Grid, GridItem, VStack } from "@/styled-system/jsx";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Dashboard: React.FC = () => {
  return (
    <VStack>
      <Grid
        placeItems="center"
        gap="60px"
        py="50px"
        gridTemplateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          xl: "repeat(6, 1fr)",
        }}
      >

        <GridItem colSpan={2}>
          <NewMonitorCard />
        </GridItem>

        <GridItem colSpan={2}>
          <MonitorCard />
        </GridItem>

        <GridItem colSpan={2}>
          <MonitorCard />
        </GridItem>

        <GridItem colSpan={2}>
          <MonitorCard />
        </GridItem>

        <GridItem colSpan={2}>
          <MonitorCard />
        </GridItem>

        <GridItem colSpan={2}>
          <MonitorCard />
        </GridItem>

        <GridItem colSpan={2}>
          <MonitorCard />
        </GridItem>

        <GridItem colSpan={2}>
          <MonitorCard />
        </GridItem>

      </Grid>
    </VStack>
  );
}

const NewMonitorCard = () => {
  return (
    <Link href="/new">
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

const MonitorCard = () => {
  return (
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
  );
};

export default Dashboard;

