import { css } from "@/styled-system/css";
import { Stack } from "@/styled-system/jsx";

const CurrentMonitorPage = () => {
  return (
    <Stack gap={"20px"} justifyContent={"center"}>

      <Stack gap="-20px">
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>Current Monitor</h1>
      </Stack>

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

