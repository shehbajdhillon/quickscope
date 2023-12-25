import { css } from "@/styled-system/css";
import { Box } from "@/styled-system/jsx";

const NewPage = () => {
  return (
    <Box>
      <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>New Monitor</h1>
      <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
        To setup a new monitor, import an existing git repository and an observability source.
      </p>
    </Box>
  );
};

export default NewPage;

