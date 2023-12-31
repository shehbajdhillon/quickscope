import { Box, HStack, Spacer, Stack } from "@/styled-system/jsx";
import * as Tabs from '@/components/ui/tabs'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDownIcon, BadgeAlertIcon, ServerCrashIcon, TimerIcon } from "lucide-react";

const CurrentMonitorPage = () => {

  const options = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'issues', label: 'Issues' },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <Stack gap={"20px"} justifyContent={"center"}>
      <Tabs.Root defaultValue="dashboard">
        <Tabs.List>
          {options.map((option) => (
            <Tabs.Trigger key={option.id} value={option.id}>
              {option.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="dashboard" py={"50px"}>
          <DashboardTab />
        </Tabs.Content>
        <Tabs.Content value="issues">
          Here you will see issues opened by QuickScope or User or Imported.
        </Tabs.Content>
        <Tabs.Content value="settings">
          Settings about the Monitor. Import more repos, sources. Delete the Monitor.
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};

const DashboardTab = () => {
  return (
    <Stack pt="20px">
      <StatCards />
      <Stack direction={{ base: "column", lg: "row" }}>
        <Box maxW={{ base: "100%", lg: "60%" }} w="full">
          <BarGraph />
        </Box>
        <Box maxW={{ base: "100%", lg: "40%" }} w="full">
          <ActiveIssues />
        </Box>
      </Stack>
    </Stack>
  );
};

const BarGraph = () => {
  return (
    <Card w="full" h="500px">
      <CardHeader>
        <CardTitle>
          Overview
        </CardTitle>
        <CardDescription>
          Number of Events Recorded
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const ActiveIssues = () => {
  return (
    <Card w="full" h="500px">
      <CardHeader>
        <CardTitle>
          Monitoring
        </CardTitle>
        <CardDescription>
          Most Frequent Errors
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

const StatCards = () => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} gap="10px">
      <Card h={"126px"} w={{ base: "full", lg: "305.5px" }}>
        <CardHeader>
          <CardTitle>
            <HStack>
              Error Rate
              <Spacer />
              <ServerCrashIcon />
            </HStack>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card h={"126px"} w={{ base: "full", lg: "305.5px" }}>
        <CardHeader>
          <CardTitle>
            <HStack>
              Response Time
              <Spacer />
              <TimerIcon />
            </HStack>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card h={"126px"} w={{ base: "full", lg: "305.5px" }}>
        <CardHeader>
          <CardTitle>
            <HStack>
              Traffic Patterns
              <Spacer />
              <ArrowUpDownIcon />
            </HStack>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card h={"126px"} w={{ base: "full", lg: "305.5px" }}>
        <CardHeader>
          <CardTitle>
            <HStack>
              Alerts and Incidents
              <Spacer />
              <BadgeAlertIcon />
            </HStack>
          </CardTitle>
        </CardHeader>
      </Card>
    </Box>
  );
};

export default CurrentMonitorPage;

