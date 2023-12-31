import { css } from "@/styled-system/css";
import { ArrowRightIcon, CrosshairIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { hstack } from "@/styled-system/patterns";

const MarketingNavbar: React.FC = () => {

  return (
    <div className={css({ borderBottomWidth: "2px", display: "flex", alignItems: "center", minH: "60px", px: "10px", justifyContent: "center" })}>
      <div className={css({ justifyContent: "space-between", maxW: "1920px", w: "full", display: "flex" })}>
        <div className={hstack({ gap: "5px" })}>
          <CrosshairIcon size={"25px"} />
          <text className={css({ fontSize: "25px", fontWeight: "medium", display: { md: "block", base: "none" } })}>QuickScope</text>
        </div>
        <div className={hstack({ gap: "5px" })}>
          <Link href="/dashboard">
            <Button>
              <span className={css({ display: { md: "block", base: "none" } })}>Get Started</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketingNavbar;
