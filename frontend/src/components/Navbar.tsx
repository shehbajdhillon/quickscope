import { css } from "@/styled-system/css";
import { ArrowRightIcon, CrosshairIcon } from "lucide-react";
import Stack from "./Stack";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  return (
    <div className={css({ borderBottomWidth: "2px", borderColor: "red.dark.3", display: "flex", alignItems: "center", minH: "60px", px: "20px", justifyContent: "center" })}>
      <div className={css({ justifyContent: "space-between", maxW: "1920px", w: "full", display: "flex" })}>
        <Stack direction="row" gap="5px">
          <CrosshairIcon size={"25px"} />
          <text className={css({ fontSize: "25px", fontWeight: "medium" })}>QuickScope</text>
        </Stack>
        <Stack direction="row" gap="10px">
          <Button backgroundColor={"red.dark.3"}>
            Get Started
            <ArrowRightIcon />
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Navbar;
