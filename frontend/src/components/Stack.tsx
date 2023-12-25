import { css } from "@/styled-system/css";
import { PropsWithChildren } from "react";

interface StackProps {
  direction: "row" | "column";
  gap: string | number;
};


const Stack: React.FC<PropsWithChildren<StackProps>> = ({ direction, gap, children }) => {
  return (
    <div className={css({ display: "flex", flexDirection: direction, alignItems: "center", gap: gap })}>
      {children}
    </div>
  );
};

export default Stack;
