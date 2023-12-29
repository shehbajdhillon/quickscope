import { css } from "@/styled-system/css";
import Navbar from "./MarketingNavbar";
import Image from "next/image";
import { Center } from "@/styled-system/jsx";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={css({ textAlign: "flex-start", gap: "1000px" })}>
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>QuickScope</h1>
        <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
          QuickScope integrates with your observability stack and codebase to identify and address production errors.
        </p>
        <p className={css({ fontWeight: "medium", fontSize: "25px", pt: "10px" })}>
          Using QuickScope, engineering teams spend less time putting out fires and more time building features loved by their users.
        </p>
        <Center pt="50px">
          <Image
            src={'/quickscopegraph.png'}
            height={380}
            width={1000}
            alt="Quick Scope Graph"
          />
        </Center>
      </div>
    </main>
  )
}
