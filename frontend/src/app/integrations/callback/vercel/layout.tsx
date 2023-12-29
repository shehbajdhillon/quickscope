import Navbar from '@/app/dashboard/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
    <nav>
      <Navbar />
    </nav>
    <section>
      {children}
    </section>
    </main>
  )
}
