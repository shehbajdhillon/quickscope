import { Stack } from "@/styled-system/jsx";

import * as Tabs from '@/components/ui/tabs'

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
        <Tabs.Content value="dashboard">
          Here you will see all the stats.
        </Tabs.Content>
        <Tabs.Content value="issues">
          Here you will see issues opened by QuickScope or User or Imported.
        </Tabs.Content>
        <Tabs.Content value="settings">
          Settings about the Monitor. Import more repos, sources. Delete the Monitor.
        </Tabs.Content>
      </Tabs.Root>
      <Stack direction={"column"}>
        <Stack
          direction={{ base: "column", md: "row" }}
          gap="30px"
        >
          <Stack maxWidth={{ md: "672px" }} w="full">
          </Stack>
          <Stack maxWidth={{ md: "672px" }} w="full">
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CurrentMonitorPage;

