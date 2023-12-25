import { css } from "@/styled-system/css";

export default function Home() {
  return (
    <main>
      <div className={css({ textAlign: "flex-start", px: "10px", gap: "1000px" })}>
        <h1 className={css({ fontSize: { base: "60px", lg: "90px" }, fontWeight: "medium" })}>QuickScope</h1>
        <p className={css({ fontWeight: "medium", fontSize: "25px" })}>
          QuickScope integrates with your observability stack and codebase to identify and address production errors.
        </p>
        <p className={css({ fontWeight: "medium", fontSize: "25px", pt: "10px" })}>
          Using QuickScope, engineering teams spend less time putting out fires and more time building features loved by their users.
        </p>
      </div>
    </main>
  )
}
