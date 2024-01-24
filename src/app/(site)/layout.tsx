import SideBar from "@/components/sidenav/SideBar"

export default function SiteLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="flex h-screen bg-red-300">
        {/* Include shared UI here e.g. a header or sidebar */}
        <SideBar />
   
        {children}
      </section>
    )
  }