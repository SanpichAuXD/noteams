import SideBar from "@/components/sidenav/SideBar"
import Sidenav from "@/components/sidenav/SliderBar"
export default function SiteLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="flex h-screen bg-red-300">
        {/* Include shared UI here e.g. a header or sidebar */}
        <Sidenav />
   
        {children}
      </section>
    )
  }