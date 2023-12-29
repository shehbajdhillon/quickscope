import Navbar from "./Navbar"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main>
    <nav><Navbar /></nav>
    <section>
      {children}
    </section>
    </main>
  )
}
