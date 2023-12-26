import { css } from "@/styled-system/css";
import { CrosshairIcon } from "lucide-react";
import { hstack } from "@/styled-system/patterns";
import { UserButton } from "@clerk/nextjs";

const MarketingNavbar: React.FC = () => {

  return (
    <div className={css({ borderBottomWidth: "2px", display: "flex", alignItems: "center", minH: "60px", px: "10px", justifyContent: "center" })}>
      <div className={css({ justifyContent: "space-between", maxW: "1920px", w: "full", display: "flex" })}>
        <div className={hstack({ gap: "5px" })}>
          <CrosshairIcon size={"25px"} />
          <text className={css({ fontSize: "25px", fontWeight: "medium", display: { md: "block", base: "none" } })}>QuickScope</text>
        </div>
        <div className={hstack({ gap: "5px" })}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default MarketingNavbar;
